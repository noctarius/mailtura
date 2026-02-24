UPDATE "unsubscribes"
SET "subscriber_list_id" = '00000000-0000-0000-0000-000000000000'
WHERE "subscriber_list_id" IS NULL;

ALTER TABLE "unsubscribes"
  DROP CONSTRAINT IF EXISTS "unsubscribes_subscriber_list_id_fkey";

ALTER TABLE "unsubscribes"
  DROP COLUMN IF EXISTS "global";

ALTER TABLE "unsubscribes"
  ALTER COLUMN "subscriber_list_id" SET NOT NULL;
