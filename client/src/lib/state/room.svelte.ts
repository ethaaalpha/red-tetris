import type { RoomData } from "@app/shared";
import { Colors } from "@app/shared";

export const roomState = $state(<{ data: RoomData | null; joined: boolean; color: Colors }>{
  data: null,
  joined: false,
  color: Colors.GREY
});

export const setRoomData = (data: RoomData) => {
  roomState.data = data;
};
