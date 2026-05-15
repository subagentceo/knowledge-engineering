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
  page_cap: z.number().int().min(0),
  html_extract: HtmlExtractSchema.optional(),
  incremental: z.boolean().optional(),
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
