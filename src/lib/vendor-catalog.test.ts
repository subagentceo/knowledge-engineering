/**
 * Phase 16 unit test for verified vendor coverage.
 *
 * Outcome-driven (rubric.criteria 1, 2): parse the v2 vendor catalog
 * citation source and assert that every entity with a confirmed-URL
 * `<llms_txt>` slot has a `vendor/<id>/crawl.json` whose
 * `llms_txt_candidates` (or top-level `llms_txt`) includes that URL.
 *
 * Entity IDs are normalized (snake_case → kebab-case) to match vendor
 * directory names. Some entities are explicitly EXCLUDED (BPO service
 * providers with no developer docs; Anthropic consumer surfaces).
 *
 * @cite seeds/citations/vendor-graph-v2.xml
 * @cite rubrics/phase-16.md
 * @cite seeds/posture/session-start.xml
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const CATALOG_PATH = resolve(REPO_ROOT, "seeds/citations/vendor-graph-v2.xml");
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

interface CatalogEntity {
  id: string;
  cls: string;
  llms_txt: string;
  sitemap_xml: string;
}

/**
 * Parse the catalog XML. We don't pull in an XML library — a tight
 * regex over the well-formed structure is sufficient and avoids new
 * deps (per operator guidance "avoid introducing new code if not
 * needed").
 */
