import { EVENT_MESSAGE } from "@app/shared";

import type { AppServer, ServerSocket } from "@app/types/socket";
import { logger } from "@app/utils/log";
import { validateMessage } from "@app/validate/message";

export function registerHandlers(io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_MESSAGE, (payload, callback) => {
    const result = validateMessage(socket, payload);
    if (!result.status) {
      callback({ success: false });
      return;
    }

    io.to(result.room.name).emit(EVENT_MESSAGE, {
      from: result.current.name,
      color: result.current.color,
      message: result.message
    });

    logger.info(
      `User ${result.current.name} (id: ${result.current.id}) has sent a message in room "${result.room.name}": "${result.message}"`
    );

    callback({ success: true });
  });
}
