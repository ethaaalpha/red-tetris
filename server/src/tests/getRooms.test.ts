import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { emitAsync, setupTestServer, shutdownTestServer } from "./utils";
import { Room } from "../objects/Room";
import { User } from "../objects/User";
import { ROOM_MAX_USERS } from "../constants/core";
import { getRoom, getRooms } from "../core/room";
import type { TestServerData } from "./types";

let ctx: TestServerData;

beforeEach(async () => {
  ctx = await setupTestServer();
});

afterEach(async () => {
  await shutdownTestServer(ctx);
});

describe("get rooms", () => {
  it("simple", async () => {
    getRooms().set("example", new Room("example", new User("id", "example", null)));

    await emitAsync(ctx.test1.client, "get rooms").then(({ success, data }) => {
      expect(data).toEqual([
        {
          name: "example",
          userCount: 1,
          max: ROOM_MAX_USERS
        }
      ]);
      expect(success).toBe(true);
    });
  });

  it("ignore rooms in game", async () => {
    getRooms().set("example", new Room("example", new User("id", "example", null)));
    getRooms().set("example2", new Room("example2", new User("id2", "example2", null)));
    getRoom("example2")?.start();

    await emitAsync(ctx.test1.client, "get rooms").then(({ success, data }) => {
      expect(data).toEqual([
        {
          name: "example",
          userCount: 1,
          max: ROOM_MAX_USERS
        }
      ]);
      expect(success).toBe(true);
    });
  });
});
