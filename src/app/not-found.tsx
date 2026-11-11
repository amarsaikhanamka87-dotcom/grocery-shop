import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <Leaf className="mx-auto size-12 text-brand" />
        <p className="mt-4 text-[64px] font-extrabold leading-none tracking-tight text-brand">404</p>
        <h1 className="mt-3 text-2xl font-extrabold">Хуудас олдсонгүй</h1>
        <p className="mt-2 text-muted">Таны хайсан хуудас устсан эсвэл буруу хаяг байна.</p>
        <Link href="/" className="btn btn-primary mt-6 h-12 px-6">Нүүр хуудас руу</Link>
      </div>
    </div>
  );
}
