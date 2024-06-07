import * as THREE from 'three';

const leap = (start, end, mutiplier) => {
  // return (1 - mutiplier) + start + mutiplier * end;
  return 100;
}

let targetScrollY = 0
let currentScrollY = 0
let scrollOffset = 0
const updateScroll = () => {
  targetScrollY = document.documentElement.scrollTop
  currentScrollY = leap(currentScrollY, targetScrollY, 0.1)
  scrollOffset = targetScrollY * 0.9

  console.log(targetScrollY, currentScrollY)
}

const canvasEl = document.querySelector('.webgl-canvas')
const canvasSize = {
  w: window.innerWidth,
  h: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasSize.w, canvasSize.h);

/**
* シーン・カメラ・レンダラーを用意する
*/
const fov = 60;
const fovRad = (fov / 2) * (Math.PI / 180);
let distance = (canvasSize.h / 2) / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(
    fov,
    canvasSize.w / canvasSize.h,
    0.1,
    1000
);
camera.position.z = distance;

const scene = new THREE.Scene();

/**
* ジオメトリ+マテリアル＝メッシュを用意する
*/
let planeGeometry
let shaderMaterial
const createMesh = (src) => {
  const loader = new THREE.TextureLoader()
  const texture = loader.load(src)

  planeGeometry = new THREE.PlaneGeometry(canvasSize.w, canvasSize.h, 100, 100);
  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uImageAspect: { value: 1920 / 1280 },
      uPlaneAspect: { value: canvasSize.w / canvasSize.h },
      uTime: { value: 0 },
    },
    vertexShader: document.querySelector('#v-shader').textContent,
    fragmentShader: document.querySelector('#f-shader').textContent,
  });

  const mesh = new THREE.Mesh(planeGeometry, shaderMaterial);
  scene.add(mesh);
}

// メッシュ
const imgList = [
  'https://source.unsplash.com/whOkVvf0_hU/',
]
imgList.forEach(src => {
  createMesh(src)
})

function update(offset) {
  shaderMaterial.uniforms.uTime.value = offset;
}

// 描画
function loop() {
  // updateScroll()

  update(scrollOffset)

  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
loop()

let timeoutId = 0
function onWindowResize() {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    shaderMaterial.uniforms.uImageAspect.value = 1920 / 1280
    shaderMaterial.uniforms.uPlaneAspect.value = window.innerWidth / window.innerHeight
    camera.aspect = window.innerWidth / window.innerHeight
    distance = (window.innerHeight / 2) / Math.tan(fovRad)
    camera.position.z = distance
    camera.updateProjectionMatrix()
  }, 200)
}

// ブラウザのリサイズに対応させる
window.addEventListener('resize', onWindowResize);
