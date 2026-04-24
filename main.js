const displayTimer = document.getElementById('displayTimer');
const titleTempo = document.querySelector('label[for="displayTimer"]');
const inputFoco = document.getElementById('adicionarTempo');
const inputPausa = document.getElementById('adicionarPausa');
const inputQtdPausa = document.getElementById('quantidadePausa');
const range = document.getElementById('mudar_velocidade');
const valor_range = document.getElementById('valor_range')
const config = document.getElementById('config');
const aba_config = document.querySelector('.aba_config');
const btn_cor = document.getElementById('cor');

const play = document.getElementById('play');

const erros = document.getElementById('erros');

const temas = {
    0: {
        '--background': '#F85A3E',
        '--background-elements': '#E15634',
        '--card': '#E63B2E',
        '--border': '#e13434',
        '--input': '#E1E6E1',
        '--principal-text': '#E1E6E1',
        '--text': '#1A1A1A'
    },

    1: {
        '--background': '#3EF87A',
        '--background-elements': '#34E16F',
        '--card': '#2ED65F',
        '--border': '#28C255',
        '--input': '#E1E6E1',
        '--principal-text': '#E1E6E1',
        '--text': '#1A1A1A'
    },

    2: {
        '--background': '#7A3EF8',
        '--background-elements': '#6F34E1',
        '--card': '#5F2ED6',
        '--border': '#5528C2',
        '--input': '#E1E6E1',
        '--principal-text': '#E1E6E1',
        '--text': '#1A1A1A'
    }
};

window.onload = function(){
    displayTimer.value = "00:00";
    range.value = 1000;
}

let indice = 0;

function mudarCor(){
    const root = document.documentElement;

    if(indice >= 2){
        indice = 0;
    } else {
        indice++;
    }

    const tema = temas[indice];

    for (let propriedade in tema) {
        root.style.setProperty(propriedade, tema[propriedade]);
    }
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
let modo = "foco";
let ciclosRestantes;
let velocidade = 1000;

function calcularTempo(){

    if(!tempoInicializado){
        if(modo === "foco"){
            minutos = Number(inputFoco.value);
            titleTempo.textContent = "Tempo de foco";
        } else {
            minutos = Number(inputPausa.value);
            titleTempo.textContent = "Tempo de pausa";
        }
        segundos = 0;
        tempoInicializado = true;
    }

    atualizarDisplay(minutos,segundos);
    
        timer = setInterval(() => {
            if(segundos === 0){
                if(minutos === 0){
                    clearInterval(timer);
            
                    if(modo === "foco"){
                        modo = "pausa";
                    } else {
                        modo = "foco";
                        ciclosRestantes --;
                    }

                    if(ciclosRestantes <= 0){
                        resetarTimer();
                        titleTempo.textContent = "Tempo finalizado"
                        return;
                    }

                    tempoInicializado = false;
                    calcularTempo();
                    return;
                }
                segundos = 59;
                minutos --;
            } else{
                segundos--;
            }

            atualizarDisplay(minutos, segundos);
        }, velocidade);
}

let interacao = true;

function iniciarTimer(){
    if(interacao === true){
        calcularTempo();
        interacao = false;
        ciclosRestantes = Number(inputQtdPausa.value);
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
    interacao = true;
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

range.addEventListener('input', function() {
    valor_range.textContent = `${range.value/1000}s`;
    velocidade = range.value;
});

config.addEventListener('click', function() {
    if(aba_config.style.display === 'none'){
        aba_config.style.display = 'flex';
    } else {
        aba_config.style.display = 'none'; 
    }
});