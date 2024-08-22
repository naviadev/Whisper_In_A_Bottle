// components/SocketProvider.tsx
import { useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

import { SocketContext } from "../socket/socket_context";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3002", {
      withCredentials: true
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
