"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { saveCategory, type FormState } from "../actions";

type Category = { id: string; name: string; slug: string; image: string; sortOrder: number };

export function CategoryForm({ category, onDone }: { category?: Category; onDone?: () => void }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveCategory, {});
  const ref = useRef<HTMLFormElement>(null);
  const fe = state.fieldErrors ?? {};
  const v = state.ok ? undefined : state.values;

  useEffect(() => {
    if (state.ok) {
      if (!category) ref.current?.reset();
      onDone?.();
    }
  }, [state, category, onDone]);

  return (
    <form ref={ref} action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_2fr_80px_auto] sm:items-start">
      {category && <input type="hidden" name="id" value={category.id} />}
      <div>
        <input name="name" defaultValue={v?.name ?? category?.name} placeholder="Нэр" className="input" required />
        {fe.name && <p className="mt-1 text-[12px] text-clay">{fe.name}</p>}
      </div>
      <div>
        <input name="slug" defaultValue={v?.slug ?? category?.slug} placeholder="slug" className="input" />
        {fe.slug && <p className="mt-1 text-[12px] text-clay">{fe.slug}</p>}
      </div>
      <div>
        <input name="image" defaultValue={v?.image ?? category?.image} placeholder="Зургийн URL" className="input" required />
        {fe.image && <p className="mt-1 text-[12px] text-clay">{fe.image}</p>}
      </div>
      <input name="sortOrder" type="number" defaultValue={v?.sortOrder ?? category?.sortOrder ?? 0} className="input" aria-label="Эрэмбэ" />
      <button disabled={pending} className="btn btn-primary h-[46px] px-5">
        {pending && <Loader2 className="size-4 animate-spin" />} {category ? "Хадгалах" : "Нэмэх"}
      </button>
    </form>
  );
}
