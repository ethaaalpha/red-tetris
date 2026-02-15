import { Colors, type Matrix2D } from "@app/shared";

import { BOARD_HEIGHT, BOARD_WIDTH } from "./core";

export const BOARD = Array.from({ length: BOARD_HEIGHT }, () =>
  Array<number>(BOARD_WIDTH).fill(Colors.EMPTY)
) as Matrix2D<number>;
