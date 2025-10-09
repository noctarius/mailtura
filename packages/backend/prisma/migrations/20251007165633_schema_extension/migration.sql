/*
  Warnings:

  - You are about to drop the column `last_event_received` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `clickR_rate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `contact_ids` on the `SubscriberList` table. All the data in the column will be lost.
  - You are about to drop the column `unsubscribe_list_id` on the `SubscriberList` table. All the data in the column will be lost.
  - The `list_ids` column on the `Unsubscribe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `UnsubscribedList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_event_received_at` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Bounce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Bounce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `click_rate` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `SubscriberList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `SubscriberList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Unsubscribe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Unsubscribe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Unsubscribe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CampaignStatus" ADD VALUE 'Cancelled';

-- AlterEnum
ALTER TYPE "SubscriberStatus" ADD VALUE 'Complaint';

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "last_event_received",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "last_event_received_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "Bounce" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "clickR_rate",
ADD COLUMN     "click_rate" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "delivery_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "open_rate" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "subscriberListContactsId" UUID,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "SubscriberList" DROP COLUMN "contact_ids",
DROP COLUMN "unsubscribe_list_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unsubscribe" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "source" "UnsubscribeSource" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT,
DROP COLUMN "list_ids",
ADD COLUMN     "list_ids" UUID[];

-- DropTable
DROP TABLE "public"."UnsubscribedList";

-- CreateTable
CREATE TABLE "SubscriberListContacts" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "subscriber_list_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "SubscriberListContacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_subscriberListContactsId_fkey" FOREIGN KEY ("subscriberListContactsId") REFERENCES "SubscriberListContacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriberListContacts" ADD CONSTRAINT "SubscriberListContacts_subscriber_list_id_fkey" FOREIGN KEY ("subscriber_list_id") REFERENCES "SubscriberList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
