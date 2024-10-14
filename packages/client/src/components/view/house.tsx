"use client";

import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

// GLTF 모델을 불러오는 컴포넌트
function HouseModel(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/house/scene.gltf"); // public/models 폴더의 GLTF 파일 경로
  // 모든 자식 객체에 그림자 활성화
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} {...props} />;
}

const EmptyBottle = React.forwardRef(
  (props: JSX.IntrinsicElements["group"] & { hover: boolean }, ref) => {
    const { scene } = useGLTF("/models/empty_bottle/empty_bottle.gltf");
    const { hover } = props;

    useEffect(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [scene]);

    const { scale } = useSpring({
      scale: hover ? 1 : 0.5,
      config: { mass: 1, tension: 300, friction: 60 },
    });

    const AnimatedGroup = animated("group");

    return (
      <Select enabled={hover}>
        <AnimatedGroup
          ref={ref as React.RefObject<THREE.Group>}
          {...props}
          scale={scale}
        >
          <primitive object={scene} />
        </AnimatedGroup>
      </Select>
    );
  }
);

EmptyBottle.displayName = "EmptyBottle";

function HouseScene() {
  const [hoverBottle, setHoverBottle] = useState(false);
  const bottleRef = useRef<THREE.Group>(null);

  return (
    <Selection>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          blur
          visibleEdgeColor={0xffffff}
          hiddenEdgeColor={0x22090a}
          edgeStrength={100}
          width={1000}
        />
      </EffectComposer>
      <EmptyBottle
        ref={bottleRef}
        hover={hoverBottle}
        position={[1.2, 7.5, 0.1]}
        onPointerOver={() => setHoverBottle(true)}
        onPointerOut={() => setHoverBottle(false)}
        onClick={() => console.log("Empty Bottle clicked")}
      />
      <HouseModel />
      <OrbitControls />
    </Selection>
  );
}

export default HouseScene;
