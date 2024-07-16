import User from "@shared/DTO/user";
import axios, { AxiosResponse } from "axios";

/**
 * CHECKLIST
 * [ ] 모듈 테스트
 */
export const RegisterModel = async (registerData: User): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      "/register",
      registerData,
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default RegisterModel;
