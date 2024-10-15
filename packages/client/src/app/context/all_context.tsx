//전역 관리 상태를 정의한다.
"use client";
import { REQUEST_PORT } from "@client/src/ts/enum/REQUEST_PORT";
import axios from "axios";
import React, { createContext, useState, useContext, useCallback } from "react";

type AllContextType = {
  getToken: boolean;
  setGetToken: (value: boolean) => void;
  userId: string;
  setUserId: (value: string) => void;
  reqLogin: (id: string, password: string) => Promise<void>;
  reqLogout: () => Promise<void>;
};

const AllContext = createContext<AllContextType | undefined>(undefined);

export const AllProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //토큰 확인 상태
  //로그인성공 시 true로 전환되며 소켓이 연결됨.
  //로그아웃 시 false로 전환되며 소켓 연결이 취소됨.
  const [getToken, setGetToken] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const reqLogin = useCallback(
    async (id: string, password: string): Promise<void> => {
      try {
        const response = await axios.post(
          REQUEST_PORT.__LOGIN_PORT,
          {
            id,
            password,
          },
          {
            // 처음 로그인하는데 쿠키가 필요?
            withCredentials: true,
          }
        );

        const data = response.data;

        if (data.success) {
          setUserId(id);
          setGetToken(true);
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    },
    []
  );

  const reqLogout = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.post(REQUEST_PORT.__LOGOUT_PORT, null, {
        withCredentials: true,
      });

      if (response.status == 200) {
        setUserId("");
        setGetToken(false);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  }, []);

  return (
    <AllContext.Provider
      value={{
        getToken,
        setGetToken,
        userId,
        setUserId,
        reqLogin,
        reqLogout,
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
