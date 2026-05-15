#!/usr/bin/env tsx
// scripts/crawl-vendors.ts
//
// Phase 1.B. Offline crawler that mirrors each vendor's llms.txt-linked
// docs into vendor/<name>/<host>/<path>.md.
//
// Citations:
//   @cite seeds/posture/session-start.xml          (.md-first hard rules)
//   @cite seeds/prompts/operator-2026-05-10.md     (working agreement)
//   @cite seeds/citations/connectors-building.md   (vendor-llms.txt as URL allowlist)
//
// CLI:
//   npm run crawl:vendors                 — crawl all 12 (per vendor/*/crawl.json)
//   npm run crawl:vendor -- <vendor>      — crawl one
//   npm run crawl:vendor -- --help        — usage
//
// Outputs (per vendor):
//   vendor/<name>/llms.txt                     — discovered llms.txt body, committed
//   vendor/<name>/urls.md                      — auto-generated index (front matter + URL table)
//   vendor/<name>/<host>/<path-segs>.md        — fetched body per the transform
//
// Idempotent: re-running with no source changes produces a zero-diff
// tree (mtime preserved when content unchanged).
//
// No frameworks. Uses the cheerio crawler from @crawlee/cheerio for
// rate-limiting + concurrency + retry, plus turndown for the
// html-extract transform.

import { CheerioCrawler, Configuration } from "@crawlee/cheerio";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";

import {
  conditionalFetch,
  hashBody,
  isUnchanged,
  loadChecksums,
  saveChecksums,
  type ChecksumEntry,
  type ChecksumMap,
} from "./lib/checksums.js";
import { extractIndexUrls } from "./lib/html-index.js";
import { parseLlmsTxt, type LlmsTxt } from "./lib/llms-txt.js";
import { neonEnabled, upsertVendorPage } from "./lib/neon-client.js";
import { isSitemapIndex, parseSitemapXml } from "./lib/sitemap-xml.js";
import {
  TRANSFORMS,
  htmlExtract,
  type TransformName,
  type TransformOutput,
} from "./lib/transforms.js";
import { urlToPath } from "./lib/url-to-path.js";

// ──────────────────────────────────────────────────────────────────────
// Types

interface CrawlConfig {
  name: string;
  homepage: string;
  llms_txt_candidates: string[];
  /**
   * Optional: list of llms.txt URLs to crawl IN ADDITION to the
   * discovered candidate. Each source contributes URLs to the same
   * vendor mirror. Used for multi-surface vendors (e.g. anthropics:
   * code.claude.com + platform.claude.com + claude.com/docs).
   */
  llms_txt_sources?: string[];
  /**
   * Phase 13.B (O1). Vendors without an llms.txt (e.g.
   * www.anthropic.com/engineering) discover their URL pool by fetching
   * a live HTML index page and extracting links via a configured
   * regex. Each entry's regex MUST contain exactly one capture group
   * yielding a path or absolute URL.
   */
  html_index_sources?: { url: string; link_regex: string }[];
  /**
   * Phase 13.B (O2). For vendors lacking an llms.txt, fetch each
   * sitemap.xml URL and merge the discovered `<loc>` entries into
   * the URL pool ahead of allowlist filtering. Sitemap-index entries
   * are recursed one level. Used by `vendor/openfeature/`.
   */
  sitemap_xml_sources?: string[];
  /** Resolved to a real URL after the discovery probe; persisted back. */
  llms_txt?: string;
  transform: TransformName;
  allow_prefixes: string[];
  deny_prefixes?: string[];
  /**
   * Maximum number of URLs from the source's allowlist-filtered set to
   * crawl in one pass. `0` means **no cap** (sentinel; uncapped).
   * Note: respect `maxRequestsPerMinute` (60) — even uncapped crawls
   * remain polite.
   */
  page_cap: number;
  /** Optional turndown options for `html-extract`. */
  html_extract?: { selector?: string };
  /**
   * Phase 13.A. When true (default), the crawler does an RFC 7232
   * conditional-GET pre-flight per URL using the stored ETag /
   * Last-Modified in `.checksums.json`, and skips re-fetching anything
   * the server reports as 304 Not Modified. Set to false to force a
   * full re-fetch of every URL.
   */
  incremental?: boolean;
}

