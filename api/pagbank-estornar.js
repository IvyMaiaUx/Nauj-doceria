// Estorna uma cobranca de cartao.
//
// Devolve o dinheiro ao cliente. A taxa que o PagBank cobrou da loja **nao
// volta** -- isso e regra deles, nao nossa, e por isso a tela do painel diz
// isso antes de a dona confirmar.
//
// So o painel chama isto, e a trava de origem exige que a chamada venha do
// site da loja. Ainda assim, quem souber um id de cobranca e conseguir
// forjar o cabecalho consegue disparar um estorno -- o estrago seria devolver
// dinheiro que ja era do cliente, nao tirar dinheiro de ninguem.

const { pagbank, liberarOrigem, ambiente } = require('./_pagbank.js');

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Use POST.' });

  try {
    const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const cobranca = String(corpo.cobranca || '').trim();
    if (!/^[A-Za-z0-9_-]{6,80}$/.test(cobranca)) {
      return res.status(400).json({ erro: 'Informe o id da cobranca.' });
    }

    // Confere a situacao antes de mandar estornar: assim a mensagem de erro
    // diz o que houve em vez de repassar um codigo generico do PagBank.
    const antes = await pagbank('/charges/' + encodeURIComponent(cobranca));
    if (!antes.ok) {
      return res.status(antes.status === 404 ? 404 : 502).json({
        erro: antes.status === 404 ? 'Essa cobranca nao existe no PagBank.' : 'Nao consegui consultar a cobranca.',
        statusDoPagBank: antes.status
      });
    }
    const atual = antes.corpo || {};
    if (atual.status === 'CANCELED') {
      return res.status(200).json({ jaEstornado: true, situacao: atual.status, erro: 'Esta cobranca ja estava estornada.' });
    }
    if (atual.status !== 'PAID' && atual.status !== 'AUTHORIZED') {
      return res.status(400).json({
        erro: 'So da para estornar cobranca paga ou autorizada. Esta esta como ' + atual.status + '.',
        situacao: atual.status
      });
    }

    // O valor vai explicito para o estorno ser sempre total, e a chave de
    // idempotencia impede que dois cliques devolvam o dinheiro duas vezes.
    const valor = (atual.amount && atual.amount.value) || 0;
    const r = await pagbank('/charges/' + encodeURIComponent(cobranca) + '/cancel', {
      method: 'POST',
      headers: { 'x-idempotency-key': 'estorno-' + cobranca },
      body: { amount: { value: valor } }
    });

    if (!r.ok) {
      const motivos = (r.corpo && r.corpo.error_messages || []).map(m => m.description || m.code).filter(Boolean);
      return res.status(400).json({
        erro: 'O PagBank recusou o estorno.',
        motivos: motivos.length ? motivos : undefined,
        statusDoPagBank: r.status,
        detalhe: r.corpo
      });
    }

    const depois = r.corpo || {};
    res.status(200).json({
      estornado: depois.status === 'CANCELED',
      situacao: depois.status || 'DESCONHECIDA',
      valor: valor / 100,
      cobranca: cobranca,
      ambiente: ambiente().producao ? 'producao' : 'sandbox'
    });
  } catch (e) {
    if (e.semToken) return res.status(500).json({ erro: e.message, faltaConfigurar: true });
    res.status(500).json({ erro: 'Nao consegui falar com o PagBank.', detalhe: String(e.message || e) });
  }
};
