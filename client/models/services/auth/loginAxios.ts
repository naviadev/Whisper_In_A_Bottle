import axios, { AxiosResponse } from "axios";

import REQUEST_PORT from "../../../ts/enums/REQUEST_PORT.enum";
import IPlayerDTO from "../../../ts/DTOs/IPlayerDTO";

const LoginAxios = async (user: IPlayerDTO): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__LOGIN_PORT,
      user,
      {
        withCredentials: true, // 요청에 쿠키를 포함하여 서버가 클라이언트를 인증
      },
    );

    const data = response.data;

    // 성공 여부를 반환
    return data.success;
  } catch (error) {
    console.error("An error occurred during login:", error);
    return false;
  }
};

export default LoginAxios;
