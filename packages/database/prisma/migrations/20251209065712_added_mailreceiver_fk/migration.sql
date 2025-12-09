-- CreateIndex
CREATE INDEX "mail_sending_receivers_tenant_id_idx" ON "mail_sending_receivers"("tenant_id");

-- AddForeignKey
ALTER TABLE "mail_sending_receivers" ADD CONSTRAINT "mail_sending_receivers_mail_sending_id_fkey" FOREIGN KEY ("mail_sending_id") REFERENCES "mail_sendings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
