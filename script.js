// variables de jugadas
const piedra = document.getElementById('piedra');
const papel = document.getElementById('papel');
const tijera = document.getElementById('tijera');

const mensaje = document.getElementById('resultado');
const emojiJugador = document.getElementById('eleccion-jugador');
const emojiPc = document.getElementById('eleccion-pc');
const contenedorVidasPc = document.getElementById('vidas-pc');
const contenedorVidasJugador = document.getElementById('vidas-jugador');
const mensajeFinal = document.getElementById('mensaje-final');
const botonReiniciar = document.getElementById('reiniciar');

// array vidas jugador
let vidasJugador = [
    vidaJ1 = document.getElementById('vida-j1'),
    vidaJ2 = document.getElementById('vida-j2'),
    vidaJ3 = document.getElementById('vida-j3')
]

//array vidas pc
let vidasPc = [
    vidaP1 = document.getElementById('vida-p1'),
    vidaP2 = document.getElementById('vida-p2'),
    vidaP3 = document.getElementById('vida-p3')
]

let eleccionJugador;
let eleccionMaquina;
let resultado;

var elegirPiedra = function() {
    eleccionJugador = 'piedra';
    console.log(eleccionJugador);
    emojiJugador.innerHTML = '🪨';

    aleatorio(1, 3);
}

var elegirPapel = function() {
    eleccionJugador = 'papel';
    console.log(eleccionJugador);
    emojiJugador.innerHTML = '📃';

    aleatorio(1, 3);
}

var elegirTijera = function() {
    eleccionJugador = 'tijera';
    console.log(eleccionJugador);
    emojiJugador.innerHTML = '✂️';

    aleatorio(1, 3);
}

function iniciarJuego() {
    piedra.disabled = false;
    papel.disabled = false;
    tijera.disabled = false;

    piedra.addEventListener('click', elegirPiedra);
    papel.addEventListener('click', elegirPapel);
    tijera.addEventListener('click', elegirTijera);

    mensajeFinal.style.display = 'none';
}

function aleatorio(min, max) {
    let eleccion = Math.floor(Math.random() * (max - min + 1) + min)

    validar(eleccion);
}

function validar(eleccion) {
    if (eleccion == 1) {
        eleccionMaquina = 'piedra';
        emojiPc.innerHTML = '🪨';
    } else if (eleccion == 2) {
        eleccionMaquina = 'papel';
        emojiPc.innerHTML = '📃';
    } else {
        eleccionMaquina = 'tijera'
        emojiPc.innerHTML = '✂️';
    }

    console.log(eleccionMaquina);
    combate();
}

function combate() {
    if(eleccionJugador == eleccionMaquina) {
        imprimirMensaje('¡HA SIDO UN EMPATE!');
    } else if (eleccionJugador == 'piedra' && eleccionMaquina == 'tijera') {
        restarVidasPc();
    } else if (eleccionJugador == 'papel' && eleccionMaquina == 'piedra') {
        restarVidasPc();
    } else if (eleccionJugador == 'tijera' && eleccionMaquina == 'papel') {
        restarVidasPc();
    } else {
        restarVidasJugador();
    }
}

// function combate() {
//     switch (eleccionJugador + eleccionMaquina) {
//         case 'piedratijera':
//         case 'papelpiedra':
//         case 'tijerapapel':
//             resultado = '¡HAS GANADO!';
//             restarVidasPc();
//             break;
//         case 'tijerapiedra':
//         case 'piedrapapel':
//         case 'papeltijera':
//             resultado = '¡HAS PERDIDO!';
//             restarVidasJugador();
//             break;
//         default:
//             resultado = '¡HA SIDO UN EMPATE!';
//             imprimirMensaje();
//             break;
//     }
// }

function restarVidasPc() {
    for(let i = 0; i < vidasPc.length; i++) {
        if(vidasPc[i].innerText == '') {
            vidasPc[i].innerHTML = '❌';
            imprimirMensaje('¡HAS GANADO!');
            return;
        }
    }
}

function restarVidasJugador() {
    for(let i = 0; i < vidasJugador.length; i++) {
        if(vidasJugador[i].innerText == '') {
            vidasJugador[i].innerHTML = '❌';
            imprimirMensaje('¡HAS PERDIDO!');
            return;
        }
    }
}

function imprimirMensaje(resultado) {
    mensaje.innerHTML = resultado;

    
    if(vidasJugador[2].innerText == '❌') {
        mensajeGanador('EL PC TE HA GANADO');
    } else if(vidasPc[2].innerText == '❌') {
        mensajeGanador('FELICIDADES HAS GANADO');
    }
}

function mensajeGanador(ganador) {
    piedra.disabled = true;
    papel.disabled = true;
    tijera.disabled = true;

    mensaje.innerHTML = ganador;
    mensajeFinal.style.display = 'block';

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego() {
    for(let i = 0; i < 3; i++) {
        vidasJugador[i].innerHTML = '';
        vidasPc[i].innerHTML = '';
    }

    emojiJugador.innerHTML = '';
    emojiPc.innerHTML = '';
    mensaje.innerHTML = '¡ELIGE TU JUGADA!';

    iniciarJuego()
}

window.addEventListener('load', iniciarJuego());