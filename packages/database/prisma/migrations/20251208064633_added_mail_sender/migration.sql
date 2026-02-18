/*
  Warnings:

  - You are about to drop the `mail_sender` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "mail_sender";

-- CreateTable
CREATE TABLE "mail_senders" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "mail_senders_pkey" PRIMARY KEY ("id")
);
