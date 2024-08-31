// components/SocketProvider.tsx
import { SocketContext } from "@client/src/app/context/socket_context";
import { useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:80", {
      withCredentials: true,
      // WebSocket 프로토콜을 사용 - 2024/08/27 : proxy 연결을 위해 사용.
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
