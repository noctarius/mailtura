import { defineConfig, env } from "prisma/config";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`Applying migrations from: ${pathResolve(__dirname, 'migrations')}`);

export default defineConfig({
  schema: pathResolve(__dirname, 'schema.prisma'),
  migrations: {
    path: pathResolve(__dirname, 'migrations'),
  },
  experimental: {
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
