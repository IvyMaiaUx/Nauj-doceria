// Sonda temporaria: descobre por que a leitura de cobranca volta 406.
// Tenta variacoes de cabecalho e de caminho e mostra so o status de cada
// uma. Nao imprime o token. APAGAR depois de responder.

const base = 'https://sandbox.api.pagseguro.com';

async function tentar(rotulo, caminho, cabecalhosExtra) {
  const token = process.env.PAGBANK_TOKEN_SANDBOX;
  try {
    const r = await fetch(base + caminho, {
      method: 'GET',
      headers: Object.assign({ 'Authorization': 'Bearer ' + token }, cabecalhosExtra || {})
    });
    const texto = await r.text();
    return { rotulo, caminho, http: r.status, corpo: texto ? texto.slice(0, 200) : '(vazio)' };
  } catch (e) {
    return { rotulo, caminho, erro: String(e.message || e) };
  }
}

module.exports = async function (req, res) {
  const cobranca = String((req.query && req.query.cobranca) || '').trim();
  const pedido = String((req.query && req.query.pedido) || '').trim();

  const testes = [];
  if (cobranca) {
    testes.push(await tentar('accept json', '/charges/' + cobranca, { 'accept': 'application/json' }));
    testes.push(await tentar('Accept maiusculo', '/charges/' + cobranca, { 'Accept': 'application/json' }));
    testes.push(await tentar('sem accept', '/charges/' + cobranca, {}));
    testes.push(await tentar('accept coringa', '/charges/' + cobranca, { 'accept': '*/*' }));
    testes.push(await tentar('accept com charset', '/charges/' + cobranca, { 'accept': 'application/json;charset=UTF-8' }));
  }
  if (pedido) {
    testes.push(await tentar('pedido, accept json', '/orders/' + pedido, { 'accept': 'application/json' }));
    testes.push(await tentar('pedido, sem accept', '/orders/' + pedido, {}));
  }

  res.status(200).json({ testes });
};
