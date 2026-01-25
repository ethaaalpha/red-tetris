import type { Server, Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@app/shared";

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type AppServer = Server<ClientToServerEvents, ServerToClientEvents>;
