import type { RoomInfo } from "server-types";

export interface SocketJoinRoomError {
  username?: string;
  room?: string;
}

export interface SocketJoinRoomData {
  username: string;
  room: string;
}

export interface SocketJoinRoomResponse {
  success: boolean;
  room: RoomInfo;
}

export interface SocketGetRoomsResponse {
  rooms: { name: string; userCount: number; max: number }[];
}
