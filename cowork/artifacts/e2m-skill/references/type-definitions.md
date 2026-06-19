# e2m Type Definitions — Cross-Language Reference

Source of truth: YAML schemas in SKILL.md. This file provides copy-paste-ready implementations in Rust (serde), Python (Pydantic v2), and TypeScript (Zod).

---

## YAML (Canonical)

```yaml
E2MInput:
  type: object
  required: [intent, payload]
  properties:
    intent:       { type: string }
    payload:      { type: object }
    meta:
      type: object
      properties:
        session_id:       { type: string, format: uuid }
        timestamp:        { type: string, format: date-time }
        schema_version:   { type: string, default: "1.0.0" }
      additionalProperties: false
  additionalProperties: false

E2MOutput:
  type: object
  required: [kind, data]
  properties:
    kind:       { type: string, enum: [text, schema, code, error, list] }
    data:       {}
    reasoning:  { type: string }
    refs:       { type: array, items: { type: string } }
  additionalProperties: false
```

---

## Rust (serde + serde_yaml)

```rust
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct E2MMeta {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub session_id: Option<String>,       // UUID v7 preferred
    #[serde(skip_serializing_if = "Option::is_none")]
    pub timestamp: Option<String>,        // RFC 3339
    #[serde(default = "default_schema_version")]
    pub schema_version: String,
}

fn default_schema_version() -> String {
    "1.0.0".to_string()
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct E2MInput {
    pub intent: String,
    pub payload: HashMap<String, serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub meta: Option<E2MMeta>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum E2MKind {
    Text,
    Schema,
    Code,
    Error,
    List,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct E2MOutput {
    pub kind: E2MKind,
    pub data: serde_json::Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reasoning: Option<String>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub refs: Vec<String>,
}
```

**Cargo.toml dependencies:**
```toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
serde_yaml = "0.9"
```

---

## Python (Pydantic v2)

```python
from __future__ import annotations
from enum import Enum
from typing import Any, Optional
from pydantic import BaseModel, ConfigDict, Field
import uuid


class E2MMeta(BaseModel):
    model_config = ConfigDict(extra="forbid")

    session_id: Optional[str] = Field(default=None, description="UUID v7 preferred")
    timestamp: Optional[str] = Field(default=None, description="RFC 3339 datetime")
    schema_version: str = Field(default="1.0.0")


class E2MInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    intent: str = Field(description="Normalized one-line intent")
    payload: dict[str, Any] = Field(description="Structured key-value extraction")
    meta: Optional[E2MMeta] = None


class E2MKind(str, Enum):
    text = "text"
    schema = "schema"
    code = "code"
    error = "error"
    list = "list"


class E2MOutput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    kind: E2MKind
    data: Any
    reasoning: Optional[str] = None
    refs: list[str] = Field(default_factory=list)


# --- Anthropic SDK usage (parse helper) ---
# from anthropic import Anthropic
# client = Anthropic()
# response = client.messages.parse(
#     model="claude-sonnet-4-6",
#     max_tokens=1024,
#     messages=[{"role": "user", "content": prompt}],
#     output_format=E2MOutput,
# )
# result: E2MOutput = response.parsed_output
```

---

## TypeScript (Zod)

```typescript
import { z } from "zod";

export const E2MMetaSchema = z.object({
  session_id: z.string().uuid().optional(),
  timestamp: z.string().datetime().optional(),
  schema_version: z.string().default("1.0.0"),
}).strict();

export const E2MInputSchema = z.object({
  intent: z.string().describe("Normalized one-line intent"),
  payload: z.record(z.unknown()).describe("Structured extraction"),
  meta: E2MMetaSchema.optional(),
}).strict();

export const E2MKindSchema = z.enum(["text", "schema", "code", "error", "list"]);

export const E2MOutputSchema = z.object({
  kind: E2MKindSchema,
  data: z.unknown(),
  reasoning: z.string().optional(),
  refs: z.array(z.string()).default([]),
}).strict();

export type E2MMeta   = z.infer<typeof E2MMetaSchema>;
export type E2MInput  = z.infer<typeof E2MInputSchema>;
export type E2MKind   = z.infer<typeof E2MKindSchema>;
export type E2MOutput = z.infer<typeof E2MOutputSchema>;

// --- Anthropic SDK usage ---
// import Anthropic from "@anthropic-ai/sdk";
// const client = new Anthropic();
// const response = await client.messages.create({
//   model: "claude-sonnet-4-6",
//   max_tokens: 1024,
//   messages: [{ role: "user", content: prompt }],
//   output_config: {
//     format: {
//       type: "json_schema",
//       schema: zodToJsonSchema(E2MOutputSchema),  // zod-to-json-schema pkg
//     },
//   },
// });
// const result = E2MOutputSchema.parse(JSON.parse(response.content[0].text));
```

---

## JSON Schema (for `output_config.format`)

Use this directly in raw API calls:

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
