import { init_screen, getSelectedOption , showModal } from "./main/main.js";


async function waitForSelection() {
    return new Promise((resolve) => {
        const keyListener = (e) => {
            if (e.key === "Enter") {
                const selected = getSelectedOption();
                if (selected !== null) {
                    window.removeEventListener("keydown", keyListener); // 🔴 Evitar múltiples eventos
                    resolve(selected);
                }
            }
        };

        window.addEventListener("keydown", keyListener);
    });
}

async function mainController() {
    await showModal(); // Mostrar modal antes de la selección
    init_screen();

    const selectedOption = await waitForSelection(); // Esperar selección del usuario
    
    if (selectedOption === 0) {
        console.log("Iniciando juego...");
        // Aquí podrías cargar la escena del juego
    } else if (selectedOption === 1) {
        console.log("Abriendo opciones...");
        // Cargar menú de opciones
    } else if (selectedOption === 2) {
        console.log("Mostrando controles...");
        // Mostrar información de controles
    }
}




mainController();