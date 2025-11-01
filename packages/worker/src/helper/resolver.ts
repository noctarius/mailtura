import { fileURLToPath } from "node:url";
import { dirname, resolve as pathResolve } from "node:path";
import { existsSync } from "node:fs";

const validFileExt = ["js", "ts", "mjs"];
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathResolve(dirname(__filename), "..");

export function resolve(path: string) {
  for (const ext of validFileExt) {
    const resolvedPath = pathResolve(__dirname, `${path}.${ext}`);
    if (existsSync(resolvedPath)) return resolvedPath;
  }
  throw new Error(`Cannot resolve ${path}`);
}
