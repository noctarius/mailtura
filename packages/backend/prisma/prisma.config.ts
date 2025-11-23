import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  experimental: {
  },
  datasource: {
    url: env("DATABASE_URL")
  }
});
