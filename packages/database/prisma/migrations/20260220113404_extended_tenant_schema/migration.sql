-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "custom_domain" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "max_users" INTEGER NOT NULL DEFAULT 0;
