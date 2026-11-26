/**
 * Compares handwriting models on your own photos.
 *
 * Put photos in ocr-samples/ (git-ignored), each with the correct text in a .txt of the same name:
 *   ocr-samples/order-01.jpg + ocr-samples/order-01.txt
 * Run: npm run ocr:compare
 * Prints, per model, the character error rate (CER) and word error rate (WER): lower is better.
 * Models: OCR_COMPARE_MODELS="gemini:gemini-2.5-flash,gemini:gemini-2.5-pro,qwen:qwen-vl-max"
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { readHandwrittenImage } from "../../src/lib/ocr/readHandwrittenImage";
import { readWithQwen } from "./readWithQwen";
import { textDistance } from "./textDistance";

const SAMPLES_DIR = "ocr-samples";
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const models = (process.env.OCR_COMPARE_MODELS || "gemini:gemini-2.5-flash,gemini:gemini-2.5-pro,qwen:qwen-vl-max")
  .split(",")
  .map((entry) => entry.trim().split(":") as [string, string]);

const normalize = (text: string) => text.normalize("NFC").replace(/\s+/g, " ").trim();
const say = (line: string) => process.stdout.write(`${line}\n`);

function read(provider: string, model: string, image: string, mimeType: string) {
  return provider === "qwen" ? readWithQwen(model, image, mimeType) : readHandwrittenImage(model, image, mimeType);
}

async function main() {
  const photos = (await readdir(SAMPLES_DIR).catch(() => [] as string[])).filter((name) => MIME[extname(name).toLowerCase()]).sort();
  if (photos.length === 0) return say(`No photos in ${SAMPLES_DIR}/. See the comment at the top of this file.`);

  const report: string[] = ["model\tphoto\tCER\tWER"];
  for (const [provider, model] of models) {
    let charErrors = 0, chars = 0, wordErrors = 0, words = 0, failed = 0;
    for (const photo of photos) {
      const base = photo.slice(0, -extname(photo).length);
      const truth = normalize(await readFile(join(SAMPLES_DIR, `${base}.txt`), "utf8").catch(() => ""));
      if (!truth) { say(`  skip ${photo}: no ${base}.txt`); continue; }
      const image = (await readFile(join(SAMPLES_DIR, photo))).toString("base64");
      const answer = await read(provider, model, image, MIME[extname(photo).toLowerCase()]);
      if (!answer) { failed++; continue; }
      const got = normalize(answer);
      const ce = textDistance([...truth], [...got]);
      const we = textDistance(truth.split(" "), got.split(" "));
      charErrors += ce; chars += [...truth].length; wordErrors += we; words += truth.split(" ").length;
      report.push(`${model}\t${photo}\t${(ce / [...truth].length).toFixed(3)}\t${(we / truth.split(" ").length).toFixed(3)}`);
      await writeFile(join(SAMPLES_DIR, `${base}.${model}.out.txt`), answer);
    }
    const percent = (errors: number, total: number) => (total ? `${((errors / total) * 100).toFixed(1)}%` : "—");
    say(`${provider}:${model}  CER ${percent(charErrors, chars)}  WER ${percent(wordErrors, words)}  failed ${failed}`);
  }
  await writeFile(join(SAMPLES_DIR, "report.tsv"), report.join("\n"));
  say(`Per-photo results: ${SAMPLES_DIR}/report.tsv; each model's text: <photo>.<model>.out.txt`);
}

main();
