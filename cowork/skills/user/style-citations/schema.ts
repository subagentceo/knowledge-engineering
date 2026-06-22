/**
 * citation.schema.ts
 *
 * Canonical Citation type for all mailbox-mcp style skills.
 *
 * Grounded in:
 *   - CSL-JSON v1.0.2 subset  https://github.com/citation-style-language/schema
 *   - Anthropic Citations API  https://docs.anthropic.com/en/docs/build-with-claude/citations
 *   - W3C PROV-O               https://www.w3.org/TR/prov-o/
 *
 * Every style skill (markdown, yaml, html, graphql) imports Citation from here.
 * No other file may define Citation.
 */

import { z } from 'zod';

// ── CSL name ─────────────────────────────────────────────────────────────────
export const CSLNameSchema = z.object({
  family: z.string().optional(),
  given: z.string().optional(),
  literal: z.string().optional(),
  suffix: z.string().optional(),
  'dropping-particle': z.string().optional(),
  'non-dropping-particle': z.string().optional(),
}).refine(
  (n) => n.literal !== undefined || n.family !== undefined,
  { message: 'CSLName: one of literal|family is required' },
);
export type CSLName = z.infer<typeof CSLNameSchema>;

// ── CSL date ─────────────────────────────────────────────────────────────────
// date-parts is a 1–2 element array: [[year, month?, day?]]
export const CSLDateSchema = z.object({
  'date-parts': z
    .array(z.array(z.union([z.number().int(), z.string()])))
    .min(1)
    .max(2)
    .optional(),
  literal: z.string().optional(),
  raw: z.string().optional(),
  season: z.string().optional(),
}).refine(
  (d) => d['date-parts'] !== undefined || d.literal !== undefined,
  { message: 'CSLDate: one of date-parts|literal is required' },
);
export type CSLDate = z.infer<typeof CSLDateSchema>;

// ── CSL type enum (full v1.0.2) ───────────────────────────────────────────────
export const CSLTypeSchema = z.enum([
  'article',
  'article-journal',
  'article-magazine',
  'article-newspaper',
  'bill',
  'book',
  'broadcast',
  'chapter',
  'classic',
  'collection',
  'dataset',
  'document',
  'entry',
  'entry-dictionary',
  'entry-encyclopedia',
  'event',
  'figure',
  'graphic',
  'hearing',
  'interview',
  'legal_case',
  'legislation',
  'manuscript',
  'map',
  'motion_picture',
  'musical_score',
  'pamphlet',
  'paper-conference',
  'patent',
  'performance',
  'periodical',
  'personal_communication',
  'post',
  'post-weblog',
  'regulation',
  'report',
  'review',
  'review-book',
  'software',
  'song',
  'speech',
  'standard',
  'thesis',
  'treaty',
  'webpage',
]);
export type CSLType = z.infer<typeof CSLTypeSchema>;

// ── Anthropic Citations API bridge ───────────────────────────────────────────
// https://docs.anthropic.com/en/docs/build-with-claude/citations
export const AnthropicCitationBridgeSchema = z.object({
  /** 0-based index of the source document Claude was given */
  document_index: z.number().int().nonnegative().optional(),
  document_title: z.string().optional(),
  /** Character-level span inside the cited document */
  start_char_index: z.number().int().nonnegative().optional(),
  end_char_index: z.number().int().nonnegative().optional(),
  /** The verbatim excerpt Claude cited */
  cited_text: z.string().optional(),
});
export type AnthropicCitationBridge = z.infer<typeof AnthropicCitationBridgeSchema>;

// ── W3C PROV-O provenance fragment ───────────────────────────────────────────
// https://www.w3.org/TR/prov-o/
export const ProvOSchema = z.object({
  /** prov:wasDerivedFrom — IRI(s) of source entities */
  wasDerivedFrom: z.array(z.string()).optional(),
  /** prov:generatedAtTime — ISO-8601 datetime */
  generatedAtTime: z.iso.datetime({ offset: true }).optional(),
  /** prov:wasAttributedTo — IRI of agent */
  wasAttributedTo: z.string().optional(),
  /** prov:wasGeneratedBy — IRI of activity */
  wasGeneratedBy: z.string().optional(),
});
export type ProvO = z.infer<typeof ProvOSchema>;

// ── Canonical Citation ────────────────────────────────────────────────────────
export const CitationSchema = z.object({
  // CSL-JSON required
  id: z.string().min(1),
  type: CSLTypeSchema,

  // CSL-JSON core
  title: z.string(),
  author: z.array(CSLNameSchema).optional(),
  editor: z.array(CSLNameSchema).optional(),
  issued: CSLDateSchema.optional(),
  accessed: CSLDateSchema.optional(),
  'container-title': z.string().optional(),
  'collection-title': z.string().optional(),
  publisher: z.string().optional(),
  'publisher-place': z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  page: z.string().optional(),
  edition: z.union([z.string(), z.number()]).optional(),
  URL: z.string().url().optional(),
  DOI: z.string().optional(),
  ISBN: z.string().optional(),
  ISSN: z.string().optional(),
  PMID: z.string().optional(),
  'citation-key': z.string().optional(),
  language: z.string().optional(),
  abstract: z.string().optional(),
  note: z.string().optional(),
  annote: z.string().optional(),

  // Anthropic Citations API bridge
  anthropic: AnthropicCitationBridgeSchema.optional(),

  // W3C PROV-O
  prov: ProvOSchema.optional(),
});
export type Citation = z.infer<typeof CitationSchema>;

// ── Provenance footer (used by every unbook skill) ────────────────────────────
// Matches the pattern from Anthropic's self-service analytics blog post.
export const ProvenanceFooterSchema = z.object({
  source: z.enum(['semantic-layer', 'governed-table', 'raw-exploration', 'skill-reference', 'external-url']),
  schemaRef: z.string().optional(),
  agentId: z.string().optional(),
  freshness: z.iso.datetime({ offset: true }).optional(),
  reviewer: z.string().optional(),
  reviewerPassed: z.boolean().optional(),
  citations: z.array(CitationSchema).default([]),
});
export type ProvenanceFooter = z.infer<typeof ProvenanceFooterSchema>;

// ── Re-export everything for convenience ─────────────────────────────────────
export {
  CSLNameSchema as CSLName_,
  CSLDateSchema as CSLDate_,
  CSLTypeSchema as CSLType_,
};
