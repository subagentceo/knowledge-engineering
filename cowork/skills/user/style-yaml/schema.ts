/**
 * yaml.schema.ts
 *
 * Canonical in-memory type for a YAML 1.2 document inside a mailbox-mcp envelope.
 *
 * Spec refs:
 *   YAML 1.2       https://yaml.org/spec/1.2.2/
 *   eemeli/yaml    https://github.com/eemeli/yaml
 *
 * Citation emit: top-level `citations:` array (matches Anthropic subprocessors.yaml posture).
 */

import { z } from 'zod';
import { CitationSchema, ProvenanceFooterSchema } from './citation.schema.js';

// ── YAML doc schema ───────────────────────────────────────────────────────────
export const YamlDocSchema = z.object({
  format: z.literal('yaml'),
  spec_version: z.literal('1.2'),

  /** Raw YAML wire text (round-trips through eemeli/yaml) */
  body: z.string(),

  /**
   * Parsed JS value. Validated separately by the outer envelope schemaRef.
   * We keep it as unknown here; callers pass their own Zod schema.
   */
  parsed: z.unknown(),

  /**
   * Top-level `citations:` array.
   * Serialised inline — see subprocessors.yaml exemplar from operator.
   */
  citations: z.array(CitationSchema).default([]),

  provenance: ProvenanceFooterSchema.optional(),
});
export type YamlDoc = z.infer<typeof YamlDocSchema>;

export const YAML_SCHEMA_REF = 'urn:mailbox:schema:style:yaml:v1' as const;
