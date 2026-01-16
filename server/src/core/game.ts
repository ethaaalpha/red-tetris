import type { Server } from "socket.io";
import type { Game } from "../objects/Game";
import type { Room } from "../objects/Room";
import type { Player } from "../objects/Player";
import { GAME_FALL_SLEEP } from "../constants/core";
import { EVENT_GAME_INFO, EVENT_GAME_PENALITY, EVENT_GAME_SPECTRUM } from "../constants/events";

function applyPenality(game: Game, from: Player) {
  game.players.forEach((player) => {
    if (player.end || player === from) return;
    player.board.addRestrictedLine();
  });
}

function attachActualPiece(game: Game, player: Player): number {
  // fix the actual piece
  player.board.place(player.actualPiece);

  // generate a new valid piece
  player.actualPiece = game.nextPiece(player.board.placedPieces);

  // clear the lines
  return player.board.cleanLines();
}

function handleGravity(game: Game, player: Player): { penality: boolean; attached: boolean } {
  const next = player.actualPiece.clone().moveDown();
  let penality = false,
    attached = false;

  if (!player.board.isValidPiece(next)) {
    // piece reach bottom
    attached = true;
    if (attachActualPiece(game, player) > 0) {
      penality = true;
    }

    if (player.hasLost()) {
      player.end = true;
      game.deadPlayers++;
    } else {
      player.score++;
    }
  } else {
    // apply gravity
    player.actualPiece.moveDown();
  }
  return { penality: penality, attached: attached };
}

export function gameLoop(room: Room, io: Server) {
  const game = room.game;
  if (!game) throw new Error("Game not prepared!");

  const timer = setInterval(() => {
    game.players.forEach((player, id) => {
      if (player.end) return;

      const { penality, attached } = handleGravity(game, player);
      if (game.isFinish()) {
        clearInterval(timer);
        return;
      }

      if (penality) {
        applyPenality(game, player);

        io.to(room.name).emit(EVENT_GAME_PENALITY, {
          from: player.user.name
        });
      }

      if (attached) {
        // to avoid useless updates
        io.to(room.name).emit(EVENT_GAME_SPECTRUM, game.getGameSpectrum(id));
      }

      io.to(id).emit(EVENT_GAME_INFO, game.getGameInfo(id));
    });
  }, GAME_FALL_SLEEP);
}
