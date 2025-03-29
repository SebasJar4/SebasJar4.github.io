import THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.camera( 75 , window.innerWidth / window.innerHeight , 0.1 , 1000 );
const render = new THREE.WebGLRender();
render.setSize(window.innerWidth , window.innerHeight);

document.querySelector('body').appendChild( render.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.