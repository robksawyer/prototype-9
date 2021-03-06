/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

// import { useTweaks } from 'use-tweaks'
// import { useInView } from 'react-intersection-observer'
// import useMobileDetect from 'use-mobile-detect-hook'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber'

// Enabled for effects
// import {
//   EffectComposer,
//   // Bloom,
//   // ChromaticAberration,
// } from '@react-three/postprocessing'

import * as THREE from 'three'
import { useHelper, Html, useTexture, OrbitControls } from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
// import { gsap } from 'gsap'

import styles from './MainScene.module.css'

import NurbsObject from '../NurbsObject'
import NurbsLine from '../NurbsLine'
import Loader from '../Loader'

// Shader stack
import './shaders/kineticTextMaterial'

// Texture loading examples
// const envMap = useCubeTexture(
//   [
//     'sky_px.png',
//     'sky_nx.png',
//     'sky_py.png',
//     'sky_ny.png',
//     'sky_pz.png',
//     'sky_nz.png',
//   ],
//   { path: '/3d/sky0/' }
// )

// const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
// bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
// bumpMap.repeat.set(1, 1)
//
// Application
// <meshStandardMaterial
//    envMap={envMap}
//    attach="material"
//    roughness={0}
//    metalness={0.9}
//    bumpMap={bumpMap}
//    color="#3083DC"
//  />

// Enable for effects in the main scene
// const Effects = () => {
//   return <EffectComposer></EffectComposer>
// }

const ENABLE_HELPERS = 0

const Scene = () => {
  const mesh = useRef()
  const { scene } = useThree()
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  // Texture loading example
  const texture = useTexture('/3d/textures/future-class-title.png')
  texture.minFilter = THREE.NearestFilter
  // texture.anisotropy = 16
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  useFrame(({ clock, mouse }) => {
    // mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.position.x = Math.sin(clock.elapsedTime)
    // mesh.current.position.z = Math.sin(clock.elapsedTime)
    // Lights
    // group.current.rotation.y += 0.02
    // Update the shader
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
    mesh.current.material.uniforms.mouse.value = new THREE.Vector2(
      mouse.x,
      mouse.y
    )
  })

  // useEffect(() => void (spotLight.current.target = mesh.current), [scene])

  if (ENABLE_HELPERS) {
    useHelper(spotLight, THREE.SpotLightHelper, 'teal')
    useHelper(pointLight, THREE.PointLightHelper, 0.5, 'hotpink')
    useHelper(mesh, THREE.BoxHelper, '#272740')
    useHelper(mesh, VertexNormalsHelper, 1, '#272740')
    // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  }

  return (
    <>
      {/* <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      /> */}
      <ambientLight color={0x808080} />
      <directionalLight color={0xffffff} intensity={1} />
      <mesh scale={[100, 100, 100]} ref={mesh} position={[0, 2, 0]} castShadow>
        <torusGeometry args={[3, 1, 100, 100]} />
        <kineticTextMaterial side={THREE.DoubleSide} uTexture={texture} />
      </mesh>
      {/* <NurbsLine /> */}
      <NurbsObject />
      {/* <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh> */}
      {/* <gridHelper args={[30, 30, 30]} /> */}
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <ErrorBoundary>
      {/* https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#canvas */}
      <Canvas
        pixelRatio={window.devicePixelRatio || 1}
        colorManagement
        shadowMap
        camera={{
          fov: 50,
          position: [0, 150, 750],
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 2000,
        }}
        className={`${styles.main_scene} ${
          styles[`main_scene__${variant}`]
        } ${className} outline-none focus:outline-none`}
        style={{
          width: '100vw',
          height: 'calc(100vh - 50px)',
          background: 'black',
        }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true
          gl.alpha = true
          gl.antialias = true
          // gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        {/* <fog attach="fog" args={['floralwhite', 0, 40]} /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        {/* <Effects /> */}
        <OrbitControls />
      </Canvas>
    </ErrorBoundary>
  )
}

MainScene.propTypes = {
  // tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  // tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene
