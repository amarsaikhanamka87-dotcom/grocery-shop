import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The business sign-up, high enough to be seen (businesses are the main buyers): what they get and
 * one button. Nothing else in the band (the farms are in the header and footer menus).
 */
export function BusinessBand() {
  return (
    <section className="container-x mt-12 sm:mt-16">
      <div className="grid gap-5 rounded-[28px] bg-brand p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="h-section">Байгууллага уу?</h2>
          <p className="mt-2 text-[16px] text-white/85">
            Үргэлж үнэгүй хүргэлт, НӨАТ-ын баримт, сар бүрийн тогтмол захиалга.
          </p>
        </div>
        <Link href="/business" className="btn h-12 bg-white px-6 text-[16px] text-brand hover:bg-white/90">
          Байгууллагаар бүртгүүлэх <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
