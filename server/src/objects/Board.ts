import { BOARD_HEIGHT, BOARD_WIDTH, PieceColor } from "@app/shared";

import { placePieceOnMatrix } from "@app/core/matrix";

import { Piece } from "./Piece";

export class Board {
  public matrix: number[][]; // row, column
  public playableLines: number = BOARD_HEIGHT - 1;
  public placedPieces: number = 0;

  constructor() {
    this.matrix = Array.from({ length: BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(PieceColor.EMPTY)
    );
  }

  private getRow(index: number): number[] {
    const result = this.matrix[index];
    if (!result) throw new Error("Invalid row index!");
    return result;
  }

  public isValidPiece(piece: Piece): boolean {
    // this check if a piece is does not have conflict
    // with others pieces / walls / restricted lines
    // useful to detect if a movement is valid or if a piece reach the bottom
    for (const [x, y] of piece.blocks) {
      const row = piece.x + x;
      const column = piece.y + y;
      const boardRow = this.matrix[row];

      if (boardRow === undefined) return false;
      const boardCell = boardRow[column];
      if (boardCell === undefined || boardCell != PieceColor.EMPTY) return false;
    }
    return true;
  }

  public place(piece: Piece) {
    if (!this.isValidPiece(piece)) {
      throw new Error("Invalid placement");
    }

    placePieceOnMatrix(piece, this.matrix);
    this.placedPieces++;
  }

  public cleanLines(destructible: boolean): number {
    let count = 0;

    this.matrix.forEach((row, i) => {
      if (row.every((cell) => cell != PieceColor.EMPTY && cell != PieceColor.GREY)) {
        this.matrix.splice(i, 1);
        this.matrix.unshift(Array(BOARD_WIDTH).fill(PieceColor.EMPTY));
        count++;
      }
    });

    if (destructible) {
      this.removeRestrictedLines(count);
    }
    return count;
  }

  public addRestrictedLines(nb: number) {
    const before = this.playableLines;

    for (let i = 0; i < nb - 1; i++) {
      if (this.playableLines < 0) break;

      this.matrix.splice(0, 1);
      this.matrix.push(Array(BOARD_WIDTH).fill(PieceColor.GREY));
      this.playableLines--;
    }
    return before - this.playableLines;
  }

  public removeRestrictedLines(nb: number) {
    for (let i = 0; i < nb - 1; i++) {
      if (this.playableLines === BOARD_HEIGHT - 1) return;

      this.matrix.splice(BOARD_HEIGHT - 1, 1);
      this.matrix.unshift(Array(BOARD_WIDTH).fill(PieceColor.EMPTY));
      this.playableLines++;
    }
  }
}
