import type { EventChangeColorPayload, UserColor } from "@app/shared";

import {
  ERROR_COLOR_UNAVAILABLE,
  ERROR_INEXISTING_ROOM,
  ERROR_USER_NOT_FOUND
} from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { Room } from "@app/objects/Room";
import type { User } from "@app/objects/User";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

type ValidateChangeColorSuccess = {
  status: true;
  room: Room;
  current: User;
  colorIndex: number;
  color: UserColor;
};

type ValidateChangeColorResult = ValidateChangeColorSuccess | ValidateError;

export function validateChangeColor(
  socket: ServerSocket,
  payload: EventChangeColorPayload
): ValidateChangeColorResult {
  const current = getUser(socket.id);

  if (current === undefined) {
    return { status: false, error: { room: ERROR_USER_NOT_FOUND } };
  }

  const room = getRoomBySocket(socket);
  if (room === undefined) {
    return { status: false, error: { room: ERROR_INEXISTING_ROOM } };
  }

  const index = room.colors.indexOf(payload.color);
  if (index === -1) {
    return { status: false, error: { room: ERROR_COLOR_UNAVAILABLE } };
  }

  return { status: true, room, current, colorIndex: index, color: payload.color };
}
