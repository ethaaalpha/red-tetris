import { validateStart } from "../validate/start";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { Callback } from "../types/types";

export function registerHandlers(io: Server, socket: Socket) {
  socket.on("start", (callback: Callback) => {
    const result = validateStart(socket);
    if (!result.status) {
      callback(result.status, result.error);
      return;
    }

    const room = result.room;
    room.start();

    io.to(result.room.name).emit("room start", room.asInfo());
    // then send the board info (with the next 4 pieces) to each person

    callback(true);
  });
}
