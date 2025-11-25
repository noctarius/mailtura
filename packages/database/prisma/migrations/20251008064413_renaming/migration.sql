/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bounce` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscriberList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscriberListContacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unsubscribe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "campaign_status" AS ENUM ('Active', 'Scheduled', 'Completed', 'Draft', 'Paused', 'Cancelled');

-- CreateEnum
CREATE TYPE "campaign_type" AS ENUM ('OneTime', 'Automated');

-- CreateEnum
CREATE TYPE "activity_status" AS ENUM ('Delivered', 'Opened', 'Clicked', 'Pending', 'Scheduled', 'Bounced', 'Failed');

-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('Queued', 'Delivered', 'Clicked', 'Opened', 'Failed', 'Bounced');

-- CreateEnum
CREATE TYPE "bounce_type" AS ENUM ('Hard', 'Soft');

-- CreateEnum
CREATE TYPE "subscriber_status" AS ENUM ('Subscribed', 'Unsubscribed', 'Bounced', 'Complaint');

-- CreateEnum
CREATE TYPE "unsubscribe_source" AS ENUM ('UnsubscribeLink', 'ManualAddition', 'Bounce', 'Api', 'Other');

-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bounce" DROP CONSTRAINT "Bounce_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_subscriber_list_contacts_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subscriber" DROP CONSTRAINT "Subscriber_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SubscriberListContacts" DROP CONSTRAINT "SubscriberListContacts_subscriber_list_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Unsubscribe" DROP CONSTRAINT "Unsubscribe_contact_id_fkey";

-- DropTable
DROP TABLE "public"."Activity";

-- DropTable
DROP TABLE "public"."ApiKey";

-- DropTable
DROP TABLE "public"."Bounce";

-- DropTable
DROP TABLE "public"."Campaign";

-- DropTable
DROP TABLE "public"."Contact";

-- DropTable
DROP TABLE "public"."Subscriber";

-- DropTable
DROP TABLE "public"."SubscriberList";

-- DropTable
DROP TABLE "public"."SubscriberListContacts";

-- DropTable
DROP TABLE "public"."Tenant";

-- DropTable
DROP TABLE "public"."Unsubscribe";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."ActivityStatus";

-- DropEnum
DROP TYPE "public"."BounceType";

-- DropEnum
DROP TYPE "public"."CampaignStatus";

-- DropEnum
DROP TYPE "public"."CampaignType";

-- DropEnum
DROP TYPE "public"."EventType";

-- DropEnum
DROP TYPE "public"."SubscriberStatus";

-- DropEnum
DROP TYPE "public"."UnsubscribeSource";

-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "last_activity_at" TIMESTAMP(3),
    "subscriber_list_contacts_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "list_ids" UUID[],

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "campaign_status" NOT NULL,
    "type" "campaign_type" NOT NULL,
    "recipients" INTEGER NOT NULL,
    "sent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "send_name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" "activity_status" NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "last_event_received_at" TIMESTAMP(3) NOT NULL,
    "last_event_type" "event_type" NOT NULL,
    "opens" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL,
    "campaign_id" UUID,
    "contact_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bounces" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "bounced_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "bounce_type" "bounce_type" NOT NULL,
    "contact_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "bounces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "status" "subscriber_status" NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL,
    "contact_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber_list" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "subscriber_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber_list_contacts" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "subscriber_list_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "subscriber_list_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unsubscribes" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "source" "unsubscribe_source" NOT NULL,
    "unsubscribed_at" TIMESTAMP(3) NOT NULL,
    "global" BOOLEAN NOT NULL,
    "list_ids" UUID[],
    "contact_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "unsubscribes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
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

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_tenant_id_email_key" ON "contacts"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_tenant_id_name_key" ON "campaigns"("tenant_id", "name");

-- CreateIndex
CREATE INDEX "activities_tenant_id_contact_id_campaign_id_idx" ON "activities"("tenant_id", "contact_id", "campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "bounces_tenant_id_contact_id_key" ON "bounces"("tenant_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_tenant_id_contact_id_key" ON "subscribers"("tenant_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_list_tenant_id_name_key" ON "subscriber_list"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "unsubscribes_tenant_id_contact_id_key" ON "unsubscribes"("tenant_id", "contact_id");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_subscriber_list_contacts_id_fkey" FOREIGN KEY ("subscriber_list_contacts_id") REFERENCES "subscriber_list_contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bounces" ADD CONSTRAINT "bounces_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriber_list_contacts" ADD CONSTRAINT "subscriber_list_contacts_subscriber_list_id_fkey" FOREIGN KEY ("subscriber_list_id") REFERENCES "subscriber_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unsubscribes" ADD CONSTRAINT "unsubscribes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
