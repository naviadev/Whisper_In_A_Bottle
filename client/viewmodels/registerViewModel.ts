import { useState } from "react";

import { ValidatePassword } from "@client/models/auth/ValidatePassword";
import { ValidateId } from "@client/models/auth/ValidateId";
// eslint-disable-next-line import/no-named-as-default
import RegisterModel from "@client/models/auth/register";

/**
 * CHECKLIST
 * [ ] Register Model 적용 후 테스트
 * [ ] Register Form에 정상적으로 적용되는 지 테스트
 */

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
    setId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    isRegister,
    handleRegister,
  };
};

export default useRegisterViewModel;
