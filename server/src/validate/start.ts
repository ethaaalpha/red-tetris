// intern
import { Room } from "../objects/Room";
import { NOT_HOST, NOT_IN_A_ROOM, PLAYING_ROOM } from "../constants/error";
import { getUser } from "../core/user";
import { getRoomBySocket } from "../core/room";

// types
import type { Socket } from "socket.io";
import { NOT_HOST, NOT_IN_A_ROOM, PLAYING_ROOM } from "../constants/validateErrors";
import type { ValidateError } from "../types/server";

type ValidateStartSuccess = {
  status: true;
  room: Room;
};

type ValideStartResult = ValidateStartSuccess | ValidateError;

export function validateStart(socket: Socket): ValideStartResult {
  const current = getUser(socket.id);
  const room = getRoomBySocket(socket);

  if (current === undefined || room === undefined) {
    return { status: false, error: { room: NOT_IN_A_ROOM } };
  }
  if (room.host != current) {
    return { status: false, error: { room: NOT_HOST } };
  }
  if (room.playing === true) {
    return { status: false, error: { room: PLAYING_ROOM } };
  }

  return { status: true, room };
}
