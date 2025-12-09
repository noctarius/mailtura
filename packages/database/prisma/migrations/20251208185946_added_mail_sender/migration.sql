/*
  Warnings:

  - Added the required column `mail_config_id` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "mail_config_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "mail_sendings" ADD CONSTRAINT "mail_sendings_mail_config_id_fkey" FOREIGN KEY ("mail_config_id") REFERENCES "mail_configs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
