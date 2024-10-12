"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

function HouseScene() {
  return (
    <>
      <HouseModel />
      <OrbitControls />
    </>
  );
}

export default HouseScene;
