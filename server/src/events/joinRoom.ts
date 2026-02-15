import { EVENT_JOIN_ROOM, EVENT_ROOM_UPDATE } from "@app/shared";

import { joinOrCreateRoom } from "@app/core/room";
import { setUser } from "@app/core/user";
import { User } from "@app/objects/User";
import type { AppServer, ServerSocket } from "@app/types/socket";
import { logger } from "@app/utils/log";
import { validateJoinRoom } from "@app/validate/joinRoom";

export function registerHandlers(io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_JOIN_ROOM, (payload, callback) => {
    const result = validateJoinRoom(socket, payload);
    if (!result.status) {
      callback({ success: false, error: result.error });
      return;
    }

    const user = new User(socket.id, result.username, socket);
    setUser(socket.id, user);

    const room = joinOrCreateRoom(user, result.room);
    socket.join(result.room);

    io.to(result.room).emit(EVENT_ROOM_UPDATE, room.asInfo());

    logger.info(`User ${user.name} (id: ${user.id}) joined room "${result.room}"`);

    callback({
      success: true,
      data: { room: result.room, username: result.username, color: user.color }
    });
  });
}
