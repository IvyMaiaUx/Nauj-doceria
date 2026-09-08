// Manda a venda para a UTMify.
//
// Sai daqui, do servidor, e nao do navegador do cliente, por dois motivos:
// o token da UTMify nao pode aparecer na pagina, e a API deles nao aceita
// chamada vinda de navegador. O site so avisa "fechou um pedido"; quem monta
// o formato deles e faz a chamada e esta funcao.
//
// O token vive em variavel de ambiente na Vercel: UTMIFY_TOKEN.

const { recalcularPedido, liberarOrigem } = require('./_pagbank.js');

const UTMIFY = 'https://api.utmify.com.br/api-credentials/orders';

// A UTMify quer "AAAA-MM-DD HH:MM:SS" em UTC, nao o ISO com T e Z.
function dataUtmify(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (isNaN(d)) return null;
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

function centavos(reais) {
  return Math.round((Number(reais) || 0) * 100);
}

// Pix e dinheiro nao existem na lista deles do jeito que a loja escreve.
function formaDePagamento(texto) {
  const t = String(texto || '').toLowerCase();
  if (t.includes('cart')) return 'credit_card';
  if (t.includes('pix')) return 'pix';
  // Dinheiro na entrega nao tem equivalente; free_price e o mais proximo de
  // "nao passou por gateway".
  return 'free_price';
}

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Use POST.' });

  const token = process.env.UTMIFY_TOKEN;
  if (!token) {
    // Sem token configurado isto nao e erro: e a loja ainda nao ter ligado o
    // rastreamento. Responder 200 evita encher o console do cliente de
    // vermelho por uma coisa que nao afeta o pedido dele.
    return res.status(200).json({ enviado: false, motivo: 'UTMIFY_TOKEN nao esta configurado na Vercel.' });
  }

  try {
    const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const pedido = corpo.pedido || {};
    if (!pedido.id || !Array.isArray(pedido.items) || !pedido.items.length) {
      return res.status(400).json({ erro: 'Pedido incompleto.' });
    }

    // O valor vai recalculado a partir do banco, e nao aceito do navegador.
    // Mesma razao da cobranca: numero que vem de fora nao vira relatorio.
    const conta = await recalcularPedido(pedido);
    const totalEmCentavos = conta.problemas.length ? centavos(pedido.total) : conta.totalEmCentavos;

    const utm = corpo.origem || {};
    const situacao = corpo.pago ? 'paid' : 'waiting_payment';

    const requisicao = {
      orderId: String(pedido.id),
      platform: 'Nauj Doceria',
      paymentMethod: formaDePagamento(pedido.payment || corpo.formaPagamento),
      status: situacao,
      createdAt: dataUtmify(pedido.createdAt),
      approvedDate: corpo.pago ? dataUtmify(pedido.pagoEm || pedido.createdAt) : null,
      refundedAt: null,
      customer: {
        name: String(pedido.customerName || 'Cliente'),
        // A UTMify exige e-mail. A loja so tem e-mail de quem entrou na conta;
        // para os demais vai um endereco derivado do pedido, que nao existe de
        // verdade mas mantem cada venda separada da outra no relatorio.
        email: pedido.customerEmail || (String(pedido.id).toLowerCase() + '@pedido.nauj-doceria.com.br'),
        phone: String(pedido.customerPhone || '').replace(/\D/g, '') || null,
        document: null,
        country: 'BR'
      },
      products: pedido.items.map((i, n) => ({
        id: String(i.id || ('item-' + n)),
        name: String(i.name || 'Item') + (i.variant ? ' - ' + i.variant : ''),
        planId: null,
        planName: null,
        quantity: Math.max(1, parseInt(i.qty, 10) || 1),
        priceInCents: centavos(i.price)
      })),
      trackingParameters: {
        src: utm.src || null,
        sck: utm.sck || null,
        utm_source: utm.utm_source || null,
        utm_campaign: utm.utm_campaign || null,
        utm_medium: utm.utm_medium || null,
        utm_content: utm.utm_content || null,
        utm_term: utm.utm_term || null
      },
      commission: {
        totalPriceInCents: totalEmCentavos,
        // A taxa real do PagBank so aparece na liquidacao, entao nao da para
        // preencher aqui com honestidade. Zero e mais correto que um chute:
        // o relatorio mostra o bruto, e a taxa a dona ve no extrato.
        gatewayFeeInCents: centavos(corpo.taxaGateway),
        userCommissionInCents: totalEmCentavos - centavos(corpo.taxaGateway)
      },
      isTest: corpo.teste === true
    };

    const r = await fetch(UTMIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-token': token },
      body: JSON.stringify(requisicao)
    });
    const texto = await r.text();

    if (!r.ok) {
      return res.status(502).json({
        enviado: false,
        statusDaUtmify: r.status,
        resposta: texto ? texto.slice(0, 300) : '(vazio)'
      });
    }
    res.status(200).json({ enviado: true, pedido: pedido.id, situacao: situacao, total: totalEmCentavos / 100 });
  } catch (e) {
    // Uma falha aqui nao pode derrubar o pedido do cliente: quem chama ignora
    // o resultado. Por isso o erro e devolvido, mas nunca lancado.
    res.status(500).json({ enviado: false, erro: String(e.message || e) });
  }
};
