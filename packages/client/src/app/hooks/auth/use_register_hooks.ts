import { useState } from "react";

import axios, { AxiosResponse } from "axios";

export interface Player {
  id: string;
  password: string;
}

enum REQUEST_PORT {
  __LOGIN_PORT = "http://localhost:3001/auth/login",
  __NEXT_SERVER_PORT = "http://localhost:3000",
  __REGISTER_PORT = "http://localhost:3001/register",
  __LETTER_SERVER_PORT = "http://localhost:3002",
}

const RegisterAxios = async (registerData: Player): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__REGISTER_PORT,
      registerData
    );

    console.log(response.data.message);
    console.log(response.status);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("중복");
    console.error(err);
    return false;
  }
};

const ValidateId = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{5,12}$/;
  return regex.test(id);
};


const ValidatePassword = (pw: string): boolean => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/;
  return regex.test(pw);
};


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
      password: password
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
    handleRegister
  };
};

export default useRegisterHooks;
