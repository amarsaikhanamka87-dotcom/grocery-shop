"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, Smartphone } from "lucide-react";

type BankUrl = { name: string; description: string; logo: string; link: string };

/** Bank logo with a lettered fallback (some QPay logo URLs don't load). */
function BankLogo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // The image may have failed before hydration, when onError wasn't attached yet.
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed || !src) {
    return (
      <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-[15px] font-extrabold text-brand">
        {name.trim().charAt(0).toUpperCase()}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt="" className="size-10 rounded-lg object-cover" onError={() => setFailed(true)} />;
}

export function QPayPanel({
  orderId,
  qrImage,
  shortUrl,
  urls,
  sandbox,
}: {
  orderId: string;
  qrImage: string;
  shortUrl: string | null;
  urls: BankUrl[];
  sandbox: boolean;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function check(manual = false) {
    if (manual) setChecking(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/payment`, { cache: "no-store" });
      const data = await res.json();
      if (data.paymentStatus === "PAID") {
        router.refresh();
        return true;
      }
      if (manual) setMessage(res.ok ? "Төлбөр хараахан орж ирээгүй байна." : "Шалгахад алдаа гарлаа. Дахин оролдоно уу.");
    } catch {
      if (manual) setMessage("Шалгахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      if (manual) setChecking(false);
    }
    return false;
  }

  // Poll every 5 seconds for up to 15 minutes while the page is open.
  useEffect(() => {
    let stopped = false;
    let n = 0;
    const timer = setInterval(async () => {
      if (stopped || ++n > 180 || document.hidden) return;
      if (await check()) clearInterval(timer);
    }, 5000);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] md:items-start">
      <div className="order-2 mx-auto w-full max-w-[220px] md:order-none md:max-w-[260px]">
        <div className="rounded-2xl border border-line bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${qrImage}`} alt="QPay QR код" className="aspect-square w-full" />
        </div>
        <p className="mt-2 flex items-center justify-center gap-2 text-[13px] text-muted">
          <Loader2 className="size-3.5 animate-spin" /> Төлбөр хүлээж байна...
        </p>
      </div>

      <div className="order-1 min-w-0 md:order-none">
        <ol className="hidden gap-2 text-[14.5px] text-ink-2 md:grid">
          <li>1. Банкны аппаа нээгээд <b>QPay / QR уншуулах</b> хэсэгт орно.</li>
          <li>2. Зүүн талын QR кодыг уншуулж төлбөрөө баталгаажуулна.</li>
          <li>3. Төлбөр ормогц энэ хуудас автоматаар шинэчлэгдэнэ.</li>
        </ol>
        <p className="text-[14.5px] text-ink-2 md:hidden">
          Банкаа сонгоход апп нь нээгдэж төлбөр хийгдэнэ. Өөр утаснаас төлөх бол доорх QR кодыг уншуулна уу.
        </p>

        {urls.length > 0 && (
          <div className="mt-4 md:hidden">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Smartphone className="size-4" /> Утсан дээрээ банкны аппаа сонгох
            </p>
            <ul className="mt-3 grid grid-cols-3 gap-2 min-[400px]:grid-cols-4">
              {urls.map((u) => (
                <li key={u.name}>
                  <a href={u.link} className="flex h-full flex-col items-center gap-1.5 rounded-xl border border-line bg-white p-2 text-center active:bg-cream-2">
                    <BankLogo src={u.logo} name={u.description} />
                    <span className="line-clamp-2 text-[11px] font-semibold leading-tight">{u.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <button type="button" onClick={() => check(true)} disabled={checking} className="btn btn-primary h-11 px-5">
            {checking ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Төлбөр шалгах
          </button>
          {shortUrl && (
            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand underline">
              QPay холбоосоор төлөх
            </a>
          )}
        </div>
        {message && <p className="mt-3 text-[13.5px] font-medium text-clay">{message}</p>}
        {sandbox && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[12.5px] text-amber-800">
            Туршилтын (sandbox) горим: жинхэнэ төлбөр хийгдэхгүй. Админ самбараас “Төлөгдсөн” гэж тэмдэглэж туршина уу.
          </p>
        )}
      </div>
    </div>
  );
}