interface CrawlResult {
  vendor: string;
  llms_txt_url: string;
  pagesFetched: number;
  pagesSkipped: number;
  pagesUnchanged: number;
  preflight304: number;
  preflight200: number;
  failures: { url: string; reason: string }[];
}

// ──────────────────────────────────────────────────────────────────────
// Constants

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
// Crawlee writes its persistent storage somewhere in the repo by
// default; redirect to a gitignored location.
const STORAGE_DIR = resolve(REPO_ROOT, "node_modules", ".crawlee-storage");

const DEFAULT_CANDIDATES = (host: string): string[] => [
  `https://${host}/llms.txt`,
  `https://${host}/llms-full.txt`,
  `https://docs.${host}/llms.txt`,
  `https://developers.${host}/llms.txt`,
  `https://www.${host}/llms.txt`,
];

// ──────────────────────────────────────────────────────────────────────
// I/O helpers

function ensureDir(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
}

function writeIfChanged(path: string, body: string): "wrote" | "unchanged" {
  ensureDir(path);
  if (existsSync(path)) {
    const cur = readFileSync(path, "utf8");
    if (cur === body) return "unchanged";
  }
  writeFileSync(path, body);
  return "wrote";
}

function loadConfig(vendor: string): CrawlConfig {
  const path = resolve(VENDOR_ROOT, vendor, "crawl.json");
  if (!existsSync(path)) throw new Error(`crawl.json not found for vendor=${vendor} at ${path}`);
  return JSON.parse(readFileSync(path, "utf8")) as CrawlConfig;
}

function listVendorConfigs(): string[] {
  if (!existsSync(VENDOR_ROOT)) return [];
  return readdirSync(VENDOR_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(resolve(VENDOR_ROOT, e.name, "crawl.json")))
    .map((e) => e.name)
    .sort();
}

function persistConfig(cfg: CrawlConfig): void {
  const path = resolve(VENDOR_ROOT, cfg.name, "crawl.json");
  const body = JSON.stringify(cfg, null, 2) + "\n";
  writeIfChanged(path, body);
}

// ──────────────────────────────────────────────────────────────────────
// llms.txt discovery probe

async function discoverLlmsTxt(cfg: CrawlConfig): Promise<{ url: string; body: string } | null> {
  const candidates =
    cfg.llms_txt_candidates.length > 0
      ? cfg.llms_txt_candidates
      : DEFAULT_CANDIDATES(new URL(cfg.homepage).host);
  for (const candidate of candidates) {
    try {
      const r = await fetch(candidate, { headers: { Accept: "text/plain, text/markdown" } });
      if (!r.ok) continue;
      const body = await r.text();
      const parsed = parseLlmsTxt(body);
      if (parsed === null) continue;
      return { url: candidate, body };
    } catch {
      // Network errors fall through.
    }
  }
  return null;
}

// ──────────────────────────────────────────────────────────────────────
// Transform dispatch (turndown wired here for html-extract)

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

function makeTransform(name: TransformName, url: string, cfg: CrawlConfig): TransformOutput {
  if (name === "html-extract") {
    return htmlExtract(url, (body) => {
      let html = body;
      // Optional CSS selector to focus on the main content container.
      // Trim everything outside if specified.
      if (cfg.html_extract?.selector) {
        const m = html.match(new RegExp(`<${cfg.html_extract.selector}[\\s\\S]*?</${cfg.html_extract.selector}>`, "i"));
        if (m) html = m[0];
      }
      return turndown.turndown(html);
    });
  }
  const fn = TRANSFORMS[name];
  if (!fn) throw new Error(`Unknown transform: ${name}`);
  return fn(url);
}

// ──────────────────────────────────────────────────────────────────────
// Per-vendor crawl

function inAllowlist(url: string, cfg: CrawlConfig): boolean {
  if (!cfg.allow_prefixes.some((p) => url.startsWith(p))) return false;
  if (cfg.deny_prefixes?.some((p) => url.startsWith(p))) return false;
  return true;
}

