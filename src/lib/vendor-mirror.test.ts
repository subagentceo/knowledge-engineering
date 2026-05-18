/**
 * Phase 3 unit tests for src/lib/vendor-mirror.ts.
 *
 * @tdd green
 * @cite seeds/posture/session-start.xml
 * @cite vendor/anthropics/code.claude.com/docs/en/commands.md
 * @cite rubrics/phase-3.md
 */

import { vendorMirror, urlFor } from "./vendor-mirror.js";
import { loadVendorManifests, getVendor } from "./vendor-manifests.js";

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

console.log("vendor-mirror:");

const anthropics = getVendor("anthropics");
if (!anthropics) throw new Error("no anthropics manifest — run Phase 2 first");
const sampleUrl = Array.from(anthropics.urlSet).find((u) => u.includes("commands.md")) ?? Array.from(anthropics.urlSet)[0];
const sampleRel = anthropics.byUrl.get(sampleUrl)!;

check("vendorMirror returns body for an allowlisted+mirrored URL", () => {
  const hit = vendorMirror(sampleUrl);
  if (!hit) throw new Error(`no mirror hit for ${sampleUrl}`);
  if (hit.source !== "mirror") throw new Error(`source: ${hit.source}`);
  if (hit.vendor !== "anthropics") throw new Error(`vendor: ${hit.vendor}`);
  if (!hit.body || hit.body.length === 0) throw new Error("empty body");
});

check("vendorMirror returns null for a URL not in any allowlist", () => {
  const hit = vendorMirror("https://example.com/never-mirrored");
  if (hit !== null) throw new Error("expected null");
});

check("urlFor reverse lookup matches", () => {
  const url = urlFor("anthropics", sampleRel);
  if (url !== sampleUrl) throw new Error(`url: ${url} vs ${sampleUrl}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
