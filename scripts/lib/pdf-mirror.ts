// scripts/lib/pdf-mirror.ts
//
// PDF lane for html-extract vendors. Scans the post-turndown markdown
// for `.pdf` hrefs matching a configured CDN allowlist, fetches each
// once, and writes a markdown sidecar to `vendor/<name>/_pdfs/<slug>.md`
// containing the extracted text. Binary PDFs themselves are not
// committed — the chassis ships markdown only.
//
// Citations:
//   @cite vendor/claude-blog/crawl.json                  (pdf_allow_prefixes field)
//   @cite seeds/posture/session-start.xml                (.md-first hard rule)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { PDFParse } from "pdf-parse";

export interface PdfMirrorOptions {
  vendorRoot: string;
  vendor: string;
  /** Output of turndown for one source URL — scanned for .pdf hrefs. */
  markdown: string;
  /** URL of the page the markdown came from — used as the base for relative refs. */
  sourceUrl: string;
  /** Allowlist of URL prefixes. Empty/missing disables the lane entirely. */
  pdfAllowPrefixes?: string[];
}

export interface PdfMirrorResult {
  fetched: string[];
  skipped: string[];
  failed: { url: string; reason: string }[];
}

const PDF_HREF_RE = /\]\((https?:\/\/[^)\s]+?\.pdf(?:\?[^)\s]*)?)\)/gi;

/**
 * Extract distinct PDF URLs from a markdown body that match one of the
 * configured prefixes. Strips URL-encoded paren artifacts (turndown
 * escapes `(` as `\(` inside link targets) before allowlist comparison.
 */
export function scanPdfUrls(markdown: string, allowPrefixes: string[]): string[] {
  if (allowPrefixes.length === 0) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of markdown.matchAll(PDF_HREF_RE)) {
    const raw = m[1].replace(/\\([()])/g, "$1");
    if (!allowPrefixes.some((p) => raw.startsWith(p))) continue;
    if (seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
  }
  return out;
}

/**
 * Derive a filesystem-safe slug from a PDF URL.
 * `https://cdn.prod.website-files.com/aaa/bbb_The-Founders-Playbook-05062026_v3%20(1).pdf`
 *   → `the-founders-playbook-05062026_v3-1`
 */
export function slugForPdf(url: string): string {
  const u = new URL(url);
  const last = u.pathname.split("/").pop() ?? "doc.pdf";
  const decoded = decodeURIComponent(last).replace(/\.pdf$/i, "");
  // Webflow CDN filenames usually have a `<hash>_<human-name>` prefix —
  // strip the 24-char hash if present so the slug stays readable.
  const stripped = decoded.replace(/^[a-f0-9]{16,}_/, "");
  return stripped
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function ensureDir(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
}

function writeIfChanged(path: string, body: string): "wrote" | "unchanged" {
  ensureDir(path);
  if (existsSync(path)) {
    if (readFileSync(path, "utf8") === body) return "unchanged";
  }
  writeFileSync(path, body);
  return "wrote";
}

/**
 * For each PDF discovered in `markdown`, fetch, extract text via
 * pdf-parse, and write `vendor/<name>/_pdfs/<slug>.md`. Idempotent: if
 * the target file already exists with byte-identical body, skip.
 */
export async function mirrorPdfs(opts: PdfMirrorOptions): Promise<PdfMirrorResult> {
  const result: PdfMirrorResult = { fetched: [], skipped: [], failed: [] };
  const urls = scanPdfUrls(opts.markdown, opts.pdfAllowPrefixes ?? []);
  for (const url of urls) {
    const slug = slugForPdf(url);
    const target = resolve(opts.vendorRoot, opts.vendor, "_pdfs", `${slug}.md`);
    if (existsSync(target)) {
      // Cheap idempotency: if the source_url frontmatter line matches,
      // skip the network round-trip. Re-fetch only when the slug
      // collides with a different URL (rare).
      const existing = readFileSync(target, "utf8");
      if (existing.includes(`source_url: ${url}`)) {
        result.skipped.push(url);
        continue;
      }
    }
    try {
      const r = await fetch(url);
      if (!r.ok) {
        result.failed.push({ url, reason: `HTTP ${r.status}` });
        continue;
      }
      const buf = Buffer.from(await r.arrayBuffer());
      const parser = new PDFParse({ data: new Uint8Array(buf) });
      const textResult = await parser.getText();
      const info = await parser.getInfo();
      await parser.destroy();
      const text = (textResult.text ?? "").trim();
      const body = renderPdfMarkdown({
        sourceUrl: url,
        referrer: opts.sourceUrl,
        pages: info.total ?? 0,
        text,
      });
      writeIfChanged(target, body);
      result.fetched.push(url);
    } catch (err) {
      result.failed.push({ url, reason: (err as Error).message });
    }
  }
  return result;
}

function renderPdfMarkdown(args: {
  sourceUrl: string;
  referrer: string;
  pages: number;
  text: string;
}): string {
  return [
    "---",
    `source_url: ${args.sourceUrl}`,
    `referrer: ${args.referrer}`,
    `pages: ${args.pages}`,
    `fetched_at: ${new Date().toISOString()}`,
    "kind: pdf-mirror",
    "---",
    "",
    args.text,
    "",
  ].join("\n");
}
