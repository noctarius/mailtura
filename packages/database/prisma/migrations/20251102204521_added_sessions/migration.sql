/*
  Warnings:

  - Added the required column `created_at` to the `two_factors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `two_factors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "two_factors" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMPTZ NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
