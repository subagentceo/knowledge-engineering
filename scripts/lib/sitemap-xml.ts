// scripts/lib/sitemap-xml.ts
//
// Phase 13.B (O2). Sitemap XML discovery primitive. Parses an
// sitemaps.org-compliant sitemap.xml or sitemap-index.xml body and
// returns the absolute URLs from each `<loc>` entry. For sitemap-index
// files (which point at child sitemaps), the caller can re-invoke per
// child URL.
//
// Citations:
//   @cite rubrics/phase-13.md            (O2 — sitemap.xml discovery)
//
// Pure function: no I/O. The crawler in scripts/crawl-vendors.ts owns
// the fetch + the merge into the URL pool.

const LOC_RE = /<loc>\s*([^<\s][^<]*?)\s*<\/loc>/gi;

/**
 * Extract `<loc>` URLs from a sitemap.xml body. Works for both
 * `<urlset>` (URL listings) and `<sitemapindex>` (child-sitemap
 * pointers) — the parser is shape-agnostic. Order-preserving with
 * deduplication.
 */
export function parseSitemapXml(xml: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const re = new RegExp(LOC_RE.source, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const raw = decodeXmlEntities(m[1]);
    let abs: string;
    try {
      abs = new URL(raw).toString();
    } catch {
      continue;
    }
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  return out;
}

/**
 * Returns true if the body looks like a sitemap-index pointing at child
 * sitemaps rather than a leaf urlset. Caller uses this to recurse one
 * level (we don't recurse here to keep the function pure / sync).
 */
export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/i.test(xml);
}

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};

function decodeXmlEntities(s: string): string {
  return s.replace(/&(amp|lt|gt|quot|apos);/g, (full) => ENTITY_MAP[full] ?? full);
}
