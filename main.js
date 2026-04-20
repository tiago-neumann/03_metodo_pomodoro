const displayTimer = document.getElementById('displayTimer');
let tempoAdicionado = document.getElementById('AdicionarTempo');
let tempoPausa = document.getElementById('adicionarPausa');
let pausas = document.getElementById('quantidadePausa');

const erros = document.getElementById('erros');

window.onload = function(){
    displayTimer.value = "00:00";
}

function verificarErros(){
    if(tempoAdicionado > 60 || tempoAdicionado < 0){
        erros.textContent = "Valor do tempo de foco inválido!"
        tempoAdicionado.value = 0;
    }

    if(tempoPausa > 60 || tempoPausa < 1){
        erros.textContent = "Valor do tempo de pausa inválido!"
        Number(tempoPausa.value) = 0;
    }

    if(pausas > 30 || pausar < 1){
        erros.textContent = "Valor do número de pausas inválido!"
        pausas.value = 5;
    }

    erros.textContent = "";
}
