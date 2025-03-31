// Agregamos la libreria three js 
import { Scene , PerspectiveCamera , WebGLRenderer }  from "three";



var   scene
    , camera
    , renderer;

scene = new Scene();
camera = PerspectiveCamera( 
      75    // perspectiva (que tan alejado)
    , window.innerWidth / window.innerHeight 
    , 0.1   // Lo que debemos esconder segun la distancia
    , 1000  
);

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );