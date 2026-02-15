import { EVENT_ROOM_UPDATE, EVENT_USER_DISCONNECT } from "@app/shared";

import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { AppServer, ServerSocket } from "@app/types/socket";
import { logger } from "@app/utils/log";

export function registerHandlers(io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_USER_DISCONNECT, () => {
    const user = getUser(socket.id);
    const room = getRoomBySocket(socket);

    if (user && room) {
      const roomInfo = room.remove(user);

      socket.leave(room.name);
      io.to(room.name).emit(EVENT_ROOM_UPDATE, roomInfo);

      logger.info(`User ${user.name} (id: ${user.id}) disconnected`);
    } else {
      logger.info(`A user disconnected`);
    }
  });
}
