import { useState } from "react";

import RegisterAxios from "../../models/services/registerAxios";
import ValidateId from "../../models/validators/ValidateId";
import ValidatePassword from "../../models/validators/ValidatePassword";

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
      playerID: id,
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
