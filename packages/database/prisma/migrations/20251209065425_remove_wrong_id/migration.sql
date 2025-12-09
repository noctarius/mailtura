/*
  Warnings:

  - You are about to drop the column `subscriber_list_ids` on the `mail_sendings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mail_sendings" DROP COLUMN "subscriber_list_ids";
