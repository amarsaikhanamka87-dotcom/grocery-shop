import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

// Cyrillic subset is needed for the Mongolian UI text.
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ургац — Бөөний хүнсний ногоо", template: "%s | Ургац" },
  description:
    "Ресторан, зочид буудал, дэлгүүрт Монголын фермийн шинэхэн хүнсний ногоог бөөний үнээр нийлүүлнэ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={manrope.variable}>
      <body className="min-h-dvh">
        {/* Current Clerk SDKs expect the provider inside <body>. */}
        {/* Phone login is our own form (components/auth/PhoneLogin): Clerk can't text +976.
            Clerk's optional phone field stays hidden (showOptionalFields defaults to false). */}
        <ClerkProvider appearance={{ theme: shadcn }}>
          <CartProvider>{children}</CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
