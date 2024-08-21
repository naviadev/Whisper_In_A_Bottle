import { Server as HttpServer } from "http";
import { Socket } from "net";

import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";

import { initSocket } from "../../components/socket/socket_instance";

interface SocketServer extends HttpServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: Socket & {
    server: SocketServer;
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
): void {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Initializing Socket.io");
    const io = initSocket(res.socket.server as SocketServer);
    res.socket.server.io = io;
  }
  res.end();
}
