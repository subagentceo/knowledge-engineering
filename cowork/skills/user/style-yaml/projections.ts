/**
 * yaml.projections.ts
 *
 * parse  → wire YAML string → YamlDoc
 * stringify → YamlDoc → wire YAML string
 * citation round-trip via top-level `citations:` key
 *
 * Uses eemeli/yaml (https://github.com/eemeli/yaml) — YAML 1.2 compliant.
 */

import { parse as yamlParse, stringify as yamlStringify, Document } from 'yaml';
import type { YamlDoc } from './yaml.schema.js';
import type { Citation } from './citation.schema.js';
import { YamlDocSchema, YAML_SCHEMA_REF } from './yaml.schema.js';
import { CitationSchema } from './citation.schema.js';

// ── parse ─────────────────────────────────────────────────────────────────────
export function parse(wire: string): YamlDoc {
  const parsed = yamlParse(wire) as Record<string, unknown>;

  // Extract citations array if present at top level
  let citations: Citation[] = [];
  if (Array.isArray(parsed?.citations)) {
    citations = (parsed.citations as unknown[])
      .map((c) => CitationSchema.safeParse(c))
      .filter((r) => r.success)
      .map((r) => (r as { success: true; data: Citation }).data);
  }

  return YamlDocSchema.parse({
    format: 'yaml',
    spec_version: '1.2',
    body: wire,
    parsed,
    citations,
  });
}

// ── stringify ─────────────────────────────────────────────────────────────────
export function stringify(doc: YamlDoc): string {
  const validated = YamlDocSchema.parse(doc);

  // Start from the parsed value (or re-parse body as fallback)
  const obj: Record<string, unknown> =
    (validated.parsed as Record<string, unknown>) ??
    (yamlParse(validated.body) as Record<string, unknown>);

  // Inject citations at top level if any
  if (validated.citations.length > 0) {
    obj.citations = validated.citations;
  } else {
    delete obj.citations;
  }

  // Inject provenance footer at top level if present
  if (validated.provenance) {
    obj._provenance = validated.provenance;
  }

  return yamlStringify(obj, {
    lineWidth: 120,
    defaultStringType: 'PLAIN',
    defaultKeyType: 'PLAIN',
  });
}

// ── extractCitations ──────────────────────────────────────────────────────────
export function extractCitations(doc: YamlDoc): Citation[] {
  return doc.citations ?? [];
}

// ── injectCitations ───────────────────────────────────────────────────────────
export function injectCitations(doc: YamlDoc, cs: Citation[]): YamlDoc {
  const existingIds = new Set((doc.citations ?? []).map((c) => c.id));
  const merged = [
    ...(doc.citations ?? []),
    ...cs.filter((c) => !existingIds.has(c.id)),
  ];
  // Re-stringify to keep body in sync
  const updated = YamlDocSchema.parse({ ...doc, citations: merged });
  return YamlDocSchema.parse({ ...updated, body: stringify(updated) });
}

// ── toMarkdown bridge ─────────────────────────────────────────────────────────
/** Serialise the YAML document as a fenced markdown code block */
export function toMarkdown(doc: YamlDoc): string {
  return `\`\`\`yaml\n${stringify(doc)}\`\`\``;
}

/** Roundtrip: parse(stringify(doc)) ≡ doc */
export function roundtrip(doc: YamlDoc): YamlDoc {
  return parse(stringify(doc));
}

export { YAML_SCHEMA_REF };
