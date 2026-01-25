// intern
import { EVENT_CAN_JOIN_ROOM } from "../constants/events";
import { validateJoinRoom } from "../validate/joinRoom";

// types
import type { AppSocket } from "../types/socket";

export function registerHandlers(socket: AppSocket) {
  socket.on(EVENT_CAN_JOIN_ROOM, (payload, callback) => {
    const result = validateJoinRoom(socket, payload);
    if (!result.status) {
      callback({ success: result.status, error: result.error });
      return;
    }

    callback({ success: true, data: { roomName: result.roomName, username: result.username } });
  });
}
