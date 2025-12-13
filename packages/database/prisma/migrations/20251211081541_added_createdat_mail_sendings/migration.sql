/*
  Warnings:

  - Added the required column `created_at` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL;
