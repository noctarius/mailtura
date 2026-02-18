-- CreateTable
CREATE TABLE "webhooks" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "mail_config_id" UUID NOT NULL,
    "provider_id" TEXT NOT NULL,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_mail_config_id_fkey" FOREIGN KEY ("mail_config_id") REFERENCES "mail_configs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
