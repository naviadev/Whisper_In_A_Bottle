// components/SocketClient.tsx
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SocketClient: React.FC = () => {
  useEffect(() => {
    const socket: Socket = io();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default SocketClient;
