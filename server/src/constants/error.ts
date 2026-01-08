// commons
export const NOT_IN_A_ROOM = "You do not belong to a room";
export const NOT_IN_THIS_ROOM = "You do not belong to this room";
export const PLAYING_ROOM = "This room is already playing";
export const INEXISTING_ROOM = "This room does not exist";
export const NOT_HOST = "You are not the host of this room";

// join room
export const ROOM_IS_FULL = "Room is full";
export const MAX_ROOMS = "Maximum number of rooms reached, please join an existing one";
export const USERNAME_TAKEN = "This username is already taken in this room";
export const ALREADY_IN_A_ROOM = "You are already in a room";

// kick
export const KICK_ITSELF = "You can't kick yourself";
export const KICK_PLAYING = "You can't kick while playing";
export const KICK_INEXISTING = "This user is not in this room";

// leave room
export const USER_NOT_FOUND = "User not found";

import { ROOM_MAX_LENGTH, USERNAME_MAX_LENGTH, CHAT_MAX_LENGTH } from "./core";

// validation
export const Z_ROOM_EMPTY = "Room name cannot be empty";
export const Z_ROOM_MAX = `Room name cannot be longer than ${ROOM_MAX_LENGTH} characters`;

export const Z_USERNAME_EMPTY = "Username cannot be empty";
export const Z_USERNAME_MAX = `Username cannot be longer than ${USERNAME_MAX_LENGTH} characters`;

export const Z_MESSAGE_EMPTY = "Message cannot be empty";
export const Z_MESSAGE_MAX = `Message cannot be longer than ${CHAT_MAX_LENGTH} characters`;
export const Z_REGEX_ROOM_AND_USER =
  "Only alphanumeric characters, underscores and hyphens are allowed";
export const Z_REGEX_MESSAGE_SANITIZE = "Only unicode characters are allowed";
