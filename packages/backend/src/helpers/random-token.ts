import { randomInt } from "node:crypto";

const validCharacters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ23456789";

export function newRandomToken() {
  return [...Array(32)].map(() => validCharacters[randomInt(validCharacters.length)]).join("");
}
