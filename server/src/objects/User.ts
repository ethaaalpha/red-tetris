import type { Socket } from "socket.io";

export class User {
  public color: string = "";

  constructor(
    public id: string,
    public name: string,
    public socket: Socket
  ) {}
}
