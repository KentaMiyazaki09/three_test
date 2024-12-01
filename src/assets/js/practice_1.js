// import { WebGLRenderer, PerspectiveCamera, Scene, SphereGeometry, MeshPhysicalMaterial, Mesh, DirectionalLight, PointLight, PointLightHelper, TextureLoader } from 'three'
// import { OrbitControls } from 'three/examples/jsm/Addons.js'

// let scene, camera, renderer, pointLight, controls

// window.addEventListener('load', init)

// function init() {
//   // シーン
//   scene = new Scene()

//   // カメラ
//   camera = new PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000,
//   )
//   camera.position.set(0, 0, 500)

//   //　レンダラー
//   renderer = new WebGLRenderer({
//     alpha: true
//   })
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   renderer.setPixelRatio(window.devicePixelRatio)
//   document.body.appendChild(renderer.domElement)


//   // テクスチャ
//   let texttures = new TextureLoader().load('/assets/images/practice/earth.jpg')

//   // ジオメトリ
//   let ballGeometry = new SphereGeometry(100, 64, 32)
//   // マテリアル
//   let ballMaterial = new MeshPhysicalMaterial({
//     map: texttures
//   })
//   // メッシュ
//   let ballMesh = new Mesh(ballGeometry, ballMaterial)
//   scene.add(ballMesh)

//   //　平行光源
//   let directionalLight = new DirectionalLight(0xffffff, 2)
//   directionalLight.position.set(1, 1, 1)
//   scene.add(directionalLight)

//   // ポイント光源
//   pointLight = new PointLight(0xffffff, 1)
//   pointLight.position.set(-200, -200, -200)
//   pointLight.decay = 1
//   pointLight.power = 1000
//   scene.add(pointLight)

//   let pointLightHelper = new PointLightHelper(pointLight, 30, 0xffff00)
//   scene.add(pointLightHelper)

//   // マウス操作
//   controls = new OrbitControls(camera, renderer.domElement)

//   window.addEventListener('resize', onWindowResize)

//   animate()
// }

// // ブラウザリサイズ
// function onWindowResize() {
//   renderer.setSize(window.innerWidth, window.innerHeight)

//   // カメラのアスペクト比を直す
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
// }

// // 光源を球の周りを巡回
// function animate() {
//   pointLight.position.set(
//     200 * Math.sin(Date.now() / 500),
//     200 * Math.sin(Date.now() / 1000),
//     200 * Math.cos(Date.now() / 500)
//   )
//   //レンダリング
//   renderer.render(scene, camera)
  
//   requestAnimationFrame(animate)
// }

