import type { PIECES_TYPES } from "../constants/pieces";

export type PieceType = (typeof PIECES_TYPES)[number];
export type NonEmptyArray<T> = [T, ...T[]];
export type Matrix2D<T> = NonEmptyArray<NonEmptyArray<T>>;
