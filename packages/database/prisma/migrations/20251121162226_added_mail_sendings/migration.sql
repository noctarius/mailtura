-- CreateTable
CREATE TABLE "mail_sendings" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "mail_sendings_pkey" PRIMARY KEY ("id")
);
