import { PieceColor, type RoomData, type UserColor } from "@app/shared";

export const roomState = $state(<
  { data: RoomData | null; joined: boolean; color: UserColor; room: string; username: string }
>{
  data: null,
  joined: false,
  color: PieceColor.GREY,
  room: "",
  username: ""
});

export const setRoomData = (data: RoomData) => {
  roomState.data = data;
};
