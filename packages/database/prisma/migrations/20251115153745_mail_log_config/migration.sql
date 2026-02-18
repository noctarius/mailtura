-- CreateEnum
CREATE TYPE "mail_log_status" AS ENUM ('Delivered', 'Pending', 'Scheduled', 'Bounced', 'Failed');

-- CreateTable
CREATE TABLE "mail_logs" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "contact_id" UUID NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_mail_id" TEXT NOT NULL,
    "opens" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL,
    "status" "mail_log_status" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by" TEXT,

    CONSTRAINT "mail_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mail_logs_tenant_id_idx" ON "mail_logs"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "mail_logs_provider_id_provider_mail_id_key" ON "mail_logs"("provider_id", "provider_mail_id");

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "accounts_provider_id_account_id_idx" ON "accounts"("provider_id", "account_id");

-- CreateIndex
CREATE INDEX "accounts_access_token_idx" ON "accounts"("access_token");

-- CreateIndex
CREATE INDEX "api_keys_tenant_id_idx" ON "api_keys"("tenant_id");

-- CreateIndex
CREATE INDEX "contact_imports_tenant_id_idx" ON "contact_imports"("tenant_id");

-- CreateIndex
CREATE INDEX "files_tenant_id_idx" ON "files"("tenant_id");

-- CreateIndex
CREATE INDEX "mail_configs_tenant_id_idx" ON "mail_configs"("tenant_id");

-- CreateIndex
CREATE INDEX "passkeys_user_id_idx" ON "passkeys"("user_id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "template_properties_tenant_id_idx" ON "template_properties"("tenant_id");

-- CreateIndex
CREATE INDEX "templates_tenant_id_idx" ON "templates"("tenant_id");

-- CreateIndex
CREATE INDEX "two_factors_user_id_idx" ON "two_factors"("user_id");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "users"("tenant_id");

-- AddForeignKey
ALTER TABLE "mail_logs" ADD CONSTRAINT "mail_logs_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
