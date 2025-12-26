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
       "contacts_subscribers"."subscriptions"       AS "subscriptions",
       COALESCE("t5"."_aggr_count_bounces", 0)      AS "bounces",
       COALESCE("t7"."_aggr_count_unsubscribes", 0) AS "unsubscribes"
FROM "contacts" AS "t0"
         LEFT JOIN LATERAL (
    SELECT array_agg("subscription") AS "subscriptions"
    FROM (
             SELECT "t3"."subscription"
             FROM (
                      SELECT "t2"."subscriber_list_id" AS "subscription",
                             "t2"."status"
                      FROM (
                               SELECT "t1".*
                               FROM "subscribers" AS "t1"
                               WHERE "t0"."id" = "t1"."contact_id" /* root select */
                           ) AS "t2" /* inner select */
                  ) AS "t3"
             WHERE "t3"."status" =
                   CAST('Subscribed'::text AS "subscriber_status") /* middle select */
         ) AS "t4" /* outer select */
    ) AS "contacts_subscribers" ON true
         LEFT JOIN LATERAL (
    SELECT COUNT(*) AS "_aggr_count_bounces"
    FROM "bounces" AS "t6"
    WHERE "t0"."id" = "t6"."contact_id"
    ) AS "t5" ON true
         LEFT JOIN LATERAL (
    SELECT COUNT(*) AS "_aggr_count_unsubscribes"
    FROM "unsubscribes" AS "t8"
    WHERE "t0"."id" = "t8"."contact_id"
    ) AS "t7" ON true;
