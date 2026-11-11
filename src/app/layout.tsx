import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ургац — Бөөний хүнсний ногоо нийлүүлэлт",
    template: "%s | Ургац",
  },
  description:
    "Ресторан, зочид буудал, дэлгүүрт Монголын 40 гаруй фермийн шинэхэн хүнсний ногоог бөөний үнээр, QPay төлбөртэй нийлүүлнэ.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={manrope.variable}>
      <body className="min-h-dvh">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
