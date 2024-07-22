import * as THREE from 'three';

function random (num, last=100) {
  return Math.random() * num * 2 - last
}

function easeOutQuad(x) {
  const b = 0; const c = 1; const d = 1
  return -c * (x /= d) * (x - 2) + b
}
function lerp(x, y, a) {
  return x + (y - x) * easeOutQuad(a)
}

// 慣性スクロールの値
let inertialScroll = 0;
// 慣性スクロールのパーセント値(0~100)
let inertialScrollPercent = 0;

/**
   * パーセントのスケール
   */
function scalePercent(start, end) {
  return (inertialScrollPercent - start) / (end - start);
}

let scene, camera, renderer;
const animationScripts = [
  {
    start: 0,
    end: 100,
    func: () => {
      camera.position.z = lerp(100, 0, scalePercent(0, 100))
      camera.rotation.z = lerp(0, -Math.PI / 2, scalePercent(0, 100))
    }
  },
 ]

 /**
   * 慣性スクロールのためにスクロール値を取得する
   */
function setScrollPercent() {
  inertialScroll +=
    ((document.documentElement.scrollTop || document.body.scrollTop) - inertialScroll) * 0.08;

  // 慣性スクロールでのパーセント
  inertialScrollPercent = (inertialScroll / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight) * 100).toFixed(2)
  document.getElementById('percent').innerText = inertialScrollPercent

  // 検証用の通常のパーセント
  //  const scroll = ((document.documentElement.scrollTop || document.body.scrollTop) /
  //             ((document.documentElement.scrollHeight ||
  //                 document.body.scrollHeight) -
  //                 document.documentElement.clientHeight)) * 100
  //  document.getElementById('scroll').innerText = Number(scroll).toFixed(2);
}

function playScrollAnimations() {
  animationScripts.forEach((item) => {
    if (inertialScrollPercent >= item.start && inertialScrollPercent < item.end) {
      item.func()
    }
  })
}

function render() {
  renderer.render(scene, camera)
  setScrollPercent()
  window.requestAnimationFrame(render)
  playScrollAnimations()
}

function init() {
  const element = document.getElementById('bg')
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(100, element.width / element.height, 0.1, 1000)
  camera.position.set(0, 0, 0)
  camera.rotation.set(0, 0, 0)
  renderer = new THREE.WebGLRenderer({
    canvas: element,
    antialias: true,
    alpha: true,
    transparent: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // const RANGE = 100
  for(let i = 0; i < 1000; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const color = new THREE.Color('rgb(225, 157, 115)')
    const material =  new THREE.MeshBasicMaterial({ color })
    const box =  new THREE.Mesh(geometry, material)

    const radian = i / 100 * Math.PI * 2
    const posX = 30 * Math.cos(radian)
    const posY = 30 * Math.sin(radian)
    const posZ = -10 + i * 0.1
    // random(RANGE, 30)
    box.position.set(posX, posY, posZ)
    box.rotation.set(random(Math.PI*2), random(Math.PI*2), random(Math.PI*2))

    scene.add(box)
  }

  const hemisphereLight = new THREE.HemisphereLight(
    /* sky color = */ 0x51a8dd,
    /* ground color = */ 0xe83015,
    1.0,
  )
  scene.add(hemisphereLight)

  render()
}

window.addEventListener('load', init)