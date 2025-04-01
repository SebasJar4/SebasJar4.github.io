import { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, PlaneGeometry, Mesh, MeshBasicMaterial, DirectionalLight, AmbientLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCamera } from "../modules/Camera";
import { add_rendererGl_to_body, createRendererGl } from "../modules/Renderer";

let inicio = false;

function setInicio() {
    if ( inicio ) inicio = false;
    else inicio = true;
}

const scene = new Scene();
const camera = createCamera();
camera.position.z = 3;
let renderer = createRendererGl();

// Añadir luz ambiental
const ambientLight = new AmbientLight(0x404040, 1);  // luz suave
scene.add(ambientLight);

// Añadir luz direccional
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Crear el plano de suelo
const planeGeometry = new PlaneGeometry(200, 200); // Tamaño del plano
const planeMaterial = new MeshBasicMaterial({ color: 0x999999, side: 2 }); // Material del suelo
const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;  // Rotamos el plano para que esté horizontal
plane.position.y = -1;  // Colocamos el plano un poco debajo del eje Y
scene.add(plane);

// Cargar el modelo del carro (en formato .glb)
const loader = new GLTFLoader();
let car;
loader.load(
    "/core/models_3d/car_color.glb", // Ruta a tu archivo .glb (modelo del carro)
    function (gltf) {
        car = gltf.scene;
        car.scale.set(0.1, 0.1, 0.1);  // Ajusta el tamaño del carro si es necesario
        car.position.set(0, 0, 0);  // Colocamos el carro en el centro
        scene.add(car);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Controles de la cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

let primera_vez = true;

// Animación y renderizado
function game_animate() {
    if ( !inicio ) return;
    if ( primera_vez ) {
        renderer = createRendererGl();
        add_rendererGl_to_body();
        primera_vez = false;
    }    
    // Actualizamos controles
    controls.update();
    
    if (car) {
        // Lógica para mover el carro
        // Por ejemplo, mover el carro en el eje Z con las teclas de flecha
        if (isKeyPressed("ArrowUp")) car.position.z -= 0.08;
        if (isKeyPressed("ArrowDown")) car.position.z += 0.08;
        if (isKeyPressed("ArrowLeft")) car.rotation.y  -= 0.08;
        if (isKeyPressed("ArrowRight")) car.rotation.y += 0.08;
        if (isKeyPressed("  ")) car.position.y += 0.08;
    }
    
    // Renderizamos la escena
    renderer.render(scene, camera);
}

// Detectar si una tecla está presionada
let pressedKeys = {};
window.addEventListener("keydown", (event) => {
    pressedKeys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
    pressedKeys[event.key] = false;
});

function isKeyPressed(key) {
    return pressedKeys[key] === true;
}

// Establecer el bucle de animación
renderer.setAnimationLoop(game_animate);


export { game_animate , add_rendererGl_to_body , setInicio };