// Conta o clique e manda a pessoa para a loja.
//
// O site ja contava quem chega, mas quem clica e desiste antes da pagina abrir
// nao aparecia em lugar nenhum. Essa diferenca e informacao: link que recebe
// muito clique e entrega pouca visita esta prometendo uma coisa e entregando
// outra, ou esta lento demais para quem clicou.
//
// Regra da casa: o redirecionamento acontece sempre. Se o registro falhar, a
// pessoa vai para a loja do mesmo jeito -- perder um clique na contagem e um
// arranhao, perder o cliente e o negocio.

const BANCO = 'https://nauj-doceria-default-rtdb.firebaseio.com';
const LOJA = 'https://nauj-doceria.vercel.app/';
const CAMPOS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

// Espera pouco de proposito. Se o banco demorar, quem paga a espera e a pessoa
// olhando uma tela branca -- e ela veio comprar, nao ser medida.
const TETO_DE_ESPERA = 900;

function limpo(t, tamanho) {
  return String(t || '').slice(0, tamanho);
}

module.exports = async (req, res) => {
  const q = req.query || {};

  const origem = limpo(q.utm_source || 'direto', 60);
  const meio = limpo(q.utm_medium || 'link', 60);
  const campanha = limpo(q.utm_campaign || '', 80);

  // O destino e sempre a propria loja. Aceitar um endereco vindo da URL
  // transformaria este endpoint em redirecionador aberto -- alguem mandaria
  // um link com a cara da Nauj que leva para qualquer lugar.
  const destino = new URL(LOJA);
  CAMPOS.forEach(c => { if (q[c]) destino.searchParams.set(c, limpo(q[c], 200)); });
  if (!q.utm_source) destino.searchParams.set('utm_source', origem);
  if (!q.utm_medium) destino.searchParams.set('utm_medium', meio);

  const dia = new Date().toISOString().slice(0, 10);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  try {
    const registro = fetch(BANCO + '/visitas/' + dia + '/' + id + '.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // tipo separa clique de visita. Sem ele, o mesmo caminho contaria duas
        // vezes -- uma aqui e outra quando a loja abrir -- e a taxa de
        // conversao cairia pela metade sem motivo.
        tipo: 'clique',
        origem, meio, campanha,
        quando: new Date().toISOString()
      })
    });
    await Promise.race([
      registro.catch(() => {}),
      new Promise(pronto => setTimeout(pronto, TETO_DE_ESPERA))
    ]);
  } catch (e) { /* medir nunca pode atrasar a compra */ }

  // 302 e nao 301: navegador guarda 301 para sempre, e a partir daí ele pularia
  // este endpoint direto para a loja -- os cliques seguintes nunca seriam
  // contados, e o numero simplesmente pararia de crescer sem explicacao.
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, destino.toString());
};
