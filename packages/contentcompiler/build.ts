import dts from "bun-plugin-dts";

export {};

await Bun.build({
  plugins: [dts({
    output: {
      inlineDeclareGlobals: false,
      exportReferencedTypes: false
    },
    compilationOptions: {
      preferredConfigPath: "./tsconfig.json",
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
