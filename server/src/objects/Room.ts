import type { User } from "./User";

export class Room {
  public users: User[] = [];

  constructor(public name: string) {}
}
