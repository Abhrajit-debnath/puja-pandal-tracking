"use client";

import { useUsersStore } from "@/store/useUsersStore";
import { ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const BACKEND_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || "8000";

let socket: Socket | null = null;

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const setUsersCount = useUsersStore((state) => state.setUsersCount);

  useEffect(() => {
    if (!socket) {
      socket = io(`http://localhost:${BACKEND_PORT}`, {
        transports: ["websocket"],
      });
    } else if (socket.disconnected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Connected to socket server with id:", socket?.id);
    };

    const handleUsers = (count: number) => {
      console.log("Received updated user count:", count);
      setUsersCount(count);
    };

    socket.on("connect", handleConnect);
    socket.on("users", handleUsers);

    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("users", handleUsers);
    };
  }, [setUsersCount]);

  return <>{children}</>;
};

export default SocketProvider;