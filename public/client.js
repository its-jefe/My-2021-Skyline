import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

THREE.Cache.enabled = true;

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, window.innerWidth)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// this is new 
const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

// load my 3D model
const loader = new THREE.ObjectLoader();

loader.load("./model.json",
	
	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( object ) {
		// Add the loaded object to the scene
		scene.add( object );
    console.log(object)
	},
	
	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	
	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
	);

// this is new
window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

camera.position.z = 80;

function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate();