// intern
import { INEXISTING_ROOM, USER_NOT_FOUND } from "../constants/error";
import { getRoomBySocket } from "../core/room";
import { getUser } from "../core/user";

// types
import type { Room } from "../objects/Room";
import type { User } from "../objects/User";
import type { Socket } from "socket.io";
import { INEXISTING_ROOM, USER_NOT_FOUND } from "../constants/validateErrors";
import type { ValidateError } from "../types/server";

type ValidateLeaveRoomSuccess = {
  status: true;
  current: User;
  room: Room;
};

type ValidateLeaveRoomResult = ValidateLeaveRoomSuccess | ValidateError;

export function validateLeaveRoom(socket: Socket): ValidateLeaveRoomResult {
  const current = getUser(socket.id);

  if (current === undefined) {
    return { status: false, error: { room: USER_NOT_FOUND } };
  }

  const room = getRoomBySocket(socket);
  if (room === undefined) {
    return { status: false, error: { room: INEXISTING_ROOM } };
  }

  return { status: true, room, current };
}
