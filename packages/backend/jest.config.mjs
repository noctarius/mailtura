import { createDefaultEsmPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultEsmPreset({
  tsconfig: "tsconfig.test.json",
}).transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // Map internal package imports to TS sources for Jest so ts-jest can transform them
    "^@mailtura/contentcompiler/(.*?)(?:\\.js)?$": "<rootDir>/../contentcompiler/src/$1.ts",
    "^@mailtura/database/(.*?)(?:\\.js)?$": "<rootDir>/../database/src/$1.ts",
    "^@mailtura/rpcmodel/(.*?)(?:\\.js)?$": "<rootDir>/../rpcmodel/src/$1.ts",
  },
  transform: {
    ...tsJestTransformCfg, // handles ts/tsx/mts/cts with TS + ESM preset
  },
  // Allow transforming our internal packages and a few ESM deps used by them
  transformIgnorePatterns: ["/node_modules/(?!(@mailtura|typebox|uuidv7)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs", "json"],
};
