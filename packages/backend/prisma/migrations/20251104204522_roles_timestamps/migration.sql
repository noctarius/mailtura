-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
ADD COLUMN     "created_by" TEXT NOT NULL DEFAULT 'api',
ADD COLUMN     "updated_at" TIMESTAMPTZ,
ADD COLUMN     "updated_by" TEXT;
