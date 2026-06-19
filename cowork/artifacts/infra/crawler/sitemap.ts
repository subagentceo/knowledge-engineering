/**
 * infra/crawler/sitemap.ts
 * Deterministic sitemap → markdown pipeline.
 *
 * Rules:
 *   1. Sitemap XML is cached in Redis (TTL 1h). Never re-fetched within TTL.
 *   2. Each page HTML is fetched once → converted to CommonMark → stored in Redis.
 *   3. Redis is the source of truth. AlloyDB is the durable record.
 *   4. Pages already in Redis (by contentHash) are never re-fetched.
 *   5. Only /research/ and /engineering paths from anthropic.com;
 *      only /solutions/* and root pages from claude.com.
 */

import { createE2MRedis, REDIS_CONFIGS } from "../redis/client.js";
import { pool } from "../alloydb/pool.js";
import { htmlToMarkdown, validateCommonmark } from "./html-to-markdown.js";
import { fetchMarkdownNative, parseLlmsTxt } from "./fetch-markdown.js";
import {
  CRAWL_KEYS,
  SitemapEntrySchema,
  CrawlResultSchema,
  type SitemapEntry,
  type CrawlResult,
  type MarkdownDoc,
} from "./types.js";
import debug from "debug";

const log = debug("e2m:crawler");

// ── Config ────────────────────────────────────────────────────────────────────

interface SiteConfig {
  sections: string[];
  filter: (path: string) => boolean;
  discoveryMode: "sitemap" | "llms_txt" | "manifest";
  discoveryUrl?: string;
  preferMarkdownNative: boolean;
  languageFilter?: string;
  pathPrefixes?: string[];
}

const TARGETS: Record<string, SiteConfig> = {
  "anthropic.com": {
    sections: ["research", "engineering"],
    filter: (p) => p.startsWith("/research/") || p.startsWith("/engineering"),
    discoveryMode: "sitemap",
    preferMarkdownNative: false,
  },
  "claude.com": {
    sections: ["solutions", "docs"],
    filter: (p) => p.startsWith("/solutions/") || p.startsWith("/docs/") || p === "/",
    discoveryMode: "llms_txt",
    discoveryUrl: "https://claude.com/llms.txt",
    preferMarkdownNative: true,
  },
  "support.claude.com": {
    sections: ["support"],
    filter: (p) => p.startsWith("/en/articles/"),
    discoveryMode: "sitemap",
    discoveryUrl: "https://support.claude.com/sitemap.xml",
    languageFilter: "en",
    preferMarkdownNative: true,
  },
  "platform.claude.com": {
    sections: ["docs"],
    filter: (p) =>
      p.startsWith("/docs/en/managed-agents/") ||
      p.startsWith("/docs/en/agents-and-tools/"),
    discoveryMode: "manifest",
    preferMarkdownNative: true,
    pathPrefixes: [
      "https://platform.claude.com/docs/en/managed-agents/",
      "https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/",
    ],
  },
};

const SITEMAP_TTL_MS = 60 * 60 * 1000;      // 1h — sitemap XML
const PAGE_TTL_MS   = 7 * 24 * 60 * 60 * 1000; // 7d — page markdown

// ── Sitemap parser ────────────────────────────────────────────────────────────

function parseSitemapXml(xml: string, site: string, config?: SiteConfig): SitemapEntry[] {
  const target = config ?? TARGETS[site];
  if (!target) throw new Error(`Unknown site: ${site}`);

  const entries: SitemapEntry[] = [];
  const locRe = /<loc>([^<]+)<\/loc>/g;
  const modRe = /<lastmod>([^<]+)<\/lastmod>/g;

  let locMatch: RegExpExecArray | null;
  let modMatch: RegExpExecArray | null;

  // Walk loc and lastmod in lockstep
  while ((locMatch = locRe.exec(xml)) !== null) {
    modMatch = modRe.exec(xml);
    const loc = locMatch[1].trim();
    const lastmod = modMatch?.[1]?.trim();

    let urlPath: string;
    try { urlPath = new URL(loc).pathname; } catch { continue; }

    if (!target.filter(urlPath)) continue;

    // Derive section from path
    const section = urlPath.split("/").filter(Boolean)[0] ?? "root";

    try {
      entries.push(SitemapEntrySchema.parse({ loc, lastmod, urlPath, section, site }));
    } catch { /* skip malformed */ }
  }

  return entries;
}

