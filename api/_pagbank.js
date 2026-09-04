// Pecas usadas pelas tres funcoes do PagBank.
//
// Regra que nao se quebra: o token do PagBank so existe aqui, no servidor,
// vindo de variavel de ambiente. Nunca vai para o navegador, nunca entra no
// repositorio. Quem abrir o codigo-fonte do site nao acha nada.

const FIREBASE = 'https://nauj-doceria-default-rtdb.firebaseio.com';

// Sandbox e producao tem endereco diferente. O ambiente e escolhido por
// variavel de ambiente para nao existir chance de testar com dinheiro de
// verdade por engano.
function ambiente() {
  const producao = String(process.env.PAGBANK_AMBIENTE || 'sandbox').toLowerCase() === 'producao';
  return {
    producao,
    base: producao ? 'https://api.pagseguro.com' : 'https://sandbox.api.pagseguro.com',
    token: producao ? process.env.PAGBANK_TOKEN_PRODUCAO : process.env.PAGBANK_TOKEN_SANDBOX
  };
}

async function pagbank(caminho, opcoes = {}) {
  const amb = ambiente();
  if (!amb.token) {
    const qual = amb.producao ? 'PAGBANK_TOKEN_PRODUCAO' : 'PAGBANK_TOKEN_SANDBOX';
    const erro = new Error('Falta a variavel de ambiente ' + qual + ' na Vercel.');
    erro.semToken = true;
    throw erro;
  }
  // Content-Type so faz sentido quando existe corpo. Mandando ele numa
  // consulta o PagBank responde 406 e nao explica o motivo -- foi o que
  // quebrou a consulta de cobranca.
  // Esquisitice medida no proprio PagBank: na leitura de cobranca,
  // "accept: application/json" devolve 406 com corpo vazio; sem accept, ou
  // com coringa, devolve 200 e o JSON normal. Nas chamadas com corpo o
  // accept especifico funciona. Entao o coringa vale para as leituras.
  const cabecalhos = {
    'Authorization': 'Bearer ' + amb.token,
    'accept': opcoes.body ? 'application/json' : '*/*',
    ...(opcoes.headers || {})
  };
  if (opcoes.body) cabecalhos['Content-Type'] = 'application/json';

  const r = await fetch(amb.base + caminho, {
    method: opcoes.method || 'GET',
    headers: cabecalhos,
    body: opcoes.body ? JSON.stringify(opcoes.body) : undefined
  });
  const texto = await r.text();
  let corpo = null;
  try { corpo = texto ? JSON.parse(texto) : null; } catch (e) { corpo = { textoCru: texto }; }
  return { ok: r.ok, status: r.status, corpo };
}

async function lerDoFirebase(caminho) {
  const r = await fetch(FIREBASE + caminho + '.json');
  if (!r.ok) return null;
  return r.json();
}

// "Salmao com Catupiry (+R$ 3,00)" custa 3 reais a mais. O acrescimo mora no
// proprio texto da opcao -- mesma leitura que o cardapio faz no navegador.
function precoExtraDaOpcao(texto) {
  const m = String(texto || '').match(/\+\s*R\$\s*([0-9]+(?:[,.][0-9]+)?)/i);
  return m ? (parseFloat(m[1].replace(',', '.')) || 0) : 0;
}

