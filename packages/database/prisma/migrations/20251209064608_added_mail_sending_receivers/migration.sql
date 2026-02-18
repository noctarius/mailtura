/*
  Warnings:

  - Added the required column `subscriber_list_ids` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "subscriber_list_ids" UUID NOT NULL;

-- CreateTable
CREATE TABLE "mail_sendings_on_subscriber_lists" (
    "mail_sendings_id" UUID NOT NULL,
    "subscriber_list_id" UUID NOT NULL,

    CONSTRAINT "mail_sendings_on_subscriber_lists_pkey" PRIMARY KEY ("mail_sendings_id","subscriber_list_id")
);

-- CreateTable
CREATE TABLE "mail_sending_receivers" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "mail_sending_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "substitutions" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "mail_sending_receivers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mail_sendings_on_subscriber_lists" ADD CONSTRAINT "mail_sendings_on_subscriber_lists_mail_sendings_id_fkey" FOREIGN KEY ("mail_sendings_id") REFERENCES "mail_sendings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mail_sendings_on_subscriber_lists" ADD CONSTRAINT "mail_sendings_on_subscriber_lists_subscriber_list_id_fkey" FOREIGN KEY ("subscriber_list_id") REFERENCES "subscriber_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
