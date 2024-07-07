import { useState } from "react";

import { ValidateEmail } from "@client/models/ValidateEmail";

import { login } from "../models/login";

const useLoginViewModel = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = async (): Promise<boolean> => {
    if (id.trim() === "" || password.trim() === "") {
      return false;
    }

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
