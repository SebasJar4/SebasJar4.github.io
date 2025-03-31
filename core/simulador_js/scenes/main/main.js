import { Scene, Mesh, MeshStandardMaterial, PerspectiveCamera, AmbientLight, DirectionalLight } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { createRendererGl, add_rendererGl_to_body } from "../modules/Renderer.js";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 20);  // Ajustamos la posición de la cámara más cerca

const renderer = createRendererGl();
add_rendererGl_to_body();

// Añadimos luces a la escena
const light = new AmbientLight(0x404040); // Luz ambiental
scene.add(light);

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Cargamos la fuente y creamos el texto
const loader = new FontLoader();
loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
    const text_options = {
        font: font,
        size: 1,         // Incrementamos el tamaño
        height: 0.1,
        curveSegments: 20,  // Aumentamos la resolución
        bevelEnabled: true,
        bevelThickness: 0.005,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    };

    const text = {
        title: new TextGeometry("Simulador de Conducción ;D", text_options),
        options: [
            new TextGeometry("Jugar", text_options),
            new TextGeometry("Opciones", text_options),
            new TextGeometry("Controles", text_options)
        ]
    };

    const material = new MeshStandardMaterial({ color: 0xff0000 });

    const titleMesh = new Mesh(text.title, material);
    titleMesh.position.set(-1.5, 1.5, -1);
    scene.add(titleMesh);

    text.options.forEach((geometry, index) => {
        const mesh = new Mesh(geometry, material);
        mesh.position.set(-1, 0.5 - index * 0.7, -1);
        scene.add(mesh);
    });

    renderer.setAnimationLoop(init_screen);
});

function init_screen() {
    renderer.render(scene, camera);
}

export { init_screen };
