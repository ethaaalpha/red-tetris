import { PieceShape } from "@app/shared";

import { Piece } from "@app/objects/Piece";

function randint(max: number) {
  // max is excluded
  return Math.floor(Math.random() * max);
}

export function createPiece() {
  const values = Object.values(PieceShape);
  const randomType = values[randint(values.length)];

  if (!randomType) throw new Error("Piece generation failed!");

  // position spawn based on rules
  // see: https://tetris.wiki/Super_Rotation_System#Spawn_Orientation_and_Location
  let offsetX = 1;
  if (randomType === PieceShape.I || randomType === PieceShape.O) offsetX--;

  return new Piece(randomType, offsetX, 4);
}
