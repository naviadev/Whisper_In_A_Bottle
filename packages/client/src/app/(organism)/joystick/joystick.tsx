// src/client/joystick/joystick.tsx
import React from "react";
import { useJoystick } from "./context/joystick_context";

import { useAll } from "@client/src/app/context/all_context";

import { PowerButton } from "@client/src/components/joystick/power_button/power_button";

import { LogoutModalContent } from "@client/src/components/joystick/logout_modal/logout_modal_content";

import Modal from "@client/components/modal/modal";

const Joystick: React.FC = () => {
  const { showModal, setShowModal } = useJoystick();
  const { getToken } = useAll();

  const clickPowerButton = () => (getToken ? setShowModal(!showModal) : null);

  const closeModal= ()=>{
    setShowModal(!showModal);
  }
  return (
    <div className="">
      <p>Joystick Component</p>
      {/* Joystick에 대한 추가 콘텐츠를 여기에 삽입할 수 있습니다 */}
      <PowerButton onClick={clickPowerButton} />
      {showModal ? (
        <Modal isOpen={showModal} onClose={closeModal}>
          <LogoutModalContent />
        </Modal>
      ) : null}
    </div>
  );
};

export default Joystick;
