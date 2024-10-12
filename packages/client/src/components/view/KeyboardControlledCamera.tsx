"use client";
import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const KeyboardControlledCamera: React.FC = () => {
  const { camera } = useThree();
  const moveSpeed = 0.5;
  const maxOffset = 5;
  const targetPosition = useRef(new Vector3(10, 10, 10));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          targetPosition.current.z = Math.max(
            targetPosition.current.z - moveSpeed,
            15 - maxOffset
          );
          break;
        case "ArrowDown":
          targetPosition.current.z = Math.min(
            targetPosition.current.z + moveSpeed,
            15 + maxOffset
          );
          break;
        case "ArrowLeft":
          targetPosition.current.x = Math.max(
            targetPosition.current.x - moveSpeed,
            15 - maxOffset
          );
          break;
        case "ArrowRight":
          targetPosition.current.x = Math.min(
            targetPosition.current.x + moveSpeed,
            15 + maxOffset
          );
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.1);
    camera.lookAt(0, 10, 0);
  });

  return null;
};

export default KeyboardControlledCamera;
