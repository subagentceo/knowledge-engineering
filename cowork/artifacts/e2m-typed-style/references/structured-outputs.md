# Structured Outputs — Anthropic API Reference

Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs  
Saved: 2026-06-08

---

## Overview

Structured outputs constrain Claude's responses to follow a specific schema, ensuring valid, parseable output for downstream processing. Two complementary features:

- **JSON outputs** (`output_config.format`): Get Claude's response in a specific JSON format.
- **Strict tool use** (`strict: true`): Guarantee schema validation on tool names and inputs.

Available on: Claude Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6, Sonnet 4.5, Opus 4.5, Haiku 4.5 (and Claude Mythos Preview).

---

## Quick Start

```python
from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Extract key info from: John Smith (john@example.com) wants Enterprise demo Tuesday 2pm."
    }],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "name":          {"type": "string"},
                    "email":         {"type": "string"},
                    "plan_interest": {"type": "string"},
                    "demo_requested":{"type": "boolean"},
                },
                "required": ["name", "email", "plan_interest", "demo_requested"],
                "additionalProperties": False,
            },
        }
    },
)
print(response.content[0].text)  # → valid JSON
```

---

## SDK Helper: `client.messages.parse()`

Python SDK accepts `output_format` as a Pydantic model and translates to `output_config.format` internally:

```python
from pydantic import BaseModel
from anthropic import Anthropic

class ContactInfo(BaseModel):
    name: str
    email: str
    plan_interest: str
    demo_requested: bool

client = Anthropic()
response = client.messages.parse(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "..."}],
    output_format=ContactInfo,
)
result: ContactInfo = response.parsed_output
```

Other SDKs (TypeScript, Go, etc.) require `output_config` directly.

---

## Strict Tool Use

Add `"strict": true` to any tool definition to guarantee schema validation on tool inputs:

```python
tools=[{
    "name": "search_flights",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "destination": {"type": "string"},
            "date":        {"type": "string", "format": "date"},
        },
        "required": ["destination", "date"],
        "additionalProperties": False,
    },
}]
```

---

## Using Both Together

```python
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Plan a trip to Paris, May 15 2026"}],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "summary":    {"type": "string"},
                    "next_steps": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["summary", "next_steps"],
                "additionalProperties": False,
            },
        }
    },
    tools=[{
        "name": "search_flights",
        "strict": True,
        "input_schema": {
            "type": "object",
            "properties": {
                "destination": {"type": "string"},
                "date":        {"type": "string", "format": "date"},
            },
            "required": ["destination", "date"],
            "additionalProperties": False,
        },
    }],
)
```

---

## JSON Schema Limitations

- No `$ref`, `$defs`, `oneOf`, `anyOf` at top level (SDKs can strip these automatically).
- `additionalProperties: false` required on all objects for strict validation.
- All required fields must appear in `"required"` array.
- Grammar applies only to Claude's direct output — not tool results or `<thinking>` blocks.

### Schema Complexity Limits

| Limit | Value |
|-------|-------|
| Max strict parameters (combined across all tools) | 24 |
| Max optional parameters per strict tool | 6 |

---

## Important Considerations

**Grammar compilation and caching:** First use of a new schema compiles a grammar (adds latency ~seconds). Subsequent requests with the same schema reuse the cached grammar. Keep schemas stable across requests.

**Prompt modification:** Structured outputs prepend hidden instructions to enforce the schema. This adds ~100–300 tokens to your prompt cost.

**Property ordering:** Claude may not output properties in the order defined in your schema. Always parse by key, not position.

**Invalid outputs:** Rare but possible if `stop_reason: "max_tokens"` is hit mid-output. Always validate parsed output against the schema.

**Data retention:** Qualifies for Zero Data Retention (ZDR) with limited technical retention (grammar cache, not content).

---

## Feature Compatibility

| Feature | Compatible |
|---------|-----------|
| Extended thinking | ✓ (grammar scoped to final output only) |
| Streaming | ✓ |
| Prompt caching | ✓ |
| Tool use | ✓ (strict: true is independent) |
| Batch processing | ✓ |
| Amazon Bedrock | ✓ (Claude Opus 4.6+) |
| Vertex AI | ✓ (Claude Opus 4.8+) |
| Microsoft Foundry | Beta |
