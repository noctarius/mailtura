-- CreateTable
CREATE TABLE "system_configs" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "system_configs_pkey" PRIMARY KEY ("id")
);
