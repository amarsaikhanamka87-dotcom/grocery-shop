import Link from "next/link";
import { SearchX } from "lucide-react";

export function NoResults() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <SearchX className="size-10 text-muted-foreground" />
      <p className="mt-4 text-lg font-bold">Бүтээгдэхүүн олдсонгүй</p>
      <p className="mt-1 text-muted-foreground">Өөр түлхүүр үгээр хайж үзнэ үү.</p>
      <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">
        Бүх бүтээгдэхүүн
      </Link>
    </div>
  );
}
