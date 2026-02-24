/*
  Warnings:

  - You are about to drop the column `subscriber_list_id` on the `unsubscribes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id,contact_id,unsubscribe_list_id]` on the table `unsubscribes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unsubscribe_list_id` to the `unsubscribes` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "unsubscribes" DROP CONSTRAINT "unsubscribes_tenant_id_contact_id_subscriber_list_id_key";

-- DropIndex
-- DROP INDEX "unsubscribes_tenant_id_contact_id_subscriber_list_id_key";

-- AlterTable
ALTER TABLE "unsubscribes" DROP COLUMN "subscriber_list_id",
ADD COLUMN     "unsubscribe_list_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "unsubscribe_lists" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by" TEXT,

    CONSTRAINT "unsubscribe_lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unsubscribe_lists_tenant_id_name_key" ON "unsubscribe_lists"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "unsubscribes_tenant_id_contact_id_unsubscribe_list_id_key" ON "unsubscribes"("tenant_id", "contact_id", "unsubscribe_list_id");

-- AddForeignKey
ALTER TABLE "unsubscribes" ADD CONSTRAINT "unsubscribes_unsubscribe_list_id_fkey" FOREIGN KEY ("unsubscribe_list_id") REFERENCES "unsubscribe_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
