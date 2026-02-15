import z from "zod";

import type { EventWarmUpPayload, GameSettings } from "@app/shared";

import { ERROR_NOT_IN_A_ROOM, ERROR_PLAYING_ROOM } from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { User } from "@app/objects/User";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

import { formatSchemeError, tickValidation } from "./validation";

const schema = z.object({
  tick: tickValidation
});

type ValidateWarmUpSuccess = {
  status: true;
  current: User;
  GameSettings: GameSettings;
};

type ValidateWarmUpResult = ValidateWarmUpSuccess | ValidateError;

export function validateWarmUp(
  socket: ServerSocket,
  payload: EventWarmUpPayload
): ValidateWarmUpResult {
  const result = schema.safeParse(payload);

  if (!result.success) {
    return { status: false, error: formatSchemeError(result.error) };
  }
  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (current === undefined || room === undefined) {
    return { status: false, error: { room: ERROR_NOT_IN_A_ROOM } };
  }
  if (room.game) {
    return { status: false, error: { room: ERROR_PLAYING_ROOM } };
  }
  const GameSettings: GameSettings = {
    tick: result.data.tick
  };

  return { status: true, current: current, GameSettings: GameSettings };
}
