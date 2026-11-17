-- CreateTable
CREATE TABLE "standing_orders" (
    "id" TEXT NOT NULL,
    "clerk_user_id" TEXT NOT NULL,
    "day_of_month" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "standing_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standing_order_items" (
    "id" TEXT NOT NULL,
    "standing_order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "standing_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "standing_orders_clerk_user_id_key" ON "standing_orders"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "standing_order_items_standing_order_id_product_id_key" ON "standing_order_items"("standing_order_id", "product_id");

-- AddForeignKey
ALTER TABLE "standing_order_items" ADD CONSTRAINT "standing_order_items_standing_order_id_fkey" FOREIGN KEY ("standing_order_id") REFERENCES "standing_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standing_order_items" ADD CONSTRAINT "standing_order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

