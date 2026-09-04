// Diz em quantas vezes da para pagar e quanto fica cada parcela.
//
// Quem calcula o juro e o PagBank, no endereco /charges/fees/calculate. Nao
// inventamos taxa: a conta que aparece para o cliente e exatamente a que
// sera cobrada, com o juro que o PagBank cobra da loja repassado a ele.

const { pagbank, liberarOrigem, ambiente } = require('./_pagbank.js');

// Regras da loja. Abaixo do minimo so a vista; acima, ate o limite.
const MINIMO_PARA_PARCELAR = 50.00;
const MAXIMO_DE_PARCELAS = 4;
// Zero significa "nenhuma parcela sem juros", ou seja: so a vista nao tem
// juro. O PagBank recusa o valor 1 -- ele aceita 0 ou algo maior que 1.
const PARCELAS_SEM_JUROS = 0;

// Junta os planos de todas as bandeiras que o PagBank devolver. Sem o BIN do
// cartao ele responde por bandeira, e o valor da parcela e o mesmo entre
// elas; ficamos com o primeiro que vier, por numero de parcelas.
function planosDaResposta(corpo) {
  const porParcela = {};
  const metodos = (corpo && corpo.payment_methods && corpo.payment_methods.credit_card) || {};
  Object.values(metodos).forEach(bandeira => {
    (bandeira && bandeira.installment_plans || []).forEach(p => {
      const n = p.installments;
      if (!n || porParcela[n]) return;
      porParcela[n] = {
        parcelas: n,
        valorDaParcela: (p.installment_value || 0) / 100,
        total: ((p.amount && p.amount.value) || 0) / 100,
        semJuros: p.interest_free === true,
        jurosEmCentavos: (p.amount && p.amount.fees && p.amount.fees.buyer &&
          p.amount.fees.buyer.interest && p.amount.fees.buyer.interest.total) || 0
      };
    });
  });
  return Object.values(porParcela).sort((a, b) => a.parcelas - b.parcelas);
}

// Usada tambem na hora de cobrar, para o servidor mandar ao PagBank o mesmo
// plano que o cliente viu na tela.
async function calcularPlanos(totalEmCentavos) {
  const busca = new URLSearchParams({
    payment_methods: 'CREDIT_CARD',
    value: String(totalEmCentavos),
    max_installments: String(MAXIMO_DE_PARCELAS),
    max_installments_no_interest: String(PARCELAS_SEM_JUROS)
  });
  const r = await pagbank('/charges/fees/calculate?' + busca.toString());
  if (!r.ok) return { erro: 'O PagBank nao respondeu a simulacao.', status: r.status, detalhe: r.corpo };
  return { planos: planosDaResposta(r.corpo) };
}

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;

  const total = Number((req.query && req.query.total) || 0);
  if (!(total > 0)) return res.status(400).json({ erro: 'Informe o total em reais em ?total=' });

  const centavos = Math.round(total * 100);

  // Pedido pequeno nao parcela. A regra e da loja, entao vale antes de
  // qualquer conversa com o PagBank.
  if (total < MINIMO_PARA_PARCELAR) {
    return res.status(200).json({
      minimoParaParcelar: MINIMO_PARA_PARCELAR,
      planos: [{ parcelas: 1, valorDaParcela: total, total: total, semJuros: true, jurosEmCentavos: 0 }],
      motivo: 'Parcelamento a partir de R$ ' + MINIMO_PARA_PARCELAR.toFixed(2).replace('.', ',') + '.'
    });
  }

  try {
    const r = await calcularPlanos(centavos);
    if (r.erro) return res.status(502).json(r);
    // Rede de seguranca: se a simulacao vier vazia, o cliente ainda consegue
    // pagar a vista em vez de ficar sem opcao nenhuma.
    const planos = r.planos.length ? r.planos
      : [{ parcelas: 1, valorDaParcela: total, total: total, semJuros: true, jurosEmCentavos: 0 }];
    res.status(200).json({
      minimoParaParcelar: MINIMO_PARA_PARCELAR,
      maximoDeParcelas: MAXIMO_DE_PARCELAS,
      parcelasSemJuros: PARCELAS_SEM_JUROS,
      ambiente: ambiente().producao ? 'producao' : 'sandbox',
      planos
    });
  } catch (e) {
    if (e.semToken) return res.status(500).json({ erro: e.message, faltaConfigurar: true });
    res.status(500).json({ erro: 'Nao consegui simular o parcelamento.', detalhe: String(e.message || e) });
  }
};

module.exports.calcularPlanos = calcularPlanos;
module.exports.MINIMO_PARA_PARCELAR = MINIMO_PARA_PARCELAR;
module.exports.MAXIMO_DE_PARCELAS = MAXIMO_DE_PARCELAS;
