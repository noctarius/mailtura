/*
  Warnings:

  - Added the required column `mail_sender_id` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "mail_sender_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "mail_sendings" ADD CONSTRAINT "mail_sendings_mail_sender_id_fkey" FOREIGN KEY ("mail_sender_id") REFERENCES "mail_senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
