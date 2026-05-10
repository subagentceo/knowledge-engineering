/**
 * Phase 3 unit tests for src/lib/vendor-manifests.ts.
 *
 * @cite seeds/posture/session-start.xml
 * @cite vendor/anthropics/code.claude.com/docs/en/commands.md
 * @cite rubrics/phase-3.md
 */

import { loadVendorManifests, getVendor, reloadVendorManifests } from "./vendor-manifests.js";

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

console.log("vendor-manifests:");

reloadVendorManifests();
const all = loadVendorManifests();

check("loads at least the 7 known-working vendors", () => {
  const expected = ["anthropics", "cloudflare", "modelcontextprotocol", "neon", "stripe", "turbopuffer"];
  for (const name of expected) {
    if (!all.has(name)) throw new Error(`missing vendor: ${name}`);
  }
});

check("anthropics manifest has llms_txt + lastCrawled + url_count > 0", () => {
  const m = getVendor("anthropics");
  if (!m) throw new Error("no anthropics manifest");
  if (!m.llms_txt?.includes("claude.com")) throw new Error(`unexpected llms_txt: ${m.llms_txt}`);
  if (!m.lastCrawled) throw new Error("no lastCrawled");
  if (m.urlSet.size === 0) throw new Error("urlSet empty");
});

check("byUrl map round-trips a known URL", () => {
  const m = getVendor("anthropics");
  if (!m) throw new Error("no anthropics manifest");
  const sample = Array.from(m.urlSet)[0];
  const relPath = m.byUrl.get(sample);
  if (!relPath) throw new Error(`no byUrl entry for ${sample}`);
});

check("reloadVendorManifests returns a fresh map", () => {
  const a = loadVendorManifests();
  const b = reloadVendorManifests();
  if (a === b) throw new Error("expected new map after reload");
  if (a.size !== b.size) throw new Error("size mismatch after reload");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
