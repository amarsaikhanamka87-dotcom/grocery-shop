"use client";

import { Plus } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { AddressForm } from "./AddressForm";
import { SavedAddressList } from "./SavedAddressList";
import { useAddressDialog, type AddressTab } from "./useAddressDialog";

const TABS: { id: AddressTab; label: string }[] = [
  { id: "temp", label: "Шинэ хаяг" },
  { id: "saved", label: "Хадгалсан хаяг" },
];

/** Inside of "Хаяг сонгох": a one-off address, or one of the saved ones (+ add a new one). */
export function AddressDialogBody() {
  const d = useAddressDialog();
  return (
    <>
        <Dialog.Title className="border-b border-line px-6 py-5 text-lg font-extrabold">Хаяг сонгох</Dialog.Title>
        <div className="grid gap-5 px-6 py-5">
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => d.setTab(t.id)}
                className={cn(
                  "h-10 rounded-xl px-4 text-[14px] font-bold",
                  d.tab === t.id ? "bg-ink text-white" : "bg-ink/5 text-ink-2 hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          {d.tab === "temp" && <AddressForm id="temp-address" initial={d.loc.current} onSubmit={d.chooseTemp} />}
          {d.tab === "saved" && d.adding && <AddressForm id="new-address" onSubmit={d.saveAndChoose} />}
          {d.tab === "saved" && !d.adding && (
            <>
              <SavedAddressList
                saved={d.loc.saved}
                selectedId={d.selectedId}
                onSelect={d.setSelectedId}
                onRemove={d.loc.remove}
              />
              <button
                type="button"
                onClick={() => d.setAdding(true)}
                className="btn btn-outline h-11 w-full"
              >
                <Plus className="size-4" /> Хаяг нэмэх
              </button>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
          <button type="button" onClick={d.close} className="btn btn-outline h-11 px-5">
            Болих
          </button>
          <button
            type={d.submitForm ? "submit" : "button"}
            form={d.submitForm ?? undefined}
            onClick={d.submitForm ? undefined : d.chooseSelected}
            disabled={!d.submitForm && !d.selectedId}
            className="btn btn-primary h-11 px-5"
          >
            Сонгох
          </button>
        </div>
    </>
  );
}
