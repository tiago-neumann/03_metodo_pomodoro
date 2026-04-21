const displayTimer = document.getElementById('displayTimer');
const titleTempo = document.querySelector('label[for="displayTimer"]');
const inputFoco = document.getElementById('adicionarTempo');
const inputPausa = document.getElementById('adicionarPausa');
const inputQtdPausa = document.getElementById('quantidadePausa');

const play = document.getElementById('play');

const erros = document.getElementById('erros');

window.onload = function(){
    displayTimer.value = "00:00";
}

function atualizarDisplay(minutos, segundos){

    let segundosCertos = String(segundos).padStart(2, "0");
    let minutosCertos = String(minutos).padStart(2, "0");

    displayTimer.value = `${minutosCertos}:${segundosCertos}`
}

let verificador;

function verificarErros(){
    verificador = false;

    const tempoAdicionado = Number(inputFoco.value);
    const tempoPausa = Number(inputPausa.value);
    const qtdPausa = Number(inputQtdPausa.value);

    if(!tempoAdicionado || tempoAdicionado > 60 || tempoAdicionado < 0){
        erros.textContent = "Valor do tempo de foco inválido!"
    } else if(!tempoPausa || tempoPausa > 60 || tempoPausa < 0){
        erros.textContent = "Valor do tempo de pausa inválido!"
    } else if(!qtdPausa || qtdPausa > 30 || qtdPausa < 0){
        erros.textContent = "Valor da quantidade de pausas inválido!"
    } else {
        verificador = true;
    }
}

let minutos;
let segundos;
let timer = null;
let tempoInicializado = false;

function calcularTempo(){

    if(!tempoInicializado){
        minutos = Number(inputFoco.value);
        segundos = 0;
        tempoInicializado = true;
    }

    atualizarDisplay(minutos,segundos);
    
        timer = setInterval(() => {
            if(segundos === 0){
                if(minutos === 0){
                    clearInterval(timer);
                    return;
                }
                segundos = 59;
                minutos --;
            } else{
                segundos--;
            }

            atualizarDisplay(minutos, segundos);
        }, 1000);
}

let interacao = true;

function iniciarTimer(){
    if(interacao === true){
        calcularTempo();
        interacao = false;
    }
}

function pararTimer(){
    if(interacao === false){
        clearInterval(timer);
        interacao = true;
    } else {
        erros.textContent = "Timer ainda não foi iniciado!"
    }
}

function resetarTimer(){
    minutos = 0;
    segundos = 0;
    tempoInicializado = false; 
    clearInterval(timer);
    atualizarDisplay(minutos, segundos);
    inputFoco.value = "";
    inputPausa.value = "";
    inputQtdPausa.value = "";
}

play.addEventListener('click', function(){
        verificarErros();
    if(verificador === true){
        iniciarTimer();
        erros.innerHTML = "&nbsp";
    }
});

pause.addEventListener('click', pararTimer); 

reset.addEventListener('click', resetarTimer); 