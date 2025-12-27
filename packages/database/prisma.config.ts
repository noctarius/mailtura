import { defineConfig, env } from "prisma/config";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`Applying migrations from: ${pathResolve(__dirname, "migrations")}`);

export default defineConfig({
  schema: pathResolve(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: pathResolve(__dirname, "prisma/migrations"),
  },
  experimental: {},
  datasource: {
    url: env("DATABASE_URL"),
  },
});
