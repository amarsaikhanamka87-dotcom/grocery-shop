import { MapPin } from "lucide-react";
import type { Product } from "@/types/catalog";
import { formatPrice } from "@/lib/format/formatPrice";
import { AddToCart } from "@/components/product/AddToCart";
import { StockStatus } from "./StockStatus";
import { DeliveryPerks } from "./DeliveryPerks";

export function ProductDetails({ product: p }: { product: Product }) {
  return (
    <div className="lg:py-4">
      {p.origin && (
        <p className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <MapPin className="size-4" /> {p.origin}
        </p>
      )}
      <h1 className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[42px]">{p.name}</h1>
      <p className="mt-1 text-[15px] text-muted-foreground">Бөөний үнэ · {p.unit}-ээр</p>

      <div className="mt-6 flex items-end gap-3">
        <p className="text-[34px] font-extrabold tabular-nums tracking-tight">
          {formatPrice(p.price)}
          <span className="text-lg font-bold text-muted-foreground"> / {p.unit}</span>
        </p>
        {p.oldPrice && (
          <p className="pb-1.5 text-lg font-semibold text-muted-foreground line-through">{formatPrice(p.oldPrice)}</p>
        )}
      </div>

      <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-2">{p.description}</p>
      <StockStatus product={p} />
      <div className="mt-4">
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
      <DeliveryPerks />
    </div>
  );
}
