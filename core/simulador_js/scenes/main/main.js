import { Scene, Mesh, MeshStandardMaterial, PerspectiveCamera, AmbientLight, DirectionalLight } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { createRendererGl, add_rendererGl_to_body } from "../modules/Renderer.js";
import { Modal } from "../../../funcionalidades/pantalla_completa/modal.js";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 1);

const renderer = createRendererGl();
add_rendererGl_to_body();

// Luces
const light = new AmbientLight(0x404040);
scene.add(light);

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 10);
scene.add(directionalLight);

// Variables para la selección de opciones
let selectedIndex = 0;
let optionMeshes = [];
let optionSelected = null;  // Esta variable se actualizará al presionar Enter
let materials = {
    normal: new MeshStandardMaterial({ color: 0xff0000 }),
    selected: new MeshStandardMaterial({ color: 0xffff00 }) // Amarillo para la opción seleccionada
};

// Cargar la fuente y crear el texto
const loader = new FontLoader();
loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
    const text_options = {
        font: font,
        size: 0.2,
        height: 0.001,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.005,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    };

    // Crear título
    const titleGeometry = new TextGeometry("Simulador de Conducción ;D", text_options);
    const titleMesh = new Mesh(titleGeometry, materials.normal);
    titleMesh.position.set(-1.5, 1.5, -51);
    scene.add(titleMesh);

    // Opciones del menú
    const optionTexts = ["Jugar", "Opciones", "Controles"];
    optionTexts.forEach((text, index) => {
        const geometry = new TextGeometry(text, text_options);
        const mesh = new Mesh(geometry, index === selectedIndex ? materials.selected : materials.normal);
        mesh.position.set(-1, 0.5 - index * 0.3, -51);
        scene.add(mesh);
        optionMeshes.push(mesh);
    });

    window.addEventListener("keydown", handleKeyPress);

    renderer.setAnimationLoop(init_screen);
});

// Función para manejar la selección
function handleKeyPress(event) {
    if (event.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + optionMeshes.length) % optionMeshes.length;
    } else if (event.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % optionMeshes.length;
    } else if (event.key === "Enter") {
        optionSelected = selectedIndex;  // Guardar la opción seleccionada
    }
    updateSelection();
}

// Función para actualizar la selección visual (opciones)
function updateSelection() {
    optionMeshes.forEach((mesh, index) => {
        mesh.material = index === selectedIndex ? materials.selected : materials.normal;
    });
}

// Renderizar la escena
function init_screen() {
    renderer.render(scene, camera);
}

// Función para obtener la opción seleccionada
function getSelectedOption() {
    return optionSelected;
}

async function showModal() {
    const info_modal = new Modal("info_main_screen", Modal.MODES.INTERACTIVE);
    info_modal.modalContent.innerHTML += `<p>Presione Enter dos veces para entrar :D</p>`;
    info_modal.addButton();
    info_modal.without_blackScreen();
    info_modal.añadir(); // Añadir al documento antes de abrirlo
    info_modal.open();
    
    await info_modal.wait_respose(); // Esperar respuesta
    info_modal.close(); // Cerrar modal antes de continuar
}

function close_first_scene() {
  renderer.clear();
}

export { init_screen, getSelectedOption , showModal , close_first_scene};
