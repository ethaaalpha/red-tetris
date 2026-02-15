import { EVENT_GAME_START } from "@app/shared";

import { gameLoop } from "@app/core/runners";
import type { AppServer, ServerSocket } from "@app/types/socket";
import { validateStart } from "@app/validate/start";

export function registerHandlers(io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_GAME_START, (payload, callback) => {
    const result = validateStart(socket, payload);
    if (!result.status) {
      callback({ success: false });
      return;
    }

    const room = result.room;
    room.start();

    io.to(result.room.name).emit(EVENT_GAME_START, room.asInfo());
    gameLoop(io, room, result.GameSettings);
    callback({ success: true });
  });
}
