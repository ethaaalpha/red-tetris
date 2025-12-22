import type { SocketJoinRoomData } from "client-types";
import { Server, type Socket } from "socket.io";
import type { Callback } from "../types/types";
import { validateJoinRoom } from "../validate/room";

export function registerHandlers(io: Server, socket: Socket) {
  socket.on("can join room", (data: SocketJoinRoomData, callback: Callback) => {
    const errors = validateJoinRoom(socket, data);
    if (errors) {
      callback(false, errors);
      return;
    }
    callback(true);
  });
}
