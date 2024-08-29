"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

type ViewContextType = {
  onLetterView: boolean;
  setOnLetterView: (value: boolean) => void;
  receivedLetter: boolean;
  setReceivedLetter: (value: boolean) => void;
  sendLetter: boolean;
  setSendLetter: (value: boolean) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //편지수신 -> 수신버튼에 전달됨 false가 기본. 소켓이 도착하면 true로 전환.
  const [onLetterView, setOnLetterView] = useState(false);
  //도착한 편지 열람 -> true전환 시 편지 열람창이 활성화.
  const [receivedLetter, setReceivedLetter] = useState(false);
  //편지작성 -> 작성버튼에 전달됨 flase가 기본. 작성 요청시 true. 편지가 전송되면 다시 flase로 전환.
  const [sendLetter, setSendLetter] = useState(false);

  return (
    <ViewContext.Provider
      value={{
        onLetterView,
        setOnLetterView,
        receivedLetter,
        setReceivedLetter,
        sendLetter,
        setSendLetter,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within an ViewProvider");
  }
  return context;
};
