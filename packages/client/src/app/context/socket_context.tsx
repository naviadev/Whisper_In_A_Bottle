"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { io, Socket } from "socket.io-client";

import { useAll } from "./all_context";

enum REQUEST_PORT {
  __SOCKET = "http://localhost:3002",
}

type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  //토큰이 존재하는 상태의 소켓 연결을 허용하기 위함.
  const { getToken, setGetToken } = useAll();

  useEffect(() => {
    if (getToken) {
      const socketInstance = io(REQUEST_PORT.__SOCKET, {
        withCredentials: true,
      });
      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [getToken]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within an SocketProvider");
  }
  return context;
};
