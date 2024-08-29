import { useState } from "react";

import axios, { AxiosResponse } from "axios";

import { REQUEST_PORT } from "@client/src/ts/enum/REQUEST_PORT";

import { Player } from "@client/src/ts/interface/player.interface";

import { ValidateId } from "../../utils/validate_id";

const RegisterAxios = async (registerData: Player): Promise<boolean> => {
  try {
    console.log("회원가입 요청");
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__REGISTER_PORT,
      registerData
    );
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
      //TODO 각 상황에 맞는 에러처리 추가
      console.log("유효성검사 탈락");
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
