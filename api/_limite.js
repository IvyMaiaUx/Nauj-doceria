// Contagem de tentativas por endereco de internet.
//
// Uma funcao da Vercel nao guarda memoria entre chamadas *garantidamente*,
// mas a maquina fica quente por alguns minutos e atende varias chamadas
// seguidas. E exatamente esse o formato de um ataque de teste de cartao:
// centenas de tentativas em poucos minutos, quase sempre caindo na mesma
// maquina. Entao a contagem em memoria pega o caso real, de graca e sem
// depender de nenhum servico novo.
//
// O que ela NAO faz, e vale estar escrito: nao sobrevive a maquina esfriar,
// e nao e compartilhada entre duas maquinas atendendo ao mesmo tempo. Um
// atacante paciente, espacando as tentativas, escapa. Para fechar isso de
// vez o contador precisaria viver no Firebase, e para escrever la a funcao
// precisaria de uma credencial que hoje ela nao tem.

const JANELA = 10 * 60 * 1000;      // dez minutos
const RECUSAS_ATE_BLOQUEAR = 3;     // tres cartoes recusados seguidos
const TETO_DE_TENTATIVAS = 10;      // teto por janela, mesmo dando certo

// Bloqueio que cresce a cada reincidencia, em minutos.
const ESCADA = [1, 5, 30, 120];

const porIp = new Map();

function agora() { return Date.now(); }

function limpar() {
  const t = agora();
  for (const [ip, r] of porIp) {
    if (t - r.visto > JANELA * 6) porIp.delete(ip);
  }
}

function registro(ip) {
  let r = porIp.get(ip);
  if (!r || (agora() - r.inicio) > JANELA) {
    r = { inicio: agora(), visto: agora(), tentativas: 0, recusas: 0, castigos: r ? r.castigos : 0, ateQuando: r ? r.ateQuando : 0 };
    porIp.set(ip, r);
  }
  r.visto = agora();
  return r;
}

// Endereco de quem chamou. Atras da Vercel o endereco real vem no cabecalho;
// o primeiro da lista e o do cliente.
function enderecoDe(req) {
  const encaminhado = req.headers['x-forwarded-for'];
  if (encaminhado) return String(encaminhado).split(',')[0].trim();
  return req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || 'desconhecido';
}

// Chamada antes de tentar cobrar. Devolve null quando pode seguir.
function conferirLimite(req) {
  if (porIp.size > 500) limpar();
  const ip = enderecoDe(req);
  const r = registro(ip);

  if (r.ateQuando && agora() < r.ateQuando) {
    return {
      bloqueado: true,
      segundos: Math.ceil((r.ateQuando - agora()) / 1000),
      motivo: 'muitas tentativas'
    };
  }

  if (r.tentativas >= TETO_DE_TENTATIVAS) {
    castigar(r);
    return { bloqueado: true, segundos: Math.ceil((r.ateQuando - agora()) / 1000), motivo: 'teto da janela' };
  }

  r.tentativas++;
  return null;
}

function castigar(r) {
  const minutos = ESCADA[Math.min(r.castigos, ESCADA.length - 1)];
  r.castigos++;
  r.ateQuando = agora() + minutos * 60 * 1000;
  r.recusas = 0;
  r.tentativas = 0;
  r.inicio = agora();
}

// Chamada depois da resposta do PagBank. Cartao recusado conta; aprovado
// zera, porque quem paga de verdade nao e quem esta varrendo cartao.
function registrarResultado(req, aprovado) {
  const r = registro(enderecoDe(req));
  if (aprovado) {
    r.recusas = 0;
    r.castigos = 0;
    return;
  }
  r.recusas++;
  if (r.recusas >= RECUSAS_ATE_BLOQUEAR) castigar(r);
}

module.exports = { conferirLimite, registrarResultado, enderecoDe, RECUSAS_ATE_BLOQUEAR, TETO_DE_TENTATIVAS };
