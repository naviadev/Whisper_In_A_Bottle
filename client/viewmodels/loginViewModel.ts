import { useState } from "react";

import { ValidateEmail } from "@client/models/ValidateEmail";

import { login } from "../models/login";

/**
 * * Login View와 Model(login, ValidateEmail) 상호 작용하는 ViewModel
 * * SPR원칙, UI 상태를 관리하고, 사용자 입력을 처리하며, Model과 상호작용하는 책임
 * * UI와 독립적으로 테스트 할 수 있다는 장점이 있음
 * @returns React Hook
 */
const useLoginViewModel = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = async (): Promise<boolean> => {
    //* 공백이 있으면 안됨
    if (id.trim() === "" || password.trim() === "") {
      return false;
    }

    //* 유효하지 않는 이메일 형식
    if (!ValidateEmail(id)) {
      return false;
    }

    const success = await login({ id: id, password: password });
    if (success) {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  //* React Hook 반환.
  return {
    id,
    password,
    isLoggedIn,
    setId,
    setPassword,
    handleLogin,
  };
};

export default useLoginViewModel;
