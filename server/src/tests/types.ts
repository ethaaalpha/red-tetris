import { Server as IoServer, type Socket as ServerSocket } from "socket.io";
import { type Socket as ClientSocket } from "socket.io-client";

export interface TestServerData {
  io: IoServer;
  test1: TestSocket;
  address: string;
}

export interface TestSocket {
  client: ClientSocket;
  server: ServerSocket;
}
