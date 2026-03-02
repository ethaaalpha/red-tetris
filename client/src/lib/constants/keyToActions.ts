import { GameActions } from "@app/shared";

export const keyToAction: Record<string, GameActions> = {
  ARROWUP: GameActions.UP,
  Z: GameActions.UP,
  W: GameActions.UP,
  ARROWDOWN: GameActions.DOWN,
  S: GameActions.DOWN,
  ARROWLEFT: GameActions.LEFT,
  A: GameActions.LEFT,
  Q: GameActions.LEFT,
  ARROWRIGHT: GameActions.RIGHT,
  D: GameActions.RIGHT,
  " ": GameActions.SPACE
};
