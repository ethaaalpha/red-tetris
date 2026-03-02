import { PIECE_COLORS, PieceColor } from "@app/shared";

export function getLightColor(color: PieceColor) {
  return PIECE_COLORS[color].light;
}
