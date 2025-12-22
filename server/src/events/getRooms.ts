import { Server, type Socket } from "socket.io";
import type { Callback, GetRoomsData } from "../types/types";
import { rooms } from "../objects/Room";
import { ROOM_MAX_USERS } from "../constants";

export function registerHandlers(io: Server, socket: Socket) {
  socket.on("get rooms", (callback: Callback) => {
    const result: GetRoomsData[] = [];

    rooms.forEach((room) => {
      result.push({
        name: room.name,
        userCount: room.users.size,
        max: ROOM_MAX_USERS
      });
    });

    callback(true, result);
  });
}
