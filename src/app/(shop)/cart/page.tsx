import type { Metadata } from "next";
import { CartContent } from "./_components/CartContent";

export const metadata: Metadata = { title: "Сагс" };

export default function CartPage() {
  return <CartContent />;
}
