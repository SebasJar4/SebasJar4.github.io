import { Scene } from "three";
import { createCamera } from "../modules/Camera";
import { add_rendererGl_to_body, createRendererGl } from "../modules/Renderer";

const scene = Scene();
const camara = createCamera();
const rederizador = createRendererGl();
add_rendererGl_to_body();

scene.background = "0x00ff00";

function game_animate() {
    rederizador.render( scene , camara );
}


renderer.setAnimationLoop(game_animate);
