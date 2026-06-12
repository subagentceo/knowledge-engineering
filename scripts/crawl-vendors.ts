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
import * as cheerio from "cheerio";
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
import { inAllowlist } from "./lib/allowlist.js";
import { extractIndexUrls } from "./lib/html-index.js";
import { parseLlmsTxt, type LlmsTxt } from "./lib/llms-txt.js";
import { mirrorPdfs, scanPdfUrlsFromHtml } from "./lib/pdf-mirror.js";
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

export interface CrawlConfig {
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
   * Exact-URL allow list. Bypasses the prefix-allow gate for individual
   * URLs (e.g. bare-index `/pricing` when only `/pricing/` is in
   * allow_prefixes). Still subject to deny_prefixes and deny_urls.
   */
  allow_urls?: string[];
  /**
   * Exact-URL deny list. Excludes only the listed URLs verbatim; does
   * not affect URLs that *start with* one of them. Use when a topology
   * root must stay crawled but a specific listing/index page must not.
   */
  deny_urls?: string[];
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
   * PDF lane. When set, after each html-extract markdown is produced
   * the body is scanned for `.pdf` hrefs matching one of these prefixes;
   * matches are fetched, run through pdf-parse, and written as markdown
   * sidecars at `vendor/<name>/_pdfs/<slug>.md`. Missing/empty disables
   * the lane entirely (default).
   */
  pdf_allow_prefixes?: string[];
  /**
   * Path layout for `urlToPath`. Default "host" preserves legacy
   * `<vendor>/<host>/<path>.md`. Set to "topology" for consolidated
   * mirrors (e.g. vendor/claude-sitemap/) that organize by URL
   * first-path-segment instead of by host.
   */
  layout?: "host" | "topology";
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
//
// OBLOG.fidelity fixes (#260): six defects that diverge from claude.com's
// own "Copy as markdown" button output. Reference: operator/claude-blog-content.md.
// F1: H1 title was missing (selector excluded the <h1> outside rich-text container)
// F2: headings came through bold-wrapped (e.g. `# **Title**`)
// F3: inline links not stripped (page's own extractor drops them)
// F4: bullets used `-   ` 3-space indent instead of `* `
// F5: underscores escaped as `\_` in identifiers like `display_width_px`
// F6: code fences lacked language hint from `class="language-X"`

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "*",
});

// F5 — don't escape underscores. Page's own Turndown skips this; their output
// preserves `display_width_px` verbatim. Turndown's default escapes break code
// identifiers in prose.
turndown.escape = (s: string) => s;

// F2 — strip <strong>/<b> children of headings before serialization. Webflow
// templates wrap heading text in <strong>, which turns into `# **Title**`.
turndown.addRule("plain-headings", {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"] as const,
  replacement: (_content, node) => {
    const level = Number((node as unknown as { nodeName: string }).nodeName.slice(1));
    const text = (node as unknown as { textContent?: string }).textContent?.trim() ?? "";
    return `\n\n${"#".repeat(level)} ${text}\n\n`;
  },
});

// F3 — drop inline links, keep their text. Page's "Copy as markdown" output
// shows links flattened; matches the operator's canary reference.
turndown.addRule("flatten-links", {
  filter: "a",
  replacement: (content) => content,
});

// F6 — extract language hint from `<pre><code class="language-X">` and emit
// fenced code blocks with the lang token.
turndown.addRule("fenced-code-with-lang", {
  filter: (node) => {
    if (node.nodeName !== "PRE") return false;
    const code = (node as unknown as { firstElementChild?: { nodeName?: string } | null }).firstElementChild;
    return code?.nodeName === "CODE";
  },
  replacement: (_content, node) => {
    const code = (node as unknown as { firstElementChild?: { className?: string; textContent?: string } | null }).firstElementChild;
    const cls = code?.className ?? "";
    const langMatch = cls.match(/language-([a-z0-9+\-]+)/i);
    const lang = langMatch ? langMatch[1] : "";
    const body = code?.textContent ?? "";
    return `\n\n\`\`\`${lang}\n${body.replace(/\n+$/, "")}\n\`\`\`\n\n`;
  },
});

// Side-channel: PDF URLs recovered from RAW HTML (anchor hrefs) during
// html-extract, keyed by source page URL. Populated in postProcess before
// turndown flattens links (which would drop the hrefs); read when building the
// pdfQueue. Cleared per crawl in crawlVendor().
const htmlPdfUrlsByPage = new Map<string, string[]>();

