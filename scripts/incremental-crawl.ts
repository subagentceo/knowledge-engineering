// scripts/incremental-crawl.ts
//
// Generalized, deterministic, content-addressed incremental crawler. The reusable
// engine behind the anduril-crawl-plugin. One config registry
// (scripts/crawl-targets.json) drives many vendor doc surfaces; each run is
// idempotent and only new/changed pages are rewritten — so a follow-up PR carries
// exactly the delta.
//
// Two extraction modes:
//   - "markdown"   : markdown-native surfaces (llms.txt + sitemap.xml, fetch the
//                    page's `.md`). Used for developer.anduril.com, code.claude.com.
//   - "structured" : JS/WebGL SPAs with no prose DOM. Extract the server-rendered
//                    structured layer (title + meta + Open Graph + JSON-LD) into
//                    CommonMark. Used for www.anduril.com.
//
// Determinism: given unchanged upstream, every committed byte (the .md bodies and
// manifest.json) is identical across runs. No wall-clock in tracked output;
// change-tracking keys off a sha256 of the page content.
//
// Usage:
//   tsx scripts/incremental-crawl.ts --target <name> [--changed-only] [--page-cap N]
//   tsx scripts/incremental-crawl.ts --list
//
// @cite scripts/crawl-anduril-www.ts
// @cite vendor/commonmark/spec.commonmark.org/0.31.2.md
// @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";
import { parseSitemapXml, isSitemapIndex } from "./lib/sitemap-xml.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TARGETS_PATH = resolve(REPO_ROOT, "scripts", "crawl-targets.json");

interface Target {
  name: string;
  mode: "markdown" | "structured";
  host: string;
  out_dir: string; // repo-relative, e.g. "vendor/anduril-www"
  sitemap_xml?: string;
  llms_txt?: string; // markdown mode: harvest .md links from here too
  allow_prefix: string;
  page_cap?: number; // 0 / omitted = uncapped
}

interface ManifestEntry {
  sha256: string;
  path: string;
}
type Manifest = Record<string, ManifestEntry>;

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

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

async function fetchText(url: string, accept: string): Promise<string | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { Accept: accept, "User-Agent": "ke-incremental-crawl" } });
      if (r.ok) return await r.text();
      if (r.status === 404) return null;
    } catch {
      /* retry */
    }
    await new Promise((res) => setTimeout(res, 400 * (attempt + 1)));
  }
  return null;
}

async function collectSitemap(url: string): Promise<string[]> {
  const body = await fetchText(url, "application/xml, text/xml");
  if (!body) return [];
  if (isSitemapIndex(body)) {
    const children = parseSitemapXml(body);
    const all: string[] = [];
    for (const child of children) {
      const cb = await fetchText(child, "application/xml, text/xml");
      if (cb) all.push(...parseSitemapXml(cb));
    }
    return all;
  }
  return parseSitemapXml(body);
}

function harvestLlmsMdLinks(body: string, host: string): string[] {
  // Markdown-mode: pull absolute https://<host>/...md links from the llms.txt
  // body, return the page URL WITHOUT the .md so the fetch step re-adds it.
  // Single greedy character class (no adjacent variable quantifier) keeps this
  // linear — no polynomial backtracking on the network-fetched body.
  const re = new RegExp(`https://${host.replace(/\./g, "\\.")}/[^\\s)"']*`, "g");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    if (m[0].endsWith(".md")) out.push(m[0].slice(0, -3));
  }
  return out;
}

function mdPathFor(t: Target, url: string): string {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  const rel = path === "" ? "index" : path;
  return join(t.out_dir, t.host, `${rel}.md`);
}

async function toCommonMark(md: string): Promise<string> {
  return prettier.format(md, { parser: "markdown", proseWrap: "preserve" });
}

// ---- structured-metadata extraction (JS-SPA surfaces) -------------------------

function metaContent(html: string, key: string): string | null {
  // Linear string scan over <meta …> tags — avoids a polynomial regex on the
  // network-fetched html and a regex built from a variable key.
  const needleA = `name="${key}"`;
  const needleB = `property="${key}"`;
  let idx = 0;
  for (;;) {
    const start = html.indexOf("<meta", idx);
    if (start < 0) return null;
    const end = html.indexOf(">", start);
    if (end < 0) return null;
    const tag = html.slice(start, end);
    idx = end + 1;
    if (tag.includes(needleA) || tag.includes(needleB)) {
      const c = tag.match(/content="([^"]*)"/i)?.[1]; // [^"]* is linear
      if (c !== undefined) return decodeEntities(c);
    }
  }
}

function firstString(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(firstString).filter(Boolean).join(", ") || null;
  return null;
}

