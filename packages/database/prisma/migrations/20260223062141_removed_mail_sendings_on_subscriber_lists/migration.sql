/*
  Warnings:

  - You are about to drop the `mail_sendings_on_subscriber_lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mail_sendings_on_subscriber_lists" DROP CONSTRAINT "mail_sendings_on_subscriber_lists_mail_sendings_id_fkey";

-- DropForeignKey
ALTER TABLE "mail_sendings_on_subscriber_lists" DROP CONSTRAINT "mail_sendings_on_subscriber_lists_subscriber_list_id_fkey";

-- DropIndex
DROP INDEX "unsubscribes_tenant_id_contact_id_key";

-- DropTable
DROP TABLE "mail_sendings_on_subscriber_lists";
