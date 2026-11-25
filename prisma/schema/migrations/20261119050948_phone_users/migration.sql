-- CreateTable
CREATE TABLE "phone_users" (
    "phone" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "phone_users_pkey" PRIMARY KEY ("phone")
);

-- CreateIndex
CREATE UNIQUE INDEX "phone_users_clerk_user_id_key" ON "phone_users"("clerk_user_id");
