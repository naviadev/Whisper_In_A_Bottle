"use client";
import React, { createContext, useState, useContext } from "react";

type JoystickContextType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const JoystickContext = createContext<JoystickContextType | undefined>(
  undefined
);

export const JoysitckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //전원버튼 클릭시 모달창 띄우는 용도
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <JoystickContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </JoystickContext.Provider>
  );
};

export const useJoystick = () => {
  const context = useContext(JoystickContext);
  if (context === undefined) {
    throw new Error("useJoystick must be used within an JoystickProvider");
  }
  return context;
};
