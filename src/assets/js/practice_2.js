import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/Addons.js'
// import GUI from 'lil-gui'

/**
 * UIデバッグ
 */
// const gui = new GUI()
// デバッグ
//　フォルダー
// const positionFolder = gui.addFolder('position')
// const visibleFloder = gui.addFolder('visible')
// positionFolder.add(box.position, 'x').min(-3).max(3).step(0.05).name('transformX')
// positionFolder.add(box.position, 'y').min(-3).max(3).step(0.05).name('transformY')
// positionFolder.add(box.position, 'z').min(-3).max(3).step(0.05).name('transformZ')

// positionFolder.add(box.rotation, 'x').min(-3).max(3).step(0.05).name('rotationX')

// visibleFloder.add(box, 'visible')
// visibleFloder.add(material, 'wireframe')

// gui.addColor(material, 'color')


//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//ジオメトリを作ってみよう。
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

//マテリアル
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

//メッシュ化
const box = new THREE.Mesh(boxGeometry, material);
scene.add(box);

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
