"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import { OceanScene } from "./ocean";
import BottleScene from "./bottle";
import HouseScene from "./house";
import KeyboardControlledCamera from "./KeyboardControlledCamera";

export const CanvasComponent = () => {
  return (
    <Canvas style={{ height: "100%", backgroundColor: "white" }} shadows>
      <ambientLight intensity={0.8} />
      <directionalLight
        intensity={1.2}
        color="white"
        position={[5, 18, 10]}
        castShadow
      />
      <Suspense fallback={null}>
        <OceanScene />
        <HouseScene />
        <BottleScene />
        <KeyboardControlledCamera />
      </Suspense>
      <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <OrbitControls maxAzimuthAngle={Math.PI} maxPolarAngle={Math.PI} />
    </Canvas>
  );
};
