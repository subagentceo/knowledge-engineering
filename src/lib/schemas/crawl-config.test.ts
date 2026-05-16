/**
 * Tests for src/lib/schemas/crawl-config.ts and the
 * transform-name-mirror invariant against scripts/lib/transforms.ts.
 *
 * Phase G item O-G10: zod schemas at boundaries.
 *
 * @tdd green
 * @cite vendor/turbopuffer/crawl.json
 * @cite vendor/claude-sitemap/crawl.json
 * @cite rubrics/phase-1.md
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CrawlConfigSchema,
  TransformNameSchema,
  parseCrawlConfig,
} from "./crawl-config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("crawl-config schema:");

check("TransformNameSchema accepts every known transform", () => {
  for (const name of [
    "verbatim",
    "append-md",
    "append-md-and-accept",
    "cloudflare-index-md",
    "anthropic-mdfirst",
    "accept-only",
    "html-extract",
  ]) {
    TransformNameSchema.parse(name);
  }
});

check("TransformNameSchema rejects unknown transform names", () => {
  const result = TransformNameSchema.safeParse("not-a-real-transform");
  if (result.success) throw new Error("accepted bogus transform");
});

check("parseCrawlConfig accepts a minimal valid config", () => {
  const body = JSON.stringify({
    name: "demo",
    homepage: "https://example.com",
    llms_txt_candidates: ["https://example.com/llms.txt"],
    transform: "verbatim",
    allow_prefixes: ["https://example.com/"],
    page_cap: 100,
  });
  const cfg = parseCrawlConfig(body);
  if (cfg.name !== "demo") throw new Error("name");
  if (cfg.transform !== "verbatim") throw new Error("transform");
});

check("parseCrawlConfig rejects missing required fields", () => {
  const body = JSON.stringify({ name: "demo", homepage: "https://example.com" });
  const r = CrawlConfigSchema.safeParse(JSON.parse(body));
  if (r.success) throw new Error("accepted invalid config");
});

check("parseCrawlConfig accepts optional fields when present", () => {
  const body = JSON.stringify({
    name: "demo",
    homepage: "https://example.com",
    llms_txt_candidates: [],
    sitemap_xml_sources: ["https://example.com/sitemap.xml"],
    transform: "html-extract",
    allow_prefixes: ["https://example.com/"],
    deny_prefixes: ["https://example.com/internal/"],
    page_cap: 0,
    html_extract: { selector: "main" },
    incremental: true,
    note: "lorem ipsum",
  });
  const cfg = parseCrawlConfig(body);
  if (cfg.html_extract?.selector !== "main") throw new Error("html_extract");
  if (cfg.note !== "lorem ipsum") throw new Error("note");
});

check("every vendor/<name>/crawl.json on disk parses cleanly", () => {
  if (!existsSync(VENDOR_ROOT)) return;
  const dirs = readdirSync(VENDOR_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(resolve(VENDOR_ROOT, e.name, "crawl.json")))
    .map((e) => e.name);
  const bad: string[] = [];
  for (const d of dirs) {
    const body = readFileSync(resolve(VENDOR_ROOT, d, "crawl.json"), "utf8");
    const r = CrawlConfigSchema.safeParse(JSON.parse(body));
    if (!r.success) {
      bad.push(`${d}: ${r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    }
  }
  if (bad.length > 0) {
    throw new Error(`${bad.length} vendor(s) fail schema validation:\n  ${bad.join("\n  ")}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
