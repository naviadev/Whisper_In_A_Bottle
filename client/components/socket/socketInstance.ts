//소켓io 싱글톤 관리
import { Server as HttpServer } from "http";

import { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export const initSocket = (server: HttpServer): IOServer => {
  if (!io) {
    io = new IOServer(server, {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  return io;
};

export const getSocket = (): IOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
