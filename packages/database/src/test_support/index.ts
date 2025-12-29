import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Wait } from "testcontainers";
import { readdirSync } from "fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { newPrismaClient } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupDatabase() {
  console.log("Starting postgres container...");
  const postgresContainer = await new PostgreSqlContainer("postgres:18.1-alpine")
    .withWaitStrategy(Wait.forAll([Wait.forLogMessage("database system is ready to accept connections", 2)]))
    .withDatabase("postgres")
    .start();
  console.log("Postgres container started");
  const connectionString = postgresContainer.getConnectionUri();
  process.env.DATABASE_URL = connectionString;
  console.log(`Using connection string: ${connectionString}`);

  const adapter = new PrismaPg({ connectionString });
  await runMigrations(adapter);

  const prisma = newPrismaClient(adapter);
  return { prisma, container: postgresContainer };
}

const runMigrations = async (adapter: PrismaPg) => {
  const migrationsPath = path.resolve(__dirname, "../../prisma/migrations");
  const migrationsScripts = readdirSync(migrationsPath);

  // Sort migrations scripts by name (natural order for timestamps)
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  migrationsScripts.sort(collator.compare);

  console.log(`Running ${migrationsScripts.length} migrations...`);

  const client = await adapter.connect();
  for (const migrationScript of migrationsScripts) {
    if (migrationScript === "migration_lock.toml") continue;
    const filename = path.resolve(migrationsPath, migrationScript, "migration.sql");
    console.log(`Running migration script: ${filename}`);
    const script = readFileSync(filename).toString("utf-8");
    await client.executeRaw({ sql: `${script.trim()};`, args: [], argTypes: [] });
  }
};
