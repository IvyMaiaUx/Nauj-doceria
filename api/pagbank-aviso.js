// Endereco que o PagBank chama quando a situacao de um pagamento muda:
// aprovado, recusado, estornado, contestado.
//
// Regra de ouro: **nada do que chega aqui e tratado como verdade**. Qualquer
// pessoa na internet consegue mandar um POST para este endereco dizendo que
// o pedido tal foi pago. Entao o aviso serve so como "vai conferir", e a
// situacao real e buscada no proprio PagBank, com o token, logo abaixo.

const { pagbank, lerDoFirebase } = require('./_pagbank.js');

function idsPossiveis(corpo) {
  const achados = new Set();
  const olhar = (o, nivel) => {
    if (!o || typeof o !== 'object' || nivel > 4) return;
    if (Array.isArray(o)) { o.forEach(x => olhar(x, nivel + 1)); return; }
    Object.entries(o).forEach(([chave, valor]) => {
      if (typeof valor === 'string' && /^(CHAR|ORDE)_/.test(valor)) achados.add(valor);
      else if (chave === 'id' && typeof valor === 'string' && valor.length > 8) achados.add(valor);
      else olhar(valor, nivel + 1);
    });
  };
  olhar(corpo, 0);
  return [...achados];
}

module.exports = async function (req, res) {
  // O PagBank so precisa saber que chegou. Responder rapido evita que ele
  // fique repetindo o aviso.
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, recado: 'Este endereco recebe os avisos do PagBank via POST.' });
  }

  let corpo = {};
  try {
    corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch (e) { corpo = {}; }

  const conferidos = [];
  try {
    for (const id of idsPossiveis(corpo).slice(0, 5)) {
      if (!/^CHAR_/.test(id)) continue;
      const r = await pagbank('/charges/' + encodeURIComponent(id));
      if (!r.ok) continue;
      const c = r.corpo || {};
      conferidos.push({
        cobranca: c.id,
        pedido: c.reference_id || null,
        situacao: c.status || null,
        valor: c.amount ? Number(c.amount.value || 0) / 100 : null
      });
    }
  } catch (e) {
    // Nem o erro impede o 200: o PagBank nao pode ficar reenviando por um
    // problema nosso, e a situacao de verdade continua consultavel depois.
    return res.status(200).json({ ok: true, conferido: false, motivo: String(e.message || e) });
  }

  // Marcar o pedido como pago exige escrever no Firebase, e escrever la
  // exige a credencial da dona -- que de proposito nao existe neste
  // servidor. Quem marca e o painel: ele esta logado, e antes de marcar
  // chama /api/pagbank-consultar para ouvir do PagBank que o dinheiro
  // entrou. Assim nenhum caminho anonimo consegue forjar um pedido pago.
  res.status(200).json({ ok: true, conferidos });
};
