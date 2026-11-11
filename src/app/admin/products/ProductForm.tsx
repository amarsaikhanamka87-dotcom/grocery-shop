"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { saveProduct, type FormState } from "../actions";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice: number | null;
  unit: string;
  image: string;
  stock: number;
  minQty: number;
  categoryId: string;
  origin: string | null;
  isFeatured: boolean;
  isOrganic: boolean;
};

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-[13px] font-medium text-clay">{msg}</p> : null;
}

export function ProductForm({ product, categories }: { product?: Product; categories: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProduct, {});
  const [image, setImage] = useState(product?.image ?? "");
  const fe = state.fieldErrors ?? {};
  // After a failed save, show what was submitted instead of the original values.
  const v = (key: string, fallback: string | number | null | undefined) => state.values?.[key] ?? fallback ?? "";
  const checked = (key: string, fallback: boolean | undefined) => (state.values ? state.values[key] === "on" : !!fallback);

  return (
    <form action={action} className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="card grid gap-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">Нэр</label>
            <input id="name" name="name" defaultValue={v("name", product?.name)} className="input" required />
            <Err msg={fe.name} />
          </div>
          <div>
            <label className="label" htmlFor="slug">Slug (URL)</label>
            <input id="slug" name="slug" defaultValue={v("slug", product?.slug)} className="input" placeholder="Хоосон бол нэрээс үүснэ" />
            <Err msg={fe.slug} />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="description">Тайлбар</label>
          <textarea id="description" name="description" rows={4} defaultValue={v("description", product?.description)} className="input" required />
          <Err msg={fe.description} />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="price">Нэгжийн үнэ (₮)</label>
            <input id="price" name="price" type="number" min={1} defaultValue={v("price", product?.price)} className="input" required />
            <Err msg={fe.price} />
          </div>
          <div>
            <label className="label" htmlFor="oldPrice">Хуучин үнэ (₮)</label>
            <input id="oldPrice" name="oldPrice" type="number" min={1} defaultValue={v("oldPrice", product?.oldPrice)} className="input" placeholder="Хямдралтай бол" />
            <Err msg={fe.oldPrice} />
          </div>
          <div>
            <label className="label" htmlFor="stock">Нөөц (нэгжээр)</label>
            <input id="stock" name="stock" type="number" min={0} defaultValue={v("stock", product?.stock ?? 0)} className="input" required />
            <Err msg={fe.stock} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-4">
          <div>
            <label className="label" htmlFor="unit">Нэгж</label>
            <input id="unit" name="unit" defaultValue={v("unit", product?.unit ?? "кг")} className="input" placeholder="кг" required />
            <Err msg={fe.unit} />
          </div>
          <div>
            <label className="label" htmlFor="minQty">Хамгийн бага захиалга</label>
            <input id="minQty" name="minQty" type="number" min={1} defaultValue={v("minQty", product?.minQty ?? 1)} className="input" required />
            <Err msg={fe.minQty} />
          </div>
          <div>
            <label className="label" htmlFor="categoryId">Ангилал</label>
            <select key={String(v("categoryId", product?.categoryId))} id="categoryId" name="categoryId" defaultValue={v("categoryId", product?.categoryId)} className="input" required>
              <option value="" disabled>Сонгох</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <Err msg={fe.categoryId} />
          </div>
          <div>
            <label className="label" htmlFor="origin">Гарал үүсэл</label>
            <input id="origin" name="origin" defaultValue={v("origin", product?.origin)} className="input" placeholder="Сэлэнгэ" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-[15px] font-semibold">
            <input type="checkbox" name="isFeatured" defaultChecked={checked("isFeatured", product?.isFeatured)} className="size-4 accent-[#2e5d3d]" /> Онцлох
          </label>
          <label className="flex items-center gap-2.5 text-[15px] font-semibold">
            <input type="checkbox" name="isOrganic" defaultChecked={checked("isOrganic", product?.isOrganic)} className="size-4 accent-[#2e5d3d]" /> Органик
          </label>
        </div>
      </div>

      <div className="grid content-start gap-6">
        <div className="card p-6">
          <label className="label" htmlFor="image">Зургийн холбоос (URL)</label>
          <input id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} className="input" placeholder="https://images.unsplash.com/..." required />
          <Err msg={fe.image} />
          <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl bg-cream-2">
            {/^https:\/\/images\.unsplash\.com\//.test(image) ? (
              <Image src={image} alt="" fill sizes="280px" className="object-cover" />
            ) : (
              <p className="grid h-full place-items-center p-4 text-center text-[13px] text-muted">images.unsplash.com зураг урьдчилан харагдана</p>
            )}
          </div>
        </div>
        <button disabled={pending} className="btn btn-primary h-12">
          {pending && <Loader2 className="size-4 animate-spin" />} Хадгалах
        </button>
      </div>
    </form>
  );
}
