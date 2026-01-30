import type { UserColor } from "../types/user";
import type { PIECES_TYPES } from "../constants/pieces";
import type { Matrix2D } from "./matrix";

export type PieceType = (typeof PIECES_TYPES)[number];

type PieceColor = UserColor | "empty";

interface Piece {
  size: number;
  color: PieceColor;
}

type PieceColorDetail = Record<
  PieceColor,
  {
    main: string;
    dark: string;
    light: string;
  }
>;

type PieceData = {
  matrix: Matrix2D<number>;
  x: number;
  y: number;
  color: PieceColor;
}

export type { PieceData, PieceColor, Piece, PieceColorDetail };
