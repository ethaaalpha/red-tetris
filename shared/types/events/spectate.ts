import type { GameData } from "../game";

export type EventSpectatePayload = {
  username: string;
};

export type EventSpectateSuccess = {
  username: string;
  gameData: GameData;
};

export type EventSpectateError = void;
