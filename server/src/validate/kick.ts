import z from "zod";

import type { EventKickPayload } from "@app/shared";

import {
  ERROR_KICK_PLAYING,
  ERROR_KICK_SELF,
  ERROR_NOT_HOST,
  ERROR_NOT_IN_A_ROOM,
  ERROR_USER_NOT_FOUND
} from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { Room } from "@app/objects/Room";
import type { User } from "@app/objects/User";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

import { formatSchemeError, usernameValidation } from "./validation";

const schema = z.object({
  username: usernameValidation
});

type ValidateKickSuccess = {
  status: true;
  room: Room;
  current: User;
  targetUser: User;
};

export type ValidateKickResult = ValidateKickSuccess | ValidateError;

export function validateKick(socket: ServerSocket, data: EventKickPayload): ValidateKickResult {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { status: false, error: formatSchemeError(result.error) };
  }

  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (!current || !room) {
    return { status: false, error: { username: ERROR_NOT_IN_A_ROOM } };
  }
  if (result.data.username === current.name) {
    return { status: false, error: { username: ERROR_KICK_SELF } };
  }
  if (room.host != current) {
    return { status: false, error: { username: ERROR_NOT_HOST } };
  }
  if (room.game) {
    return { status: false, error: { username: ERROR_KICK_PLAYING } };
  }

  const targetUser = room.get(data.username);
  if (targetUser === undefined) {
    return { status: false, error: { username: ERROR_USER_NOT_FOUND } };
  }

  return { status: true, room, current, targetUser };
}