async function renderStructured(url: string, html: string): Promise<{ md: string; hash: string }> {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  const section = path === "" ? "root" : (path.split("/")[0] ?? "root");
  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "").trim() || null;

  // indexOf slicing rather than a lazy [\s\S]*? regex — no backtracking on the
  // network-fetched html.
  let ld: Record<string, unknown> = {};
  const ldOpen = '<script type="application/ld+json">';
  const ldStart = html.indexOf(ldOpen);
  if (ldStart >= 0) {
    const ldEnd = html.indexOf("</script>", ldStart + ldOpen.length);
    if (ldEnd >= 0) {
      try {
        const p = JSON.parse(html.slice(ldStart + ldOpen.length, ldEnd));
        ld = Array.isArray(p) ? (p[0] ?? {}) : p;
      } catch {
        /* ignore */
      }
    }
  }
  const fields = {
    url,
    type: firstString(ld["@type"]) ?? "WebPage",
    section,
    title: decodeEntities(title ?? "") || null,
    description: metaContent(html, "description"),
    ogDescription: metaContent(html, "og:description"),
    headline: firstString(ld["headline"]),
    datePublished: firstString(ld["datePublished"]) ?? metaContent(html, "article:published_time"),
    dateModified: firstString(ld["dateModified"]),
  };
  const hash = sha256(JSON.stringify(fields));
  const heading = fields.headline ?? fields.title ?? url;
  const desc = fields.description ?? fields.ogDescription;
  const lines = [
    "---",
    `url: ${JSON.stringify(fields.url)}`,
    `type: ${JSON.stringify(fields.type)}`,
    `section: ${JSON.stringify(fields.section)}`,
    `date_published: ${JSON.stringify(fields.datePublished)}`,
    `date_modified: ${JSON.stringify(fields.dateModified)}`,
    `content_sha256: ${JSON.stringify(hash)}`,
    "---",
    "",
    `# ${heading}`,
    "",
    ...(desc ? [desc, ""] : []),
    "## Page facts",
    "",
    `- type: ${fields.type}`,
    `- section: ${fields.section}`,
    ...(fields.datePublished ? [`- published: ${fields.datePublished}`] : []),
    ...(fields.dateModified ? [`- modified: ${fields.dateModified}`] : []),
    `- source: <${fields.url}>`,
    "",
  ];
  return { md: await toCommonMark(lines.join("\n")), hash };
}

// ---- markdown-native extraction ----------------------------------------------

async function renderMarkdown(url: string): Promise<{ md: string; hash: string } | null> {
  const mdUrl = url.endsWith(".md") ? url : `${url}.md`;
  const body = await fetchText(mdUrl, "text/markdown, text/plain, */*");
  if (body === null || /^\s*<(!doctype|html)/i.test(body)) return null; // reject HTML
  const hash = sha256(body);
  const fm = ["---", `url: ${JSON.stringify(url)}`, `content_sha256: ${JSON.stringify(hash)}`, "---", "", body].join("\n");
  return { md: await toCommonMark(fm), hash };
}

// ---- driver -------------------------------------------------------------------

function loadTargets(): Target[] {
  return JSON.parse(readFileSync(TARGETS_PATH, "utf8")) as Target[];
}

function loadManifest(p: string): Manifest {
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as Manifest) : {};
}

function writeManifest(p: string, m: Manifest): void {
  const sorted: Manifest = {};
  for (const k of Object.keys(m).sort()) sorted[k] = m[k]!;
  writeFileSync(p, JSON.stringify(sorted, null, 2) + "\n");
}

async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>): Promise<void> {
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) await fn(items[i++]!);
    }),
  );
}

async function run(target: Target, changedOnly: boolean, pageCapOverride?: number): Promise<void> {
  const outAbs = resolve(REPO_ROOT, target.out_dir);
  mkdirSync(outAbs, { recursive: true });
  const manifestPath = join(outAbs, "manifest.json");

  const urlSet = new Set<string>();
  if (target.sitemap_xml) for (const u of await collectSitemap(target.sitemap_xml)) urlSet.add(u);
  if (target.mode === "markdown" && target.llms_txt) {
    const body = await fetchText(target.llms_txt, "text/plain, */*");
    if (body) for (const u of harvestLlmsMdLinks(body, target.host)) urlSet.add(u);
  }
  let urls = [...urlSet].filter((u) => u.startsWith(target.allow_prefix)).sort();
  const cap = pageCapOverride ?? target.page_cap ?? 0;
  if (cap > 0) urls = urls.slice(0, cap);

  const prev = loadManifest(manifestPath);
  const next: Manifest = {};
  const changed: string[] = [];
  let added = 0;
  let changedN = 0;
  let unchanged = 0;
  let failed = 0;

  await pool(urls, 8, async (url) => {
    const rendered =
      target.mode === "markdown"
        ? await renderMarkdown(url)
        : await (async () => {
            const html = await fetchText(url, "text/html");
            return html === null ? null : renderStructured(url, html);
          })();

    if (!rendered) {
      failed++;
      if (prev[url]) next[url] = prev[url]!;
      return;
    }
    const relPath = mdPathFor(target, url);
    const existing = prev[url];
    next[url] = { sha256: rendered.hash, path: relPath };
    const abs = resolve(REPO_ROOT, relPath);

    if (existing && existing.sha256 === rendered.hash && existsSync(abs)) {
      unchanged++;
      return;
    }
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, rendered.md);
    changed.push(relPath);
    if (existing) changedN++;
    else added++;
  });

  writeManifest(manifestPath, next);

  if (changedOnly) {
    for (const p of changed.sort()) console.log(p);
  }
  console.log(
    `[${target.name}] mode=${target.mode} added=${added} changed=${changedN} unchanged=${unchanged} failed=${failed} total=${Object.keys(next).length}`,
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const targets = loadTargets();
  if (args.includes("--list")) {
    for (const t of targets) console.log(`${t.name}\t(${t.mode})\t${t.host}`);
    return;
  }
  const name = args[args.indexOf("--target") + 1];
  const t = targets.find((x) => x.name === name);
  if (!t) throw new Error(`unknown target '${name}'. Run --list to see targets.`);
  const changedOnly = args.includes("--changed-only");
  const capIdx = args.indexOf("--page-cap");
  const cap = capIdx >= 0 ? Number(args[capIdx + 1]) : undefined;
  await run(t, changedOnly, cap);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
