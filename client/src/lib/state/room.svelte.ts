import type { RoomData } from "@app/shared";

export const roomState = $state(<{ data: RoomData | null; joined: boolean }>{
  joined: false,
  data: null
});

export const setRoomData = (data: RoomData) => {
  roomState.data = data;
};
