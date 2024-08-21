import { useState } from "react";

import RegisterAxios from "../../models/services/auth/registerAxios";
import ValidateId from "../../models/validators/validate_id";
import ValidatePassword from "../../models/validators/validate_password";

const useRegisterHooks = () => {
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

    const success: boolean = await RegisterAxios({
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

export default useRegisterHooks;
