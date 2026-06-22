---
name: e2m-typed-style
description: >
  Type-safe, YAML-normalized I/O style for the e2m-workspaces project. Activates whenever
  the user is working in e2m-workspaces or needs structured, schema-validated communication.
  Triggers on: any prompt about schemas, serde, pydantic, zod, YAML definitions, type safety,
  structured outputs, output_config.format, E2MInput/E2MOutput types, multi-agent typed
  communications, or "typed style". When active, Claude silently normalizes every user prompt
  into a canonical E2MInput envelope, and produces every substantive response as an E2MOutput.
  Use this skill when the user mentions e2m protocol, asks for cross-language type definitions
  (Rust/Python/TypeScript), or wants Claude to always input and output in type-safe structured
  outputs — even if phrased casually.
---

# e2m Typed Style

This skill wires a **type-safe, YAML-normalized pipeline** onto every Claude interaction in the
e2m project. It is the style layer: all prompts in → normalized `E2MInput`; all responses out →
typed `E2MOutput`. The schemas are YAML-first with full cross-language equivalents.

---

## The Core Contract

**Input hook — every prompt:**
Before responding, silently parse the user message into `E2MInput`:
- `intent`: one imperative sentence summarizing what the user wants (≤80 chars)
- `payload`: flat or nested object of extracted entities / parameters
- `meta.schema_version`: default `"1.0.0"`

Never complain about informal input — normalize it silently.

**Output contract:**
Every substantive response is an `E2MOutput` with a `kind` field:

| `kind`   | Use when |
|----------|----------|
| `text`   | Explanation, prose answer |
| `schema` | YAML/JSON Schema definition |
| `code`   | Code snippet (any language) |
| `error`  | Validation failure, problem report |
| `list`   | Enumeration, table, ranked items |

---

## Canonical YAML Schemas

```yaml
# E2MInput — wraps every incoming prompt
E2MInput:
  type: object
  required: [intent, payload]
  additionalProperties: false
  properties:
    intent:
      type: string
      description: "Normalized one-line imperative summary of what the user wants"
    payload:
      type: object
      description: "Structured extraction of entities, parameters, context"
    meta:
      type: object
      additionalProperties: false
      properties:
        session_id:     { type: string, format: uuid }
        timestamp:      { type: string, format: date-time }
        schema_version: { type: string, default: "1.0.0" }

# E2MOutput — wraps every Claude response
E2MOutput:
  type: object
  required: [kind, data]
  additionalProperties: false
  properties:
    kind:
      type: string
      enum: [text, schema, code, error, list]
    data:
      description: "Typed payload matching kind"
    reasoning:
      type: string
      description: "Optional one-sentence rationale"
    refs:
      type: array
      items: { type: string }
      description: "Source URLs or file paths cited"
```

---

## Cross-Language Type Definitions

When generating code, emit all four variants. Full copy-paste implementations:
→ Read `references/type-definitions.md`

Quick summary:
- **YAML** — canonical source (above)
- **Rust** — `serde` + `serde_yaml`; `#[serde(deny_unknown_fields)]` on every struct
- **Python** — Pydantic v2 `BaseModel`; `model_config = ConfigDict(extra="forbid")`
- **TypeScript** — Zod `z.object().strict()`; export inferred types with `z.infer<>`

---

## Anthropic Structured Outputs Integration

Use `output_config.format` (JSON Schema mode) or `client.messages.parse()` (Pydantic/Zod SDK mode)
to enforce `E2MOutput` schema at the API layer. Full API reference:
→ Read `references/structured-outputs.md`

Key rules:
1. Always set `"additionalProperties": false` on every object schema.
2. All required fields must appear in `"required"`.
3. Grammar applies only to Claude's direct output — not tool results or `<thinking>` blocks.
4. First use of a new schema incurs grammar compilation latency (~seconds); subsequent calls use cache.

### JSON Schema for `output_config.format`

```json
{
  "type": "json_schema",
  "schema": {
    "type": "object",
    "required": ["kind", "data"],
    "properties": {
      "kind":      { "type": "string", "enum": ["text","schema","code","error","list"] },
      "data":      {},
      "reasoning": { "type": "string" },
      "refs":      { "type": "array", "items": { "type": "string" } }
    },
    "additionalProperties": false
  }
}
```

---

## Prompt Normalization Rules

```yaml
# Example normalization
input_raw: "hey can you make me the rust types for my input schema"
normalized:
  intent: "Generate Rust serde structs for E2MInput schema"
  payload:
    target_language: rust
    schema: E2MInput
    framework: serde
  meta:
    schema_version: "1.0.0"
```

1. Lowercase, strip filler ("hey", "can you", "please").
2. Extract named entities (languages, schema names, operations) into `payload`.
3. Keep `intent` under 80 characters.
4. Preserve the user's actual intent — don't over-interpret.

---

## Context Management

Long e2m sessions accumulate tokens. See `references/context-management.md` for full details.

Rules of thumb:
- Add `cache_control: {type: "ephemeral"}` at the end of the stable system prompt / CLAUDE.md block.
- For sessions > 100k tokens, enable compaction (`compact_20260112` beta header).
- When compaction + caching: cache breakpoint on system prompt prevents summary invalidating cache.

---

## Reference Files

| File | When to read |
|------|-------------|
| `references/type-definitions.md` | Generating Rust / Python / TypeScript type code |
| `references/structured-outputs.md` | Configuring `output_config.format` or SDK parse |
| `references/context-management.md` | Session length, caching, compaction strategy |
| `references/prompt-engineering.md` | Improving or debugging prompt quality |
