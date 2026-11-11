import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SHOP_NAME, SHOP_PHONE } from "@/lib/constants";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Дэлгүүр",
    links: [
      { label: "Үндэст ногоо", href: "/shop?category=root-vegetables" },
      { label: "Жимсэн ногоо", href: "/shop?category=fruit-vegetables" },
      { label: "Навчит ногоо", href: "/shop?category=leafy-greens" },
      { label: "Холимог хайрцаг", href: "/shop?category=mixed-boxes" },
      { label: "Хямдрал", href: "/shop?deals=1" },
    ],
  },
  {
    title: "Бидний тухай",
    links: [
      { label: "Манай фермүүд", href: "/farms" },
      { label: "Хэрхэн захиалах", href: "/help" },
      { label: "Хүргэлтийн бүс", href: "/help#delivery" },
    ],
  },
  {
    title: "Бүртгэл",
    links: [
      { label: "Нэвтрэх", href: "/login" },
      { label: "Байгууллагаар бүртгүүлэх", href: "/register" },
      { label: "Миний захиалгууд", href: "/account" },
      { label: "Хадгалсан бараа", href: "/wishlist" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-5 text-[15px] leading-relaxed text-white/65">
            Ресторан, зочид буудал, дэлгүүрт Монголын 40 гаруй фермийн шинэхэн хүнсний ногоог бөөний үнээр
            нийлүүлнэ. Өнөөдөр захиалаад маргааш өглөө хүлээн аваарай.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-brand-100" /> {SHOP_PHONE}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-brand-100" /> hello@urgats.mn
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-brand-100" /> Хан-Уул дүүрэг, 15-р хороо, Улаанбаатар
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-brand-100" /> Захиалга 24/7 · Хүргэлт 06:00–18:00
            </li>
          </ul>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-[15px] font-bold text-white">{col.title}</h3>
            <ul className="mt-5 grid gap-3 text-[15px]">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SHOP_NAME}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p>Төлбөрийг QPay-ээр бүх банкны аппаар төлнө</p>
        </div>
      </div>
    </footer>
  );
}
