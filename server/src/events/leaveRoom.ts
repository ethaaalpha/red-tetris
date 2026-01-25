// intern
import { EVENT_LEAVE_ROOM, EVENT_ROOM_UPDATE } from "../constants/events";
import { removeUserFromRoom } from "../core/room";
import { validateLeaveRoom } from "../validate/leaveRoom";

// types
import type { AppServer, AppSocket } from "../types/socket";

export function registerHandlers(io: AppServer, socket: AppSocket) {
  socket.on(EVENT_LEAVE_ROOM, (callback) => {
    const result = validateLeaveRoom(socket);
    if (!result.status) {
      callback({ success: false, error: result.error });
      return;
    }

    const roomInfo = removeUserFromRoom(result.current, result.room);
    io.to(result.room.name).emit(EVENT_ROOM_UPDATE, roomInfo);

    console.log(`User ${result.current.name} left room ${result.room.name}`);

    callback({ success: true });
  });
}
