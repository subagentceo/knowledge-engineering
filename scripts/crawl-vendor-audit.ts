#!/usr/bin/env tsx
/**
 * crawl-vendor-audit — wrap `scripts/crawl-vendors.ts --vendor <v>`, capture
 * stderr+stdout, parse per-URL failure lines, classify them, and emit a
 * markdown report under `docs/research/<vendor>-crawl-failures-<YYYY-MM-DD>.md`
 * with recommended `deny_urls` additions for `vendor/<v>/crawl.json`.
 *
 * Failure-line shapes recognized (best-effort; the crawler does not yet emit
 * a uniform "[<v>] FAIL <url>: <reason>" line for every failure, so we also
 * match the targeted stderr lines it does emit today):
 *   [<v>] FAIL <url>: <reason>                  (future-proof, primary)
 *   [<v>] additional source error: <url>: <r>
 *   [<v>] html_index_source error: <url>: <r>
 *   [<v>] sitemap_xml error: <url>: <r>
 *   [<v>] sitemap child error: <url>: <r>
 *   [<v>] neon upsert failed for <path>: <r>
 *   [<v>] FAILED: <err>                         (top-level catch)
 *
 * Per spec (OVS5): TypeScript, no new deps, child_process.spawnSync; do not
 * run the live crawl by default — pass --dry-run to skip spawn and emit a
 * stub report demonstrating shape.
 *
 * Cited primitives:
 *   - vendor/anthropics/crawl.json
 *   - seeds/citations/define-outcomes.md
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

interface Args {
  vendor: string;
  dryRun: boolean;
}

function parseArgs(argv: string[]): Args {
  const out: Args = { vendor: "", dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--vendor") out.vendor = argv[++i] ?? "";
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--help" || a === "-h") {
      console.log("usage: crawl-vendor-audit --vendor <name> [--dry-run]");
      process.exit(0);
    } else if (!out.vendor && !a.startsWith("-")) out.vendor = a;
  }
  if (!out.vendor) {
    console.error("error: --vendor <name> is required");
    process.exit(2);
  }
  return out;
}

interface Failure {
  url: string;
  reason: string;
  kind: "404" | "5xx" | "timeout" | "parse-error" | "rate-limit" | "unknown";
}

const PATTERNS: { re: RegExp; reason: (m: RegExpMatchArray) => string }[] = [
  // Future-proof canonical line the crawler may emit per-URL.
  { re: /^\[[^\]]+\]\s+FAIL\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
  { re: /^\[[^\]]+\]\s+additional source error:\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
  { re: /^\[[^\]]+\]\s+html_index_source error:\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
  { re: /^\[[^\]]+\]\s+sitemap_xml error:\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
  { re: /^\[[^\]]+\]\s+sitemap child error:\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
  { re: /^\[[^\]]+\]\s+neon upsert failed for\s+(\S+):\s+(.+)$/, reason: (m) => m[2] },
];

function classify(reason: string): Failure["kind"] {
  const r = reason.toLowerCase();
  if (/(\b|http )404\b/.test(r) || r.includes("not found")) return "404";
  if (/(\b|http )(5\d\d)\b/.test(r)) return "5xx";
  if (r.includes("timeout") || r.includes("etimedout") || r.includes("aborted")) return "timeout";
  if (/(\b|http )429\b/.test(r) || r.includes("rate")) return "rate-limit";
  if (r.includes("validatebody") || r.includes("parse") || r.includes("pdf-mirror")) return "parse-error";
  return "unknown";
}

function parseFailures(output: string): Failure[] {
  const failures: Failure[] = [];
  for (const line of output.split(/\r?\n/)) {
    for (const p of PATTERNS) {
      const m = line.match(p.re);
      if (m) {
        const url = m[1];
        const reason = p.reason(m);
        failures.push({ url, reason, kind: classify(reason) });
        break;
      }
    }
  }
  return failures;
}

function frequencyTop(failures: Failure[], n: number): { url: string; count: number; reason: string }[] {
  const counts = new Map<string, { count: number; reason: string }>();
  for (const f of failures) {
    const cur = counts.get(f.url);
    if (cur) cur.count += 1;
    else counts.set(f.url, { count: 1, reason: f.reason });
  }
  return [...counts.entries()]
    .map(([url, v]) => ({ url, ...v }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

function classifyCounts(failures: Failure[]): Record<Failure["kind"], number> {
  const counts: Record<Failure["kind"], number> = {
    "404": 0,
    "5xx": 0,
    timeout: 0,
    "parse-error": 0,
    "rate-limit": 0,
    unknown: 0,
  };
  for (const f of failures) counts[f.kind] += 1;
  return counts;
}

function recommendedDenyUrls(failures: Failure[]): string[] {
  // Only recommend 404s for deny_urls — transient errors (timeout/5xx/rate)
  // should be retried, not denied permanently.
  const set = new Set<string>();
  for (const f of failures) if (f.kind === "404") set.add(f.url);
  return [...set].sort();
}

function renderReport(vendor: string, dryRun: boolean, raw: string, failures: Failure[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const counts = classifyCounts(failures);
  const top = frequencyTop(failures, 10);
  const deny = recommendedDenyUrls(failures);
  const lines: string[] = [];
  lines.push(`# ${vendor} crawl failures — ${today}`);
  lines.push("");
  lines.push(dryRun ? "_Mode: --dry-run (stub; no child crawl spawned)._" : "_Mode: live crawl wrapped via spawnSync._");
  lines.push("");
  lines.push("## Totals");
  lines.push("");
  lines.push(`- total parsed failures: **${failures.length}**`);
  lines.push(`- 404 / not-found: ${counts["404"]}`);
  lines.push(`- 5xx: ${counts["5xx"]}`);
  lines.push(`- timeout: ${counts.timeout}`);
  lines.push(`- rate-limit (429): ${counts["rate-limit"]}`);
  lines.push(`- parse-error: ${counts["parse-error"]}`);
  lines.push(`- unknown: ${counts.unknown}`);
  lines.push("");
  lines.push("## Top failing URLs (by frequency)");
  lines.push("");
  if (top.length === 0) lines.push("_(none parsed — crawler likely did not emit per-URL stderr lines for these failures.)_");
  else {
    lines.push("| # | count | url | reason |");
    lines.push("|---|---|---|---|");
    top.forEach((t, i) => lines.push(`| ${i + 1} | ${t.count} | ${t.url} | ${t.reason} |`));
  }
  lines.push("");
  lines.push("## Recommended `deny_urls` additions");
  lines.push("");
  lines.push("Per OVS5, only durable 404s are recommended for `deny_urls`; transient");
  lines.push("(timeout/5xx/429) failures should be retried, not denied.");
  lines.push("");
  if (deny.length === 0) lines.push("_(no 404s parsed.)_");
  else {
    lines.push("```json");
    lines.push(JSON.stringify({ deny_urls: deny }, null, 2));
    lines.push("```");
  }
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- Source: `scripts/crawl-vendors.ts` keeps the `failures[]` array in-memory; the");
  lines.push("  current stderr stream contains only targeted lines (additional-source, sitemap,");
  lines.push("  html_index, neon-upsert). HTTP non-200 per-URL failures during the main crawlee");
  lines.push("  loop (`HTTP <status>`) are not yet stderr-logged — see the canonical");
  lines.push("  `[<vendor>] FAIL <url>: <reason>` pattern this audit will pick up once added.");
  lines.push("- Cited: `vendor/${vendor}/crawl.json`, `seeds/citations/define-outcomes.md`.");
  lines.push("");
  if (!dryRun) {
    lines.push("## Raw captured output (truncated to 200 lines)");
    lines.push("");
    lines.push("```");
    lines.push(raw.split(/\r?\n/).slice(0, 200).join("\n"));
    lines.push("```");
  }
  return lines.join("\n") + "\n";
}

function main(): void {
  const { vendor, dryRun } = parseArgs(process.argv.slice(2));
  const today = new Date().toISOString().slice(0, 10);
  const outDir = resolve(REPO_ROOT, "docs/research");
  const outPath = resolve(outDir, `${vendor}-crawl-failures-${today}.md`);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let combined = "";
  let failures: Failure[];

  if (dryRun) {
    // Stub data demonstrating the shape; no spawn.
    const stub = [
      `[${vendor}] FAIL https://code.claude.com/docs/en/removed-page-a: HTTP 404`,
      `[${vendor}] FAIL https://code.claude.com/docs/en/removed-page-b: HTTP 404`,
      `[${vendor}] FAIL https://platform.claude.com/docs/en/legacy/x: HTTP 404`,
      `[${vendor}] sitemap_xml error: https://example.invalid/sitemap.xml: ETIMEDOUT`,
      `[${vendor}] FAIL https://platform.claude.com/docs/en/burst-throttled: HTTP 429 rate-limited`,
    ].join("\n");
    combined = stub;
    failures = parseFailures(stub);
  } else {
    const tsx = resolve(REPO_ROOT, "node_modules/.bin/tsx");
    const script = resolve(REPO_ROOT, "scripts/crawl-vendors.ts");
    const child = spawnSync(tsx, [script, "--vendor", vendor], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    combined = (child.stdout ?? "") + "\n" + (child.stderr ?? "");
    failures = parseFailures(combined);
  }

  const report = renderReport(vendor, dryRun, combined, failures);
  writeFileSync(outPath, report);
  console.log(`wrote ${outPath}`);
  console.log(`parsed ${failures.length} failure line(s); ${recommendedDenyUrls(failures).length} 404(s) recommended for deny_urls`);
}

main();
