/*
  Warnings:

  - Added the required column `delivered` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "delivered" INTEGER NOT NULL;
