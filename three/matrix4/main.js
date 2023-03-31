import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const container = document.querySelector('#container');
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector('#container').appendChild( renderer.domElement );

const controls = new OrbitControls( camera, container );

const geometry = new THREE.BoxGeometry( 1, 2, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const loader = new THREE.TextureLoader();
const materials = [
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-1.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-2.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-3.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-4.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-5.jpg')}),
    new THREE.MeshBasicMaterial({map: loader.load('../resources/images/flower-6.jpg')}),
  ];
const cube = new THREE.Mesh( geometry, materials );

const group = new THREE.Group();
group.add( cube );
group.position.set(1, 0, 0)
scene.add( group );

const m = new THREE.Matrix4()
m.makeTranslation(0, 2, 0)
// group.matrixAutoUpdate = false
group.matrix.copy(m)

camera.position.x = -1;
camera.position.y = 1;
camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
    controls.update()
}

animate();