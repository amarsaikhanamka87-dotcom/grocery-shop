import Link from "next/link";
import { Heart } from "lucide-react";

export function EmptyWishlist() {
  return (
    <div className="grid place-items-center py-20 text-center">
      <Heart className="size-10 text-muted-foreground" />
      <p className="mt-4 text-[16px] font-bold">Хадгалсан бүтээгдэхүүн алга</p>
      <p className="mt-1 text-muted-foreground">Бүтээгдэхүүн дээрх зүрхэн дээр дарж хадгална уу.</p>
      <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">
        Дэлгүүр хэсэх
      </Link>
    </div>
  );
}
