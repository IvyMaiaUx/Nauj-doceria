// Cobra o cartao. E a unica funcao que fala com o PagBank usando o token.
//
// O navegador manda o cartao ja embaralhado pelo SDK do PagBank. Numero de
// cartao em texto nunca passa por aqui -- se vier, e recusado, porque aceitar
// significaria guardar responsabilidade sobre um dado que nao precisamos ver.

const { pagbank, recalcularPedido, liberarOrigem, ambiente } = require('./_pagbank.js');

function so(digitos) { return String(digitos || '').replace(/\D/g, ''); }

// O CPF do titular e exigido pelo PagBank. Conferir o digito aqui evita uma
// recusa generica do banco e devolve um aviso que a pessoa entende.
function cpfValido(cpf) {
  const d = so(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (const [qtd, pos] of [[9, 10], [10, 11]]) {
    let soma = 0;
    for (let i = 0; i < qtd; i++) soma += parseInt(d[i], 10) * (pos - i);
    let dv = (soma * 10) % 11;
    if (dv === 10) dv = 0;
    if (dv !== parseInt(d[qtd], 10)) return false;
  }
  return true;
}

module.exports = async function (req, res) {
  if (liberarOrigem(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Use POST.' });

  try {
    const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { pedido, cartao } = corpo;

    if (!pedido || !Array.isArray(pedido.items) || !pedido.items.length) {
      return res.status(400).json({ erro: 'Pedido vazio.' });
    }
    if (!cartao || !cartao.embaralhado) {
      return res.status(400).json({ erro: 'O cartao precisa chegar embaralhado pelo SDK do PagBank.' });
    }
    // Rede de seguranca: se algum dia alguem tentar mandar o numero cru, para aqui.
    if (cartao.numero || cartao.number || cartao.cvv || cartao.securityCode) {
      return res.status(400).json({ erro: 'Nao envie dados de cartao em texto para este endereco.' });
    }
    if (!cartao.nome || String(cartao.nome).trim().length < 3) {
      return res.status(400).json({ erro: 'Informe o nome como esta impresso no cartao.' });
    }
    if (!cpfValido(cartao.cpf)) {
      return res.status(400).json({ erro: 'O CPF do titular do cartao parece invalido. Confira os numeros.' });
    }

    // A conta e refeita aqui. O total que o navegador afirma e so conferido,
    // nunca usado para cobrar.
    const conta = await recalcularPedido(pedido);
    if (conta.problemas.length) {
      return res.status(400).json({ erro: 'Nao consegui fechar a conta deste pedido.', problemas: conta.problemas });
    }
    if (conta.totalEmCentavos <= 0) {
      return res.status(400).json({ erro: 'O total do pedido deu zero.' });
    }

    const totalDoNavegador = Math.round((Number(pedido.total) || 0) * 100);
    if (totalDoNavegador !== conta.totalEmCentavos) {
      // Nao e necessariamente ma-fe: pode ser preco que mudou no painel com a
      // sacola ja montada. De qualquer forma nao se cobra sem a pessoa ver.
      return res.status(409).json({
        erro: 'O valor mudou desde que voce montou a sacola.',
        totalCorreto: conta.total,
        totalEnviado: Number(pedido.total) || 0,
        conta
      });
    }

    const parcelas = Math.max(1, Math.min(12, parseInt(cartao.parcelas, 10) || 1));
    const telefone = so(pedido.customerPhone);

    const requisicao = {
      reference_id: String(pedido.id || '').slice(0, 60),
      customer: {
        name: String(pedido.customerName || cartao.nome).slice(0, 60),
        email: pedido.customerEmail || 'cliente@nauj-doceria.com.br',
        tax_id: so(cartao.cpf),
        phones: telefone.length >= 10 ? [{
          country: '55',
          area: telefone.slice(0, 2),
          number: telefone.slice(2),
          type: 'MOBILE'
        }] : undefined
      },
      items: pedido.items.map((i, n) => ({
        reference_id: String(i.id || ('item-' + n)).slice(0, 60),
        name: String(i.name || 'Item').slice(0, 100),
        quantity: Math.max(1, parseInt(i.qty, 10) || 1),
        // O PagBank soma os itens por conta propria e nao aceita divergencia
        // com o total. Como a nossa conta ja considera taxa e desconto, o
        // pedido vai como uma linha unica mais abaixo.
        unit_amount: 0
      })),
      notification_urls: [(process.env.PAGBANK_URL_AVISO || 'https://nauj-doceria.vercel.app/api/pagbank-aviso')],
      charges: [{
        reference_id: String(pedido.id || '').slice(0, 60),
        description: ('Nauj Doceria - pedido ' + (pedido.id || '')).slice(0, 60),
        amount: { value: conta.totalEmCentavos, currency: 'BRL' },
        payment_method: {
          type: 'CREDIT_CARD',
          installments: parcelas,
          capture: true,
          card: { encrypted: cartao.embaralhado, store: false },
          holder: { name: String(cartao.nome).trim().slice(0, 60), tax_id: so(cartao.cpf) }
        }
      }]
    };

    // O PagBank confere a soma dos itens. Uma linha unica com o total ja
    // calculado evita conflito com taxa de entrega e desconto de cupom.
    requisicao.items = [{
      reference_id: String(pedido.id || 'pedido').slice(0, 60),
      name: ('Pedido ' + (pedido.id || '') + ' - Nauj Doceria').slice(0, 100),
      quantity: 1,
      unit_amount: conta.totalEmCentavos
    }];

    const r = await pagbank('/orders', { method: 'POST', body: requisicao });

    const cobranca = r.corpo && Array.isArray(r.corpo.charges) ? r.corpo.charges[0] : null;
    const situacao = cobranca && cobranca.status;

    if (!r.ok) {
      const motivos = (r.corpo && r.corpo.error_messages || []).map(m => m.description || m.code).filter(Boolean);
      return res.status(400).json({
        erro: 'O pagamento nao foi aprovado.',
        motivos: motivos.length ? motivos : undefined,
        situacao: situacao || null,
        detalhe: r.corpo
      });
    }

    const aprovado = situacao === 'PAID' || situacao === 'AUTHORIZED';
    res.status(aprovado ? 200 : 402).json({
      aprovado,
      situacao: situacao || 'DESCONHECIDA',
      idDaCobranca: cobranca ? cobranca.id : null,
      idDoPedidoPagBank: r.corpo ? r.corpo.id : null,
      // O navegador nunca decide o valor: mostra o que o servidor cobrou.
      total: conta.total,
      parcelas,
      ambiente: ambiente().producao ? 'producao' : 'sandbox',
      recusa: aprovado ? undefined : (cobranca && cobranca.payment_response
        ? (cobranca.payment_response.message || cobranca.payment_response.code)
        : undefined)
    });
  } catch (e) {
    if (e.semToken) return res.status(500).json({ erro: e.message, faltaConfigurar: true });
    res.status(500).json({ erro: 'Deu problema ao falar com o PagBank.', detalhe: String(e.message || e) });
  }
};
