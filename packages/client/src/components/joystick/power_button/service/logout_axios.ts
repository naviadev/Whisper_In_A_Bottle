//axios 로그아웃 요청
import axios, { AxiosResponse } from "axios";
import { Player } from "@client/src/ts/interface/player.interface";
import { REQUEST_PORT } from "@client/src/ts/enum/REQUEST_PORT";

export const logoutAxios = async (logoutData: Player): Promise<boolean> => {
  try {
    console.log("로그아웃 요청");
    const response: AxiosResponse = await axios.post(
      REQUEST_PORT.__LOGOUT_PORT,
      logoutData
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
