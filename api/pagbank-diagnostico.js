// Teste temporario de configuracao. Diz se o token e aceito em sandbox, em
// producao, ou em nenhum dos dois.
//
// Nao imprime o token. Mostra so o tamanho e os quatro ultimos caracteres,
// o suficiente para conferir se foi colado inteiro e sem espaco sobrando.
// APAGAR assim que a configuracao estiver de pe.

async function tentar(base, token) {
  if (!token) return { configurado: false };
  try {
    const r = await fetch(base + '/public-keys', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ type: 'card' })
    });
    const texto = await r.text();
    let detalhe = null;
    try {
      const j = JSON.parse(texto);
      detalhe = j.error_messages ? j.error_messages.map(m => m.description || m.code).join('; ') : undefined;
    } catch (e) { detalhe = texto ? texto.slice(0, 120) : null; }
    return { configurado: true, http: r.status, aceito: r.ok, detalhe: detalhe || undefined };
  } catch (e) {
    return { configurado: true, erroDeRede: String(e.message || e) };
  }
}

function retrato(token) {
  if (!token) return { presente: false };
  const cru = String(token);
  return {
    presente: true,
    tamanho: cru.length,
    temEspacoOuQuebraDeLinha: cru !== cru.trim(),
    terminaEm: cru.trim().slice(-4)
  };
}

module.exports = async function (req, res) {
  const sandbox = process.env.PAGBANK_TOKEN_SANDBOX;
  const producao = process.env.PAGBANK_TOKEN_PRODUCAO;

  const limpo = t => (t ? String(t).trim() : t);

  res.status(200).json({
    ambienteEscolhido: process.env.PAGBANK_AMBIENTE || '(nao definido, valendo sandbox)',
    tokenSandbox: retrato(sandbox),
    tokenProducao: retrato(producao),
    testes: {
      sandboxComTokenSandbox: await tentar('https://sandbox.api.pagseguro.com', limpo(sandbox)),
      producaoComTokenSandbox: await tentar('https://api.pagseguro.com', limpo(sandbox)),
      producaoComTokenProducao: await tentar('https://api.pagseguro.com', limpo(producao))
    },
    comoLer: 'Onde aceito for true, o token vale naquele ambiente.'
  });
};
