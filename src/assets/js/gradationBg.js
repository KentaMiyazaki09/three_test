// canvas要素の取得とWebGL2コンテキストの取得
const canvas = document.getElementById('webgl-canvas')
const gl = canvas.getContext("webgl2")

// シェーダープログラムの作成
const vertexShaderSource = `#version 300 es
  in vec2 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentShaderSource = `#version 300 es
  precision mediump float;

  uniform vec2 uResolution;

  uniform float uScrollPosition;
  uniform vec2 uMousePosition;

  out vec4 outColor;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    outColor = vec4(uv.x, sin(uScrollPosition * 0.001), uMousePosition.y, 1.0);
}`

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(fragmentShader)

const shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertexShader)
gl.attachShader(shaderProgram, fragmentShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

// バッファの作成と設定
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// canvasの幅と高さの半分の大きさの矩形の頂点データ
const positions = new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0,  1.0,
  1.0,  1.0,
])
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "aPosition"
);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'uResolution');
const mousePositionUniformLocation = gl.getUniformLocation(shaderProgram, "uMousePosition");
let mousePosition = { x: 0, y: 0 };

const scrollPositionUniformLocation = gl.getUniformLocation(shaderProgram, "uScrollPosition");

function getMousePosition(event) {
  mousePosition.x = event.clientX / canvas.width;
  mousePosition.y = 1.0 - (event.clientY / canvas.height); // Y軸を反転
}
window.addEventListener('mousemove', getMousePosition);

// 描画の実行
function drawScene(width, height) {
  gl.uniform2f(resolutionUniformLocation, width, height);
  gl.uniform2f(mousePositionUniformLocation, mousePosition.x, mousePosition.y);
  gl.uniform1f(scrollPositionUniformLocation, window.scrollY)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  requestAnimationFrame(() => drawScene(width, height));
}

// ウィンドウサイズに合わせてcanvasのサイズを変更する
function resizeCanvasToDisplaySize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl.viewport(0, 0, canvas.width, canvas.height)
  drawScene(canvas.width, canvas.height)
}

// ウィンドウリサイズイベントに対するリスナーを設定
window.addEventListener("resize", resizeCanvasToDisplaySize)

// 初期表示時にもリサイズを実行
document.addEventListener("DOMContentLoaded", resizeCanvasToDisplaySize)
