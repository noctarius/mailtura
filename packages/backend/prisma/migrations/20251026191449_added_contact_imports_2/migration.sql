/*
  Warnings:

  - Added the required column `records` to the `contact_imports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_imports" ADD COLUMN     "records" INTEGER NOT NULL;
