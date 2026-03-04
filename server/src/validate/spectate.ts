import z from "zod";

import type { EventSpectatePayload } from "@app/shared";

import {
  ERROR_NOT_IN_A_ROOM,
  ERROR_NOT_IN_GAME,
  ERROR_PLAYER_DEAD,
  ERROR_SELF_DEAD,
  ERROR_USER_NOT_FOUND
} from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import type { Player } from "@app/objects/Player";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

import { formatSchemeError, usernameValidation } from "./validation";

const schema = z.object({
  username: usernameValidation
});

type ValidateSpectateSuccess = {
  status: true;
  currentPlayer: Player;
  spectatedPlayer: Player;
};

type ValidateSpectateResult = ValidateSpectateSuccess | ValidateError;

export function validateSpectate(
  socket: ServerSocket,
  payload: EventSpectatePayload
): ValidateSpectateResult {
  const result = schema.safeParse(payload);
  console.log("lol0");

  if (!result.success) {
    return { status: false, error: formatSchemeError(result.error) };
  }

  console.log("lol1");

  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (!current || !room) {
    return { status: false, error: { room: ERROR_NOT_IN_A_ROOM } };
  }

  console.log("lol2");
  if (!room.game || !room.game.ongoing) {
    return { status: false, error: { user: ERROR_NOT_IN_GAME } };
  }

  console.log("lol3");
  const currentPlayer = room.game.getPlayer(current.id);
  if (!currentPlayer.alive) {
    return { status: false, error: { user: ERROR_SELF_DEAD } };
  }

  console.log("lol4");
  const userToSpectate = room.get(result.data.username);
  if (!userToSpectate) {
    return { status: false, error: { user: ERROR_USER_NOT_FOUND } };
  }

  console.log("lol5");
  if (!room.userExists(userToSpectate)) {
    return { status: false, error: { room: ERROR_USER_NOT_FOUND } };
  }

  console.log("lol6");
  const playerToSpectate = room.game.getPlayer(userToSpectate.id);
  if (!playerToSpectate.alive) {
    return { status: false, error: { user: ERROR_PLAYER_DEAD } };
  }

  return {
    status: true,
    currentPlayer,
    spectatedPlayer: playerToSpectate
  };
}
