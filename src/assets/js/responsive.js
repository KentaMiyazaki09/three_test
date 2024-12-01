// import * as THREE from 'three';
 
// /**
// * シーン・カメラ・レンダラーを用意する
// */
// const fov = 50;
// const fovRad = (fov / 2) * (Math.PI / 180); // 視野角をラジアンに変換
// let distance = (window.innerHeight / 2) / Math.tan(fovRad); // カメラ距離を求める

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     fov,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     2000
// );
// camera.position.z = distance;

// const canvasEl = document.getElementById('webgl-canvas')

// const renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

// /**
// * ジオメトリ+マテリアル＝メッシュを用意する
// */
// const loader = new THREE.TextureLoader()
// const texture = loader.load('https://source.unsplash.com/whOkVvf0_hU/')

// const planeGeometry = new THREE.PlaneGeometry(2, 2);
// const shaderMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     uYAspect: { value: window.innerHeight / window.innerWidth },
//     uXAspect: { value: window.innerWidth / window.innerHeight },
//     uTexture: { value: texture }
//   },
//   vertexShader: document.querySelector('#v-shader').textContent,
//   fragmentShader: document.querySelector('#f-shader').textContent,
// });
// let mesh = new THREE.Mesh(planeGeometry, shaderMaterial);
// scene.add(mesh);

// // アニメーション
// function animate() {
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }
// animate();

// function onWindowResize() {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   shaderMaterial.uniforms.uYAspect.value = window.innerHeight / window.innerWidth
//   shaderMaterial.uniforms.uXAspect.value = window.innerWidth / window.innerHeight
//   camera.aspect = window.innerWidth / window.innerHeight;
//   distance = (window.innerHeight / 2) / Math.tan(fovRad);
//   camera.position.z = distance;
//   camera.updateProjectionMatrix();
// }

// // ブラウザのリサイズに対応させる
// window.addEventListener('resize', onWindowResize);
