-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('Active', 'Scheduled', 'Completed', 'Draft', 'Paused');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('OneTime', 'Automated');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('Delivered', 'Opened', 'Clicked', 'Pending', 'Scheduled', 'Bounced', 'Failed');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Queued', 'Delivered', 'Clicked', 'Opened', 'Failed', 'Bounced');

-- CreateEnum
CREATE TYPE "BounceType" AS ENUM ('Hard', 'Soft');

-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('Subscribed', 'Unsubscribed', 'Bounced');

-- CreateEnum
CREATE TYPE "UnsubscribeSource" AS ENUM ('UnsubscribeLink', 'ManualAddition', 'Bounce', 'Api', 'Other');

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "last_activity" TIMESTAMP(3),
    "list_ids" UUID[],

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "type" "CampaignType" NOT NULL,
    "recipients" INTEGER NOT NULL,
    "sent" INTEGER NOT NULL,
    "delivered" INTEGER NOT NULL,
    "opened" INTEGER NOT NULL,
    "clicked" INTEGER NOT NULL,
    "delivery_rate" INTEGER NOT NULL,
    "open_rate" INTEGER NOT NULL,
    "clickR_rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "send_name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" "ActivityStatus" NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "last_event_received" TIMESTAMP(3) NOT NULL,
    "last_event_type" "EventType" NOT NULL,
    "opens" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL,
    "campaign_id" UUID,
    "contact_id" UUID NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bounce" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "bounced_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "bounce_type" "BounceType" NOT NULL,
    "contact_id" UUID NOT NULL,

    CONSTRAINT "Bounce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "status" "SubscriberStatus" NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL,
    "contact_id" UUID NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriberList" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact_ids" UUID[],
    "unsubscribe_list_id" UUID,

    CONSTRAINT "SubscriberList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnsubscribedList" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "unsubscribed_at" TIMESTAMP(3) NOT NULL,
    "subscriber_list_id" UUID NOT NULL,

    CONSTRAINT "UnsubscribedList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unsubscribe" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "unsubscribed_at" TIMESTAMP(3) NOT NULL,
    "global" BOOLEAN NOT NULL,
    "list_ids" TEXT[],
    "contact_id" UUID NOT NULL,

    CONSTRAINT "Unsubscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounce" ADD CONSTRAINT "Bounce_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unsubscribe" ADD CONSTRAINT "Unsubscribe_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
