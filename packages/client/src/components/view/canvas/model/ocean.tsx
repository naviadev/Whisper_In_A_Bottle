import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { FrontSide, Vector3 } from "three";
import { Ocean } from "react-three-ocean";

export const OceanScene = () => {
  const oceanRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (oceanRef.current) {
      const elapsedTime = clock.getElapsedTime(); // 경과 시간
      oceanRef.current.position.x = Math.sin(elapsedTime * 2) * 0.07;
      oceanRef.current.position.y = Math.sin(elapsedTime * 2) * 0.07; // Y축 위치 변화
    }
  });

  useEffect(() => {
    console.log(oceanRef);
  }, []);

  return (
    <Ocean
      ref={oceanRef} // Ocean 컴포넌트에 ref 추가
      dimensions={[10000, 10000]}
      normals={"./waternormals.png"}
      distortionScale={20}
      size={10}
      position={[0, 5, 0]}
      options={{
        clipBias: 0,
        waterNormals: null,
        sunDirection: new Vector3(0.70707, 0.70707, 0),
        sunColor: 0xffd700,
        waterColor: 0x0077be,
        eye: new Vector3(0, 0, 0),
        distortionScale: 3.7,
        side: THREE.FrontSide,
      }}
    />
  );
};
