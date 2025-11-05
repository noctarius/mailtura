import * as argon2 from "argon2";

export function newPasswordHasher() {
  return {
    hash(password: string): Promise<string> {
      return argon2.hash(password, { type: argon2.argon2i });
    },
    verify({ hash, password }: { hash: string; password: string }): Promise<boolean> {
      return argon2.verify(hash, password);
    },
  };
}
