import type { RoomData } from "@app/shared";

export type EventJoinRoomPayload = {
  roomName: string;
  username: string;
};

export type EventJoinRoomSuccess = {
  roomName: string;
  username: string;
  roomInfo: RoomData;
};

export type EventJoinRoomError = Partial<EventJoinRoomPayload>;
