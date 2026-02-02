import type { RoomData } from "../room";

export type EventJoinRoomPayload = {
  room: string;
  username: string;
};

export type EventJoinRoomSuccess = {
  room: string;
  username: string;
  roomInfo: RoomData;
};

export type EventJoinRoomError = Partial<EventJoinRoomPayload>;
