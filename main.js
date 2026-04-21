const displayTimer = document.getElementById('displayTimer');
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

    if(!tempoAdicionado){
        erros.textContent = "Valor do tempo de foco inválido!"
    } else if(!tempoPausa){
        erros.textContent = "Valor do tempo de pausa inválido!"
    } else if(!qtdPausa){
        erros.textContent = "Valor da quantidade de pausas inválido!"
    } else {
        verificador = true;
    }
}

function calcularTempo(){
    const tempoAdicionado = Number(inputFoco.value);
    const tempoPausa = Number(inputPausa.value);
    const qtdPausa = Number(inputQtdPausa.value);

    let minutos = tempoAdicionado;
    let segundos = 0;

    atualizarDisplay(minutos,segundos);
    
        const timer = setInterval(() => {
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

play.addEventListener('click', function(){
        verificarErros();
    if(verificador === true){
        calcularTempo();
    }
});
