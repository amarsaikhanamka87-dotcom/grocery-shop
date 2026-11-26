import { History } from "lucide-react";
import { formatDayTimeMn } from "@/lib/format/formatDayTimeMn";
import type { HandwritingScanRow } from "@/lib/ocr/listHandwritingScans";

// Saved scans, newest first. Tap a row to see its whole text (the corrected one if it was saved).
export function RecentScans({ scans }: { scans: HandwritingScanRow[] | null }) {
  return (
    <section className="card mt-6 overflow-hidden">
      <h2 className="flex items-center gap-2 border-b border-line px-4 py-3 font-bold text-ink">
        <History className="size-5" />
        Сүүлд уншсан
      </h2>
      {!scans && <p className="px-4 py-8 text-center text-muted-foreground">Түүхийг ачаалж чадсангүй.</p>}
      {scans?.length === 0 && <p className="px-4 py-8 text-center text-muted-foreground">Одоогоор хоосон.</p>}
      <ul className="divide-y divide-line">
        {scans?.map((scan) => (
          <li key={scan.id}>
            <details className="group px-4 py-3">
              <summary className="flex min-h-11 cursor-pointer items-center gap-3">
                <span className="min-w-0 flex-1 truncate text-ink">{(scan.finalText ?? scan.readText).split("\n")[0]}</span>
                <span className="shrink-0 text-sm text-muted-foreground">{formatDayTimeMn(scan.createdAt)}</span>
              </summary>
              <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-sm text-ink">
                {scan.finalText ?? scan.readText}
              </pre>
              <p className="mt-2 text-xs text-muted-foreground">
                {scan.finalText ? "Зассан текст" : "Засаагүй (AI уншсанаар)"} · {scan.model}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
