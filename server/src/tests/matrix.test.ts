import { describe, expect, it } from "vitest";

import { PieceType } from "@app/shared";

import { PIECES } from "@app/constants/pieces";
import { Piece } from "@app/objects/Piece";

it.only("to grid", () => {
  const p = new Piece(PieceType.I).rotate90();
  console.log(p.toGrid());
});

describe("toGrid() rotations", () => {
  it("invalid rotations", () => {
    expect(() => new Piece(PieceType.I).rotate90(0)).toThrowError();
    expect(() => new Piece(PieceType.I).rotate90(-1)).toThrowError();
    expect(() => new Piece(PieceType.I).rotate90(4)).toThrowError();
  });

  it(PieceType.I, () => {
    const rotationA = new Piece(PieceType.I).rotate90(1);
    const rotationB = new Piece(PieceType.I).rotate90(2);
    const rotationC = new Piece(PieceType.I).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ]);
  });

  it(PieceType.J, () => {
    const rotationA = new Piece(PieceType.J).rotate90(1);
    const rotationB = new Piece(PieceType.J).rotate90(2);
    const rotationC = new Piece(PieceType.J).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ]);
  });

  it(PieceType.L, () => {
    const rotationA = new Piece(PieceType.L).rotate90(1);
    const rotationB = new Piece(PieceType.L).rotate90(2);
    const rotationC = new Piece(PieceType.L).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]);
  });

  it(PieceType.O, () => {
    const rotationA = new Piece(PieceType.O).rotate90(1);
    const rotationB = new Piece(PieceType.O).rotate90(2);
    const rotationC = new Piece(PieceType.O).rotate90(3);
    expect(rotationA.blocks).toEqual(PIECES.O.blocks);
    expect(rotationB.blocks).toEqual(PIECES.O.blocks);
    expect(rotationC.blocks).toEqual(PIECES.O.blocks);
  });

  it(PieceType.S, () => {
    const rotationA = new Piece(PieceType.S).rotate90(1);
    const rotationB = new Piece(PieceType.S).rotate90(2);
    const rotationC = new Piece(PieceType.S).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]);
  });

  it(PieceType.T, () => {
    const rotationA = new Piece(PieceType.T).rotate90(1);
    const rotationB = new Piece(PieceType.T).rotate90(2);
    const rotationC = new Piece(PieceType.T).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]);
  });

  it(PieceType.Z, () => {
    const rotationA = new Piece(PieceType.Z).rotate90(1);
    const rotationB = new Piece(PieceType.Z).rotate90(2);
    const rotationC = new Piece(PieceType.Z).rotate90(3);
    expect(rotationA.toGrid()).toEqual([
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ]);
    expect(rotationB.toGrid()).toEqual([
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ]);
    expect(rotationC.toGrid()).toEqual([
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]);
  });
});
