import * as THREE from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("scroll3D");
const width = container.clientWidth;
const height = container.clientHeight;


// 3D space
const scene = new THREE.Scene(); 
// camera with positions and angles POV
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 1; //set how far cam from the obj

// a new renderer and set its size
const renderer = new THREE.WebGLRenderer({alpha: true}); // alpha: true for transparent bg
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let obj;
let objToRender = "scroll";
const loader = new GLTFLoader();
// Load the file
loader.load(
    `static/model/${objToRender}/scene.gltf`,
    function (gltf) {
        obj = gltf.scene; // if obj is loaded, then add to the scene
        scene.add(obj);
    },
    function (xhr) { // log progress while loading
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error); // log error if any
    }
);



// add lightings
const topLight = new THREE.DirectionalLight(0xffffff, 1); // color, intensity
topLight.position.set(500, 500, 500); // top-left ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// render the scene
function animate() {
    requestAnimationFrame(animate);
    // code to update the scene
    if (obj) obj.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.addEventListener("resize", function() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});


// start 3d rendering
animate();



