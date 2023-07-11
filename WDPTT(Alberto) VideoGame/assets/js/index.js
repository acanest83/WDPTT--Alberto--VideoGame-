const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);
const game = new Game(canvasId);

// Definir una variable para controlar el estado del juego
let gamePaused = true;

// Pulsar tecla solo cuando el juego esté en ejecución
window.addEventListener("keydown", (event) => {
    if (!gamePaused) {
        game.onKeyDown(event);
    }
});
window.addEventListener("keyup", (event) => {
    if (!gamePaused) {
        game.onKeyUp(event);
    }
});

// Obtener referencia al botón de inicio
var startButton = document.getElementById("start-button");

// Agregar un controlador de eventos para el clic del botón de inicio
startButton.addEventListener("click", function() {
    if (gamePaused) {
        // Ocultar el contenedor del título y el botón
        var titleContainer = document.getElementById("title-container");
        titleContainer.style.display = "none";

        // Iniciar el juego
        gamePaused = false;
        game.start();
    }
});
