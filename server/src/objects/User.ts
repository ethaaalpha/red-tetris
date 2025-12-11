import type { Socket } from "socket.io";

export class User {
  constructor(
    public id: string,
    public name: string,
    public socket: Socket
  ) {}
}

export const users: Record<string, User> = {};
