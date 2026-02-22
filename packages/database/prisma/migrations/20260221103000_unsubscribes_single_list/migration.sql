ALTER TABLE "unsubscribes"
  ADD COLUMN "subscriber_list_id" UUID;

UPDATE "unsubscribes"
SET "subscriber_list_id" = CASE
  WHEN array_length("list_ids", 1) IS NOT NULL AND array_length("list_ids", 1) > 0 THEN "list_ids"[1]
  ELSE NULL
END;

ALTER TABLE "unsubscribes"
  DROP CONSTRAINT IF EXISTS "unsubscribes_tenant_id_contact_id_key";

ALTER TABLE "unsubscribes"
  DROP COLUMN "list_ids";

ALTER TABLE "unsubscribes"
  ADD CONSTRAINT "unsubscribes_subscriber_list_id_fkey"
  FOREIGN KEY ("subscriber_list_id") REFERENCES "subscriber_lists"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "unsubscribes"
  ADD CONSTRAINT "unsubscribes_tenant_id_contact_id_subscriber_list_id_key"
  UNIQUE ("tenant_id", "contact_id", "subscriber_list_id");
