// Pergunta ao PagBank qual e a situacao de verdade de uma cobranca.
//
// Serve ao painel: o navegador do cliente diz que pagou, mas quem confirma e
// o PagBank. Sem esta consulta, bastaria alguem editar o proprio navegador
// para um pedido aparecer como pago.

const { pagbank, liberarOrigem } = require('./_pagbank.js');

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;

  const id = String((req.query && req.query.cobranca) || '').trim();
  if (!id || !/^[A-Za-z0-9_-]{6,80}$/.test(id)) {
    return res.status(400).json({ erro: 'Informe o id da cobranca em ?cobranca=' });
  }

  try {
    const r = await pagbank('/charges/' + encodeURIComponent(id));
    if (!r.ok) {
      return res.status(r.status === 404 ? 404 : 502).json({
        erro: r.status === 404 ? 'Cobranca nao encontrada no PagBank.' : 'O PagBank recusou a consulta.',
        detalhe: r.corpo
      });
    }

    const c = r.corpo || {};
    const pago = c.status === 'PAID';
    res.status(200).json({
      pago,
      situacao: c.status || 'DESCONHECIDA',
      pedido: c.reference_id || null,
      valor: c.amount ? (Number(c.amount.value || 0) / 100) : null,
      pagoEm: c.paid_at || null,
      parcelas: c.payment_method ? c.payment_method.installments : null,
      bandeira: c.payment_method && c.payment_method.card ? c.payment_method.card.brand : null,
      finalDoCartao: c.payment_method && c.payment_method.card ? c.payment_method.card.last_digits : null
    });
  } catch (e) {
    if (e.semToken) return res.status(500).json({ erro: e.message, faltaConfigurar: true });
    res.status(500).json({ erro: 'Nao consegui consultar o PagBank.', detalhe: String(e.message || e) });
  }
};
