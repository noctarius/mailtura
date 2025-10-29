export {};

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
  env: "disable",
  sourcemap: "linked",
  packages: "external",
  minify: true,
});
