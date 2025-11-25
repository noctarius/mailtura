-- CreateTable
CREATE TABLE "template_properties" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "templates_id" UUID,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "default_value" JSONB NOT NULL,

    CONSTRAINT "template_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "template_properties" ADD CONSTRAINT "template_properties_templates_id_fkey" FOREIGN KEY ("templates_id") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
