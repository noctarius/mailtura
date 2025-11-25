/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,contact_id]` on the table `Bounce` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,name]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,email]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,contact_id]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,name]` on the table `SubscriberList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_id,contact_id]` on the table `Unsubscribe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenant_id` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Bounce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `SubscriberList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Unsubscribe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `UnsubscribedList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Bounce" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "SubscriberList" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Unsubscribe" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UnsubscribedList" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_tenant_id_contact_id_campaign_id_idx" ON "Activity"("tenant_id", "contact_id", "campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bounce_tenant_id_contact_id_key" ON "Bounce"("tenant_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_tenant_id_name_key" ON "Campaign"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_tenant_id_email_key" ON "Contact"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_tenant_id_contact_id_key" ON "Subscriber"("tenant_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriberList_tenant_id_name_key" ON "SubscriberList"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Unsubscribe_tenant_id_contact_id_key" ON "Unsubscribe"("tenant_id", "contact_id");

-- CreateIndex
CREATE INDEX "UnsubscribedList_tenant_id_idx" ON "UnsubscribedList"("tenant_id");
