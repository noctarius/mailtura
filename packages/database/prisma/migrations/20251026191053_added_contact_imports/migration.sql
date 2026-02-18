-- CreateTable
CREATE TABLE "contact_imports" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" TEXT,
    "filename" TEXT NOT NULL,
    "status" DOUBLE PRECISION NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by" TEXT,

    CONSTRAINT "contact_imports_pkey" PRIMARY KEY ("id")
);
