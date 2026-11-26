import { Calculator, Copy, Save } from "lucide-react";
import type { useScanText } from "../_features/useScanText";

type ScanText = ReturnType<typeof useScanText>;

const secondaryButton =
  "flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line px-3 font-semibold text-ink hover:bg-cream-2 disabled:opacity-50";

// Right card: the read text to correct, then Хадгалах / Хуулах / Касс руу оруулах.
export function ScanTextPanel({ scanText }: { scanText: ScanText }) {
  const hasText = Boolean(scanText.text.trim());
  const canAct = hasText && !scanText.busy;
  // Says why the buttons are grey, so they never look broken.
  const hint = !hasText
    ? "Эхлээд зураг сонгоод «Текст болгох»-ыг дарна уу."
    : !scanText.scanId
      ? "Энэ текст хадгалагдаагүй тул Касс руу оруулах, хадгалах боломжгүй. «Хуулах»-ыг ашиглана уу."
      : null;
  return (
    <section className="card grid content-start gap-3 p-4">
      <label htmlFor="handwriting-text" className="font-semibold text-ink">
        Уншсан текст (засаж болно)
      </label>
      <textarea
        id="handwriting-text"
        value={scanText.text}
        onChange={(event) => scanText.setText(event.target.value)}
        placeholder="Зураг уншсаны дараа текст энд гарна. [?] гэсэн газрыг шалгаж засна уу."
        rows={12}
        className="input min-h-56 w-full resize-y font-normal leading-relaxed"
      />

      <button
        type="button"
        className="btn min-h-11 w-full justify-center"
        disabled={!canAct || !scanText.scanId}
        onClick={scanText.sendToPos}
      >
        <Calculator className="size-5" />
        {scanText.busy ? "Түр хүлээнэ үү…" : "Касс руу оруулах"}
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={secondaryButton} disabled={!canAct || !scanText.scanId} onClick={scanText.save}>
          <Save className="size-5" />
          Хадгалах
        </button>
        <button type="button" className={secondaryButton} disabled={!canAct} onClick={scanText.copy}>
          <Copy className="size-5" />
          Хуулах
        </button>
      </div>

      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}

      {scanText.notice && (
        <p
          role="status"
          className={`rounded-xl px-3 py-2 text-sm font-semibold ${
            scanText.notice.tone === "ok" ? "bg-brand/10 text-brand" : "bg-clay/10 text-clay"
          }`}
        >
          {scanText.notice.text}
        </p>
      )}
    </section>
  );
}
