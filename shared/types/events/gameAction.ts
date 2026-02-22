import type { GameActions } from "../../enums/actions";
import type { GameData } from "../game";

export type EventGameActionPayload = {
  action: GameActions;
};

export type EventGameActionSuccess = GameData;

export type EventGameActionError = void;
