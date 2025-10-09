/*
  Warnings:

  - You are about to drop the column `click_rate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `clicked` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `delivered` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_rate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `open_rate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `opened` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `last_activity` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberListContactsId` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `tenant_id` to the `SubscriberListContacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_subscriberListContactsId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "click_rate",
DROP COLUMN "clicked",
DROP COLUMN "delivered",
DROP COLUMN "delivery_rate",
DROP COLUMN "open_rate",
DROP COLUMN "opened";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "last_activity",
DROP COLUMN "subscriberListContactsId",
ADD COLUMN     "last_activity_at" TIMESTAMP(3),
ADD COLUMN     "subscriber_list_contacts_id" UUID;

-- AlterTable
ALTER TABLE "SubscriberListContacts" ADD COLUMN     "tenant_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "permissions" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "last_used_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "permissions" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_subscriber_list_contacts_id_fkey" FOREIGN KEY ("subscriber_list_contacts_id") REFERENCES "SubscriberListContacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
