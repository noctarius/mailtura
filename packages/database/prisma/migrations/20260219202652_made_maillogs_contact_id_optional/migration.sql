-- DropForeignKey
ALTER TABLE "mail_logs" DROP CONSTRAINT "mail_logs_contact_id_fkey";

-- AlterTable
ALTER TABLE "mail_logs" ALTER COLUMN "contact_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "mail_logs" ADD CONSTRAINT "mail_logs_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
