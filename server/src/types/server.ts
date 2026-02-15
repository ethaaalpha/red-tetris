import type { Express } from "express";
import { Server as HttpServer } from "node:http";

import type { Board } from "@app/objects/Board";
import type { Piece } from "@app/objects/Piece";

import type { AppServer } from "./socket";

export interface ServerData {
  app: Express;
  server: HttpServer;
  io: AppServer;
}

export interface ActionData {
  piece: Piece;
  board: Board;
}
