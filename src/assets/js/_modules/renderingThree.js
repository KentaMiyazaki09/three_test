import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Scene
const Scene = new THREE.Scene()

// Renderer
const Renderer = new THREE.WebGLRenderer()

// Mesh
// const geometry = new THREE.BoxGeometry(1, 3, 2)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const Cube = new THREE.Mesh(geometry, material)
// Cube.position.set(0, 0, 1)
// Scene.add(Cube)

// Camera
const Camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
Camera.position.set(3, 1, 1)

const Controls = new OrbitControls(Camera, Renderer.domElement)

// scene loaded
const Loader = new GLTFLoader()
Loader.load(
  '/assets/images/giant_isopod/scene.gltf',
  (gltf) => {
    Scene.add(gltf.scene)
  },
  (xhr) => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`)
  },
  (error) => {
    console.log(error)
  }
)

const light = new THREE.DirectionalLight(0xefefef, 2)
light.position.set(1, 5, 5).normalize()
Scene.add(light)

// Renderer set
Renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector('.stage').appendChild(Renderer.domElement)

//  シーンとカメラを描画
function animate() {
  requestAnimationFrame(animate)

  // Cube.rotation.x += 0.01
  // Cube.rotation.y += 0.01

  Controls.update()
  Renderer.render( Scene, Camera)
}

export default () => {
  animate()
}
