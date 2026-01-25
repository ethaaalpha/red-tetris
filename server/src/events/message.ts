// intern
import { EVENT_MESSAGE } from "../constants/events";
import { validateMessage } from "../validate/message";

// types
import type { AppServer, AppSocket } from "../types/socket";

export function registerHandlers(io: AppServer, socket: AppSocket) {
  socket.on(EVENT_MESSAGE, (payload, callback) => {
    const result = validateMessage(socket, payload);
    if (!result.status) {
      callback({ success: false, error: result.error });
      return;
    }

    io.to(result.room.name).emit(EVENT_MESSAGE, {
      from: result.current.name,
      color: result.current.color,
      message: result.message
    });

    console.log(`user ${result.current.name} wrote: "${result.message}" to ${result.room.name} `);

    callback({ success: true });
  });
}
