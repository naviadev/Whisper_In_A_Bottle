// src/client/joystick/joystick.tsx
import React from "react";
import { useJoystick } from "./context/joystick_context";

import { PowerButton } from "@client/src/components/joystick/power_button/power_button";

const Joystick: React.FC = () => {
  const {showModal, setShowModal} = useJoystick();
  return (
    <div className="">
      <p>Joystick Component</p>
      {/* Joystick에 대한 추가 콘텐츠를 여기에 삽입할 수 있습니다 */}
      <PowerButton />
    </div>
  );
};

export default Joystick;
