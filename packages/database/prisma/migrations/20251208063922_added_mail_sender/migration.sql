-- CreateTable
CREATE TABLE "mail_sender" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "mail_sender_pkey" PRIMARY KEY ("id")
);
