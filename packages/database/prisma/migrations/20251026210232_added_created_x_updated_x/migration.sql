/*
  Warnings:

  - Added the required column `created_at` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ,
ADD COLUMN     "updated_by" TEXT;