function semAcento(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

// Centavos, porque o PagBank cobra em centavos e porque somar float em reais
// erra por um centavo de vez em quando.
function centavos(valorEmReais) {
  return Math.round((Number(valorEmReais) || 0) * 100);
}

// ── O CORACAO DA COISA ──────────────────────────────────────────────
// O navegador manda o que quer. Aqui a conta e refeita do zero a partir do
// que esta no banco: preco do produto, acrescimo do sabor, adicionais,
// taxa do bairro e cupom. Se o que chegou nao bater com o que a loja cobra,
// a cobranca nao acontece. Sem isto, alguem editaria o preco no proprio
// navegador e pagaria um real por um pedido de cinquenta.
async function recalcularPedido(pedido) {
  const problemas = [];

  const produtos = (await lerDoFirebase('/products')) || [];
  const listaProdutos = Array.isArray(produtos) ? produtos : Object.values(produtos);
  const porId = {};
  listaProdutos.forEach(p => { if (p && p.id) porId[p.id] = p; });

  const config = (await lerDoFirebase('/config')) || {};
  const adicionais = {};
  ['complements', 'caldas'].forEach(no => {
    const lista = config[no];
    if (!lista) return;
    (Array.isArray(lista) ? lista : Object.values(lista)).forEach(c => {
      if (c && c.name) adicionais[semAcento(c.name)] = Number(c.price) || 0;
    });
  });

  let subtotal = 0;
  (pedido.items || []).forEach(item => {
    const prod = porId[item.id];
    if (!prod) {
      problemas.push('Produto "' + (item.name || item.id) + '" nao existe mais no cardapio.');
      return;
    }
    if (prod.paused) {
      problemas.push('"' + prod.name + '" esta pausado e nao pode ser vendido agora.');
      return;
    }

    let unitario = Number(prod.price) || 0;
    const detalhe = String(item.variant || '');

    // Acrescimo do tamanho ou sabor: casa o texto com uma das opcoes do
    // produto, em vez de aceitar o numero que veio de fora.
    const opcoes = prod.options || [];
    const primeiroPedaco = detalhe.split('|')[0].trim();
    const opcaoCasada = opcoes.find(o => semAcento(o).startsWith(semAcento(primeiroPedaco).split(' (')[0]))
      || opcoes.find(o => semAcento(primeiroPedaco).startsWith(semAcento(o).split(' (')[0]));
    if (opcaoCasada) unitario += precoExtraDaOpcao(opcaoCasada);
    else if (primeiroPedaco && opcoes.length) {
      problemas.push('Nao reconheci a opcao "' + primeiroPedaco + '" em "' + prod.name + '".');
    }

    // Adicionais e caldas, um a um, pelo preco que esta no banco.
    const blocos = detalhe.match(/(?:Adicionais|Caldas):\s*([^|]+)/gi) || [];
    blocos.forEach(bloco => {
      bloco.replace(/^(?:Adicionais|Caldas):\s*/i, '').split(',').forEach(nome => {
        const chave = semAcento(nome);
        if (!chave) return;
        if (!(chave in adicionais)) {
          problemas.push('Nao consegui conferir o preco do adicional "' + nome.trim() + '". ' +
            'Abra a aba Complementos no painel e salve uma vez, para a lista ir para o banco.');
          return;
        }
        unitario += adicionais[chave];
      });
    });

    const qtd = Math.max(1, Math.min(30, parseInt(item.qty, 10) || 1));
    subtotal += unitario * qtd;
  });

  // Taxa do bairro, da lista publicada no painel.
  let taxa = 0;
  if (pedido.mode === 'delivery') {
    const areas = config.delivery_areas;
    const lista = areas ? (Array.isArray(areas) ? areas : Object.values(areas)) : [];
    const area = lista.find(a => a && semAcento(a.name) === semAcento(pedido.bairro));
    if (!area) problemas.push('Bairro "' + (pedido.bairro || '') + '" nao esta na lista de entrega.');
    else taxa = Number(area.fee) || 0;
  }

  // Cupom: conferido no banco, nao aceito pelo que o navegador afirma.
  let desconto = 0;
  const codigo = String(pedido.cupom || '').trim().toUpperCase();
  if (codigo) {
    const cupom = await lerDoFirebase('/coupons/' + encodeURIComponent(codigo));
    if (!cupom) problemas.push('Cupom "' + codigo + '" nao existe.');
    else if (cupom.ativo === false) problemas.push('Cupom "' + codigo + '" esta desativado.');
    else if (cupom.validade && new Date(cupom.validade) < new Date()) problemas.push('Cupom "' + codigo + '" venceu.');
    else if (Number(cupom.minimo) > subtotal) problemas.push('Cupom "' + codigo + '" exige pedido minimo de R$ ' + Number(cupom.minimo).toFixed(2) + '.');
    else if (Number(cupom.limite) > 0 && Number(cupom.usos || 0) >= Number(cupom.limite)) problemas.push('Cupom "' + codigo + '" ja atingiu o limite de uso.');
    else {
      desconto = String(cupom.tipo) === 'percentual'
        ? subtotal * (Number(cupom.valor) || 0) / 100
        : (Number(cupom.valor) || 0);
      desconto = Math.min(desconto, subtotal);
    }
  }

  const total = Math.max(0, subtotal - desconto + taxa);
  return {
    subtotal: Number(subtotal.toFixed(2)),
    desconto: Number(desconto.toFixed(2)),
    taxa: Number(taxa.toFixed(2)),
    total: Number(total.toFixed(2)),
    totalEmCentavos: centavos(total),
    problemas
  };
}

// So o proprio site pode chamar estas funcoes. Sem isto, qualquer pagina na
// internet poderia usar a conta do PagBank da loja.
function liberarOrigem(req, res) {
  const permitidas = [
    'https://nauj-doceria.vercel.app',
    'http://localhost:8901',
    'http://127.0.0.1:8901'
  ];
  const origem = req.headers.origin;
  if (origem && permitidas.includes(origem)) {
    res.setHeader('Access-Control-Allow-Origin', origem);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  if (origem && !permitidas.includes(origem)) {
    res.status(403).json({ erro: 'Origem nao autorizada.' });
    return true;
  }
  return false;
}

module.exports = {
  FIREBASE,
  ambiente,
  pagbank,
  lerDoFirebase,
  precoExtraDaOpcao,
  semAcento,
  centavos,
  recalcularPedido,
  liberarOrigem
};
