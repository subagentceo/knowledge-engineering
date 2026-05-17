/**
 * End-to-end grounding test: the docs-github vendor mirror is
 * reachable through the chassis primitives that the MCP bridge's
 * vendor lane consumes — vendor manifests, vendor-mirror URL lookup,
 * and the underlying .md tree that vendor_grep walks.
 *
 * Dogfoods OPE5 (the mirror itself) + the vendor lane from Phase 3.
 * No Voyage/Turbopuffer calls — pure filesystem + manifest assertions.
 *
 * Outcome OPE8.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite vendor/docs-github/llms.txt
 * @cite seeds/posture/session-start.xml
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadVendorManifests } from "./vendor-manifests.js";
import { vendorMirror, urlFor } from "./vendor-mirror.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const MIRROR_ROOT = resolve(REPO_ROOT, "vendor/docs-github");

let passed = 0;
let failed = 0;
function check(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function* walkMd(dir: string): Generator<string> {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, e.name);
    if (e.isDirectory()) yield* walkMd(full);
    else if (e.isFile() && extname(e.name) === ".md") yield full;
  }
}

console.log("docs-github-grounding:");

check("vendor_list (manifest layer) includes docs-github with url_count>0", () => {
  const manifests = loadVendorManifests();
  const m = manifests.get("docs-github");
  if (!m) throw new Error("docs-github not in loadVendorManifests()");
  if (m.urlSet.size === 0) throw new Error("docs-github urlSet is empty");
  if (m.llms_txt !== "https://docs.github.com/llms.txt")
    throw new Error(`unexpected llms_txt: ${m.llms_txt}`);
});

check("vendor_grep-equivalent walk finds 'pull_request' line under docs-github", () => {
  let hit = false;
  let scanned = 0;
  for (const file of walkMd(resolve(MIRROR_ROOT, "docs.github.com"))) {
    scanned++;
    if (scanned > 60) break;
    const stat = statSync(file);
    if (stat.size > 5_000_000) continue;
    const body = readFileSync(file, "utf8").toLowerCase();
    if (body.includes("pull_request")) {
      hit = true;
      break;
    }
  }
  if (!hit) throw new Error(`no 'pull_request' hit across ${scanned} scanned files`);
});

check("vendor_fetch-equivalent vendorMirror() returns source='mirror' for a docs-github URL", () => {
  // Pick a URL we know is in the mirror — the REST index.
  const url = "https://docs.github.com/en/rest";
  const m = vendorMirror(url);
  if (!m) throw new Error(`vendorMirror returned null for ${url}`);
  if (m.vendor !== "docs-github") throw new Error(`wrong vendor: ${m.vendor}`);
  if (!m.body || m.body.length < 100)
    throw new Error(`empty body for ${url} (got ${m.body?.length ?? 0} bytes)`);
  if (!m.relPath.startsWith("docs.github.com/"))
    throw new Error(`relPath shape: ${m.relPath}`);
});

check("urlFor() round-trips a mirrored docs-github relPath back to the canonical URL", () => {
  const url = urlFor("docs-github", "docs.github.com/en/rest.md");
  if (url !== "https://docs.github.com/en/rest")
    throw new Error(`round-trip mismatch: ${url}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
