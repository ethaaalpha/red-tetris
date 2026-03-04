import { EVENT_GAME_SPECTATE } from "@app/shared";

import type { AppServer, ServerSocket } from "@app/types/socket";
import { logger } from "@app/utils/log";
import { validateSpectate } from "@app/validate/spectate";

export function registerHandlers(_io: AppServer, socket: ServerSocket) {
  socket.on(EVENT_GAME_SPECTATE, (callback) => {
    const result = validateSpectate(socket);
    if (!result.status) {
      callback({ success: false });
      return;
    }

    result.spectatedPlayer.spectators.push(result.currentPlayer);
    logger.info(
      `User ${result.currentPlayer.user.name} (id: ${result.currentPlayer.user.id}) is spectating
       user ${result.spectatedPlayer.user.name} (id: ${result.spectatedPlayer.user.id})`
    );

    callback({ success: true, data: { username: result.spectatedPlayer.user.name } });
  });
}
