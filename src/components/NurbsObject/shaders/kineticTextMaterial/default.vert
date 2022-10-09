// Kinetic Type Shader
// Rob Sawyer
// @see https://github.com/marioecg/github-universe-2020-tutorial

// object.matrixWorld
// uniform mat4 modelMatrix;

// camera.matrixWorldInverse * object.matrixWorld
// uniform mat4 modelViewMatrix;

// camera.projectionMatrix
// uniform mat4 projectionMatrix;

// camera.matrixWorldInverse
// uniform mat4 viewMatrix;

// inverse transpose of modelViewMatrix
// uniform mat3 normalMatrix;

// camera position in world space
// uniform vec3 cameraPosition;

// default vertex attributes provided by Geometry and BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

varying vec2 vUv;
uniform float uTime;
uniform vec2 mouse;

void main() {
  vUv = uv;

  float time = uTime * 1.0;

  vec3 transformed = position;
  transformed.z += sin(position.y + time);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}