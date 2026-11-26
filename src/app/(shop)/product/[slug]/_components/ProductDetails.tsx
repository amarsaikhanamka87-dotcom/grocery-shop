import { MapPin } from "lucide-react";
import type { Product } from "@/types/catalog";
import { formatPrice } from "@/lib/format/formatPrice";
import { AddToCart } from "@/components/product/AddToCart";
import { StockStatus } from "./StockStatus";
import { DeliveryPerks } from "./DeliveryPerks";

/**
 * Name, price, then straight away the quantity + "Сагслах" (on phones it sticks to the bottom
 * of the screen while the details are in view), then stock, description and perks.
 */
export function ProductDetails({ product: p }: { product: Product }) {
  return (
    <div className="lg:py-4">
      {p.origin && (
        <p className="flex items-center gap-1.5 text-[16px] text-muted-foreground">
          <MapPin className="size-4" /> {p.origin}
        </p>
      )}
      <h1 className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[42px]">{p.name}</h1>

      <div className="mt-3 flex items-end gap-3">
        <p className="text-[34px] font-extrabold tabular-nums tracking-tight">
          {formatPrice(p.price)}
          <span className="text-[16px] font-normal tracking-normal text-muted-foreground"> / {p.unit}</span>
        </p>
        {p.oldPrice && (
          <p className="pb-1.5 text-[16px] text-muted-foreground line-through">{formatPrice(p.oldPrice)}</p>
        )}
      </div>
      <StockStatus product={p} />

      <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <AddToCart
          item={{
            productId: p.id,
            slug: p.slug,
            name: p.name,
            image: p.image,
            unit: p.unit,
            price: p.price,
            stock: p.stock,
            minQty: p.minQty,
          }}
        />
      </div>

      <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-2">{p.description}</p>
      <DeliveryPerks />
    </div>
  );
}
