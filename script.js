const piedra = document.getElementById('piedra');
const papel = document.getElementById('papel');
const tijera = document.getElementById('tijera');
const mensaje = document.getElementById('resultado');
const emojiJugador = document.getElementById('eleccion-jugador')
const emojiPc = document.getElementById('eleccion-pc')
const contenedorVidasPc = document.getElementById('vidas-pc')
const contenedorVidasJugador = document.getElementById('vidas-jugador')
const mensajeFinal = document.getElementById('mensaje-final')
const botonReiniciar = document.getElementById('reiniciar')

let eleccionJugador;
let eleccionMaquina;
let resultado;

let derrotasPc = 0;
let derrotasJugador = 0;

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
        resultado = '¡HA SIDO UN EMPATE!';
        imprimirMensaje();
    } else if (eleccionJugador == 'piedra' && eleccionMaquina == 'tijera') {
        resultado = '¡HAS GANADO!';
        restarVidasPc();
    } else if (eleccionJugador == 'papel' && eleccionMaquina == 'piedra') {
        resultado = '¡HAS GANADO!';
        restarVidasPc();
    } else if (eleccionJugador == 'tijera' && eleccionMaquina == 'papel') {
        resultado = '¡HAS GANADO!';
        restarVidasPc();
    } else {
        resultado = '¡HAS PERDIDO!';
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
    var restarVidaPc = document.createElement('p')
    restarVidaPc.innerHTML = '❌';

    contenedorVidasPc.appendChild(restarVidaPc);
    derrotasPc++;
    
    imprimirMensaje();
}

function restarVidasJugador() {
    var restarVidaJugador = document.createElement('p')
    restarVidaJugador.innerHTML = '❌';

    contenedorVidasJugador.appendChild(restarVidaJugador);
    derrotasJugador++;
    
    imprimirMensaje();
}

function imprimirMensaje() {
    mensaje.innerHTML = resultado;

    validarDerrotas();
}

function validarDerrotas() {
    if (derrotasPc == 3) {
        mostrarMensajeFinal('¡BIEN HECHO HAS GANADO!');
    } else if (derrotasJugador == 3) {
        mostrarMensajeFinal('EL PC TE HA GANADO');
    }
}

function mostrarMensajeFinal(ganador) {
    piedra.disabled = true;
    papel.disabled = true;
    tijera.disabled = true;

    mensaje.innerHTML = ganador;
    mensajeFinal.style.display = 'block';

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego() {
    derrotasJugador = 0;
    derrotasPc = 0;

    contenedorVidasJugador.innerHTML = '';
    contenedorVidasPc.innerHTML = '';

    emojiJugador.innerHTML = '';
    emojiPc.innerHTML = '';
    mensaje.innerHTML = '¡ELIGE TU JUGADA!';

    iniciarJuego()
}

window.addEventListener('load', iniciarJuego());