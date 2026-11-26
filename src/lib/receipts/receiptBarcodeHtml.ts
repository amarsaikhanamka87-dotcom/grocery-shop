// Code 39, digits only: 9 elements per character (bar, space, bar, …), 1 = wide. "*" = start/stop.
const PATTERNS: Record<string, string> = {
  "0": "000110100",
  "1": "100100001",
  "2": "001100001",
  "3": "101100000",
  "4": "000110001",
  "5": "100110000",
  "6": "001110000",
  "7": "000100101",
  "8": "100100100",
  "9": "001100100",
  "*": "010010100",
};
const NARROW = 2;
const WIDE = 5;

/**
 * The receipt number as a scannable Code 39 barcode, drawn with table cells (Gmail strips SVG but
 * keeps cell colors, so the same bars show in the email, the admin view and the PDF).
 */
export function receiptBarcodeHtml(receiptNumber: number): string {
  const text = `*${String(receiptNumber).replace(/\D/g, "")}*`;
  const cells: string[] = [];
  for (const char of text) {
    PATTERNS[char].split("").forEach((element, index) => {
      const color = index % 2 === 0 ? "#000" : "#fff";
      const width = element === "1" ? WIDE : NARROW;
      cells.push(`<td style="width:${width}px;height:38px;padding:0;background:${color};" bgcolor="${color}"></td>`);
    });
    cells.push(`<td style="width:${NARROW}px;padding:0;background:#fff;"></td>`); // gap between characters
  }
  return `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;"><tr>${cells.join("")}</tr></table>
<div style="font-family:monospace;font-size:11px;letter-spacing:2px;text-align:center;">${text.slice(1, -1)}</div>`;
}
