import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  EVENT_CHANGE_COLOR,
  EVENT_ROOM_UPDATE,
  type EventChangeColorError,
  type EventChangeColorPayload,
  type EventChangeColorSuccess,
  PieceColor} from "@app/shared";

import { ERROR_NOT_IN_A_ROOM, ERROR_PLAYING_ROOM } from "@app/constants/validateErrors";

import type { TestServerData } from "./types";
import { emitAsync, onceAsync, setupTestServer, shutdownTestServer, testJoinRoom } from "./utils";

let ctx: TestServerData;
const testRoomName = "test";
const testUserName1 = "test1";
const testUserName2 = "test2";

beforeEach(async () => {
  ctx = await setupTestServer();
});

afterEach(async () => {
  await shutdownTestServer(ctx);
});

describe("invalid change color", () => {
  it("not in a room", () => {
    const payload: EventChangeColorPayload = { color: PieceColor.RED };

    emitAsync<EventChangeColorPayload, EventChangeColorSuccess, EventChangeColorError>(
      ctx.socket1.client,
      EVENT_CHANGE_COLOR,
      payload
    ).then((response) => {
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error.room).toBe(ERROR_NOT_IN_A_ROOM);
      }
    });
  });

  it("playing room", async () => {
    await testJoinRoom(ctx.socket1, testRoomName, testUserName1);
    await testJoinRoom(ctx.socket2, testRoomName, testUserName2);
    const payload: EventChangeColorPayload = { color: PieceColor.RED };

    emitAsync<EventChangeColorPayload, EventChangeColorSuccess, EventChangeColorError>(
      ctx.socket1.client,
      EVENT_CHANGE_COLOR,
      payload
    ).then((response) => {
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error.room).toBe(ERROR_PLAYING_ROOM);
      }
    });
  });
});
