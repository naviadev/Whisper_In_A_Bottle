//전역 관리 상태를 정의한다.
"use client";
import React, { createContext, useState, useContext } from "react";

type AllContextType = {
  getToken: boolean;
  setGetToken: (value: boolean) => void;
};

const AllContext = createContext<AllContextType | undefined>(undefined);

export const AllProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //토큰 확인 상태
  //로그인성공 시 true로 전환되며 소켓이 연결됨.
  //로그아웃 시 false로 전환되며 소켓 연결이 취소됨.
  const [getToken, setGetToken] = useState(false);

  return (
    <AllContext.Provider
      value={{
        getToken,
        setGetToken,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAll = () => {
  const context = useContext(AllContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
