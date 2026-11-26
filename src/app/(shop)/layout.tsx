import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AddressLine } from "@/components/location/AddressLine";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Phones: the address in words, under the sticky header (it scrolls away). */}
      <div className="border-b border-line bg-white md:hidden">
        <AddressLine />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
