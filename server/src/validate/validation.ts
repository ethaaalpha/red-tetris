import z, { ZodError } from "zod";

import {
  USERNAME_MAX_LENGTH,
  ROOM_MAX_LENGTH,
  CHAT_MAX_LENGTH,
  REGEX_MESSAGE,
  REGEX_ROOM_AND_USER
} from "../constants/core";

import {
  Z_USERNAME_EMPTY,
  Z_USERNAME_MAX,
  Z_ROOM_EMPTY,
  Z_ROOM_MAX,
  Z_MESSAGE_EMPTY,
  Z_MESSAGE_MAX,
  Z_REGEX_ROOM_AND_USER,
  Z_REGEX_MESSAGE_SANITIZE
} from "../constants/error";

export function formatSchemeError(error: ZodError) {
  return error.issues.reduce(
    (acc, issue) => {
      const varName = issue.path.join(".");
      acc[varName] = issue.message;
      return acc;
    },
    {} as Record<string, string>
  );
}

export const roomValidation = z
  .string()
  .regex(REGEX_MESSAGE, Z_REGEX_MESSAGE_SANITIZE)
  .min(1, Z_ROOM_EMPTY)
  .max(ROOM_MAX_LENGTH, Z_ROOM_MAX);

export const usernameValidation = z
  .string()
  .regex(REGEX_ROOM_AND_USER, Z_REGEX_ROOM_AND_USER)
  .min(1, Z_USERNAME_EMPTY)
  .max(USERNAME_MAX_LENGTH, Z_USERNAME_MAX);

export const messageValidation = z
  .string()
  .regex(REGEX_ROOM_AND_USER, Z_REGEX_ROOM_AND_USER)
  .min(1, Z_MESSAGE_EMPTY)
  .max(CHAT_MAX_LENGTH, Z_MESSAGE_MAX);
