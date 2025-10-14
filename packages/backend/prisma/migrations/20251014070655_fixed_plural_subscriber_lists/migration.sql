/*
  Warnings:

  - You are about to drop the `subscriber_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."subscriber_list_contacts" DROP CONSTRAINT "subscriber_list_contacts_subscriber_list_id_fkey";

-- DropTable
DROP TABLE "public"."subscriber_list";

-- CreateTable
CREATE TABLE "subscriber_lists" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "subscriber_lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_lists_tenant_id_name_key" ON "subscriber_lists"("tenant_id", "name");

-- AddForeignKey
ALTER TABLE "subscriber_list_contacts" ADD CONSTRAINT "subscriber_list_contacts_subscriber_list_id_fkey" FOREIGN KEY ("subscriber_list_id") REFERENCES "subscriber_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
