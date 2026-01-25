import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@app/shared";
import { PUBLIC_SERVER_ADDRESS, PUBLIC_SERVER_PORT } from "$env/static/public";

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: AppSocket | null = null;

export function getSocket(): AppSocket {
  if (socket) {
    return socket;
  }

  socket = io(`${PUBLIC_SERVER_ADDRESS}:${PUBLIC_SERVER_PORT}`, {
    transports: ["websocket"],
    timeout: 5000
  });

  return socket;
}
