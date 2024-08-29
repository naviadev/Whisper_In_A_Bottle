"use client";
import React, { createContext, useState, useContext } from "react";

type MinimapContextType = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
};

const MinimapContext = createContext<MinimapContextType | undefined>(undefined);

export const MinimapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //로그인, 회원가입 컴포넌트 전환을 위한 상태
  //회원가입을 요청하면 false로 전환
  //로그인을 요청하면 ture로 전환
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MinimapContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </MinimapContext.Provider>
  );
};

export const useMinimap = () => {
  const context = useContext(MinimapContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
