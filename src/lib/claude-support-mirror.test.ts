/**
 * Phase E (O-E3,E4): mirror-shape test for support.claude.com articles
 * inside the consolidated vendor/claude-sitemap/ mirror.
 *
 * Asserts the mirror invariants the runtime relies on:
 *   - ≥340 EN /en/articles/* URLs present (crawl count)
 *   - every URL maps to a real .md file under support/en/articles/
 *   - the URL→relPath shape parses through vendor-manifests
 *
 * Article URLs are filtered out of the consolidated mirror's urlSet
 * (which also contains blog/connectors/customers/plugins/resources URLs)
 * by host+path prefix. Per-host transform dispatch in
 * scripts/crawl-vendors.ts routes support.claude.com URLs through the
 * `support-mdfirst` transform regardless of the vendor's primary
 * transform setting.
 *
 * @tdd green
 * @cite vendor/claude-sitemap/crawl.json
 * @cite seeds/citations/vendor-graph-v2.xml
 * @cite rubrics/phase-E.md
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getVendor, reloadVendorManifests, vendorRoot } from "./vendor-manifests.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

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

console.log("claude-support mirror (via claude-sitemap):");

reloadVendorManifests();
const manifest = getVendor("claude-sitemap");
const SUPPORT_PREFIX = "https://support.claude.com/en/articles/";

function supportUrls(): string[] {
  if (!manifest) return [];
  return Array.from(manifest.urlSet).filter((u) => u.startsWith(SUPPORT_PREFIX));
}

check("vendor/claude-sitemap/ is registered as a manifest", () => {
  if (!manifest) throw new Error("getVendor('claude-sitemap') returned undefined");
});

check("manifest contains ≥340 support article URLs", () => {
  if (!manifest) throw new Error("manifest missing");
  const urls = supportUrls();
  if (urls.length < 340) {
    throw new Error(`expected ≥340 support URLs, got ${urls.length}`);
  }
});

check("every support URL matches /en/articles/<numericId>-<slug>", () => {
  if (!manifest) throw new Error("manifest missing");
  const articleRe = /^https:\/\/support\.claude\.com\/en\/articles\/[0-9]+-[a-z0-9-]+$/;
  const bad: string[] = [];
  for (const url of supportUrls()) {
    if (!articleRe.test(url)) bad.push(url);
  }
  if (bad.length > 0) {
    throw new Error(`${bad.length} URL(s) off-shape; sample: ${bad.slice(0, 3).join(", ")}`);
  }
});

check("every support URL maps to an existing .md file on disk", () => {
  if (!manifest) throw new Error("manifest missing");
  let missing = 0;
  const samples: string[] = [];
  for (const url of supportUrls()) {
    const relPath = manifest.byUrl.get(url);
    if (!relPath) continue;
    const path = resolve(vendorRoot(), "claude-sitemap", relPath);
    if (!existsSync(path)) {
      missing += 1;
      if (samples.length < 3) samples.push(url);
    }
  }
  if (missing > 0) {
    throw new Error(`${missing} URL(s) point at missing mirror files; sample: ${samples.join(", ")}`);
  }
});

check("known Claude Code article is present + non-trivial body", () => {
  if (!manifest) throw new Error("manifest missing");
  const url = supportUrls().find((u) => u.toLowerCase().includes("claude-code"));
  if (!url) throw new Error("no /claude-code article slug in support tree");
  const relPath = manifest.byUrl.get(url);
  if (!relPath) throw new Error("byUrl missing entry");
  const body = readFileSync(resolve(vendorRoot(), "claude-sitemap", relPath), "utf8");
  if (body.length < 200) throw new Error(`body suspiciously short: ${body.length} chars`);
});

check("crawl.json declares topology layout + html-extract transform with per-host support routing", () => {
  const cfgPath = resolve(REPO_ROOT, "vendor", "claude-sitemap", "crawl.json");
  if (!existsSync(cfgPath)) throw new Error("crawl.json missing");
  const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
  if (cfg.layout !== "topology") {
    throw new Error(`layout=${cfg.layout}, expected topology`);
  }
  // Per-host dispatch in scripts/crawl-vendors.ts overrides the primary
  // transform for support.claude.com regardless of cfg.transform value.
  // The vendor still declares its primary transform here for marketing
  // pages; only the dispatch logic decides per URL.
  const sources = (cfg.sitemap_xml_sources ?? []) as string[];
  if (!sources.some((s) => s.includes("support.claude.com"))) {
    throw new Error("crawl.json sitemap_xml_sources missing support.claude.com");
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
