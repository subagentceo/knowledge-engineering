---
name: structured-output
description: Extracting clean structured data (JSON/code/regex) from Claude on Bedrock vs Vertex — prefill + stop-sequence delimiters vs the tool-schema-as-extractor method, and how the tool_choice / prefill wiring differs per platform. Trigger when forcing raw JSON or code output, eliminating Claude's explanatory prose, or choosing between prompt-based and tool-based extraction on a cloud deployment.
---

# Structured output across platforms

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

Both courses teach the **same two extraction techniques** — prefill + stop-sequence (prompt-based)
and tool-schema-as-extractor (tool-based) — with the same trade-offs. The only platform delta is
the parameter wiring (prefill content shape, where the stop sequence goes, how `tool_choice` names
the tool). For the conceptual depth, see `claude-api`.

## Quick reference

| | Bedrock | Vertex |
|---|---|---|
| Prefill | append `{"role":"assistant","content":[{"text":"```json"}]}` | append `{"role":"assistant","content":"```json"}` |
| Stop sequence | `inferenceConfig={"stopSequences":["```"]}` | `stop_sequences=["```"]` |
| Force tool | named-tool form | `tool_choice={"type":"tool","name":"toJSON"}` |
| Read tool args | `toolUse` part's `input` | `response.content[0].input` |

**Choosing:** prompt-based (prefill+stop) is lighter setup, great for code/JSON/regex and ad-hoc
extraction; tool-based is more reliable for important data but costs a schema definition.

## Scripts

- [`scripts/bedrock_structured.py`](scripts/bedrock_structured.py) — both techniques, Bedrock wiring.
- [`scripts/vertex_structured.py`](scripts/vertex_structured.py) — both techniques, Vertex wiring.

## References

- [The two extraction techniques and how to choose](references/extraction-techniques.md) — full prefill+stop walkthrough, tool-schema method, flexible variant, and the eval-pipeline use.

## Source
Course notes: "Structured Data", "Structured Data with Tools", "Flexible Tool Extraction",
"Generating Test Datasets", "Code Based Grading" (Bedrock); "Structured Data", "Tools for
Structured Data", "Generating Test Datasets", "Code Based Grading" (Vertex) —
projects/courses/{bedrock,vertex} files.