function parseCatalog(xml: string): CatalogEntity[] {
  const out: CatalogEntity[] = [];
  const entityRe = /<entity\s+id="([^"]+)"\s+class="([^"]+)">([\s\S]*?)<\/entity>/g;
  for (const m of xml.matchAll(entityRe)) {
    const [, id, cls, body] = m;
    const llms = body.match(/<llms_txt>([^<]+)<\/llms_txt>/);
    const site = body.match(/<sitemap_xml>([^<]+)<\/sitemap_xml>/);
    out.push({
      id,
      cls,
      llms_txt: llms ? llms[1].trim() : "",
      sitemap_xml: site ? site[1].trim() : "",
    });
  }
  return out;
}

function normalizeId(id: string): string {
  // catalog uses snake_case (brave_search, spotify_confidence, parallel_web)
  // vendor dirs use kebab-case (brave-search, spotify-confidence, parallel-web)
  return id.replace(/_/g, "-");
}

/**
 * Entities deliberately not represented by a vendor/<id>/crawl.json,
 * with reason. The rubric (phase-16.md §6) tracks the policy basis.
 */
const EXCLUDED_IDS = new Map<string, string>([
  ["nutun", "BPO service provider; no developer docs surface"],
  ["boldr", "BPO service provider; no developer docs surface"],
  // Anthropic first-party — already covered by aggregate vendors:
  ["anthropic-platform", "covered by vendor/anthropics/ (multi-source)"],
  ["anthropic-code", "covered by vendor/anthropics/ (multi-source)"],
  ["anthropic-claude-com", "covered by vendor/anthropics/ (multi-source)"],
  ["anthropic-claude-ai", "consumer artifact gallery; out of dev-docs chassis scope"],
  ["anthropic-support", "Intercom-hosted end-user support; out of dev-docs chassis scope"],
  ["anthropic-marketing", "corporate marketing; covered by vendor/anthropic-engineering/ subset"],
  // mcp also has a special-cased dir name:
  ["mcp", "vendor dir is named modelcontextprotocol (covered)"],
  // Pending other in-flight PRs — remove from this map once those merge:
  ["workos", "added by PR #64 (operator-pending)"],
  ["elevenlabs", "added by PR #64 (operator-pending)"],
]);

/**
 * Manual id → vendor-dir name overrides for entities whose
 * directory name differs from the normalized id.
 */
const DIR_ALIASES = new Map<string, string>([
  ["arkose", "arkose-labs"],
  ["mcp", "modelcontextprotocol"],
]);

function vendorDirFor(entityId: string): string {
  const normalized = normalizeId(entityId);
  return DIR_ALIASES.get(entityId) ?? normalized;
}

function loadCrawlConfig(dir: string): { llms_txt_candidates: string[]; llms_txt?: string; sitemap_xml_sources?: string[] } | null {
  const path = resolve(VENDOR_ROOT, dir, "crawl.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

// ────────────────────────────────────────────────────────────────────
// Tests

check("catalog file exists and parses", () => {
  if (!existsSync(CATALOG_PATH)) throw new Error(`missing ${CATALOG_PATH}`);
  const body = readFileSync(CATALOG_PATH, "utf8");
  const entities = parseCatalog(body);
  if (entities.length < 25) throw new Error(`expected ≥25 entities, got ${entities.length}`);
});

const xml = readFileSync(CATALOG_PATH, "utf8");
const entities = parseCatalog(xml);

check(`parsed 30 entities (17 subprocessors + 7 ecosystem + 6 first-party)`, () => {
  if (entities.length !== 30) throw new Error(`expected 30, got ${entities.length}`);
  const byClass = entities.reduce<Record<string, number>>((acc, e) => {
    acc[e.cls] = (acc[e.cls] ?? 0) + 1;
    return acc;
  }, {});
  // The v2 quality_checks header said "16 subprocessors" but the actual
  // entity list has 17 (turbopuffer is the 17th; the v2 spec header was
  // off-by-one). We follow the entity list, not the header.
  if (byClass.subprocessor !== 17) throw new Error(`expected 17 subprocessors, got ${byClass.subprocessor}`);
  if (byClass.ecosystem !== 7) throw new Error(`expected 7 ecosystem, got ${byClass.ecosystem}`);
  if (byClass.first_party !== 6) throw new Error(`expected 6 first-party, got ${byClass.first_party}`);
});

check("Palantir is NOT in the catalog", () => {
  const palantir = entities.find((e) => e.id.toLowerCase().includes("palantir"));
  if (palantir) throw new Error("Palantir entity present; should be excluded per upstream");
});

// Coverage assertions — one check per confirmed-URL llms_txt entity.

const isUrl = (v: string): boolean => v.startsWith("http://") || v.startsWith("https://");

for (const e of entities) {
  if (!isUrl(e.llms_txt)) continue;
  if (EXCLUDED_IDS.has(normalizeId(e.id))) continue;
  const dir = vendorDirFor(e.id);
  check(`vendor/${dir}/crawl.json includes llms_txt ${e.llms_txt}`, () => {
    const cfg = loadCrawlConfig(dir);
    if (!cfg) throw new Error(`vendor/${dir}/crawl.json missing (entity id=${e.id})`);
    const candidates = cfg.llms_txt_candidates ?? [];
    if (candidates.includes(e.llms_txt) || cfg.llms_txt === e.llms_txt) return;
    throw new Error(`llms_txt URL ${e.llms_txt} not in candidates: ${JSON.stringify(candidates)} / top-level: ${cfg.llms_txt}`);
  });
}

// Coverage assertions for sitemap-only entities (llms_txt is n/a but
// there's a verified sitemap URL).

for (const e of entities) {
  if (e.llms_txt !== "n/a") continue;
  if (!isUrl(e.sitemap_xml)) continue;
  if (EXCLUDED_IDS.has(normalizeId(e.id))) continue;
  const dir = vendorDirFor(e.id);
  check(`vendor/${dir}/crawl.json includes sitemap ${e.sitemap_xml}`, () => {
    const cfg = loadCrawlConfig(dir);
    if (!cfg) throw new Error(`vendor/${dir}/crawl.json missing (entity id=${e.id})`);
    const sources = cfg.sitemap_xml_sources ?? [];
    if (sources.includes(e.sitemap_xml)) return;
    throw new Error(`sitemap URL ${e.sitemap_xml} not in sitemap_xml_sources: ${JSON.stringify(sources)}`);
  });
}

// Excluded-entity sanity: every EXCLUDED_IDS entry corresponds to a
// real catalog entity (or it's stale).

check("every EXCLUDED_IDS entry maps to a real catalog id", () => {
  for (const excludedId of EXCLUDED_IDS.keys()) {
    const found = entities.find((e) => normalizeId(e.id) === excludedId);
    if (!found) throw new Error(`EXCLUDED_IDS entry '${excludedId}' not in catalog (stale entry)`);
  }
});

// Vendor-dir-without-catalog-entry sanity: every vendor/<dir>/crawl.json
// should map back to a catalog entity (catches drift).

const vendorDirs = readdirSync(VENDOR_ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(resolve(VENDOR_ROOT, e.name, "crawl.json")))
  .map((e) => e.name);

const allCatalogDirs = new Set<string>(entities.map((e) => vendorDirFor(e.id)));
// Don't fail on legacy dirs like anthropic-engineering that are pre-catalog.
const LEGACY_ALLOW = new Set([
  "anthropic-engineering", // pre-catalog Anthropic blog mirror
  "anthropics",            // multi-source Anthropic first-party docs
  "claude-blog",           // Phase 13.C — claude.com/blog mirror (first-party content)
]);

check("every vendor/<dir>/crawl.json maps to a catalog entity (modulo legacy allow-list)", () => {
  for (const dir of vendorDirs) {
    if (LEGACY_ALLOW.has(dir)) continue;
    if (!allCatalogDirs.has(dir)) {
      throw new Error(`vendor/${dir}/crawl.json exists but has no catalog entity`);
    }
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
