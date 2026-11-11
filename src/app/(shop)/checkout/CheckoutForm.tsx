"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { DELIVERY_SLOTS, DISTRICTS, deliveryFeeFor } from "@/lib/constants";
import { placeOrder, type CheckoutState } from "./actions";

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-[13px] font-medium text-clay">{msg}</p> : null;
}

export function CheckoutForm({ defaults }: { defaults: { name: string; phone: string } }) {
  const { items, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, {});
  const fee = deliveryFeeFor(subtotal);
  const fe = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.orderId) {
      clear();
      router.replace(`/order/${state.orderId}`);
    }
  }, [state.orderId, clear, router]);

  if (!ready) return <div className="min-h-[40vh]" />;

  if (items.length === 0 && !state.orderId) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-bold">Сагс хоосон байна.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">
          Дэлгүүр хэсэх
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_400px] lg:gap-8">
      <input type="hidden" name="items" value={JSON.stringify(items.map((i) => ({ productId: i.productId, quantity: i.quantity })))} />

      <div className="grid min-w-0 gap-5 sm:gap-6">
        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">1. Хүлээн авах хүн</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="customerName">Хүлээн авах хүний нэр</label>
              <input id="customerName" name="customerName" defaultValue={v.customerName ?? defaults.name} className="input" autoComplete="name" required />
              <FieldError msg={fe.customerName} />
            </div>
            <div>
              <label className="label" htmlFor="phone">Утасны дугаар</label>
              <input id="phone" name="phone" defaultValue={v.phone ?? defaults.phone} className="input" inputMode="numeric" placeholder="9911-2233" autoComplete="tel" required />
              <FieldError msg={fe.phone} />
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">2. Хүргэлтийн хаяг</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <label className="label" htmlFor="district">Дүүрэг</label>
              <select key={v.district ?? ""} id="district" name="district" className="input" defaultValue={v.district ?? ""} required>
                <option value="" disabled>
                  Сонгох
                </option>
                {DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <FieldError msg={fe.district} />
            </div>
            <div>
              <label className="label" htmlFor="address">Дэлгэрэнгүй хаяг</label>
              <textarea id="address" name="address" rows={3} className="input" placeholder="Хороо, гудамж, байр/барилга, ресторан/агуулахын хаалга" defaultValue={v.address} required />
              <FieldError msg={fe.address} />
            </div>
            <div>
              <label className="label" htmlFor="note">Нэмэлт тайлбар (заавал биш)</label>
              <input id="note" name="note" className="input" placeholder="Жишээ нь: арын хаалгаар, 07:00-с өмнө" defaultValue={v.note} />
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">3. Хүргэлтийн цаг</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {DELIVERY_SLOTS.map((s, i) => (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] font-semibold has-[:checked]:border-brand has-[:checked]:bg-brand-50"
              >
                <input type="radio" name="deliverySlot" value={s} defaultChecked={v.deliverySlot ? v.deliverySlot === s : i === 0} className="size-4 accent-[#2e5d3d]" />
                {s}
              </label>
            ))}
          </div>
          <FieldError msg={fe.deliverySlot} />
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">4. Төлбөр</h2>
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-brand bg-brand-50 px-4 py-3.5">
            <span className="grid h-9 place-items-center rounded-lg bg-[#00a0e9] px-2.5 text-[13px] font-extrabold text-white">QPay</span>
            <p className="text-[14.5px] font-semibold">QPay — бүх банкны аппаар QR уншуулж төлнө</p>
          </div>
          <p className="mt-3 text-[13px] text-muted">
            Захиалга баталгаажсаны дараа QPay нэхэмжлэх үүсч, төлбөр орсны дараа захиалга бэлтгэгдэж эхэлнэ.
          </p>
        </section>
      </div>

      <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[200px]">
        <h2 className="text-lg font-extrabold">Таны захиалга</h2>
        <ul className="mt-5 grid max-h-72 grid-cols-1 gap-3 overflow-y-auto pr-1">
          {items.map((i) => (
            <li key={i.productId} className="flex items-center gap-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-2">
                <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />
                <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-white">
                  {i.quantity}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14.5px] font-semibold">{i.name}</p>
                <p className="text-[12.5px] text-muted">{i.quantity} {i.unit} × {formatPrice(i.price)}</p>
              </div>
              <p className="text-[14.5px] font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Бүтээгдэхүүн</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Хүргэлт</dt>
            <dd className="font-semibold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
          </div>
          <div className="mt-1 flex justify-between border-t border-line pt-4 text-lg">
            <dt className="font-bold">Нийт</dt>
            <dd className="font-extrabold tabular-nums">{formatPrice(subtotal + fee)}</dd>
          </div>
        </dl>
        {state.error && (
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-clay-50 px-4 py-3 text-[14px] font-medium text-clay">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {state.error}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn btn-primary mt-6 h-[52px] w-full text-[15px]">
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? "Нэхэмжлэх үүсгэж байна..." : `QPay-ээр төлөх · ${formatPrice(subtotal + fee)}`}
        </button>
        <p className="mt-3 text-center text-[12.5px] text-muted">Үнэ, нөөцийг захиалах үед дахин шалгана.</p>
      </aside>
    </form>
  );
}
