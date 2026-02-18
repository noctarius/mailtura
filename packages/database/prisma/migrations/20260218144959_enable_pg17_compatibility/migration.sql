-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "api_keys" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "bounces" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "campaigns" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "contact_imports" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_configs" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_logs" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_senders" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_sending_receivers" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_sendings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "mail_url_proxies" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "passkeys" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "subscriber_lists" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "subscribers" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "template_properties" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "two_factors" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "unsubscribes" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "verifications" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "webhooks" ALTER COLUMN "id" DROP DEFAULT;
