/**
 * @file NurbsLine.js
 */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import { NURBSCurve } from './curves/NURBSCurve';
import { NURBSSurface } from './curves/NURBSSurface';

import styles from './NurbsLine.module.css';

const NurbsLine = props => {
  /**
   * onPointerDown
   * @param {*} event
   */
  // const onPointerDown = (event) => {
  //   if (event.isPrimary === false) return

  //   pointerXOnPointerDown = event.clientX - windowHalfX
  //   targetRotationOnPointerDown = targetRotation

  //   document.addEventListener('pointermove', onPointerMove, false)
  //   document.addEventListener('pointerup', onPointerUp, false)
  // }

  /**
   * onPointerMove
   * @param {*} event
   */
  // const onPointerMove = (event) => {
  //   if (event.isPrimary === false) return

  //   pointerX = event.clientX - windowHalfX

  //   targetRotation =
  //     targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02
  // }

  /**
   * onPointerUp
   * @param {*} event
   */
  // const onPointerUp = (event) => {
  //   if (event.isPrimary === false) return

  //   document.removeEventListener('pointermove', onPointerMove)
  //   document.removeEventListener('pointerup', onPointerUp)
  // }

  const { tagName: Tag, className, variant, children } = props;

  const [windowHalfX, setWindowHalfX] = useState(0);

  let targetRotation = 0;
  let targetRotationOnPointerDown = 0;

  let pointerX = 0;
  let pointerXOnPointerDown = 0;

  // NURBS curve

  const nurbsControlPoints = [];
  const nurbsKnots = [];
  const nurbsDegree = 3;

  for (let i = 0; i <= nurbsDegree; i++) {
    nurbsKnots.push(0);
  }

  for (let i = 0, j = 15; i < j; i++) {
    nurbsControlPoints.push(
      new THREE.Vector4(
        Math.random() * 400 - 20,
        Math.random() * 400,
        Math.random() * 400 - 20,
        1, // weight of control point: higher means stronger attraction
      ),
    );

    const knot = (i + 1) / (j - nurbsDegree);
    nurbsKnots.push(THREE.MathUtils.clamp(knot, 0, 1));
  }

  const nurbsCurve = new NURBSCurve(
    nurbsDegree,
    nurbsKnots,
    nurbsControlPoints,
  );

  const group = useRef();
  const nurbsGeometry = useRef();
  const nurbsLine = useRef();
  const nurbsControlPointsGeometry = useRef();
  const nurbsControlPointsLine = useRef();

  const geometry = useRef();
  const object = useRef();

  useEffect(() => {
    // nurbsGeometry.current.setFromPoints(nurbsCurve.getPoints(200))
    nurbsLine.current.position.set(0, 0, 0);
    nurbsControlPointsGeometry.current.setFromPoints(nurbsCurve.controlPoints);

    object.current.position.set(0, 0, 0);
    object.current.scale.multiplyScalar(1);

    // For the mouse-controlled rotation
    // setWindowHalfX(window.innerWidth / 2)
  }, [nurbsGeometry, nurbsLine, nurbsControlPointsGeometry, geometry, object]);

  useFrame(() => {
    nurbsControlPointsLine.current.position.copy(nurbsLine.current.position);

    group.current.rotation.y +=
      (targetRotation - group.current.rotation.y) * 0.05;
  });

  // NURBS surface

  const nsControlPoints = [
    [
      new THREE.Vector4(-200, -200, 100, 1),
      new THREE.Vector4(-200, -100, -200, 1),
      new THREE.Vector4(-200, 100, 250, 1),
      new THREE.Vector4(-200, 200, -100, 1),
    ],
    [
      new THREE.Vector4(0, -200, 0, 1),
      new THREE.Vector4(0, -100, -100, 5),
      new THREE.Vector4(0, 100, 150, 5),
      new THREE.Vector4(0, 200, 0, 1),
    ],
    [
      new THREE.Vector4(200, -200, -100, 1),
      new THREE.Vector4(200, -100, 200, 1),
      new THREE.Vector4(200, 100, -250, 1),
      new THREE.Vector4(200, 200, 100, 1),
    ],
  ];
  const degree1 = 2;
  const degree2 = 3;
  const knots1 = [0, 0, 0, 1, 1, 1];
  const knots2 = [0, 0, 0, 0, 1, 1, 1, 1];
  const nurbsSurface = new NURBSSurface(
    degree1,
    degree2,
    knots1,
    knots2,
    nsControlPoints,
  );

  const map = useTexture('/3d/textures/uv_grid_opengl.jpg');
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;

  function getSurfacePoint(u, v, target) {
    return nurbsSurface.getPoint(u, v, target);
  }

  return (
    <group
      ref={group}
      position={[-200, -200, -100]}
      // onPointerDown={onPointerDown}
      // onPointerUp={onPointerUp}
      // onPointerMove={onPointerMove}
    >
      <line ref={nurbsLine}>
        <bufferGeometry ref={nurbsGeometry} />
        <lineBasicMaterial color={0xff0000} />
      </line>
      <line ref={nurbsControlPointsLine}>
        <bufferGeometry ref={nurbsControlPointsGeometry} />
        <lineBasicMaterial color={0x00ff00} transparent opacity={0.5} />
      </line>
      <mesh ref={object}>
        <parametricBufferGeometry
          ref={geometry}
          args={[getSurfacePoint, 20, 20]}
        />
        <meshLambertMaterial
          map={map}
          transparent
          opacity={0}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

NurbsLine.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

NurbsLine.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
};

export default NurbsLine;
