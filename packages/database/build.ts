import dts from "bun-plugin-dts";

export {};

await Bun.build({
  plugins: [dts({
    output: {
      exportReferencedTypes: false
    },
    compilationOptions: {
      followSymlinks: false
    }
  })],
  entrypoints: ["./src/index.ts"],
  outdir: "./lib",
  target: "bun",
  env: "disable",
  sourcemap: "linked",
  packages: "external",
  minify: true,
  tsconfig: "./tsconfig.json",
});
