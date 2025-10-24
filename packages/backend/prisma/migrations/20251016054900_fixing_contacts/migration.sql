/*
  Warnings:

  - You are about to drop the column `subscriber_list_contacts_id` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id,subscriber_list_id,contact_id]` on the table `subscriber_list_contacts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_id` to the `subscriber_list_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."contacts" DROP CONSTRAINT "contacts_subscriber_list_contacts_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "subscriber_list_contacts_id";

-- AlterTable
ALTER TABLE "subscriber_list_contacts" ADD COLUMN     "contact_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_list_contacts_tenant_id_subscriber_list_id_conta_key" ON "subscriber_list_contacts"("tenant_id", "subscriber_list_id", "contact_id");

-- AddForeignKey
ALTER TABLE "subscriber_list_contacts" ADD CONSTRAINT "subscriber_list_contacts_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
