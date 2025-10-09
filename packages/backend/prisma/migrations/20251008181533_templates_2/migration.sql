/*
  Warnings:

  - Added the required column `created_at` to the `templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;
