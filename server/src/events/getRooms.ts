// intern
import { ROOM_MAX_USERS } from "../constants/core";
import { EVENT_GET_ROOMS } from "../constants/events";
import { getRooms } from "../core/room";

// types
import type { RoomListData } from "@app/shared";
import type { AppSocket } from "../types/socket";

export function registerHandlers(socket: AppSocket) {
  socket.on(EVENT_GET_ROOMS, (callback) => {
    const result: RoomListData[] = [];

    getRooms().forEach((room) => {
      if (room.playing) {
        return;
      }
      result.push({
        name: room.name,
        userCount: room.users.size,
        max: ROOM_MAX_USERS
      });
    });

    callback({ success: true, data: result });
  });
}
