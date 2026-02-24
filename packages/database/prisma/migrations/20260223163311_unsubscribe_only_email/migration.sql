/*
  Warnings:

  - You are about to drop the column `contact_id` on the `unsubscribes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id,email,unsubscribe_list_id]` on the table `unsubscribes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `unsubscribes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "unsubscribes" DROP CONSTRAINT "unsubscribes_contact_id_fkey";

-- DropIndex
DROP INDEX "unsubscribes_tenant_id_contact_id_unsubscribe_list_id_key";

-- AlterTable add column for view
ALTER TABLE "unsubscribes" ADD COLUMN "email" TEXT NOT NULL;

-- Adjust view
CREATE OR REPLACE VIEW "contacts_with_subscriptions" AS
SELECT "t0"."id",
       "t0"."tenant_id",
       "t0"."email",
       "t0"."first_name",
       "t0"."last_name",
       "t0"."created_at",
       "t0"."created_by",
       "t0"."updated_at",
       "t0"."updated_by",
       "t4"."subscriptions"                         AS "subscriptions",
       COALESCE("t5"."_aggr_count_bounces", 0)      AS "bounces",
       COALESCE("t7"."_aggr_count_unsubscribes", 0) AS "unsubscribes"
FROM "contacts" AS "t0"
LEFT JOIN LATERAL (
    SELECT array_agg("t3"."subscription") AS "subscriptions"
    FROM (
        SELECT "t2"."subscriber_list_id" AS "subscription"
        FROM (
            SELECT "t1"."subscriber_list_id"
            FROM "subscribers" AS "t1"
            WHERE "t0"."id" = "t1"."contact_id"
              AND "t1"."status" = 'Subscribed'::text::subscriber_status
        ) AS "t2"
    ) AS "t3"
) AS "t4" ON TRUE
LEFT JOIN LATERAL (
    SELECT count(*) AS "_aggr_count_bounces"
    FROM "bounces" AS "t6"
    WHERE "t0"."id" = "t6"."contact_id"
) t5 ON TRUE
LEFT JOIN LATERAL (
    SELECT COUNT(*) AS "_aggr_count_unsubscribes"
    FROM "unsubscribes" AS "t8"
    WHERE "t0"."email" = "t8"."email"
) AS "t7" ON TRUE;

-- AlterTable drop column
ALTER TABLE "unsubscribes" DROP COLUMN "contact_id";

-- CreateIndex
CREATE UNIQUE INDEX "unsubscribes_tenant_id_email_unsubscribe_list_id_key"
    ON "unsubscribes"("tenant_id", "email", "unsubscribe_list_id");
