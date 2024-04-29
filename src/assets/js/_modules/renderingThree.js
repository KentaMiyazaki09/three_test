import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Scene
const Scene = new THREE.Scene()
// 背景色
Scene.background = new THREE.Color(0xffffff)

// Renderer
const Renderer = new THREE.WebGLRenderer()

// Mesh
// const geometry = new THREE.BoxGeometry(1, 3, 2)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const Cube = new THREE.Mesh(geometry, material)
// Cube.position.set(0, 0, 1)
// Scene.add(Cube)

// Camera
const Camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
Camera.position.set(198, 9, -150)

const Controls = new OrbitControls(Camera, Renderer.domElement)
Controls.enableDamping = true
Controls.dampingFactor = 0.2

// scene loaded
const Loader = new GLTFLoader()
Loader.load('./assets/images/giant_isopod/scene.gltf', (gltf) => Scene.add(gltf.scene))

const loader = document.querySelector('.loading')
THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  const ratio = itemsLoaded / itemsTotal * 100
  const loadingText = `Loading ${ratio} %`
  loader.textContent = loadingText

  if (ratio === 100) {
    setTimeout(() => {
      document.querySelector('.loading').classList.add('is-hide')
    }, 3000)
  }
}


// loader
const manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
  console.log(loaded)
  // progressBar.style.width = (loaded / total * 100) + '%'
}

// light
const Light = new THREE.AmbientLight(0xefefef, 7)
Scene.add(Light)
// const Light02 = new THREE.DirectionalLight(0xefefef, 5)
// Light.position.set(0, 1, 0).normalize()

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

  // document.querySelector('.button-get-fov').addEventListener('click', e => {
  //   e.preventDefault()
  //   console.log(Light)
  // })
}
