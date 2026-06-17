// scripts/crawl-anduril-www.ts
//
// Deterministic, content-addressed, incremental crawler for the
// www.anduril.com marketing site.
//
// WHY a bespoke crawler (not the Cheerio vendor pipeline): www.anduril.com
// is a WebGL/Hydrax single-page app. Every page renders into one <canvas>;
// there is no prose DOM, `.md` returns 404, and the Sanity dataset is
// private. The ONLY deterministic, JS-free, server-rendered content each
// page exposes is its structured-metadata layer: <title>, meta description,
// Open Graph tags, and a JSON-LD WebPage/NewsArticle block. We mirror that.
//
// Determinism contract: given unchanged upstream metadata, every committed
// byte (the .md bodies AND manifest.json) is identical across runs. No
// wall-clock timestamps land in tracked output; change-tracking keys off a
// sha256 of the extracted content fields, and dates come from the page
// itself (datePublished / dateModified).
//
// Incremental contract: on re-run, a page is rewritten only when its
// content_sha256 changes; brand-new sitemap URLs are added. Unchanged pages
// are left byte-for-byte untouched.
//
// @cite vendor/anduril/developer.anduril.com/guides/concepts/overview.md
// @cite vendor/commonmark/spec.commonmark.org/0.31.2.md
// @cite seeds/posture/session-start.xml

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";
import { parseSitemapXml } from "./lib/sitemap-xml.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_ROOT = resolve(REPO_ROOT, "vendor", "anduril-www");
const HOST = "www.anduril.com";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const MANIFEST_PATH = join(OUT_ROOT, "manifest.json");
const CONCURRENCY = 8;

interface PageContent {
  url: string;
  type: string; // schema.org @type, normalized to a string
  section: string; // first path segment (news, lattice, ...) or "root"
  title: string | null;
  description: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  headline: string | null;
  datePublished: string | null;
  dateModified: string | null;
  publisher: string | null;
}

interface ManifestEntry {
  sha256: string;
  path: string; // repo-relative .md path
  section: string;
  datePublished: string | null;
  dateModified: string | null;
}
type Manifest = Record<string, ManifestEntry>;

function decodeEntities(s: string): string {
  return s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}

function metaContent(html: string, key: string): string | null {
  // Match name="key" or property="key" with content before or after.
  const re = new RegExp(
    `<meta[^>]+(?:name|property)="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const c = tag.match(/content="([^"]*)"/i)?.[1];
  return c ? decodeEntities(c) : null;
}

function firstString(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(firstString).filter(Boolean).join(", ") || null;
  return null;
}

function extract(url: string, html: string): PageContent {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  const section = path === "" ? "root" : (path.split("/")[0] ?? "root");

  const titleTag = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const title = titleTag ? decodeEntities(titleTag).trim() : null;

  let ld: Record<string, unknown> = {};
  const ldRaw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  if (ldRaw) {
    try {
      const parsed = JSON.parse(ldRaw);
      ld = Array.isArray(parsed) ? (parsed[0] ?? {}) : parsed;
    } catch {
      ld = {};
    }
  }

  const typeVal = firstString(ld["@type"]) ?? "WebPage";
  const publisher =
    firstString(
      ((ld["isPartOf"] as Record<string, unknown>)?.["publisher"] as Record<string, unknown>)?.[
        "name"
      ],
    ) ?? firstString((ld["publisher"] as Record<string, unknown>)?.["name"]);

  return {
    url,
    type: typeVal,
    section,
    title,
    description: metaContent(html, "description"),
    ogTitle: metaContent(html, "og:title"),
    ogDescription: metaContent(html, "og:description"),
    ogImage: metaContent(html, "og:image"),
    headline: firstString(ld["headline"]),
    datePublished: firstString(ld["datePublished"]) ?? metaContent(html, "article:published_time"),
    dateModified: firstString(ld["dateModified"]),
    publisher,
  };
}

// Stable serialization of the content fields used for the change-detection
// hash. Excludes nothing volatile (no wall-clock); key order is fixed.
function contentHash(c: PageContent): string {
  const ordered = {
    url: c.url,
    type: c.type,
    section: c.section,
    title: c.title,
    description: c.description,
    ogTitle: c.ogTitle,
    ogDescription: c.ogDescription,
    ogImage: c.ogImage,
    headline: c.headline,
    datePublished: c.datePublished,
    dateModified: c.dateModified,
    publisher: c.publisher,
  };
  return createHash("sha256").update(JSON.stringify(ordered)).digest("hex");
}

function mdPathFor(url: string): string {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  const rel = path === "" ? "index" : path;
  return join("vendor", "anduril-www", HOST, `${rel}.md`);
}

function frontmatterValue(v: string | null): string {
  if (v === null) return "null";
  // YAML double-quote escaping for a single-line scalar.
  return `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function renderMarkdown(c: PageContent, sha: string): string {
  const fm = [
    "---",
    `url: ${frontmatterValue(c.url)}`,
    `type: ${frontmatterValue(c.type)}`,
    `section: ${frontmatterValue(c.section)}`,
    `title: ${frontmatterValue(c.title)}`,
    `date_published: ${frontmatterValue(c.datePublished)}`,
    `date_modified: ${frontmatterValue(c.dateModified)}`,
    `publisher: ${frontmatterValue(c.publisher)}`,
    `content_sha256: ${frontmatterValue(sha)}`,
    "---",
  ].join("\n");

  const heading = c.headline ?? c.title ?? c.url;
  const body: string[] = [`# ${heading}`, ""];
  const desc = c.description ?? c.ogDescription;
  if (desc) body.push(desc, "");

  const facts: string[] = [];
  if (c.type) facts.push(`- type: ${c.type}`);
  if (c.section) facts.push(`- section: ${c.section}`);
  if (c.datePublished) facts.push(`- published: ${c.datePublished}`);
  if (c.dateModified) facts.push(`- modified: ${c.dateModified}`);
  if (c.publisher) facts.push(`- publisher: ${c.publisher}`);
  facts.push(`- source: <${c.url}>`);
  if (facts.length) {
    body.push("## Page facts", "", ...facts, "");
  }

  const raw = `${fm}\n\n${body.join("\n")}`.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
  return raw;
}

// CommonMark-compliant normalization via prettier (the repo's cmark analog).
// Keeps committed bytes == crawler output == prettier output, so re-runs are
// idempotent and `prettier --check` stays green.
async function toCommonMark(md: string): Promise<string> {
  return prettier.format(md, { parser: "markdown", proseWrap: "preserve" });
}

async function fetchHtml(url: string): Promise<string | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { Accept: "text/html", "User-Agent": "knowledge-engineering-crawler" } });
      if (r.ok) return await r.text();
      if (r.status === 404) return null;
    } catch {
      // retry
    }
    await new Promise((res) => setTimeout(res, 500 * (attempt + 1)));
  }
  return null;
}

function loadManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
}

function writeManifest(m: Manifest): void {
  const sorted: Manifest = {};
  for (const k of Object.keys(m).sort()) sorted[k] = m[k]!;
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");
}

async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>): Promise<void> {
  let i = 0;
  const workers = Array.from({ length: n }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx]!);
    }
  });
  await Promise.all(workers);
}

async function main(): Promise<void> {
  console.log(`[anduril-www] fetch sitemap ${SITEMAP}`);
  const smBody = await fetchHtml(SITEMAP);
  if (!smBody) throw new Error("sitemap fetch failed");
  const urls = [...new Set(parseSitemapXml(smBody))]
    .filter((u) => u.startsWith(`https://${HOST}/`))
    .sort();
  console.log(`[anduril-www] ${urls.length} URL(s) in sitemap`);

  const prev = loadManifest();
  const next: Manifest = {};
  let added = 0;
  let changed = 0;
  let unchanged = 0;
  let failed = 0;

  await pool(urls, CONCURRENCY, async (url) => {
    const html = await fetchHtml(url);
    if (html === null) {
      failed++;
      // Preserve a prior successful capture if the page is transiently down.
      if (prev[url]) next[url] = prev[url]!;
      return;
    }
    const content = extract(url, html);
    const sha = contentHash(content);
    const relPath = mdPathFor(url);
    const existing = prev[url];

    next[url] = {
      sha256: sha,
      path: relPath,
      section: content.section,
      datePublished: content.datePublished,
      dateModified: content.dateModified,
    };

    if (existing && existing.sha256 === sha && existsSync(resolve(REPO_ROOT, relPath))) {
      unchanged++;
      return; // byte-identical content — leave the file untouched
    }

    const abs = resolve(REPO_ROOT, relPath);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, await toCommonMark(renderMarkdown(content, sha)));
    if (existing) changed++;
    else added++;
  });

  writeManifest(next);

  // Deterministic index (no timestamps).
  const indexLines = [
    "---",
    "vendor: anduril-www",
    `host: ${HOST}`,
    `count: ${Object.keys(next).length}`,
    "source: structured-metadata (title + meta + Open Graph + JSON-LD)",
    "---",
    "",
    "# anduril-www page index",
    "",
    "| URL | Section | Local |",
    "|---|---|---|",
    ...Object.keys(next)
      .sort()
      .map((u) => `| ${u} | ${next[u]!.section} | \`${next[u]!.path}\` |`),
    "",
  ];
  writeFileSync(join(OUT_ROOT, "urls.md"), await toCommonMark(indexLines.join("\n")));

  console.log(
    `[anduril-www] added=${added} changed=${changed} unchanged=${unchanged} failed=${failed} total=${Object.keys(next).length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
