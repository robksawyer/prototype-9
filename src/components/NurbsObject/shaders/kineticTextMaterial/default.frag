// Kinetic Type Shader
// Rob Sawyer
// @see https://github.com/marioecg/github-universe-2020-tutorial
#define GLSLIFY 1

varying vec2 vUv;
uniform vec2 mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;

  vec2 uv = vUv;
  uv.x += sin(uv.y * 0.25);
  vec2 repeat = vec2(6.+ mouse.y, 12. + mouse.x);
  uv = fract(uv * repeat + vec2(0.0, time));
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}




