import { add_rendererGl_to_body, game_animate, setInicio } from "./jugar/main.js"; 

// Create a game object to hold the imported functions
const game = {
    add_rendererGl_to_body,
    game_animate,
    setInicio
};

import { init_screen, getSelectedOption, showModal, close_first_scene } from "./main/main.js";

// Create an object to hold the imported functions
const main = {
    init_screen,
    getSelectedOption,
    showModal,
    close_first_scene
};


// Agregar la función para ocultar el canvas de la pantalla de selección
function hideSelectionCanvas() {
    const selectionCanvas = document.querySelector("canvas");
    if (selectionCanvas) {
        selectionCanvas.style.display = "none";  // Oculta el canvas
    }
}

// Mostrar el modal y esperar la selección
async function waitForSelection() {
    return new Promise((resolve) => {
        const keyListener = (e) => {
            if (e.key === "Enter") {
                const selected = main.getSelectedOption();
                if (selected !== null) {
                    window.removeEventListener("keydown", keyListener); // Evitar múltiples eventos
                    resolve(selected);
                    
                }
            }
        };

        window.addEventListener("keydown", keyListener);
    });
}

async function mainController() {
    await showModal();  // Mostrar modal antes de la selección
    init_screen();  // Inicializar la pantalla de selección

    const selectedOption = await waitForSelection(); // Esperar selección del usuario
    
    main.close_first_scene();  // Cierra la escena/modal
    hideSelectionCanvas(); // Ocultar el canvas de la pantalla de selección

    if (selectedOption === 0) {
        console.log("Iniciando juego...");
        // game.add_rendererGl_to_body();
        setInicio();
        game.game_animate();  // Llama a la función que inicia la animación del juego
        // Aquí podrías cargar la escena del juego si es necesario
    } else if (selectedOption === 1) {
        console.log("Abriendo opciones...");
        // Lógica para abrir el menú de opciones
    } else if (selectedOption === 2) {
        console.log("Mostrando controles...");
        // Lógica para mostrar la información de controles
    }
}

// Ejecutar el controlador principal
mainController();
