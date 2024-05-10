const vShader = `
  varying vec2 vUv;
  uniform float uTime;

  float PI = 3.1415926535897932384626433832795;

  void main(){
    vUv = uv;
    vec3 pos = position;

    // 横方向
    float amp = 0.03; // 振幅（の役割） 大きくすると波が大きくなる
    float freq = 0.01 * uTime; // 振動数（の役割） 大きくすると波が細かくなる

    // 縦方向
    float tension = -0.001 * uTime; // 上下の張り具合

    pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
    pos.y = pos.y + (cos(pos.x * PI) * tension);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uTime;

  void main(){
    // 画像のアスペクトとプレーンオブジェクトのアスペクトを比較し、短い方に合わせる
    vec2 ratio = vec2(
      min(uPlaneAspect / uImageAspect, 1.0),
      min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
    );

    // 計算結果を用いてテクスチャを中央に配置
    vec2 fixedUv = vec2(
      (vUv.x - 0.5) * ratio.x + 0.5,
      (vUv.y - 0.5) * ratio.y + 0.5
    );

    // RGBシフト
    vec2 offset = vec2(0.0, uTime * 0.0005);
    float r = texture2D(uTexture, fixedUv + offset).r;
    float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
    float b = texture2D(uTexture, fixedUv).b;
    vec3 texture = vec3(r, g, b);

    gl_FragColor = vec4(texture, 1.0);
  }
`

export { vShader, fShader }