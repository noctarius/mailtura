-- CreateTable
CREATE TABLE "mail_url_proxies" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "contact_id" UUID,
    "position" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "mail_url_proxies_pkey" PRIMARY KEY ("id")
);
