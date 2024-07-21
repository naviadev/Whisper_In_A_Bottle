import User from "@shared/DTO/user";
import axios, { AxiosResponse } from "axios";

/**
 * * Function : RegisterModel
 * 작성자 : @naviadev / 2024-07-20
 * 편집자 : @naviadev / 2024-07-20
 * Issue : WIB-14
 * @description : 'RESTful API 서버로 요청을 보내는 Axios 모듈'
 */
const RegisterModel = async (registerData: User): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      "http://localhost:3001/register",
      registerData,
    );

    console.log(response);

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
