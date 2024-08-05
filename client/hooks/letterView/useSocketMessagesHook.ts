/* eslint-disable import/no-unresolved */
// src/hooks/useSocketMessages.ts
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSocket } from "components/socket/SocketContext";
import { getCookie } from "src/getCookie";

interface UserJwtPayload extends JwtPayload {
  id?: string;
}

const useSocketMessagesHook = () => {
  const socket = useSocket();
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (socket) {
      const userToken = getCookie("token")!;
      const decodedToken = jwtDecode<UserJwtPayload>(userToken);
      const userId = decodedToken.sub;
      socket.emit("initial_data", userId);

      socket.on("latte", (message) => {
        setReceivedMessage(message);
      });
    }

    return () => {
      socket?.off("latte");
      socket?.disconnect();
    };
  }, [socket]);

  return { receivedMessage, setReceivedMessage };
};

export default useSocketMessagesHook;
