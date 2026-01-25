import type { Socket as ClientSocket } from "socket.io-client";
import type { AppServer, AppSocket } from "../types/socket";

export interface TestServerData {
  io: AppServer;
  test1: TestSocket;
  address: string;
}

export interface TestSocket {
  client: ClientSocket;
  server: AppSocket;
}
