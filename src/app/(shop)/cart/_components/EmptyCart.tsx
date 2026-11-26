import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="container-x grid place-items-center py-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-brand-50 text-brand">
        <ShoppingBasket className="size-9" />
      </span>
      <h1 className="mt-6 text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Сагс хоосон байна</h1>
      <p className="mt-2 text-[16px] text-muted-foreground">Ногоогоо сонгоод сагсандаа нэмээрэй.</p>
      <Link href="/shop" className="btn btn-primary mt-8 h-12 px-7 text-[16px]">
        Ногоо сонгох <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
