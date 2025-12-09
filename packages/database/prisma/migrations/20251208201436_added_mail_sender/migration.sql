/*
  Warnings:

  - Added the required column `content_type` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_template` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substitutions` to the `mail_sendings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail_sendings" ADD COLUMN     "content" TEXT,
ADD COLUMN     "content_type" TEXT NOT NULL,
ADD COLUMN     "is_template" BOOLEAN NOT NULL,
ADD COLUMN     "substitutions" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "mail_senders_tenant_id_idx" ON "mail_senders"("tenant_id");

-- CreateIndex
CREATE INDEX "mail_sendings_tenant_id_idx" ON "mail_sendings"("tenant_id");
