import { afterEach, beforeEach, expect, it, vi } from "vitest";

import type {
  EventGameActionError,
  EventGameActionPayload,
  EventGameActionSuccess,
  EventStartError,
  EventStartPayload,
  EventStartSuccess,
  GameSettings
} from "@app/shared";
import { EVENT_GAME_ACTION, EVENT_GAME_START, GameActions } from "@app/shared";

import * as MovementModule from "@app/core/movements";
import { getRoom } from "@app/core/room";
import { getUser } from "@app/core/user";

import type { TestServerData } from "./types";
import { emitAsync, joinRoom, setupTestServer, shutdownTestServer } from "./utils";

let ctx: TestServerData;

beforeEach(async () => {
  ctx = await setupTestServer();
});

afterEach(async () => {
  await shutdownTestServer(ctx);
});

it("game perform action", async () => {
  const GameSettings: GameSettings = {
    tick: 300
  };
  const applyMovement = vi.spyOn(MovementModule, "applyMovement");
  const test1 = ctx.test1;
  await joinRoom(test1, "example1", "user1");

  const user = getUser(test1.server.id);
  expect(user).toBeDefined();
  if (!user) return;

  vi.useFakeTimers();

  await emitAsync<EventStartPayload, EventStartSuccess, EventStartError>(
    test1.client,
    EVENT_GAME_START,
    GameSettings
  ).then(({ success }) => {
    expect(success).toBe(true);
  });

  // get variables
  const game = getRoom("example1")?.game;
  expect(game).toBeTruthy();
  if (!game) return;
  const player = game.players.get(user.id);
  expect(player).toBeDefined();
  if (!player) return;

  // make on fall tick
  await vi.advanceTimersToNextTimerAsync();
  expect(game.ongoing).toBe(true);

  const pieceBeforeY = player.actualPiece.y;

  // perform simple action
  await emitAsync<EventGameActionPayload, EventGameActionSuccess, EventGameActionError>(
    test1.client,
    EVENT_GAME_ACTION,
    { action: GameActions.RIGHT }
  ).then((response) => {
    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toEqual(game.getGameInfo(test1.server.id));
    }
  });
  expect(player.actualPiece.y).toBeGreaterThan(pieceBeforeY);
  expect(applyMovement).toBeCalledTimes(1);
  expect(applyMovement).toBeCalledWith(game, player, "RIGHT");
});
