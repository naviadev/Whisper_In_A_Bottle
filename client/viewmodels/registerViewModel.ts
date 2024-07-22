import { useState } from "react";

import { ValidatePassword } from "@client/models/auth/ValidatePassword";
import { ValidateId } from "@client/models/auth/ValidateId";
import RegisterModel from "@client/models/auth/register";

const useRegisterViewModel = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleRegister = async (): Promise<boolean> => {
    if (
      id.trim() === "" ||
      password.trim() === "" ||
      !ValidatePassword(password) ||
      !ValidateId(id) ||
      password !== passwordCheck
    ) {
      return false;
    }

    const success: boolean = await RegisterModel({
      id: id,
      password: password,
    });

    setIsRegister(success);
    return success;
  };

  return {
    id,
    password,
    passwordCheck,
    isRegister,
    setId,
    setPassword,
    setPasswordCheck,
    handleRegister,
  };
};

export default useRegisterViewModel;
