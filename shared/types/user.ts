import { PieceColor } from "../enums/colors";

export type UserData = {
  color: UserColor;
  username: string;
};

export type UserColor = Exclude<PieceColor, PieceColor.EMPTY>;
