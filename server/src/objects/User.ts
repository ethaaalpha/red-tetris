export class User {
  constructor(
    public id: string,
    public name: string
  ) {}
}

export const users: Record<string, User> = {};

export function getByName(username: string): User | null {
  let result = null;

  Object.values(users).forEach((u) => {
    if (u.name == username) {
      result = u;
      return;
    }
  });
  return result;
}
