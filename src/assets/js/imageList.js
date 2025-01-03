// import * as THREE from 'three';

// let targetScrollY = 0
// let currentScrollY = 0
// let scrollOffset = 0
// const lerp = (start, end, multiplier) => {
//   console.log(start, end, multiplier)
//   return (1 - multiplier) * start + multiplier * end
// }
// const updateScroll = () => {
//   targetScrollY = document.documentElement.scrollTop
//   currentScrollY = lerp(currentScrollY, targetScrollY, 0.1)
//   scrollOffset = targetScrollY - currentScrollY
// }

// const canvasEl = document.querySelector('.webgl-canvas')
// const canvasSize = {
//   w: document.body.clientWidth,
//   h: window.innerHeight,
// }

// const renderer = new THREE.WebGLRenderer({ canvas: canvasEl })
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setSize(canvasSize.w, canvasSize.h)

// /**
// * シーン・カメラ・レンダラーを用意する
// */
// const fov = 60
// const fovRad = (fov / 2) * (Math.PI / 180)
// let distance = (canvasSize.h / 2) / Math.tan(fovRad)
// const camera = new THREE.PerspectiveCamera(
//     fov,
//     canvasSize.w / canvasSize.h,
//     0.1,
//     1000
// )
// camera.position.z = distance

// const scene = new THREE.Scene()

// const loader = new THREE.TextureLoader()
// const texture = loader.load('https://raw.githubusercontent.com/KentaMiyazaki09/three_test/main/src/assets/images/photo/01.jpg')

// const uniforms = {
//   uTexture: { value: texture },
//   uImageAspect: { value: 2048 / 3072 },
//   uPlaneAspect: { value: canvasSize.w / canvasSize.h },
//   uTime: { value: 0 },
// }

// const geo = new THREE.PlaneGeometry(canvasSize.w, canvasSize.h, 100, 100)
// const mat = new THREE.ShaderMaterial({
//   uniforms,
//   vertexShader: document.getElementById('v-shader').textContent,
//   fragmentShader: document.getElementById('f-shader').textContent,
// })

// const mesh = new THREE.Mesh(geo, mat)
// scene.add(mesh);

// // 描画
// function loop() {
//   updateScroll()
//   uniforms.uTime.value = scrollOffset
//   // uniforms.uTime.value+=0.2;

//   renderer.render(scene, camera)
//   requestAnimationFrame(loop)
// }

// const main = () => {
//   window.addEventListener('load', () => {
//     loop()
//   })
// }
// main()

// // // ブラウザのリサイズに対応させる
// // let timeoutId = 0
// // function onWindowResize() {
// //   if (timeoutId) clearTimeout(timeoutId)
// //   timeoutId = setTimeout(() => {
// //     renderer.setSize(canvasSize.w, canvasSize.h)

// //     uniforms.uImageAspect.value = 2048 / 3072
// //     uniforms.uPlaneAspect.value = window.innerWidth / window.innerHeight

// //     camera.aspect = window.innerWidth / window.innerHeight
// //     camera.position.z = (canvasSize.h / 2) / Math.tan(fovRad)
// //     camera.updateProjectionMatrix()
// //   }, 200)
// // }
// // window.addEventListener('resize', onWindowResize);
