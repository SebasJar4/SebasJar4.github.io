import { Modal } from "./modal.js"; 

function pantalla_completa() {
    let elem = document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari y Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }
}
function añadir_modal () {
    const modal = new Modal("PantallaCompleta", Modal.MODES.PERPETUO );
    modal.open();
    modal.modalContent.innerHTML += `<p>El juego necesita estar en pantalla completa para mejor expriencia :D</p>`;
    const button_pantalla_completa = document.createElement("input");
    button_pantalla_completa.type = "button";
    button_pantalla_completa.value = "poner en pantalla completa";
    button_pantalla_completa.style.justifySelf = "center";

    button_pantalla_completa.addEventListener("click", () => {
        console.log("oprimido")
        pantalla_completa();
        modal.mode = Modal.MODES.INTERACTIVE;
        modal.close();
    } );
    modal.modalContent.appendChild(button_pantalla_completa);
    modal.añadir();
}



document.addEventListener("DOMContentLoaded", () => {
    agregar_css_style();
    añadir_modal();
});

// Detectar cuando el estado de pantalla completa cambia
document.addEventListener("fullscreenchange", ( e ) => {
    if (!document.fullscreenElement) añadir_modal();
});

