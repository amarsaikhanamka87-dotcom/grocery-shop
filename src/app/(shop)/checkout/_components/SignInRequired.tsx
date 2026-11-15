import Link from "next/link";
import { LogIn } from "lucide-react";

export function SignInRequired() {
  return (
    <div className="container-x grid place-items-center pt-16 text-center">
      <div className="card max-w-md p-9">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-50 text-brand">
          <LogIn className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">Нэвтэрч орно уу</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Бөөний захиалга өгөхийн тулд нэвтэрнэ үү. Таны сагс хадгалагдсан хэвээр байна.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link href="/sign-in?redirect_url=/checkout" className="btn btn-primary h-11 px-6">
            Нэвтрэх
          </Link>
          <Link href="/sign-up?redirect_url=/checkout" className="btn btn-outline h-11 px-6">
            Бүртгүүлэх
          </Link>
        </div>
      </div>
    </div>
  );
}
