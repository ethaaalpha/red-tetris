import { roomState } from "$lib/state/room.svelte";

export function isCurrentUser(name: string): boolean {
  return roomState.username === name;
}

export function isCurrentUserHost(): boolean {
  return !!roomState.data && roomState.username === roomState.data.host;
}
