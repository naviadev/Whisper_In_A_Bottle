"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import { OceanScene } from "./ocean";
import BottleScene from "./bottle";
import HouseScene from "./house";
import KeyboardControlledCamera from "./KeyboardControlledCamera";
import { ReceivedLetter } from "./received_letter/received_letter";
import { WriteLetter } from "./write_letter/write_letter";
import { useSocket } from "@client/src/app/context/socket_context";
import { useEffect, useState } from "react";
import { useView } from "@client/src/app/(organism)/view/context/view_context";

export const CanvasComponent = () => {
  const socket = useSocket();
  const {
    onLetterView,
    setOnLetterView,
    receivedLetter,
    setReceivedLetter,
    receivedMessage,
    setReceivedMessage,
    sendLetter,
    setSendLetter,
  } = useView();

  useEffect(() => {
    if (socket) {
      //사용자가 연결 되었음을 알리기 위한 socket 이벤트. 내용은 비어있음.
      socket.emit("initial_data");

      socket.on("latte", (message: { [key: string]: string }) => {
        //편지 도착버튼을 활성화하기 위해 onLetterView를 true로 전환.
        setOnLetterView(true);
        setReceivedMessage(message.content);
      });
    }

    return () => {};
  }, [socket]);

  return (
    <div className="relative h-full">
      {receivedLetter && (
        <div className="absolute inset-0 z-10">
          <ReceivedLetter
            letterMessage={receivedMessage!}
            className="w-full h-full"
          />
        </div>
      )}
      {sendLetter && (
        <div className="absolute inset-0 z-20">
          <WriteLetter className="w-full h-full" />
        </div>
      )}
      <Canvas
        style={{ height: "100%", backgroundColor: "white" }}
        className="z-0 absolute"
        shadows
      >
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
          {onLetterView ? <BottleScene /> : null}
          <KeyboardControlledCamera />
        </Suspense>
        <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <OrbitControls maxAzimuthAngle={Math.PI} maxPolarAngle={Math.PI} />
      </Canvas>
    </div>
  );
};
