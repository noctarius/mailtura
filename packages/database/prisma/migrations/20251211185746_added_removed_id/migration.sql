/*
  Warnings:

  - The primary key for the `system_configs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `system_configs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "system_configs" DROP CONSTRAINT "system_configs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "system_configs_pkey" PRIMARY KEY ("key");
