import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from "node:url";
import type { JoinRoomData } from "./src/types";
import { ROOM_MAX_USERS } from "./src/constants";
import { validateJoinRoom } from "./src/controllers/rooms";
import type { User } from "./src/objects/User";

type Callback = (err: unknown, response?: unknown) => void;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../client/build");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 8080;

const users: Record<string, User> = {};

app.use(express.static(frontendPath));

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  socket.on("join room", (data: JoinRoomData, callback: Callback) => {
    const errors = validateJoinRoom(io, socket, data);
    if (errors) {
      callback(errors, { success: false });
      return;
    }

    users[socket.id] = { name: data.username };
    socket.join(data.room);

    console.log(`User ${users[socket.id]!.name} joined room ${data.room} ${socket.rooms.size}`);
    callback(null, { success: true });
  });

  socket.on("get rooms", (callback: Callback) => {
    const rooms: { name: string; userCount: number; max: number }[] = [];
    const adapter = io.sockets.adapter;

    adapter.rooms.forEach((sockets, roomName) => {
      if (!adapter.sids.has(roomName)) {
        rooms.push({
          name: roomName,
          userCount: sockets.size,
          max: ROOM_MAX_USERS
        });
      }
    });

    callback(null, { rooms });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
