import type { Matrix2D, NonEmptyArray } from "@app/shared";

import type { Piece } from "@app/objects/Piece";

export function asMatrix(data: (number | undefined)[][]): Matrix2D<number> {
  const rows: NonEmptyArray<number>[] = data.map((row) => {
    const checked: number[] = row.map((cell) => {
      if (cell === undefined) throw new Error("Cell cannot be undefined!");
      return cell;
    });
    const [first, ...others] = checked;
    if (first === undefined) throw new Error("Cell cannot be undefined!");

    return [first, ...others];
  });
  const [first, ...others] = rows;
  if (first === undefined) throw new Error("Row cannot be undefined!");

  return [first, ...others];
}

export function placePieceOnMatrix(piece: Piece, matrix: Matrix2D<number>) {
  piece.blocks.forEach(([x, y]) => {
    const row = piece.x + x;
    const column = piece.y + y;

    const matrixRow = matrix[row];
    if (!matrixRow) throw Error("Invalid row index!");

    matrixRow[column] = piece.color;
  });
}
