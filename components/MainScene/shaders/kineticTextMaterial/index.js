/**
 * @file shaders/KineticTextMaterial
 * Basic shader setup and material example.
 *
 * Usage:
 *
 *    import { extend } from 'react-three-fiber
 *    import { KineticTextMaterial
 * } from './shaders/KineticTextMaterial
 *'
 *
 *    extend({ KineticTextMaterial
 * })
 *
 *    ... later in the React component
 *    <mesh>
 *      ...
 *      <KineticTextMaterial
 * time={0} ... />
 *    </mesh>
 *
 */
import * as THREE from 'three'
import { extend } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'

import vertex from './default.vert'
import fragment from './default.frag'

/**
 * KineticTextMaterial
 *
 * @param {*} uniforms
 */
const KineticTextMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    resolution: new THREE.Vector4(),
    mouse: new THREE.Vector2(),
    // uTexture: new THREE.TextureLoader(
    //   '/3d/textures/text.png',
    //   (texture) => {
    //     console.log('texture', texture)
    //     texture.minFilter = THREE.NearestFilter
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    //   }
    // ),
  },
  // vertex shader
  vertex,
  // fragment shader
  fragment,
  (material) => {
    console.log('material', material)
    material.side = THREE.DoubleSide
    material.transparent = true
    // material.wireframe = false
    // material.vertexColors = true
    // material.flatShading = true

    // material.defines = {
    //   '#extension GL_OES_standard_derivatives': 'enable',
    // }
    // material.extensions = {
    //   derivatives: true,
    // }
  }
)

extend({ KineticTextMaterial })