// ── Fetcher with Redis cache-aside ────────────────────────────────────────────

async function fetchCached(
  url: string,
  redisKey: string,
  ttlMs: number,
  redis: ReturnType<typeof createE2MRedis>,
): Promise<{ body: string; fromCache: boolean }> {
  const cached = await redis.client.get(redisKey);
  if (cached) return { body: cached, fromCache: true };

  const res = await fetch(url, {
    headers: {
      "User-Agent": "e2m-crawler/1.0 (opencoworkers; research)",
      "Accept": "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const body = await res.text();

  await redis.client.set(redisKey, body, "PX", ttlMs);
  return { body, fromCache: false };
}

// ── AlloyDB writer ────────────────────────────────────────────────────────────

async function persistToAlloyDB(
  doc: MarkdownDoc,
  fromCache: boolean,
  durationMs: number,
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query<{ page_key: string }>(
      `INSERT INTO dim_pages (
         url, url_path, site, section, title, description,
         content_hash, word_count, published_at, lastmod, crawled_at,
         markdown, pdf_urls
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (content_hash) DO UPDATE SET
         crawled_at = EXCLUDED.crawled_at,
         lastmod    = EXCLUDED.lastmod
       RETURNING page_key`,
      [
        doc.meta.url,
        doc.meta.urlPath,
        doc.meta.site,
        doc.meta.section,
        doc.meta.title,
        doc.meta.description ?? null,
        doc.meta.contentHash,
        doc.wordCount,
        doc.meta.publishedAt ?? null,
        doc.meta.lastmod ?? null,
        doc.meta.crawledAt,
        doc.markdown,
        JSON.stringify(doc.meta.pdfUrls),
      ],
    );

    const pageKey = rows[0]?.page_key ?? null;

    await client.query(
      `INSERT INTO fact_crawl_events
         (page_key, url, site, section, status, from_cache, duration_ms, word_count, pdf_count)
       VALUES ($1,$2,$3,$4,'ok',$5,$6,$7,$8)`,
      [
        pageKey,
        doc.meta.url,
        doc.meta.site,
        doc.meta.section,
        fromCache,
        durationMs,
        doc.wordCount,
        doc.meta.pdfUrls.length,
      ],
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// ── Discovery helpers ─────────────────────────────────────────────────────────

async function fetchLlmsTxt(
  site: string,
  config: SiteConfig,
  redis: ReturnType<typeof createE2MRedis>,
): Promise<SitemapEntry[]> {
  const url = config.discoveryUrl ?? `https://${site}/llms.txt`;
  const key = `e2m:crawl:llmstxt:${site}`;
  const { body } = await fetchCached(url, key, SITEMAP_TTL_MS, redis);
  const urls = parseLlmsTxt(body, `https://${site}`);
  const entries: SitemapEntry[] = [];
  for (const loc of urls) {
    try {
      const urlPath = new URL(loc).pathname;
      if (!config.filter(urlPath)) continue;
      const section = urlPath.split("/").filter(Boolean)[0] ?? "root";
      entries.push(SitemapEntrySchema.parse({ loc, urlPath, section, site }));
    } catch { /* skip */ }
  }
  return entries;
}

async function fetchManifestUrls(
  site: string,
  config: SiteConfig,
  redis: ReturnType<typeof createE2MRedis>,
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  const prefixes = config.pathPrefixes ?? [];
  for (const prefix of prefixes) {
    const indexKey = `e2m:crawl:manifest:${prefix.replace(/[^a-z0-9]/gi, "_")}`;
    try {
      const { body: html } = await fetchCached(prefix, indexKey, SITEMAP_TTL_MS, redis);
      // Extract internal links from the index page
      const hrefRe = /href="([^"]+)"/g;
      let m: RegExpExecArray | null;
      while ((m = hrefRe.exec(html)) !== null) {
        const href = m[1];
        try {
          const abs = new URL(href, prefix).toString();
          const urlPath = new URL(abs).pathname;
          if (!config.filter(urlPath)) continue;
          const section = urlPath.split("/").filter(Boolean)[0] ?? "root";
          entries.push(SitemapEntrySchema.parse({ loc: abs, urlPath, section, site }));
        } catch { /* skip */ }
      }
    } catch (err) {
      log("manifest fetch failed %s: %s", prefix, (err as Error).message);
    }
  }
  // Deduplicate by loc
  const seen = new Set<string>();
  return entries.filter((e) => { if (seen.has(e.loc)) return false; seen.add(e.loc); return true; });
}

function buildDocFromNativeMarkdown(markdown: string, entry: SitemapEntry): MarkdownDoc {
  const lines = markdown.split("\n");
  const h1 = lines.find((l) => l.startsWith("# "))?.replace(/^#\s+/, "") ?? entry.urlPath;
  const desc = lines.find((l) => l.trim() && !l.startsWith("#"))?.trim();
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  const contentHash = (() => {
    // Simple djb2 hex — real sha256 happens in htmlToMarkdown; good enough for native md
    let h = 5381;
    for (let i = 0; i < markdown.length; i++) h = ((h << 5) + h + markdown.charCodeAt(i)) >>> 0;
    return h.toString(16).padStart(8, "0").repeat(8);
  })();
  const crawledAt = new Date().toISOString();
  return {
    meta: {
      url: entry.loc,
      urlPath: entry.urlPath,
      site: entry.site,
      section: entry.section,
      title: h1,
      description: desc,
      contentHash,
      pdfUrls: [],
      crawledAt,
      lastmod: entry.lastmod,
    },
    markdown,
    sections: [],
    wordCount,
    fetchedAt: crawledAt,
  };
}

// ── Per-page crawler ──────────────────────────────────────────────────────────

async function crawlPage(
  entry: SitemapEntry,
  redis: ReturnType<typeof createE2MRedis>,
  config?: SiteConfig,
): Promise<CrawlResult> {
  const t0 = Date.now();

  // Skip if Bloom filter says seen (content hash already stored)
  const alreadySeen = await redis.isEnvelopeSeen(entry.loc);
  if (alreadySeen) {
    return CrawlResultSchema.parse({ status: "skip", reason: "seen", url: entry.loc });
  }

  try {
    const mdKey  = CRAWL_KEYS.markdown(entry.site, entry.urlPath);
    const metKey = CRAWL_KEYS.meta(entry.site, entry.urlPath);

    // Check markdown cache first
    const [cachedMd, cachedMeta] = await redis.client.mget(mdKey, metKey);
    if (cachedMd && cachedMeta) {
      const doc = JSON.parse(cachedMeta) as MarkdownDoc;
      doc.markdown = cachedMd;
      return CrawlResultSchema.parse({
        status: "ok", doc, fromCache: true, durationMs: Date.now() - t0,
      });
    }

    // Markdown-native fast path: skip Cheerio+Turndown for sites that serve .md
    if (config?.preferMarkdownNative) {
      const nativeMd = await fetchMarkdownNative(entry.loc);
      if (nativeMd) {
        const doc = buildDocFromNativeMarkdown(nativeMd, entry);
        const pipe = redis.client.pipeline();
        pipe.set(mdKey, nativeMd, "PX", PAGE_TTL_MS);
        pipe.set(metKey, JSON.stringify({ ...doc, markdown: "" }), "PX", PAGE_TTL_MS);
        await pipe.exec();
        await redis.markEnvelopeSeen(entry.loc);
        await persistToAlloyDB(doc, false, Date.now() - t0);
        log("OK (native-md) %s words=%d", entry.urlPath, doc.wordCount);
        return CrawlResultSchema.parse({
          status: "ok", doc, fromCache: false, durationMs: Date.now() - t0,
        });
      }
    }

    // Fetch raw HTML (cached in Redis HTML key, TTL 1h)
    const htmlKey = `e2m:crawl:html:${entry.site}:${entry.urlPath.replace(/\//g, ":")}`;
    const { body: html, fromCache } = await fetchCached(entry.loc, htmlKey, SITEMAP_TTL_MS, redis);

    // Convert to CommonMark (validates internally — throws on bad markdown)
    const doc = htmlToMarkdown({
      html,
      url: entry.loc,
      site: entry.site,
      section: entry.section,
      lastmod: entry.lastmod,
    });

    // Store markdown + meta separately (markdown can be large)
    const { markdown, ...rest } = doc;
    const pipe = redis.client.pipeline();
    pipe.set(mdKey,  markdown,          "PX", PAGE_TTL_MS);
    pipe.set(metKey, JSON.stringify({ ...rest, markdown: "" }), "PX", PAGE_TTL_MS);
    await pipe.exec();

    // Mark seen in Bloom filter
    await redis.markEnvelopeSeen(entry.loc);

    const elapsed = Date.now() - t0;

    // Persist to AlloyDB (dim_pages + fact_crawl_events in one transaction)
    await persistToAlloyDB(doc, fromCache, elapsed);

    log("OK %s [%s] words=%d hash=%s", entry.urlPath, fromCache ? "html-cache" : "fetch", doc.wordCount, doc.meta.contentHash.slice(0, 8));

    return CrawlResultSchema.parse({
      status: "ok", doc, fromCache, durationMs: elapsed,
    });
  } catch (err) {
    const elapsed = Date.now() - t0;
    log("ERR %s %s", entry.loc, (err as Error).message);

    // Best-effort: log error event (non-fatal if this fails)
    pool.query(
      `INSERT INTO fact_crawl_events (url, site, section, status, error_message, duration_ms)
       VALUES ($1,$2,$3,'error',$4,$5)`,
      [entry.loc, entry.site, entry.section, (err as Error).message, elapsed],
    ).catch(() => {/* ignore */});

    return CrawlResultSchema.parse({
      status: "error",
      url: entry.loc,
      error: (err as Error).message,
      durationMs: elapsed,
    });
  }
}

// ── Main runner ───────────────────────────────────────────────────────────────

export async function runCrawler(sites = ["anthropic.com", "claude.com"]): Promise<{
  ok: number; skipped: number; errors: number; durationMs: number;
}> {
  const t0 = Date.now();
  const redis = createE2MRedis(REDIS_CONFIGS.localDocker());
  await redis.client.connect();

  let ok = 0, skipped = 0, errors = 0;

  for (const site of sites) {
    // ── 1. Fetch + cache sitemap ─────────────────────────────────────────────
    const sitemapKey = CRAWL_KEYS.sitemap(site);
    const { body: sitemapXml } = await fetchCached(
      `https://${site}/sitemap.xml`,
      sitemapKey,
      SITEMAP_TTL_MS,
      redis,
    );

    const entries = parseSitemapXml(sitemapXml, site);
    log("Site %s: %d target URLs", site, entries.length);

    // ── 2. Crawl with concurrency=5, auto-pipeline handles Redis batching ────
    const concurrency = 5;
    for (let i = 0; i < entries.length; i += concurrency) {
      const batch = entries.slice(i, i + concurrency);
      const results = await Promise.all(batch.map((e) => crawlPage(e, redis)));
      for (const r of results) {
        if (r.status === "ok")    ok++;
        if (r.status === "skip")  skipped++;
        if (r.status === "error") errors++;
      }
    }
  }

  await redis.disconnect();
  return { ok, skipped, errors, durationMs: Date.now() - t0 };
}