function makeTransform(name: TransformName, url: string, cfg: CrawlConfig): TransformOutput {
  // Per-host transform override. support.claude.com exposes a true .md
  // endpoint when you append `.md` + send `Accept: text/markdown` (the
  // existing `support-mdfirst` transform does exactly this). Route those
  // URLs through it even when the vendor's primary transform is
  // `html-extract`. Keeps the consolidated claude-sitemap mirror able to
  // do html-extract for marketing/blog pages while preserving the
  // higher-quality .md path for the Intercom-backed help center.
  if (new URL(url).host === "support.claude.com" && /\/en\/articles\//.test(new URL(url).pathname)) {
    return TRANSFORMS["support-mdfirst"](url);
  }
  if (name === "html-extract") {
    return htmlExtract(url, (body) => {
      // Recover PDF links from the RAW HTML before turndown flattens anchors
      // (F3 link-flattening drops hrefs, hiding PDFs behind <a> tags from the
      // markdown PDF scan). Scoped to the configured allowlist.
      const pdfAllow = cfg.pdf_allow_prefixes ?? [];
      if (pdfAllow.length > 0) {
        const found = scanPdfUrlsFromHtml(body, pdfAllow);
        if (found.length > 0) htmlPdfUrlsByPage.set(url, found);
      }

      const $ = cheerio.load(body);
      // Drop non-content nodes anywhere in the doc before serialization.
      $("script, style, noscript, svg, link, meta, template, iframe").remove();

      // F1 — extract page title (<h1> outside the rich-text container, falling
      // back to <title>) and prepend as the markdown H1. The page's "Copy as
      // markdown" button output always leads with `# <title>`; the prior
      // pipeline omitted it because `.u-rich-text-blog` selectors don't
      // contain the page's main heading.
      let title = $("h1").first().text().trim();
      if (!title) title = $("title").first().text().trim();

      // Selector may be a comma-separated priority list. Try each in order;
      // the first selector that yields a non-trivial fragment wins. Falls
      // back to <body>.
      const selector = cfg.html_extract?.selector;
      let html = "";
      if (selector) {
        for (const candidate of selector.split(",").map((s) => s.trim()).filter(Boolean)) {
          const nodes = $(candidate);
          for (let i = 0; i < nodes.length; i += 1) {
            const inner = nodes.eq(i).html();
            if (inner && inner.length > 200) {
              html = inner;
              break;
            }
          }
          if (html) break;
        }
      }
      if (!html) html = $("body").html() ?? "";

      const md = turndown.turndown(html);
      // F1 — prepend title only when the converted body doesn't already begin
      // with the same heading text (defensive: some templates do include <h1>
      // inside the content container).
      const titlePrefix = title && !md.trimStart().startsWith(`# ${title}`) ? `# ${title}\n\n` : "";
      return titlePrefix + md;
    });
  }
  const fn = TRANSFORMS[name];
  if (!fn) throw new Error(`Unknown transform: ${name}`);
  return fn(url);
}

// ──────────────────────────────────────────────────────────────────────
// Per-vendor crawl

