import REQUEST_PORT from "../../../ts/enums/REQUEST_PORT.enum";
import IPlayerDTO from "../../../ts/DTOs/IPlayerDTO";

const LoginAxios = async (user: IPlayerDTO): Promise<boolean> => {
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

  if (response.status === 200) {
    const { token } = await response.json();
    localStorage.setItem("token", token);
    return true;
  } else {
    return false;
  }
};

export default LoginAxios;
