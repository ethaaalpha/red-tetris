import type { Coordinate } from "@app/shared";

import { Rotations } from "@app/enums/Rotations";

import { Colors } from "../../../shared/enums/colors";
import type { PieceType } from "../../../shared/enums/pieceType";

const OFFSETS: Record<Rotations, Coordinate[]> = {
  // for J, L, S, T, Z
  [Rotations.SPAWN]: [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ],
  [Rotations.RIGHT]: [
    [0, 0],
    [0, 1],
    [1, 1],
    [-2, 0],
    [-2, 1]
  ],
  [Rotations.BOTTOM]: [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ],
  [Rotations.LEFT]: [
    [0, 0],
    [0, -1],
    [1, -1],
    [-2, 0],
    [-2, -1]
  ]
} as const;

export const PIECES: Record<
  PieceType,
  { blocks: Coordinate[]; color: Colors; offsets: Record<Rotations, Coordinate[]> }
> = {
  I: {
    blocks: [
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2]
    ],
    color: Colors.CYAN,
    offsets: {
      [Rotations.SPAWN]: [
        [0, 0],
        [0, -1],
        [0, 2],
        [0, -1],
        [0, 2]
      ],
      [Rotations.RIGHT]: [
        [0, -1],
        [0, 0],
        [0, 0],
        [-1, 0],
        [2, 0]
      ],
      [Rotations.BOTTOM]: [
        [-1, -1],
        [-1, 1],
        [-1, -2],
        [1, 0],
        [0, -2]
      ],
      [Rotations.LEFT]: [
        [-1, 0],
        [-1, 0],
        [-1, 0],
        [1, 0],
        [-2, 0]
      ]
    }
  },
  J: {
    blocks: [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, -1]
    ],
    color: Colors.BLUE,
    offsets: OFFSETS
  },
  L: {
    blocks: [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, 1]
    ],
    color: Colors.ORANGE,
    offsets: OFFSETS
  },
  O: {
    blocks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1]
    ],
    color: Colors.YELLOW,
    offsets: OFFSETS
  },
  S: {
    blocks: [
      [0, 0],
      [0, -1],
      [-1, 0],
      [-1, 1]
    ],
    color: Colors.GREEN,
    offsets: OFFSETS
  },
  T: {
    blocks: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 1]
    ],
    color: Colors.PURPLE,
    offsets: OFFSETS
  },
  Z: {
    blocks: [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 1]
    ],
    color: Colors.RED,
    offsets: OFFSETS
  }
};
