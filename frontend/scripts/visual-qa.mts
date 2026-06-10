// frontend/scripts/visual-qa.mts
//
// B29 — device-frame visual QA at the priority viewport (iPhone 16 Pro,
// 393x852 @3x, mobile + touch). Builds nothing itself: run `npm run build`
// first, then this script previews dist/, taps the economic-research chip
// (the steps_to_citation path), asserts scroll + interactivity, and writes
// the screenshot for PR attachment.
//
// Usage: npm run qa:visual   (requires `playwright install chromium` once)
//
// @cite ../../docs/research/2026-06-10-pay-per-crawl.md

import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require("/opt/node22/lib/node_modules/playwright"));
}

const preview = spawn("npx", ["vite", "preview", "--port", "4173"], {
  cwd: new URL("..", import.meta.url).pathname,
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 3000));

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const chip = page.locator(".team-chip-primary");
  await chip.click();
  const scrollable = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight,
  );
  const rows = await page.locator(".citations-table tbody tr").count();
  await page.screenshot({ path: "/tmp/iphone16pro.png" });
  await browser.close();

  const pass = scrollable && rows > 0;
  console.log(JSON.stringify({ scrollable, econ_rows: rows, screenshot: "/tmp/iphone16pro.png", pass }));
  if (!pass) process.exit(1);
} finally {
  if (preview.pid !== undefined) process.kill(-preview.pid, "SIGTERM");
}
