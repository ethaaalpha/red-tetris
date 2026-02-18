import z from "zod";

import type { EventGameActionPayload, GameActions } from "@app/shared";

import { ERROR_GAME_NOT_IN, ERROR_NOT_IN_A_ROOM } from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { Game } from "@app/objects/Game";
import type { Player } from "@app/objects/Player";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

import { actionValidation, formatSchemeError } from "./validation";

const schema = z.object({
  action: actionValidation
});

type ValidateGameActionSuccess = {
  status: true;
  game: Game;
  player: Player;
  action: GameActions;
};

type ValidateGameActionResult = ValidateGameActionSuccess | ValidateError;

export function validateGameAction(
  socket: ServerSocket,
  payload: EventGameActionPayload
): ValidateGameActionResult {
  const result = schema.safeParse(payload);

  if (!result.success) {
    return { status: false, error: formatSchemeError(result.error) };
  }

  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (!current || !room) {
    return { status: false, error: { room: ERROR_NOT_IN_A_ROOM } };
  }

  if (!room.game || !room.game.ongoing) {
    return { status: false, error: { user: ERROR_GAME_NOT_IN } };
  }

  const player = room.game.getPlayer(socket.id);

  return { status: true, game: room.game, player: player, action: result.data.action };
}
