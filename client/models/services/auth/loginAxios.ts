import REQUEST_PORT from "../../../ts/enums/REQUEST_PORT.enum";
import IPlayerDTO from "../../../ts/DTOs/IPlayerDTO";

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

const LoginAxios = async (user: IPlayerDTO): Promise<boolean> => {
  try {
    const response = await fetch(REQUEST_PORT.__LOGIN_PORT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    //* response.ok인 경우는 다음과 같습니다
    //* 1. Http Status Code 200 ~ 299
    //* 2. 네트워크 오류가 없이 옳바르게 전송되었을 떄
    //* 둘 중 하나라도 만족하면 true입니다.
    if (!response.ok) {
      throw new Error("Network Error");
    }
    // 응답 본문을 JSON으로 파싱
    const data: LoginResponse = await response.json();

    // 성공 여부를 반환
    return data.success;
  } catch (error) {
    console.error("An error occurred during login:", error);
    return false;
  }
};

export default LoginAxios;
