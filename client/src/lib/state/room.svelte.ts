import type { RoomData } from "@app/shared";

export const roomState = $state(<{ data: RoomData | null }>{
  data: null
});

export const getRoomData = () => {
  return roomState.data;
};

export const setRoomData = (data: RoomData) => {
  roomState.data = data;
};

export const resetRoomData = () => {
  roomState.data = null;
};