function dedupeUrls(parsed: LlmsTxt, baseUrl: string): string[] {
  // Resolve relative URLs (e.g. twilio's llms.txt uses paths like
  // `/docs/authy.md`) against the source's base URL so allow-prefix
  // filtering sees absolute hrefs.
  const seen = new Set<string>();
  const out: string[] = [];
  for (const section of parsed.sections) {
    for (const link of section.links) {
      let resolved: string;
      try {
        resolved = new URL(link.url, baseUrl).toString();
      } catch {
        // Skip malformed URLs (e.g. `mailto:`, `javascript:`, or pure
        // text that the parser regex matched).
        continue;
      }
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      out.push(resolved);
    }
  }
  return out;
}

async function crawlVendor(vendor: string, dryRun = false): Promise<CrawlResult> {
  const cfg = loadConfig(vendor);
  console.log(`[${vendor}] crawl start (transform=${cfg.transform}, page_cap=${cfg.page_cap})`);

  // Phase 13.B+ (O8): collect successful page writes so we can dual-write
  // to Neon after the crawl finishes (when NEON_DATABASE_URL is set).
  // Filesystem writes happen inline; Neon UPSERTs flush at the end so we
  // batch them and keep the inner loops sync-friendly.
  interface NeonRow {
    vendor: string;
    path: string;
    content: string;
    content_hash: string;
    etag?: string;
    last_modified?: string;
  }
  const neonBatch: NeonRow[] = [];

  // Declared up-front so the additional-source loop can record failures
  // without needing to thread them through later.
  const failures: CrawlResult["failures"] = [];

  // Discover llms.txt (primary). If llms_txt_sources is set, also fetch each
  // source body and merge its links into the URL pool.
  // For vendors with html_index_sources or sitemap_xml_sources but no
  // llms.txt (e.g. anthropic-engineering, openfeature), llms.txt
  // discovery is allowed to no-op.
  const llms = await discoverLlmsTxt(cfg);
  const hasHtmlIndex = (cfg.html_index_sources?.length ?? 0) > 0;
  const hasSitemap = (cfg.sitemap_xml_sources?.length ?? 0) > 0;
  if (llms === null && !hasHtmlIndex && !hasSitemap) {
    console.error(`[${vendor}] no valid llms.txt found in ${cfg.llms_txt_candidates.length} candidate(s)`);
    return {
      vendor,
      llms_txt_url: "",
      pagesFetched: 0,
      pagesSkipped: 0,
      pagesUnchanged: 0,
      preflight304: 0,
      preflight200: 0,
      failures: [{ url: "<llms.txt discovery>", reason: "no valid candidate" }],
    };
  }
  if (llms !== null) {
    console.log(`[${vendor}] llms.txt (primary): ${llms.url}`);
    if (!dryRun) {
      writeIfChanged(resolve(VENDOR_ROOT, vendor, "llms.txt"), llms.body);
      if (cfg.llms_txt !== llms.url) {
        cfg.llms_txt = llms.url;
        persistConfig(cfg);
      }
    }
  } else {
    console.log(`[${vendor}] no llms.txt; using html_index_sources/sitemap_xml_sources`);
  }

  // Collect URLs from primary llms.txt + each llms_txt_sources entry +
  // each html_index_sources entry + each sitemap_xml_sources entry.
  const collectedUrls = new Set<string>();
  if (llms !== null) {
    const primaryParsed = parseLlmsTxt(llms.body);
    if (primaryParsed) {
      for (const u of dedupeUrls(primaryParsed, llms.url)) collectedUrls.add(u);
    }
  }
  for (const sourceUrl of cfg.llms_txt_sources ?? []) {
    if (llms !== null && sourceUrl === llms.url) continue; // already captured above
    try {
      const r = await fetch(sourceUrl, { headers: { Accept: "text/plain, text/markdown" } });
      if (!r.ok) {
        failures.push({ url: sourceUrl, reason: `additional source HTTP ${r.status}` });
        continue;
      }
      const body = await r.text();
      const parsed = parseLlmsTxt(body);
      if (parsed === null) {
        console.warn(`[${vendor}] additional source not parseable as llms.txt: ${sourceUrl}`);
        continue;
      }
      console.log(`[${vendor}] additional source: ${sourceUrl} (${parsed.sections.reduce((a, s) => a + s.links.length, 0)} links)`);
      // Persist each additional source body too (host-pathed).
      if (!dryRun) {
        const u = new URL(sourceUrl);
        const target = resolve(VENDOR_ROOT, vendor, u.host, ...u.pathname.replace(/^\//, "").split("/"));
        writeIfChanged(target, body);
      }
      for (const u of dedupeUrls(parsed, sourceUrl)) collectedUrls.add(u);
    } catch (err) {
      console.warn(`[${vendor}] additional source error: ${sourceUrl}: ${(err as Error).message}`);
    }
  }

  // Phase 13.B (O1): html_index_sources discovery. Fetch each index
  // page, regex-extract anchor hrefs, resolve to absolute URLs, merge
  // into the URL pool ahead of allowlist filtering.
  for (const idx of cfg.html_index_sources ?? []) {
    try {
      const r = await fetch(idx.url, { headers: { Accept: "text/html" } });
      if (!r.ok) {
        failures.push({ url: idx.url, reason: `html_index_source HTTP ${r.status}` });
        continue;
      }
      const body = await r.text();
      const found = extractIndexUrls(body, new RegExp(idx.link_regex, "gi"), idx.url);
      console.log(`[${vendor}] html_index_source: ${idx.url} (${found.length} link(s))`);
      for (const u of found) collectedUrls.add(u);
    } catch (err) {
      console.warn(`[${vendor}] html_index_source error: ${idx.url}: ${(err as Error).message}`);
    }
  }

  // Phase 13.B (O2): sitemap_xml_sources discovery. Fetch each
  // sitemap.xml URL, parse <loc> entries, and merge into the URL pool
  // ahead of allowlist filtering. Sitemap-index files (which point at
  // child sitemaps) are recursed exactly one level.
  for (const sitemapUrl of cfg.sitemap_xml_sources ?? []) {
    try {
      const r = await fetch(sitemapUrl, { headers: { Accept: "application/xml, text/xml" } });
      if (!r.ok) {
        failures.push({ url: sitemapUrl, reason: `sitemap_xml HTTP ${r.status}` });
        continue;
      }
      const body = await r.text();
      const locs = parseSitemapXml(body);
      if (isSitemapIndex(body)) {
        console.log(`[${vendor}] sitemap-index: ${sitemapUrl} (${locs.length} child sitemap(s))`);
        for (const childUrl of locs) {
          try {
            const r2 = await fetch(childUrl, { headers: { Accept: "application/xml, text/xml" } });
            if (!r2.ok) {
              failures.push({ url: childUrl, reason: `sitemap_xml child HTTP ${r2.status}` });
              continue;
            }
            const childBody = await r2.text();
            const childLocs = parseSitemapXml(childBody);
            console.log(`[${vendor}] sitemap (child): ${childUrl} (${childLocs.length} URL(s))`);
            for (const u of childLocs) collectedUrls.add(u);
          } catch (err) {
            console.warn(`[${vendor}] sitemap child error: ${childUrl}: ${(err as Error).message}`);
          }
        }
      } else {
        console.log(`[${vendor}] sitemap: ${sitemapUrl} (${locs.length} URL(s))`);
        for (const u of locs) collectedUrls.add(u);
      }
    } catch (err) {
      console.warn(`[${vendor}] sitemap_xml error: ${sitemapUrl}: ${(err as Error).message}`);
    }
  }

  const urls = Array.from(collectedUrls);
  const effectiveCap = cfg.page_cap > 0 ? cfg.page_cap : Infinity;
  const allowed = urls.filter((u) => inAllowlist(u, cfg)).slice(0, effectiveCap);
  console.log(`[${vendor}] ${urls.length} link(s) across all sources; ${allowed.length} after allowlist + page_cap`);

  if (allowed.length === 0) {
    return {
      vendor,
      llms_txt_url: llms?.url ?? "",
      pagesFetched: 0,
      pagesSkipped: urls.length,
      pagesUnchanged: 0,
      preflight304: 0,
      preflight200: 0,
      failures,
    };
  }

  if (dryRun) {
    return {
      vendor,
      llms_txt_url: llms?.url ?? "",
      pagesFetched: 0,
      pagesSkipped: allowed.length,
      pagesUnchanged: 0,
      preflight304: 0,
      preflight200: 0,
      failures: [],
    };
  }

  let fetched = 0;
  let skipped = 0;
  const indexRows: { url: string; relPath: string }[] = [];

  // Build the list of {fetchUrl, originalUrl, transform} entries, then
  // hand them to crawlee for rate-limited concurrent fetching.
  const work = allowed.map((origUrl) => {
    const t = makeTransform(cfg.transform, origUrl, cfg);
    return { origUrl, fetchUrl: t.fetchUrl, transform: t };
  });

  // ── Phase 13.A: incremental pre-flight ────────────────────────────
  // Issue conditional GETs with the stored ETag / Last-Modified. URLs
  // that return 304 Not Modified are recorded as `unchanged` and
  // removed from the crawlee queue so the bandwidth cost on a clean
  // re-crawl is zero.
  const incremental = cfg.incremental ?? true;
  const checksums: ChecksumMap = incremental ? loadChecksums(VENDOR_ROOT, vendor) : {};
  const nowIso = new Date().toISOString();
  let preflight304 = 0;
  let preflight200 = 0;
  let preflightUnchanged = 0;
  const work2: typeof work = [];

  if (incremental) {
    console.log(`[${vendor}] preflight: ${work.length} URL(s), ${Object.keys(checksums).length} prior checksum(s)`);
    // Small concurrency to keep latency reasonable without hammering CDNs.
    const concurrency = 8;
    let cursor = 0;
    const realWorkers = Array.from({ length: concurrency }, async () => {
      while (true) {
        const i = cursor++;
        if (i >= work.length) return;
        const w = work[i];
        const prior = checksums[w.origUrl];
        try {
          const res = await conditionalFetch(w.fetchUrl, prior, w.transform.headers ?? {});
          if (res.status === 304) {
            preflight304 += 1;
            if (prior) {
              checksums[w.origUrl] = { ...prior, fetchedAt: nowIso, lastStatus: 304 };
            }
            // Restore the index row so urls.md still lists this URL.
            const { relPath } = urlToPath(w.origUrl, { vendor });
            indexRows.push({ url: w.origUrl, relPath });
            continue;
          }
          if (res.status === 200 && res.body !== null) {
            preflight200 += 1;
            if (!w.transform.validateBody(res.contentType, res.body)) {
              failures.push({ url: w.origUrl, reason: `validateBody rejected (ct=${res.contentType ?? "?"})` });
              continue;
            }
            const finalBody = w.transform.postProcess ? w.transform.postProcess(res.body) : res.body;
            // Content-hash dedup: if the server didn't emit
            // ETag/Last-Modified but the body is byte-identical to the
            // last successful fetch, skip the disk write to preserve
            // mtime and keep `git status` clean.
            if (isUnchanged(prior, finalBody)) {
              preflightUnchanged += 1;
              const sha = prior!.sha256;
              checksums[w.origUrl] = {
                sha256: sha,
                etag: res.etag ?? prior!.etag,
                lastModified: res.lastModified ?? prior!.lastModified,
                fetchedAt: nowIso,
                lastStatus: 200,
              };
              const { relPath } = urlToPath(w.origUrl, { vendor });
              indexRows.push({ url: w.origUrl, relPath });
              continue;
            }
            const { segments, relPath } = urlToPath(w.origUrl, { vendor });
            const target = resolve(VENDOR_ROOT, vendor, ...segments);
            const result = writeIfChanged(target, finalBody);
            if (result === "wrote") fetched += 1;
            else skipped += 1;
            const sha = hashBody(finalBody);
            checksums[w.origUrl] = {
              sha256: sha,
              etag: res.etag ?? undefined,
              lastModified: res.lastModified ?? undefined,
              fetchedAt: nowIso,
              lastStatus: 200,
            };
            indexRows.push({ url: w.origUrl, relPath });
            neonBatch.push({
              vendor,
              path: relPath,
              content: finalBody,
              content_hash: sha,
              etag: res.etag ?? undefined,
              last_modified: res.lastModified ?? undefined,
            });
            continue;
          }
          // Non-200/304 status — record failure.
          failures.push({ url: w.origUrl, reason: `HTTP ${res.status}` });
        } catch (err) {
          // Network errors fall through to the crawlee pass, which has
          // built-in retries.
          work2.push(w);
        }
      }
    });
    await Promise.all(realWorkers);
    console.log(`[${vendor}] preflight done: 304=${preflight304} 200=${preflight200} unchanged-body=${preflightUnchanged} fallback-to-crawlee=${work2.length}`);
  } else {
    work2.push(...work);
  }

  // If pre-flight covered everything, skip crawlee entirely.
  if (work2.length === 0) {
    if (incremental) saveChecksums(VENDOR_ROOT, vendor, checksums);
    const front = renderUrlsIndex(vendor, llms?.url ?? "", cfg.transform, indexRows);
    writeIfChanged(resolve(VENDOR_ROOT, vendor, "urls.md"), front);
    await flushNeonBatch(vendor, neonBatch);
    console.log(`[${vendor}] fetched=${fetched} unchanged=${skipped + preflightUnchanged} preflight-304=${preflight304} failed=${failures.length}`);
    return {
      vendor,
      llms_txt_url: llms?.url ?? "",
      pagesFetched: fetched,
      pagesSkipped: skipped,
      pagesUnchanged: preflightUnchanged,
      preflight304,
      preflight200,
      failures,
    };
  }

  const config = new Configuration({ persistStorage: false, persistStateIntervalMillis: 0, storageClientOptions: { storageDir: STORAGE_DIR } });
  const crawler = new CheerioCrawler(
    {
      maxRequestsPerCrawl: cfg.page_cap > 0 ? cfg.page_cap : undefined,
      maxRequestsPerMinute: 60,
      maxConcurrency: 4,
      requestHandlerTimeoutSecs: 30,
      maxRequestRetries: 2,
      additionalMimeTypes: ["text/markdown", "text/plain"],
      requestHandler: async (ctx) => {
        const meta = ctx.request.userData as { origUrl: string; transformName: TransformName };
        const item = work.find((w) => w.origUrl === meta.origUrl);
        if (!item) return;
        const ct = ctx.response?.headers["content-type"];
        const ctStr = Array.isArray(ct) ? ct[0] : ct ?? null;
        const etag = ctx.response?.headers["etag"];
        const etagStr = Array.isArray(etag) ? etag[0] : etag ?? null;
        const lm = ctx.response?.headers["last-modified"];
        const lmStr = Array.isArray(lm) ? lm[0] : lm ?? null;
        const body = (ctx.body as Buffer | string).toString();
        if (!item.transform.validateBody(ctStr ?? null, body)) {
          failures.push({ url: meta.origUrl, reason: `validateBody rejected (ct=${ctStr ?? "?"})` });
          return;
        }
        const finalBody = item.transform.postProcess ? item.transform.postProcess(body) : body;
        const { segments, relPath } = urlToPath(meta.origUrl, { vendor });
        const target = resolve(VENDOR_ROOT, vendor, ...segments);
        const result = writeIfChanged(target, finalBody);
        if (result === "wrote") fetched += 1;
        else skipped += 1;
        indexRows.push({ url: meta.origUrl, relPath });
        const sha = hashBody(finalBody);
        if (incremental) {
          checksums[meta.origUrl] = {
            sha256: sha,
            etag: etagStr ?? undefined,
            lastModified: lmStr ?? undefined,
            fetchedAt: nowIso,
            lastStatus: 200,
          };
        }
        neonBatch.push({
          vendor,
          path: relPath,
          content: finalBody,
          content_hash: sha,
          etag: etagStr ?? undefined,
          last_modified: lmStr ?? undefined,
        });
      },
      failedRequestHandler: ({ request, error }) => {
        failures.push({ url: (request.userData as { origUrl: string }).origUrl, reason: (error as Error).message });
      },
    },
    config
  );

  await crawler.addRequests(
    work2.map((w) => ({
      url: w.fetchUrl,
      headers: w.transform.headers,
      userData: { origUrl: w.origUrl, transformName: cfg.transform },
    }))
  );
  await crawler.run();

  if (incremental) saveChecksums(VENDOR_ROOT, vendor, checksums);

  // Emit urls.md index.
  const front = renderUrlsIndex(vendor, llms?.url ?? "", cfg.transform, indexRows);
  writeIfChanged(resolve(VENDOR_ROOT, vendor, "urls.md"), front);

  await flushNeonBatch(vendor, neonBatch);
  console.log(`[${vendor}] fetched=${fetched} unchanged=${skipped + preflightUnchanged} preflight-304=${preflight304} failed=${failures.length}`);
  return {
    vendor,
    llms_txt_url: llms?.url ?? "",
    pagesFetched: fetched,
    pagesSkipped: skipped,
    pagesUnchanged: preflightUnchanged,
    preflight304,
    preflight200,
    failures,
  };
}

/**
 * Phase 13.B+ (O8). Optional Neon dual-write. When NEON_DATABASE_URL is
 * set, UPSERT every successfully-fetched page into vendor_pages. No-op
 * when not set (local dev path). Failures are logged but never fatal —
 * the filesystem mirror is the source of truth; Neon is a cache.
 */
async function flushNeonBatch(
  vendor: string,
  rows: { vendor: string; path: string; content: string; content_hash: string; etag?: string; last_modified?: string }[],
): Promise<void> {
  if (!neonEnabled() || rows.length === 0) return;
  let written = 0;
  let failed = 0;
  for (const row of rows) {
    try {
      const changed = await upsertVendorPage(row);
      if (changed) written += 1;
    } catch (err) {
      failed += 1;
      if (failed <= 3) {
        console.warn(`[${vendor}] neon upsert failed for ${row.path}: ${(err as Error).message}`);
      }
    }
  }
  console.log(`[${vendor}] neon: upserted=${written} failed=${failed}`);
}

function renderUrlsIndex(
  vendor: string,
  llmsUrl: string,
  transform: TransformName,
  indexRows: { url: string; relPath: string }[],
): string {
  return [
    `---`,
    `vendor: ${vendor}`,
    `llms_txt: ${llmsUrl}`,
    `last_crawled: ${new Date().toISOString()}`,
    `count: ${indexRows.length}`,
    `transform: ${transform}`,
    `---`,
    "",
    `# ${vendor} URL index`,
    "",
    `| URL | Local |`,
    `|---|---|`,
    ...indexRows
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((r) => `| ${r.url} | \`vendor/${vendor}/${r.relPath}\` |`),
    "",
  ].join("\n");
}

// ──────────────────────────────────────────────────────────────────────
// CLI

function parseArgs(argv: string[]): { vendor?: string; all: boolean; dryRun: boolean } {
  const out = { vendor: undefined as string | undefined, all: true, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--vendor" || a === "-v") {
      out.vendor = argv[i + 1];
      out.all = false;
      i += 1;
    } else if (a === "--dry-run") {
      out.dryRun = true;
    } else if (a === "--help" || a === "-h") {
      console.log("usage: crawl-vendors [--vendor <name>] [--dry-run]");
      process.exit(0);
    } else if (!out.vendor && !a.startsWith("-")) {
      // Allow positional vendor arg via `crawl:vendor -- stripe`.
      out.vendor = a;
      out.all = false;
    }
  }
  return out;
}

async function main(): Promise<void> {
  const { vendor, all, dryRun } = parseArgs(process.argv.slice(2));
  const targets = all ? listVendorConfigs() : [vendor!];
  if (targets.length === 0) {
    console.error("no vendor configs found under vendor/*/crawl.json");
    process.exit(1);
  }
  const results: CrawlResult[] = [];
  for (const v of targets) {
    try {
      results.push(await crawlVendor(v, dryRun));
    } catch (err) {
      console.error(`[${v}] FAILED:`, err);
      results.push({
        vendor: v,
        llms_txt_url: "",
        pagesFetched: 0,
        pagesSkipped: 0,
        pagesUnchanged: 0,
        preflight304: 0,
        preflight200: 0,
        failures: [{ url: "<crawl>", reason: (err as Error).message }],
      });
    }
  }
  console.log("\n=== summary ===");
  for (const r of results) {
    const status = r.failures.length === 0 ? "ok" : "FAIL";
    console.log(
      `  ${r.vendor.padEnd(20)} ${status.padEnd(5)} fetched=${r.pagesFetched} unchanged=${r.pagesSkipped + r.pagesUnchanged} preflight-304=${r.preflight304} failed=${r.failures.length}`,
    );
  }
  const anyFail = results.some((r) => r.failures.length > 0);
  process.exit(anyFail ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
