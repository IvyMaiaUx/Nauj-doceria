// Devolve a chave publica do PagBank para o navegador embaralhar o cartao.
//
// A chave publica pode aparecer no navegador sem problema -- e o token que
// nao pode. Ela so serve para embaralhar; quem tem so ela nao consegue
// desembaralhar nada nem cobrar de ninguem.

const { pagbank, liberarOrigem, ambiente } = require('./_pagbank.js');

// A chave nao muda a cada pedido. Guardar em memoria evita uma ida ao
// PagBank por cliente que abre a tela de pagamento.
let guardada = null;
let guardadaEm = 0;
const UMA_HORA = 60 * 60 * 1000;

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;

  try {
    if (guardada && (Date.now() - guardadaEm) < UMA_HORA) {
      return res.status(200).json({ chave: guardada, ambiente: ambiente().producao ? 'producao' : 'sandbox', deCache: true });
    }

    const r = await pagbank('/public-keys', { method: 'POST', body: { type: 'card' } });
    if (!r.ok) {
      return res.status(502).json({
        erro: 'O PagBank recusou o pedido da chave publica.',
        status: r.status,
        detalhe: r.corpo
      });
    }

    const chave = r.corpo && r.corpo.public_key;
    if (!chave) return res.status(502).json({ erro: 'O PagBank respondeu sem a chave publica.', detalhe: r.corpo });

    guardada = chave;
    guardadaEm = Date.now();
    res.status(200).json({ chave, ambiente: ambiente().producao ? 'producao' : 'sandbox', deCache: false });
  } catch (e) {
    if (e.semToken) return res.status(500).json({ erro: e.message, faltaConfigurar: true });
    res.status(500).json({ erro: 'Nao consegui falar com o PagBank.', detalhe: String(e.message || e) });
  }
};
