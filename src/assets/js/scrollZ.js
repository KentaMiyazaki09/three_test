import * as THREE from 'three';

function random (num) {
  return Math.random() * num * 2 - num
}

function lerp(x, y, a) {
  return x + (y - x) * easeOutQuad(a);
}

/**
   * パーセントのスケール
   */
function scalePercent(start, end) {
  return (inertialScrollPercent - start) / (end - start);
}

function easeOutQuad(x) {
  let t = x; const b = 0; const c = 1; const d = 1;
  return -c * (t /= d) * (t - 2) + b;
}

// 慣性スクロールの値
let inertialScroll = 0;
// 慣性スクロールのパーセント値(0~100)
let inertialScrollPercent = 0;

let scene, camera, renderer;
const animationScripts = [
  {
    start: 0,
    end: 25,
    func: () => {
      camera.position.z = lerp(
        50, 30, scalePercent(0, 25)
      );
    }
  },
  {
    start: 25,
    end: 50,
    func: () => {
      camera.position.z = lerp(
        30, 0, scalePercent(25, 50)
      );
      camera.rotation.x = lerp(
        0,
        -Math.PI / 2, scalePercent(25, 50)
      );
    }
  },
  {
    start: 50,
    end: 75,
    func: () => {
      camera.position.x = lerp(
        50, 20, scalePercent(50, 75)
      );
      camera.rotation.y = lerp(
        0,
        -Math.PI / 2, scalePercent(50, 75)
      );
    }
  },
  {
    start: 75,
    end: 100,
    func: () => {
      camera.position.x = lerp(
        20, 0, scalePercent(75, 100)
      );
      camera.position.z = lerp(
        0, 30, scalePercent(75, 100)
      );
      camera.rotation.z = lerp(
        0,
        -Math.PI / 2, scalePercent(75, 100)
      );
    }
  },
 ];

function playScrollAnimations() {
  animationScripts.forEach((item) => {
    if (inertialScrollPercent >= item.start && inertialScrollPercent < item.end) {
      item.func();
    }
  });
}

function init() {
  const element = document.getElementById('bg');
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(
      75, element.width / element.height, 0.1, 1000
    );
  camera.position.set(50, 50, 50);
  camera.rotation.set(0, 0, 0);
  renderer = new THREE.WebGLRenderer({
    canvas: element,
    antialias: true,
    alpha: true,
    transparent: true
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
 
  
  const RANGE = 100;
  for(let i = 0; i < 1000; i++) {
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const color = new THREE.Color(0x0188c4);
    color.offsetHSL(0, 0, Math.random() / 5);
    const material =  new THREE.MeshBasicMaterial({ color });
    const box =  new THREE.Mesh(geometry, material);

    box.position.set(random(RANGE), random(RANGE), random(RANGE));
    box.rotation.set(random(Math.PI*2), random(Math.PI*2), random(Math.PI*2));

    scene.add(box);
  }
  
  render();
}

/**
   * 慣性スクロールのためにスクロール値を取得する
   */
function setScrollPercent() {
  inertialScroll +=
    ((document.documentElement.scrollTop || document.body.scrollTop) - inertialScroll) * 0.08;
  // 慣性スクロールでのパーセント
  inertialScrollPercent = (inertialScroll / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight) * 100).toFixed(2);
  
 // 検証用の通常のパーセント
 const scroll = ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) * 100;
 document.getElementById('percent').innerText = inertialScrollPercent;
//  document.getElementById('scroll').innerText = Number(scroll).toFixed(2);
}

function render() {
  renderer.render(scene, camera)
  setScrollPercent()
  window.requestAnimationFrame(render)
  playScrollAnimations()
}

window.addEventListener('load', init)