/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useErrorBoundary from 'use-error-boundary';

// import { useTweaks } from 'use-tweaks'
// import { useInView } from 'react-intersection-observer'
// import useMobileDetect from 'use-mobile-detect-hook'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from '@react-three/fiber';

// Enabled for effects
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Bloom,
} from '@react-three/postprocessing';

import * as THREE from 'three';
import { useHelper, Html, useTexture, OrbitControls } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three-stdlib';
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
// import { gsap } from 'gsap'

import styles from './MainScene.module.css';

// import NurbsObject from '@/components/NurbsObject';
// import NurbsLine from '@/components/NurbsLine';
// import Loader from '@/components/Loader';

// Shader stack
import './shaders/kineticTextMaterial';

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
const Effects = () => {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.2} />
    </EffectComposer>
  );
};

const ENABLE_HELPERS = 0;

const generateTexture = (
  text = 'Lorem',
  font = '150px PPSupplyMono',
  color = '#ffffff',
  width = 625,
  height = 250,
) => {
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d');
  document.body.appendChild(ctx.canvas);
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.fillText(text, cvs.width / 2, cvs.height / 2);
  const texture = new THREE.CanvasTexture(cvs);
  // Fixes issue with lines between texture borders
  texture.minFilter = THREE.NearestFilter;
  return texture;
};

const Scene = ({ text = 'FOMOLOL' }) => {
  const mesh = useRef();
  const spotLight = useRef();
  const pointLight = useRef();

  // Texture loading example
  // const texture = useTexture('/3d/textures/future-class-title.png')
  // texture.minFilter = THREE.NearestFilter
  // texture.anisotropy = 16
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const texture = generateTexture(text);

  useFrame(({ clock, pointer }) => {
    // mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.position.x = Math.sin(clock.elapsedTime)
    // mesh.current.position.z = Math.sin(clock.elapsedTime)
    // Lights
    // group.current.rotation.y += 0.02
    // Update the shader
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.mouse.value = new THREE.Vector2(
      pointer.x || 1.0,
      pointer.y || 1.0,
    );
  });

  // useEffect(() => void (spotLight.current.target = mesh.current), [scene])

  // if (ENABLE_HELPERS) {
  //   useHelper(spotLight, THREE.SpotLightHelper, 'teal');
  //   useHelper(pointLight, THREE.PointLightHelper, 0.5, 'hotpink');
  //   useHelper(mesh, THREE.BoxHelper, '#272740');
  //   useHelper(mesh, VertexNormalsHelper, 1, '#272740');
  //   // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  // }

  return (
    <>
      <ambientLight color={0x808080} />
      <directionalLight color={0xffffff} intensity={1} />
      <mesh scale={[100, 100, 100]} ref={mesh} position={[0, 0, 0]}>
        <torusGeometry args={[3, 1, 100, 100]} />
        <kineticTextMaterial side={THREE.DoubleSide} uTexture={texture} />
      </mesh>
    </>
  );
};

const MainScene = ({ tagName: Tag, className, variant, children }) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [text, setText] = React.useState();

  return (
    <ErrorBoundary>
      {/* https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#canvas */}
      <Canvas
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
      >
        {/* <fog attach="fog" args={['floralwhite', 0, 40]} /> */}
        <Suspense fallback={null}>
          <Scene text={text} />
        </Suspense>

        <Effects />
        <OrbitControls />
      </Canvas>
      <div className="fixed flex items-center justify-center w-screen h-screen pointer-events-none">
        <input
          name="tVal"
          className="pointer-events-auto w-full border-none bg-transparent font-pp text-[200px] text-white/80 outline-none focus:border-none "
          aria-label="title"
          value={text}
          placeholder="FOMOLOL"
          onChange={e => setText(e.target.value)}
        />
      </div>
    </ErrorBoundary>
  );
};

MainScene.propTypes = {
  // tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
};

MainScene.defaultProps = {
  // tagName: Canvas,
  className: '',
  variant: 'default',
};

export default MainScene;
