//소켓io 싱글톤 관리
import { Server as HttpServer } from "http";

import { Server as IOServer } from "socket.io";

import REQUEST_PORT from "../../ts/enums/REQUEST_PORT.enum";

let io: IOServer | null = null;

export const initSocket = (server: HttpServer): IOServer => {
  if (!io) {
    io = new IOServer(server, {
      cors: {
        origin: REQUEST_PORT.__LETTER_SERVER_PORT,
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
