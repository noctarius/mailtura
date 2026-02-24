-- AddForeignKey
ALTER TABLE "unsubscribes" ADD CONSTRAINT "unsubscribes_tenant_id_email_fkey" FOREIGN KEY ("tenant_id", "email") REFERENCES "contacts"("tenant_id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
