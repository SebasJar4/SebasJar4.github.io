import { WebGLRenderer } from "three";

var renderer;
export function createRendererGl() {
    renderer = new WebGLRenderer();   // Creación del renderizador html
    renderer.setSize( // Tamaño del rederizador
          window.innerWidth   // Width  (int)
        , window.innerHeight  // Height (int)
    );
    
    // Ajustar tamaño del juego al cambiar la pantalla
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight); // Ajustar tamaño del renderer
    });

    return renderer;
}

export function add_rendererGl_to_body() {
  document.body.appendChild(renderer.domElement); // Agregamos el canvas del renderer al body
}