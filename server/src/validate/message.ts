import z from "zod";

import type { EventMessagePayload } from "@app/shared";

import { ERROR_NOT_IN_A_ROOM } from "@app/constants/validateErrors";
import { getRoomBySocket } from "@app/core/room";
import { getUser } from "@app/core/user";
import { Room } from "@app/objects/Room";
import type { User } from "@app/objects/User";
import type { ServerSocket } from "@app/types/socket";
import type { ValidateError } from "@app/types/validate";

import { formatSchemeError, messageValidation } from "./validation";

const schema = z.object({
  message: messageValidation
});

type ValidateChatSuccess = {
  status: true;
  current: User;
  message: string;
  room: Room;
};

type ValidateChatResult = ValidateChatSuccess | ValidateError;

export function validateMessage(
  socket: ServerSocket,
  data: EventMessagePayload
): ValidateChatResult {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { status: false, error: formatSchemeError(result.error) };
  }

  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (!current || !room) {
    return { status: false, error: { room: ERROR_NOT_IN_A_ROOM } };
  }

  return { status: true, current, message: result.data.message, room: room };
}
