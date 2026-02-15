import { EVENT_LEAVE_ROOM, EVENT_ROOM_UPDATE } from "@app/shared";

import { removeUserFromRoom } from "@app/core/room";
import type { AppServer, ServerSocket } from "@app/types/socket";
import { validateLeaveRoom } from "@app/validate/leaveRoom";

export function registerHandlers(io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_LEAVE_ROOM, (callback) => {
    const result = validateLeaveRoom(socket);
    if (!result.status) {
      callback({ success: false });
      return;
    }

    logger.info(
      `User ${result.current.name} (id: ${result.current.id}) left room "${result.room.name}"`
    );

    const roomInfo = removeUserFromRoom(result.current, result.room);
    io.to(result.room.name).emit(EVENT_ROOM_UPDATE, roomInfo);

    callback({ success: true });
  });
}
