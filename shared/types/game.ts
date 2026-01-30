import type { Matrix2D } from "./matrix"
import type { PieceData } from "./piece";

export type GameData = {
  matrix: Matrix2D<number>;
  nextPieces: PieceData[];
  actualPiece: PieceData;
  score: number;
  end: boolean;
}

export type GameSpectrum = {
  matrix: Matrix2D<number>;
  score: number;
  end: boolean;
  username: string;
}