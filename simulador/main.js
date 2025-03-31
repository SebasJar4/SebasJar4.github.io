// Agregamos la libreria three js 
import * as THREE from "three";

var   scene     // Espacio donde van a estar todos los obj 
    , camera    // Camará que "enfocará" y mostrara los obj (esta no renderiza en la app)
    , renderer  // Obj que renderizara el escenario y la camara en la app (canvas tecnicamente) html
    , geometry  // Obj que almacena los vertices
    , material  // Obj que almacena el marerial del obj 
    , cube      // Obj que utiliza la geometry y el material obj para su creacion (los une)
    ; 

scene = new THREE.Scene();              // Creación del obj
camera = new THREE.PerspectiveCamera(   // Creación de la camara
      75    // Ángulo de visión (en grados)
    , window.innerWidth / window.innerHeight 
      // Lo que debemos esconder (no se renderiza segun la distancia)
    , 0.1   // Near (valor más cercano), luego de este valor se podrá ver imagen, obj alguno
    , 1000  // Far  (valor más lejano), luego de este valor no se verá nada
);

camera.position.setZ(5); // Posicionamos la cámara más atrás para ver el objeto

renderer = new THREE.WebGLRenderer();   // Creación del renderizador html
renderer.setSize( // Tamaño del rederizador
      window.innerWidth   // Width  (int)
    , window.innerHeight  // Height (int)
);
document.body.appendChild(renderer.domElement); // Agregamos el canvas del renderer al body

geometry    = new THREE.BoxGeometry(1, 1, 1); // Definimos la geometría (cubo)
material    = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Definimos el material (rojo)
cube        = new THREE.Mesh(geometry, material); // Unimos geometría y material en un objeto

scene.add(cube); // añadimos el cubo a la escena


function animate() {
    cube.rotation.x += 0.01; // Rotación en eje X
    cube.rotation.y += 0.01; // Rotación en eje Y
    renderer.render(scene, camera); // Renderizamos la escena
}

renderer.setAnimationLoop(animate); // Iniciamos el bucle de animación

// Cambiar color aleatorio cada 3 segundos
function cambiarColorAleatorio() {
    const colorAleatorio = new THREE.Color(Math.random(), Math.random(), Math.random()); // Generamos un color aleatorio
    cube.material.color.set(colorAleatorio); // Aplicamos el color al cubo
}

setInterval(cambiarColorAleatorio, 3000); // Ejecutamos la función cada 3 segundos

// Ajustar tamaño del juego al cambiar la pantalla
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajustar tamaño del renderer
    camera.aspect = window.innerWidth / window.innerHeight;  // Ajustar la relación de aspecto de la cámara
    camera.updateProjectionMatrix(); // Actualizar la matriz de proyección de la cámara
});
