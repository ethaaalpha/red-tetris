import type { UserColor } from "@app/shared";

type PieceColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "orange"
  | "cyan"
  | "grey"
  | "empty";

interface Piece {
  size: number;
  color: PieceColor | UserColor;
}

type PieceColorDetail = Record<
  PieceColor | UserColor,
  {
    main: string;
    dark: string;
    light: string;
  }
>;
export type { PieceColor, Piece, PieceColorDetail };
