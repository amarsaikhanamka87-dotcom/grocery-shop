import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PICKUP_POINT, SHOP_NAME, SHOP_PHONE } from "@/lib/constants";
import { addressLabel } from "@/lib/location/addressLabel";
import { googleMapsLinks } from "@/lib/location/googleMapsLinks";
import { getCategories } from "@/lib/catalog/getCategories";
import { Logo } from "./Logo";

const CONTACT_BTN =
  "flex h-11 items-center justify-center gap-2 rounded-xl bg-white/5 text-[14px] font-semibold text-white ring-1 ring-white/10";

const infoCols = [
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
      { label: "Нэвтрэх", href: "/sign-in" },
      { label: "Байгууллагаар бүртгүүлэх", href: "/sign-up" },
      { label: "Хадгалсан бараа", href: "/wishlist" },
    ],
  },
];

export async function Footer() {
  const categories = await getCategories();
  const cols = [
    {
      title: "Дэлгүүр",
      links: [
        ...categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
        { label: "Хямдрал", href: "/shop?deals=1" },
      ],
    },
    ...infoCols,
  ];
  return (
    <footer className="mt-16 bg-ink text-white/80 sm:mt-24">
      <div className="container-x grid gap-10 py-12 sm:py-16 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-4 text-[14px] leading-relaxed text-white/65 sm:mt-5 sm:text-[15px]">
            Ресторан, зочид буудал, дэлгүүрт Монголын 40 гаруй фермийн шинэхэн хүнсний ногоог бөөний үнээр
            нийлүүлнэ. Өнөөдөр захиалаад маргааш өглөө хүлээн аваарай.
          </p>
          {/* Phone and e-mail are buttons on phones (tap to call / write), plain lines from sm up. */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:hidden">
            <a href={`tel:${SHOP_PHONE}`} className={CONTACT_BTN}>
              <Phone className="size-4 text-brand-100" /> {SHOP_PHONE}
            </a>
            <a href="mailto:hello@urgats.mn" className={CONTACT_BTN}>
              <Mail className="size-4 text-brand-100" /> И-мэйл
            </a>
          </div>
          <ul className="mt-4 grid gap-3 text-sm sm:mt-6">
            <li className="hidden items-center gap-3 sm:flex">
              <Phone className="size-4 shrink-0 text-brand-100" /> {SHOP_PHONE}
            </li>
            <li className="hidden items-center gap-3 sm:flex">
              <Mail className="size-4 shrink-0 text-brand-100" /> hello@urgats.mn
            </li>
            <li>
              {/* Same place as "Очиж авах" (PICKUP_POINT); opens it in Google Maps. */}
              <a
                href={googleMapsLinks(PICKUP_POINT.mapsQuery).open}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-100" />
                <span>
                  {addressLabel(PICKUP_POINT)}, Улаанбаатар
                  <span className="ml-1.5 text-brand-100 underline underline-offset-2">Газрын зураг</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-100" /> Захиалга 24/7 · Хүргэлт 06:00–18:00
            </li>
          </ul>
        </div>
        {/* Phones: the link lists in two columns ("Дэлгүүр" left, the others stacked right). */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 md:contents">
          {cols.map((col, i) => (
            <div key={col.title} className={i === 0 ? "row-span-2 md:row-span-1" : undefined}>
              <h3 className="text-[14px] font-bold text-white sm:text-[15px]">{col.title}</h3>
              <ul className="mt-4 grid gap-2.5 text-[14px] sm:mt-5 sm:gap-3 sm:text-[15px]">
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
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-1.5 py-5 text-center text-[12.5px] text-white/50 sm:flex-row sm:gap-3 sm:py-6 sm:text-[13px]">
          <p>
            © {new Date().getFullYear()} {SHOP_NAME}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p>Төлбөрийг QR кодоор бүх банкны аппаар төлнө</p>
        </div>
      </div>
    </footer>
  );
}
