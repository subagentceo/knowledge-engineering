/**
 * zod schema for vendor/<name>/crawl.json — the per-vendor crawl
 * configuration consumed by scripts/crawl-vendors.ts.
 *
 * Phase G item O-G10: zod schemas at boundaries. The schema lives in
 * src/lib/schemas/ so both the runtime crawler (scripts/) and the
 * runtime allowlist surface (src/lib/) parse the same shape. Today
 * scripts/crawl-vendors.ts type-casts the JSON.parse output, which
 * means a typo in a vendor's crawl.json silently breaks the crawl
 * downstream. Parsing here turns those into clear errors at read time.
 *
 * @cite docs/plans/founder-refactor-2026-05-15.md (Phase G item O-G10)
 * @cite vendor/turbopuffer/crawl.json (canonical shape)
 * @cite scripts/lib/transforms.ts (TransformName union, kept as the
 *       source of truth — this schema mirrors it as a zod enum)
 */
import { z } from "zod";

/**
 * TransformName mirror. Kept duplicated rather than imported because
 * `src/lib/` is the typeful boundary surface; importing from
 * `scripts/lib/` here would invert the dependency direction. The
 * `crawl-config-mirrors-transforms.test.ts` test below asserts the two
 * stay in lockstep.
 */
export const TransformNameSchema = z.enum([
  "verbatim",
  "append-md",
  "append-md-and-accept",
  "cloudflare-index-md",
  "anthropic-mdfirst",
  "support-mdfirst",
  "accept-only",
  "html-extract",
  "github-article-body",
]);

export type TransformName = z.infer<typeof TransformNameSchema>;

export const HtmlIndexSourceSchema = z.object({
  url: z.string().url(),
  link_regex: z.string().min(1),
});

export const HtmlExtractSchema = z.object({
  selector: z.string().min(1).optional(),
});

export const CrawlConfigSchema = z.object({
  name: z.string().min(1),
  homepage: z.string().url(),
  llms_txt_candidates: z.array(z.string().url()),
  llms_txt_sources: z.array(z.string().url()).optional(),
  html_index_sources: z.array(HtmlIndexSourceSchema).optional(),
  sitemap_xml_sources: z.array(z.string().url()).optional(),
  llms_txt: z.string().url().optional(),
  transform: TransformNameSchema,
  allow_prefixes: z.array(z.string().min(1)),
  deny_prefixes: z.array(z.string().min(1)).optional(),
  /**
   * Exact-URL allow list. Use when a bare-index page (e.g.
   * `https://claude.com/pricing` with no trailing slash) must be crawled
   * but its prefix form (`https://claude.com/pricing/`) cannot widen the
   * allow_prefix without over-matching (e.g. `/pricing` would match
   * `/pricing-foo`). Exact matches bypass the prefix-allow check but
   * still respect deny_prefixes and deny_urls.
   *
   * Evaluation order in inAllowlist():
   *   1. deny_prefixes match → reject
   *   2. deny_urls match → reject
   *   3. allow_urls exact match → accept (skip prefix check)
   *   4. allow_prefixes match → accept
   *   5. otherwise → reject
   */
  allow_urls: z.array(z.string().url()).optional(),
  /**
   * Exact-URL deny list. Use when allow_prefix covers a topology root
   * but a specific listing/index page (e.g. /resources/use-cases) must
   * not be crawled while its children (/resources/use-cases/<slug>) must.
   */
  deny_urls: z.array(z.string().url()).optional(),
  page_cap: z.number().int().min(0),
  html_extract: HtmlExtractSchema.optional(),
  incremental: z.boolean().optional(),
  /**
   * Path layout. Default "host" puts files under <vendor>/<host>/<path>.md.
   * "topology" drops the host segment and organizes by URL first-path-
   * segment (with subdomain prefix when applicable). Used by
   * vendor/claude-sitemap/ which consolidates multiple URL prefixes.
   */
  layout: z.enum(["host", "topology"]).optional(),
  /**
   * URL prefixes whose .pdf links should be discovered in html-extract
   * output and mirrored as text under vendor/<name>/_pdfs/<slug>.md.
   * Missing/empty disables the lane.
   */
  pdf_allow_prefixes: z.array(z.string().min(1)).optional(),
  /**
   * Free-form note surfacing why a vendor is in a given state.
   * Used by inconsistent-vendor diagnostics (Phase G item O-G2).
   */
  note: z.string().optional(),
});

export type CrawlConfig = z.infer<typeof CrawlConfigSchema>;

/**
 * Parse a crawl.json body. Throws a readable zod error on shape drift;
 * callers that want a Result-style return can wrap with safeParse.
 */
export function parseCrawlConfig(body: string): CrawlConfig {
  return CrawlConfigSchema.parse(JSON.parse(body));
}
