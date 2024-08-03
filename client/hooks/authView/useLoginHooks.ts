import { useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

import ROUTE_PATH from "../../ts/enums/PATH.enum";
import ValidateId from "../../models/validators/ValidateId";
import LoginAxios from "../../models/services/loginAxios";

/**
 * * Function : useLoginHooks
 * 작성자 : @jaemin1005 / 2024-07-?
 * 편집자 : @naviadev / 2024-07-28
 * Issue : WIB-27
 * @function useLoginHooks
 * @description 

 */
const useLoginHooks = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  const handleLogin = async (): Promise<boolean> => {
    //* 공백이 있으면 안됨
    if (id.trim() === "" || password.trim() === "") {
      return false;
    }

    //* 유효하지 않는 이메일 형식
    if (!ValidateId(id)) {
      return false;
    }

    const success = await LoginAxios({ id: id, password: password });
    if (success) {
      setIsLoggedIn(true);

      //로그인 성공 시 새로운 socket 인스턴스 생성
      if (!socket) {
        const newSocket: Socket = io();
        setSocket(newSocket);

        newSocket.on("connect", () => {
          console.log("Socket connected:", newSocket.id);
          newSocket.emit("initial_data", id);
        });

        newSocket.on("data_received", (data) => {
          console.log("Server acknowledgment:", data);
        });
      } else {
        socket.emit("initial_data", id);
      }

      router.push(ROUTE_PATH.__LETTER_VIEW);

      return true;
    } else {
      console.error("로그인 실패");
      return false;
    }
  };

  //* React Hook 반환.
  return {
    id,
    password,
    isLoggedIn,
    setId,
    setPassword,
    handleLogin,
  };
};

export default useLoginHooks;
