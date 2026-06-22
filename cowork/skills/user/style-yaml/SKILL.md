---
name: style-yaml
description: >
  Parse, produce, and validate YAML 1.2 documents with type-safe citation
  support. Use this skill whenever the user asks to write or validate YAML;
  whenever a mailbox-mcp envelope payload should be YAML; whenever the user
  says "output as YAML", "write a YAML config", "subprocessors.yaml",
  "structured data as YAML", or pastes a YAML blob to validate. Also fires
  when the user shows a TypeScript/Zod schema and wants a YAML exemplar.
  Uses eemeli/yaml (YAML 1.2 compliant). Citations emitted as top-level
  `citations:` array — matches the Anthropic subprocessors.yaml exemplar.
  Do NOT use for JSON output — use the raw envelope for that.
license: Proprietary
compatibility: "claude.ai web/mobile chat, Claude Code. Text in, YamlDoc JSON + wire YAML out."
metadata:
  author: max
  version: "0.1.0"
  schema_file: src/style-skills/yaml.schema.ts
  projections_file: src/style-skills/yaml.projections.ts
  schemaRef: "urn:mailbox:schema:style:yaml:v1"
  spec_sources:
    - https://yaml.org/spec/1.2.2/
    - https://github.com/eemeli/yaml
---

# Style — YAML 1.2

Produces and validates YAML 1.2 documents with citation discipline.

## Projection contract

```
parse(wire: string): YamlDoc
stringify(doc: YamlDoc): string
extractCitations(doc: YamlDoc): Citation[]
injectCitations(doc: YamlDoc, cs: Citation[]): YamlDoc
toMarkdown(doc: YamlDoc): string   // fenced ```yaml block
roundtrip(doc: YamlDoc): YamlDoc
```

## Citation format

Citations emitted as a top-level `citations:` array, following the operator's
`subprocessors.yaml` pattern:

```yaml
citations:
  - id: commonmark-spec
    type: standard
    title: CommonMark Spec 0.31.2
    URL: https://spec.commonmark.org/0.31.2/
    issued:
      date-parts: [[2024, 1, 28]]
```

## Provenance footer

Emitted as a top-level `_provenance:` key:

```yaml
_provenance:
  source: skill-reference
  agentId: alignment-01
  schemaRef: urn:mailbox:schema:style:yaml:v1
  freshness: "2026-06-04T00:00:00Z"
  reviewer: reviewer-01
  reviewerPassed: true
```

## Validation posture

The `parsed` field carries the raw JS value. Callers MUST validate it
against their own domain Zod schema after `YamlDocSchema.parse()`:

```typescript
const doc = YamlDocSchema.parse(yamlParse(wire));
const validated = MyDomainSchema.parse(doc.parsed);
```

## Subprocessors exemplar

The Anthropic `subprocessors.yaml` + `schema.ts` pair is the canonical
reference for this skill's output posture: flat YAML + matching Zod schema
+ optional `citations:` array.
