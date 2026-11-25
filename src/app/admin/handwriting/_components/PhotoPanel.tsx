import { Camera, Loader2, ScanText } from "lucide-react";
import type { useHandwritingReader } from "../_features/useHandwritingReader";

type Reader = ReturnType<typeof useHandwritingReader>;

// Left card: take or choose a photo, see it, and read it.
export function PhotoPanel({ reader }: { reader: Reader }) {
  return (
    <section className="card grid content-start gap-4 p-4">
      <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line px-4 py-6 text-center font-semibold text-ink hover:bg-cream-2">
        <Camera className="size-5 shrink-0" />
        {reader.file ? "Өөр зураг сонгох" : "Зураг авах эсвэл сонгох"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="sr-only"
          onChange={(event) => reader.choosePhoto(event.target.files?.[0] ?? null)}
        />
      </label>

      {reader.previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not optimizable
        <img
          src={reader.previewUrl}
          alt="Сонгосон зураг"
          className="max-h-[60vh] w-full rounded-xl border border-line object-contain"
        />
      )}

      <button
        type="button"
        className="btn min-h-11 w-full justify-center"
        disabled={!reader.file || reader.isReading}
        onClick={reader.readPhoto}
      >
        {reader.isReading ? <Loader2 className="size-5 animate-spin" /> : <ScanText className="size-5" />}
        {reader.isReading ? "Уншиж байна…" : "Текст болгох"}
      </button>

      {reader.error && (
        <p role="alert" className="rounded-xl bg-clay/10 px-3 py-2 text-sm font-semibold text-clay">
          {reader.error}
        </p>
      )}
    </section>
  );
}
