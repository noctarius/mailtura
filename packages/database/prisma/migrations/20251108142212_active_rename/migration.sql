-- AlterTable
ALTER TABLE "api_keys" RENAME COLUMN "is_active" TO "active";

-- AlterTable
ALTER TABLE "users" RENAME COLUMN "is_active" TO "active";
