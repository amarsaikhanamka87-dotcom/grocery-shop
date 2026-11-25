"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveScanText } from "./saveScanText";
import { sendScanToPos } from "./sendScanToPos";

type Notice = { tone: "ok" | "warn"; text: string } | null;

/** Text side of the handwriting page: the editable text, and Хадгалах / Хуулах / Касс руу. */
export function useScanText() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [scanId, setScanId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, startBusy] = useTransition();

  function load(readText: string, newScanId: string | null) {
    setText(readText);
    setScanId(newScanId);
    setNotice(newScanId ? null : { tone: "warn", text: "Текст уншсан ч хадгалагдсангүй." });
  }

  function save() {
    if (!scanId) return;
    startBusy(async () => {
      const result = await saveScanText({ scanId, text });
      setNotice(result.ok ? { tone: "ok", text: "Хадгаллаа." } : { tone: "warn", text: result.error });
    });
  }

  function sendToPos() {
    if (!scanId) return;
    startBusy(async () => {
      const result = await sendScanToPos({ scanId, text });
      if (!result.ok) return setNotice({ tone: "warn", text: result.error });
      const skipped = result.unmatched.length ? `&skipped=${encodeURIComponent(result.unmatched.join("; "))}` : "";
      router.push(`/admin/physical-store?bill=${encodeURIComponent(result.bill)}${skipped}`);
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setNotice({ tone: "ok", text: "Хуулсан." });
    } catch {
      setNotice({ tone: "warn", text: "Хуулж чадсангүй. Текстээ гараар сонгож хуулна уу." });
    }
  }

  return { text, setText, scanId, notice, busy, load, save, sendToPos, copy };
}
