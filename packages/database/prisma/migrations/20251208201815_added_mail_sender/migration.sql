/*
  Warnings:

  - Added the required column `subject` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "subject" TEXT NOT NULL;
