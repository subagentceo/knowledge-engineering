---
name: style-citations
description: >
  Spine skill that defines the canonical Citation type (CSL-JSON v1.0.2 subset
  + Anthropic Citations API bridge + W3C PROV-O) shared by all other style
  skills. Use this skill whenever you need to produce, validate, or transform
  citation metadata; whenever another style skill (style-markdown, style-yaml,
  style-html, style-graphql) needs to emit a citations: array; or whenever
  the user says "cite this", "add citations", "reference this source",
  "extract citations", or "provenance footer". Also fires when the user pastes
  a CSL-JSON blob or an Anthropic cite block and asks what to do with it.
  Do NOT use for formatting the surrounding document — use the format-specific
  style skill for that.
license: Proprietary
compatibility: "claude.ai web/mobile chat, Claude Code. Text in, Citation[] JSON out."
metadata:
  author: max
  version: "0.1.0"
  schema_file: src/style-skills/citation.schema.ts
  schemaRef: "urn:mailbox:schema:style:citations:v1"
  spec_sources:
    - https://github.com/citation-style-language/schema
    - https://docs.anthropic.com/en/docs/build-with-claude/citations
    - https://www.w3.org/TR/prov-o/
---

# Style — Citations (spine)

Defines the `Citation` Zod type used by every other style skill.
**This skill does not produce documents — it produces `Citation[]`.**

## What Citation contains

```
id        string       unique within document (use slug or DOI-derived)
type      CSLType      one of 46 CSL v1.0.2 types (article-journal, webpage, etc.)
title     string       required
author    CSLName[]    family + given OR literal
issued    CSLDate      date-parts [[year, month?, day?]] OR literal
URL       string       canonical URL if available
DOI       string       DOI without https://doi.org/ prefix
anthropic {}           document_index, start/end_char_index, cited_text
prov      {}           wasDerivedFrom[], generatedAtTime, wasAttributedTo
```

## Provenance footer

Every skill that produces output MUST append a provenance footer.
The `ProvenanceFooter` type is also exported from this skill:

```
source      semantic-layer | governed-table | raw-exploration | skill-reference | external-url
agentId     string   (from MailboxEnvelope.from.agentId)
schemaRef   string   URN of the payload schema
freshness   ISO-8601 datetime
reviewer    string   reviewer agent id
citations   Citation[]
```

## Citation ID convention

- Journal article: `<firstAuthorFamily><year><firstWordTitle>` e.g. `huntley2025ralph`
- Webpage/doc: slug of URL path e.g. `anthropic-citations-api`
- Dataset: `<source>-<year>-<slug>` e.g. `census-2024-labor`

## Anthropic Citations API mapping

When Claude returns a `cite_*` content block, map it:
- `document_index` → `anthropic.document_index`
- `start_char_index` / `end_char_index` → `anthropic.*`
- `cited_text` → `anthropic.cited_text`
- Derive a `type` (usually `webpage` or `article-journal`) from context.

## PROV-O mapping

- `wasDerivedFrom` → IRI(s) of source documents or URLs
- `generatedAtTime` → ISO-8601 timestamp of the citation extraction
- `wasAttributedTo` → agent IRI e.g. `mcp://agent/alignment-01`
