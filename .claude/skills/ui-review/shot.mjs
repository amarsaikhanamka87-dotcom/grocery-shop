// Full-page screenshot of a public page in headless Chrome (no sign-in: buyer pages only).
// usage: node .claude/skills/ui-review/shot.mjs <url> <out.png> [width]   (390 = phone, 1440 = desktop)
// Sets sessionStorage "location-asked-v2" so the "Хаяг сонгох" popup does not cover the page.
import { spawn } from "node:child_process";
const [url, out, width = "1440"] = process.argv.slice(2);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ["--headless=new", "--remote-debugging-port=9333", `--user-data-dir=${process.env.TMPDIR}/ui-review-${Date.now()}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch("http://127.0.0.1:9333/json")).json(); break; } catch { await wait(250); } }
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const w = Number(width);
await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 600 });
await send("Page.enable");
await send("Page.addScriptToEvaluateOnNewDocument", { source: "try{sessionStorage.setItem('location-asked-v2','1')}catch{}" });
await send("Page.navigate", { url });
await wait(9000);
const { result } = await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true });
const h = Math.min(result.value, 9000);
await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
await wait(1500);
const shot = await send("Page.captureScreenshot", { format: "png" });
(await import("node:fs")).writeFileSync(out, Buffer.from(shot.data, "base64"));
ws.close(); chrome.kill(); process.exit(0);
