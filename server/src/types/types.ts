export interface GetRoomsData {
  name: string;
  userCount: number;
  max: number;
}

export interface RoomInfo {
  name: string;
  players: string[];
  userCount: number;
  max: number;
  host: string;
}

export interface SocketKickData {
  username: string;
  room: string;
}

export type Callback = (err: unknown, response?: unknown) => void;
