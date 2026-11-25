-- CreateTable
CREATE TABLE "HandwritingScan" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "readText" TEXT NOT NULL,
    "finalText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HandwritingScan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HandwritingScan_createdAt_idx" ON "HandwritingScan"("createdAt");
