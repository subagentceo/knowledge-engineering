// scripts/verify-freshness.ts
//
// Phase 2 criterion #4. For each vendor/<name>/urls.md, parse the
// `last_crawled` front-matter timestamp and emit a per-vendor staleness
// report. Warns at 14 days; errors at 30 days. Wired as
// `npm run verify:freshness` and chained into the top-level verify.
//
// Citations:
//   @cite seeds/posture/session-start.xml
//   @cite rubrics/phase-2.md
//
// Pure read-only; safe to run in CI.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");

const WARN_DAYS = 14;
const ERROR_DAYS = 30;

interface VendorFreshness {
  vendor: string;
  hasUrlsMd: boolean;
  lastCrawled?: Date;
  ageDays?: number;
  status: "fresh" | "warn" | "error" | "missing";
}

function parseLastCrawled(body: string): Date | undefined {
  const m = body.match(/^last_crawled:\s*(.+?)\s*$/m);
  if (!m) return undefined;
  const d = new Date(m[1]);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export function checkFreshness(): VendorFreshness[] {
  if (!existsSync(VENDOR_ROOT)) return [];
  const out: VendorFreshness[] = [];
  const now = Date.now();
  for (const entry of readdirSync(VENDOR_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const urlsMd = resolve(VENDOR_ROOT, entry.name, "urls.md");
    if (!existsSync(urlsMd)) {
      out.push({ vendor: entry.name, hasUrlsMd: false, status: "missing" });
      continue;
    }
    const body = readFileSync(urlsMd, "utf8");
    const last = parseLastCrawled(body);
    if (!last) {
      out.push({ vendor: entry.name, hasUrlsMd: true, status: "missing" });
      continue;
    }
    const ageDays = Math.floor((now - last.getTime()) / (1000 * 60 * 60 * 24));
    let status: VendorFreshness["status"] = "fresh";
    if (ageDays >= ERROR_DAYS) status = "error";
    else if (ageDays >= WARN_DAYS) status = "warn";
    out.push({ vendor: entry.name, hasUrlsMd: true, lastCrawled: last, ageDays, status });
  }
  return out.sort((a, b) => a.vendor.localeCompare(b.vendor));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = checkFreshness();
  console.log("verify:freshness — vendor mirror staleness");
  let hardFail = 0;
  let warns = 0;
  for (const r of report) {
    const tag = r.status === "fresh" ? "✓ fresh" : r.status === "warn" ? "⚠ warn " : r.status === "error" ? "✗ error" : "? miss ";
    const ageStr = r.ageDays !== undefined ? `${r.ageDays}d` : "n/a";
    console.log(`  ${tag}  ${r.vendor.padEnd(22)} age=${ageStr.padEnd(6)} ${r.lastCrawled?.toISOString() ?? "(no urls.md or no last_crawled)"}`);
    if (r.status === "error") hardFail += 1;
    else if (r.status === "warn") warns += 1;
  }
  console.log(`\n${report.length} vendor(s) | ${warns} warning(s) | ${hardFail} error(s)`);
  if (hardFail > 0) process.exit(1);
}
