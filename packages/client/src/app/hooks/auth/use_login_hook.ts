"use client";
import { useState } from "react";

import axios, { AxiosResponse } from "axios";
import { useAll } from "@client/src/app/context/all_context";

enum REQUEST_PORT {
  __LOGIN_PORT = "http://localhost:3001/auth/login",
  __NEXT_SERVER_PORT = "http://localhost:3000",
  __REGISTER_PORT = "http://localhost:3001/register",
  __LETTER_SERVER_PORT = "http://localhost:3002",
}

const ValidateId = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{5,12}$/;
  return regex.test(id);
};

export interface Player {
  id: string;
  password: string;
}

const LoginAxios = async (user: Player): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__LOGIN_PORT,
      user,
      {
        withCredentials: true, // 요청에 쿠키를 포함하여 서버가 클라이언트를 인증
      }
    );

    const data = response.data;

    // 성공 여부를 반환
    return data.success;
  } catch (error) {
    console.error("An error occurred during login:", error);
    return false;
  }
};

const useLoginHooks = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { getToken, setGetToken } = useAll();

  const handleLogin = async (): Promise<boolean> => {
    //* 공백이 있으면 안됨
    if (id.trim() === "" || password.trim() === "") {
      return false;
    }
    //* 유효하지 않는 이메일 형식
    if (!ValidateId(id)) {
      return false;
    }
    const success = await LoginAxios({ id: id, password: password });
    if (success) {
      //로그인 성공시 getToken상태 true로 전환
      setGetToken(true);
      return true;
    } else {
      console.error("로그인 실패");
      return false;
    }
  };
  //* React Hook 반환.
  return {
    id,
    password,
    setId,
    setPassword,
    handleLogin,
  };
};

export default useLoginHooks;