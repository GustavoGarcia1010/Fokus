const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const tempoNaTela = document.querySelector("#timer");

// Novas referências para o botão de iniciar/pausar
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iconeInicarOuPausar = document.querySelector(
  ".app__card-primary-butto-icon",
);

// Áudios
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/sons/play.wav");
const musicaPause = new Audio("/sons/pause.mp3");
const musicaBeep = new Audio("/sons/beep.mp3"); // Áudio para o final
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

startPauseBt.addEventListener("click", iniciarOuPausar);

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (elemento) {
    elemento.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade <br><strong class="app__title-strong">Mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa Curta! </strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície <br><strong class="app__title-strong">Faça uma pausa Longa</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaBeep.play(); // Som de alerta ao finalizar
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

function iniciarOuPausar() {
  if (intervaloId) {
    musicaPause.play();
    zerar();
    return;
  }
  musicaPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  // Troca para o texto e ícone de PAUSA ao iniciar
  iniciarOuPausarBt.textContent = "Pausar";
  iconeInicarOuPausar.setAttribute("src", `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  // Volta para o texto e ícone de COMEÇAR ao pausar ou zerar
  iniciarOuPausarBt.textContent = "Começar";
  iconeInicarOuPausar.setAttribute("src", `/imagens/play_arrow.png`);
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// Inicializa a tela com o tempo correto
mostrarTempo();