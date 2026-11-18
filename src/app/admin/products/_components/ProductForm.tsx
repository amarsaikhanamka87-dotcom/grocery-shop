"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import type { FormState } from "@/types/forms";
import { Dialog } from "@base-ui/react/dialog";
import { createProduct } from "../_features/createProduct";
import { updateProduct } from "../_features/updateProduct";
import { FormSection } from "./FormSection";
import { ProductField } from "./ProductField";
import { KeepFields } from "./KeepFields";

/** Empty form values for a new product. */
const BLANK: Partial<Record<keyof Product, string>> = { stock: "0", minQty: "1", categoryId: "" };

const toggle = "flex flex-1 items-center gap-2.5 rounded-xl border border-line px-3.5 py-3 font-medium has-[:checked]:border-brand has-[:checked]:bg-brand-50";

type Props = { product?: Product; categories: Category[]; onSaved: () => void };

/**
 * Creates a product (all sections), or quick-edits `product`: only "Үнэ ба үлдэгдэл", the rest is
 * sent unchanged by <KeepFields>. Body scrolls; the save bar stays.
 */
export function ProductForm({ product: p, categories, onSaved }: Props) {
  const submit = p ? updateProduct.bind(null, p.id) : createProduct;
  const [state, action, pending] = useActionState<FormState, FormData>(submit, {});
  useEffect(() => {
    if (state.ok) onSaved();
  }, [state, onSaved]);
  const v = state.values;
  const fe = state.fieldErrors ?? {};
  // After a failed submit show what the admin typed; otherwise the saved product (or blanks).
  const val = (k: keyof Product) => (v ? (v[k] ?? "") : p ? String(p[k] ?? "") : (BLANK[k] ?? ""));
  const checked = (k: "isFeatured" | "isOrganic") => (v ? v[k] === "on" : (p?.[k] ?? false));

  return (
    <form key={JSON.stringify(v)} action={action} className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
        {p ? (
          <KeepFields product={p} />
        ) : (
        <FormSection title="Үндсэн мэдээлэл">
          <ProductField name="name" label="Нэр" defaultValue={val("name")} error={fe.name} />
          <ProductField name="slug" label="Slug (URL)" defaultValue={val("slug")} error={fe.slug} />
          <div>
            <label className="label" htmlFor="categoryId">Ангилал</label>
            <select id="categoryId" name="categoryId" defaultValue={val("categoryId")} className="input" required>
              <option value="" disabled>Ангилал сонгох</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {fe.categoryId && <p className="mt-1.5 text-[13px] font-medium text-clay">{fe.categoryId}</p>}
          </div>
          <ProductField name="origin" label="Гарал үүсэл (заавал биш)" defaultValue={val("origin")} error={fe.origin} required={false} />
          <div className="sm:col-span-2">
            <ProductField name="description" label="Тайлбар" defaultValue={val("description")} error={fe.description} multiline />
          </div>
        </FormSection>
        )}

        <FormSection title="Үнэ ба үлдэгдэл">
          <ProductField name="price" label="Үнэ (₮)" defaultValue={val("price")} error={fe.price} inputMode="numeric" />
          <ProductField name="oldPrice" label="Хуучин үнэ (₮, заавал биш)" defaultValue={val("oldPrice")} error={fe.oldPrice} inputMode="numeric" required={false} />
          <ProductField name="unit" label="Нэгж" defaultValue={val("unit")} error={fe.unit} />
          <ProductField name="stock" label="Үлдэгдэл" defaultValue={val("stock")} error={fe.stock} inputMode="numeric" />
          <ProductField name="minQty" label="Хамгийн бага захиалах тоо" defaultValue={val("minQty")} error={fe.minQty} inputMode="numeric" />
        </FormSection>

        {!p && (
        <FormSection title="Зураг ба шошго">
          <div className="sm:col-span-2">
            <ProductField name="image" label="Зургийн холбоос (images.unsplash.com)" defaultValue={val("image")} error={fe.image} />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <label className={toggle}>
              <input type="checkbox" name="isFeatured" defaultChecked={checked("isFeatured")} className="size-4 accent-brand" /> Онцлох
            </label>
            <label className={toggle}>
              <input type="checkbox" name="isOrganic" defaultChecked={checked("isOrganic")} className="size-4 accent-brand" /> Органик
            </label>
          </div>
        </FormSection>
        )}

        {state.error && <p className="rounded-xl bg-clay-50 px-4 py-3 text-[14px] font-medium text-clay">{state.error}</p>}
      </div>

      <div className="flex gap-3 border-t border-line bg-white px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:rounded-b-3xl sm:px-6 sm:pb-4">
        <Dialog.Close type="button" className="btn btn-outline h-12 px-6">Болих</Dialog.Close>
        <button type="submit" disabled={pending} className="btn btn-primary h-12 flex-1">
          {pending && <Loader2 className="size-4 animate-spin" />} Хадгалах
        </button>
      </div>
    </form>
  );
}
