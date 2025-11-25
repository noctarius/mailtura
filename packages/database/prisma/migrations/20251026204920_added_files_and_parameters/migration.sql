/*
  Warnings:

  - Added the required column `parameters` to the `contact_imports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_imports" ADD COLUMN     "parameters" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
