/*
  Warnings:

  - You are about to drop the column `contact_id` on the `mail_logs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "mail_logs" DROP CONSTRAINT "mail_logs_contact_id_fkey";

-- AlterTable
ALTER TABLE "mail_logs" DROP COLUMN "contact_id",
ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "mail_logs" ADD CONSTRAINT "mail_logs_tenant_id_email_fkey" FOREIGN KEY ("tenant_id", "email") REFERENCES "contacts"("tenant_id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