// inAllowlist lives in ./lib/allowlist.ts so tests can import it without
// triggering the side-effecting main() at the bottom of this file.

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

  // Declared up-front so the additional-source loop can record failures
  // without needing to thread them through later.
  const failures: CrawlResult["failures"] = [];

  // PDF lane bookkeeping. When pdf_allow_prefixes is set, collect the
  // markdown bodies + source URLs as they're written, then run the
  // mirror pass once at the end so we don't block per-page crawlee
  // concurrency on PDF fetches.
  const pdfQueue: { markdown: string; sourceUrl: string; htmlPdfUrls: string[] }[] = [];
  const pdfLaneEnabled = (cfg.pdf_allow_prefixes?.length ?? 0) > 0;
  htmlPdfUrlsByPage.clear();

  // Discover llms.txt (primary). If llms_txt_sources is set, also fetch each
  // source body and merge its links into the URL pool.
  // For vendors with html_index_sources or sitemap_xml_sources but no
  // llms.txt (e.g. anthropic-engineering, openfeature), llms.txt
  // discovery is allowed to no-op.
  const llms = await discoverLlmsTxt(cfg);
  const hasHtmlIndex = (cfg.html_index_sources?.length ?? 0) > 0;
  const hasSitemap = (cfg.sitemap_xml_sources?.length ?? 0) > 0;
  if (llms === null && !hasHtmlIndex && !hasSitemap) {
    // Vendors with zero discovery sources are static mirrors maintained
    // out-of-band (e.g. commonmark's spec.txt from the study clone) —
    // skipping them is success, not failure.
    if (cfg.llms_txt_candidates.length === 0) {
      console.log(`[${vendor}] static mirror (no discovery sources) — skipped`);
      return {
        vendor,
        llms_txt_url: "",
        pagesFetched: 0,
        pagesSkipped: 0,
        pagesUnchanged: 0,
        preflight304: 0,
        preflight200: 0,
        failures: [],
      };
    }
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

  // OBLOG.determinism D4: sort URLs ascending before building the work
  // queue. Without this, fetch order depends on llms.txt section order +
  // Set insertion timing, which can vary if upstream re-orders content
  // or sitemap.xml output changes. Sorted input keeps fetch logs +
  // failure-report ordering stable across runs.
  const work = allowed
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .map((origUrl) => {
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
  // OBLOG.determinism D1: no timestamps in checksum or manifest writes;
  // sources of non-determinism removed so re-runs produce byte-identical output.
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
              checksums[w.origUrl] = { ...prior, lastStatus: 304 };
            }
            // Restore the index row so urls.md still lists this URL.
            const { relPath } = urlToPath(w.origUrl, { vendor, layout: cfg.layout });
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
              // OAUTO3: also require the destination file to exist on
              // disk. Without this guard, a missing-file desync (the
              // elevenlabs incident, PR #186) causes the crawler to
              // skip writeIfChanged forever — the .checksums.json
              // entry stays valid but no .md is ever written.
              const { segments: skipSegments, relPath } = urlToPath(w.origUrl, { vendor, layout: cfg.layout });
              const skipTarget = resolve(VENDOR_ROOT, vendor, ...skipSegments);
              if (existsSync(skipTarget)) {
                preflightUnchanged += 1;
                const sha = prior!.sha256;
                checksums[w.origUrl] = {
                  sha256: sha,
                  etag: res.etag ?? prior!.etag,
                  lastModified: res.lastModified ?? prior!.lastModified,
                  lastStatus: 200,
                };
                indexRows.push({ url: w.origUrl, relPath });
                continue;
              }
              // sha matched but the file is missing on disk — fall
              // through to writeIfChanged() below to repopulate.
            }
            const { segments, relPath } = urlToPath(w.origUrl, { vendor, layout: cfg.layout });
            const target = resolve(VENDOR_ROOT, vendor, ...segments);
            const result = writeIfChanged(target, finalBody);
            if (result === "wrote") fetched += 1;
            else skipped += 1;
            if (pdfLaneEnabled) pdfQueue.push({ markdown: finalBody, sourceUrl: w.origUrl, htmlPdfUrls: htmlPdfUrlsByPage.get(w.origUrl) ?? [] });
            const sha = hashBody(finalBody);
            checksums[w.origUrl] = {
              sha256: sha,
              etag: res.etag ?? undefined,
              lastModified: res.lastModified ?? undefined,
              lastStatus: 200,
            };
            indexRows.push({ url: w.origUrl, relPath });
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
    await flushPdfBatch(vendor, cfg, pdfQueue, failures);
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
        const { segments, relPath } = urlToPath(meta.origUrl, { vendor, layout: cfg.layout });
        const target = resolve(VENDOR_ROOT, vendor, ...segments);
        const result = writeIfChanged(target, finalBody);
        if (result === "wrote") fetched += 1;
        else skipped += 1;
        if (pdfLaneEnabled) pdfQueue.push({ markdown: finalBody, sourceUrl: meta.origUrl, htmlPdfUrls: htmlPdfUrlsByPage.get(meta.origUrl) ?? [] });
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

async function flushPdfBatch(
  vendor: string,
  cfg: CrawlConfig,
  queue: { markdown: string; sourceUrl: string; htmlPdfUrls: string[] }[],
  failures: CrawlResult["failures"],
): Promise<void> {
  if ((cfg.pdf_allow_prefixes?.length ?? 0) === 0 || queue.length === 0) return;
  let fetched = 0;
  let skipped = 0;
  for (const item of queue) {
    const res = await mirrorPdfs({
      vendorRoot: VENDOR_ROOT,
      vendor,
      markdown: item.markdown,
      sourceUrl: item.sourceUrl,
      pdfAllowPrefixes: cfg.pdf_allow_prefixes,
      htmlPdfUrls: item.htmlPdfUrls,
    });
    fetched += res.fetched.length;
    skipped += res.skipped.length;
    for (const f of res.failed) failures.push({ url: f.url, reason: `pdf-mirror: ${f.reason}` });
  }
  console.log(`[${vendor}] pdf-mirror: fetched=${fetched} skipped=${skipped}`);
}

function renderUrlsIndex(
  vendor: string,
  llmsUrl: string,
  transform: TransformName,
  indexRows: { url: string; relPath: string }[],
): string {
  // OBLOG.determinism D1: no timestamps in urls.md frontmatter — re-runs
  // on unchanged sources must produce byte-identical output.
  return [
    `---`,
    `vendor: ${vendor}`,
    `llms_txt: ${llmsUrl}`,
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
