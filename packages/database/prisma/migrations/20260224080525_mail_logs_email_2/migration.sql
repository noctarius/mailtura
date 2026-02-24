/*
  Warnings:

  - Made the column `email` on table `mail_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "mail_logs" DROP CONSTRAINT "mail_logs_tenant_id_email_fkey";

-- AlterTable
ALTER TABLE "mail_logs" ALTER COLUMN "email" SET NOT NULL;
