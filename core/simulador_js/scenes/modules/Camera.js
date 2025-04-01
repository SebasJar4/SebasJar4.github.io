import { PerspectiveCamera } from "three";

const configuracion_de_camara = {
     Angulo_de_Vision: 100
    ,Relacion_de_pantalla: window.innerWidth / window.innerHeight // Relación de aspecto
    ,near: 0.1 // (distancia mínima visible)
    ,far: 1000 // (distancia máxima visible)
}

const posicion_inicial = {
     x: 0
    ,y: 0
    ,z: 60
};

// Función para crear y configurar la cámara
export function createCamera() {
    const camera = new PerspectiveCamera(
          configuracion_de_camara.Angulo_de_Vision
        , configuracion_de_camara.Relacion_de_pantalla
        , configuracion_de_camara.near
        , configuracion_de_camara.far
    );

    // Posicionar la cámara
    camera.position.set(
         posicion_inicial.x
        ,posicion_inicial.y
        ,posicion_inicial.z
    );

    // Ajustar el tamaño de la cámara si la ventana cambia
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    return camera;
}
