-- CreateTable
CREATE TABLE "mail_configs" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by" TEXT,

    CONSTRAINT "mail_configs_pkey" PRIMARY KEY ("id")
);
