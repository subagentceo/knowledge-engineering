/**
 * Phase E (O-E3,E4): mirror-shape test for the support.claude.com vendor.
 *
 * Asserts the mirror invariants the runtime relies on:
 *   - 341 EN /en/articles/* URLs present (crawl count)
 *   - every URL maps to a real .md file under support.claude.com/en/articles/
 *   - the URL→relPath shape parses through vendor-manifests
 *
 * This test is sensitive to mirror drift: if a future re-crawl changes
 * the article count, the assertion below must move in lockstep with
 * vendor/claude-support/urls.md.
 *
 * @tdd green
 * @cite vendor/claude-support/crawl.json
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

console.log("claude-support mirror:");

reloadVendorManifests();
const manifest = getVendor("claude-support");

check("vendor/claude-support/ is registered as a manifest", () => {
  if (!manifest) throw new Error("getVendor('claude-support') returned undefined");
});

check("manifest contains exactly 341 EN article URLs", () => {
  if (!manifest) throw new Error("manifest missing");
  if (manifest.urlSet.size !== 341) {
    throw new Error(`expected 341 URLs, got ${manifest.urlSet.size}`);
  }
});

check("every URL matches /en/articles/<numericId>-<slug>", () => {
  if (!manifest) throw new Error("manifest missing");
  const articleRe = /^https:\/\/support\.claude\.com\/en\/articles\/[0-9]+-[a-z0-9-]+$/;
  const bad: string[] = [];
  for (const url of manifest.urlSet) {
    if (!articleRe.test(url)) bad.push(url);
  }
  if (bad.length > 0) {
    throw new Error(`${bad.length} URL(s) off-shape; sample: ${bad.slice(0, 3).join(", ")}`);
  }
});

check("every URL maps to an existing .md file on disk", () => {
  if (!manifest) throw new Error("manifest missing");
  let missing = 0;
  const samples: string[] = [];
  for (const [url, relPath] of manifest.byUrl) {
    const path = resolve(vendorRoot(), "claude-support", relPath);
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
  const url = Array.from(manifest.urlSet).find((u) =>
    u.includes("/en/articles/") && u.toLowerCase().includes("claude-code")
  );
  if (!url) throw new Error("no /claude-code article slug in manifest");
  const relPath = manifest.byUrl.get(url);
  if (!relPath) throw new Error("byUrl missing entry");
  const body = readFileSync(resolve(vendorRoot(), "claude-support", relPath), "utf8");
  if (body.length < 200) throw new Error(`body suspiciously short: ${body.length} chars`);
});

check("crawl.json declares support-mdfirst transform", () => {
  const cfgPath = resolve(REPO_ROOT, "vendor", "claude-support", "crawl.json");
  if (!existsSync(cfgPath)) throw new Error("crawl.json missing");
  const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
  if (cfg.transform !== "support-mdfirst") {
    throw new Error(`transform=${cfg.transform}, expected support-mdfirst`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
