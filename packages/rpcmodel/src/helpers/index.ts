import { v7 } from "uuid";

export function uuidv7() {
  return v7();
}

export function joinPath(a: string, ...paths: string[]) {
  if (a.endsWith("/")) a = a.substring(0, a.length - 1);
  paths = paths.map(p => (p.startsWith("/") ? p.substring(1) : p));
  return [a, ...paths].join("/");
}
