import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
