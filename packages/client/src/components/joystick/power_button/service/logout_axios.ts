//axios 로그아웃 요청
import axios, { AxiosResponse } from "axios";
import { REQUEST_PORT } from "@client/src/ts/enum/REQUEST_PORT";

export const logoutAxios = async (): Promise<boolean> => {
  try {
    console.log("로그아웃 요청");
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__LOGOUT_PORT,
      {},
      {
        withCredentials: true, // 쿠키를 함께 보내기 위해 설정
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("로그아웃 실패");
    console.error(err);
    return false;
  }
};
