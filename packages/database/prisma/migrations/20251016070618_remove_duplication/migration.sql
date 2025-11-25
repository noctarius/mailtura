/*
  Warnings:

  - You are about to drop the `subscriber_list_contacts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tenant_id,contact_id,subscriber_list_id]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriber_list_id` to the `subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."subscriber_list_contacts" DROP CONSTRAINT "subscriber_list_contacts_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscriber_list_contacts" DROP CONSTRAINT "subscriber_list_contacts_subscriber_list_id_fkey";

-- DropIndex
DROP INDEX "public"."subscribers_tenant_id_contact_id_key";

-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "subscriber_list_id" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."subscriber_list_contacts";

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_tenant_id_contact_id_subscriber_list_id_key" ON "subscribers"("tenant_id", "contact_id", "subscriber_list_id");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_subscriber_list_id_fkey" FOREIGN KEY ("subscriber_list_id") REFERENCES "subscriber_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
