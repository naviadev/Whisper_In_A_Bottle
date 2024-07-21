import User from "@shared/DTO/user";

export const login = async (user: User): Promise<boolean> => {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  //* res.ok인 경우는 다음과 같습니다
  //* 1. Http Status Code 200 ~ 299
  //* 2. 네트워크 오류가 없이 옳바르게 전송되었을 떄
  //* 둘 중 하나라도 만족하면 true입니다.
  if (!res.ok) {
    throw new Error("Network Error");
  }

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
