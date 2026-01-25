export type EventKickPayload = {
  username: string;
};

export type EventKickSuccess = void;

export type EventKickError = {
  username?: string;
};

export type EventKickData = {
  room: string;
};
