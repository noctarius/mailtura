import { rm } from "node:fs/promises";

export {};

await rm("./lib", { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./lib",
  target: "bun",
  env: "disable",
  sourcemap: "linked",
  packages: "external",
  minify: true,
  tsconfig: "./tsconfig.build.json",
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

await Bun.$`bunx tsc -p tsconfig.build.json`;
