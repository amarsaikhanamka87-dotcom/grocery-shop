"use client";

import { useHandwritingReader } from "../_features/useHandwritingReader";
import { useScanText } from "../_features/useScanText";
import { PhotoPanel } from "./PhotoPanel";
import { ScanTextPanel } from "./ScanTextPanel";

// Photo of a handwritten note → Gemini → editable text: save it, copy it, or open it as a Касс bill.
export function HandwritingReader() {
  const scanText = useScanText();
  const reader = useHandwritingReader(scanText.load);
  return (
    <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
      <PhotoPanel reader={reader} />
      <ScanTextPanel scanText={scanText} />
    </div>
  );
}
