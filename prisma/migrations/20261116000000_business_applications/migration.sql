-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "business_applications" (
    "id" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_reg_no" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "status" "BusinessStatus" NOT NULL DEFAULT 'PENDING',
    "reject_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_at" TIMESTAMPTZ(6),

    CONSTRAINT "business_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_applications_clerk_user_id_key" ON "business_applications"("clerk_user_id");

-- CreateIndex
CREATE INDEX "business_applications_status_created_at_idx" ON "business_applications"("status", "created_at");

