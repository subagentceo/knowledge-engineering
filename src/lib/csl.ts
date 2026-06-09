/**
 * CSL-JSON citation primitives for the research-citation pipeline.
 *
 * Subset of the Citation Style Language csl-data.json schema — only the
 * fields the vendor mirror can populate deterministically. Field names
 * and the `date-parts` shape follow the upstream schema exactly so the
 * emitted items load into Zotero / citeproc-js unchanged.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite https://github.com/citation-style-language/schema (csl-data.json)
 */

import { z } from "zod";

export const CslDate = z.object({
  "date-parts": z.array(z.array(z.number().int())).min(1),
});

export const CslName = z.object({
  family: z.string().optional(),
  given: z.string().optional(),
  literal: z.string().optional(),
});

export const CslItem = z.object({
  id: z.string(),
  type: z.enum(["article", "report", "webpage", "document"]),
  title: z.string(),
  abstract: z.string().optional(),
  author: z.array(CslName).optional(),
  issued: CslDate.optional(),
  URL: z.string().optional(),
  publisher: z.string().optional(),
  source: z.string().optional(),
});

export type CslItem = z.infer<typeof CslItem>;

const H1_RE = /^#\s+(.+)$/m;
// "Sep 15, 2025" / "Mar 5, 2026" — the date style on anthropic.com research
// pages. No leading \b: the crawler glues category and date together
// ("Economic ResearchSep 15, 2025").
const HUMAN_DATE_RE =
  /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2}),\s+(\d{4})\b/;

const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function firstParagraph(markdown: string): string | undefined {
  for (const block of markdown.split(/\n{2,}/)) {
    const line = block.trim();
    if (line.length < 80) continue; // skip headings, nav chrome, breadcrumbs
    if (line.startsWith("#") || line.startsWith("![") || line.startsWith("|")) continue;
    return line.replace(/\s+/g, " ");
  }
  return undefined;
}

/**
 * Map a vendor-relative path like
 * `vendor/anthropic-sitemap/research/clio.md` to its live URL.
 */
export function vendorPathToUrl(relPath: string): string | undefined {
  const slug = relPath.match(/^vendor\/anthropic-sitemap\/(.+)\.md$/)?.[1];
  if (slug === undefined) return undefined;
  if (slug.startsWith("_pdfs/")) return undefined; // hash-named PDF mirrors carry no slug
  return `https://www.anthropic.com/${slug}`;
}

/**
 * Deterministic extraction of a CSL item from a mirrored research doc.
 * Pure function: same markdown in, same item out. Unknown fields are
 * omitted, never guessed.
 */
export function researchDocToCslItem(relPath: string, markdown: string): CslItem {
  const title = markdown.match(H1_RE)?.[1]?.trim() ?? relPath.replace(/^.*\//, "").replace(/\.md$/, "");

  const item: CslItem = {
    id: relPath.replace(/^vendor\//, "").replace(/\.md$/, "").replace(/\//g, ":"),
    type: relPath.includes("/_pdfs/") ? "document" : "article",
    title,
    publisher: "Anthropic",
    source: relPath,
  };

  const url = vendorPathToUrl(relPath);
  if (url) item.URL = url;

  const abstract = firstParagraph(markdown);
  if (abstract) item.abstract = abstract;

  const [, monthName, day, year] = markdown.match(HUMAN_DATE_RE) ?? [];
  const month = monthName !== undefined ? MONTHS[monthName.slice(0, 3)] : undefined;
  if (month !== undefined && day !== undefined && year !== undefined) {
    item.issued = { "date-parts": [[Number(year), month, Number(day)]] };
  }

  return CslItem.parse(item);
}
