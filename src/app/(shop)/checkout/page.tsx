import Link from "next/link";
import type { Metadata } from "next";
import { Clock, LogIn } from "lucide-react";
import { canOrder, getCurrentUser } from "@/lib/session";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Захиалга хийх" };

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user || !canOrder(user)) {
    return (
      <div className="container-x grid place-items-center pt-16 text-center">
        <div className="card max-w-md p-9">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-50 text-brand">
            {user ? <Clock className="size-7" /> : <LogIn className="size-7" />}
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
            {user ? "Бүртгэл баталгаажаагүй байна" : "Нэвтэрч орно уу"}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {user
              ? `“${user.companyName ?? user.name}” байгууллагын бүртгэлийг манай ажилтан шалгаж байна. Баталгаажсаны дараа захиалга өгөх боломжтой. Таны сагс хадгалагдсан хэвээр байна.`
              : "Бөөний захиалга өгөхийн тулд байгууллагын бүртгэлээрээ нэвтэрнэ үү."}
          </p>
          {!user && (
            <div className="mt-6 flex justify-center gap-2">
              <Link href="/login?next=/checkout" className="btn btn-primary h-11 px-6">Нэвтрэх</Link>
              <Link href="/register?next=/checkout" className="btn btn-outline h-11 px-6">Бүртгүүлэх</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Захиалга хийх</h1>
      <p className="mt-1 text-muted">
        {user.companyName ?? user.name}
        {user.companyRegNo ? ` · Регистр ${user.companyRegNo}` : ""}
      </p>
      <CheckoutForm defaults={{ name: user.name, phone: user.phone ?? "" }} />
    </div>
  );
}
