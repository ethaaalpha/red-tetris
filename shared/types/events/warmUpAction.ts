import type { GameAction, GameData } from "../game"

export type EventWarmUpActionPayload = {
  action: GameAction
}

export type EventWarmUpActionSuccess = GameData;

export type EventWarmUpActionError = void;
