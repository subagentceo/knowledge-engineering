---
name: requests-and-streaming
description: The request-construction and streaming deltas for Claude on Bedrock vs Vertex — converse / converse_stream with inference_config and AWS event shapes vs anthropic[vertex] messages.create / messages.stream with Anthropic event types. Trigger when wiring max_tokens / temperature / stop sequences / system prompts on a cloud platform, or when consuming a streamed response and the event field names differ from the first-party SDK.
---

# Requests and streaming: the per-platform deltas

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

The *meaning* of every parameter (system prompt, temperature, max tokens, stop sequences) is the
same as the first-party API — see `claude-api`. What differs is **where the parameter goes**
(Bedrock bundles temperature/stop into `inferenceConfig`; Vertex uses top-level kwargs) and **what
the streamed events look like** (`contentBlockDelta` vs `content_block_delta`).

## Quick reference

| | Bedrock | Vertex |
|---|---|---|
| Non-stream call | `converse` | `messages.create` |
| Stream call | `converse_stream` → `response["stream"]` | `messages.create(stream=True)` or `messages.stream()` |
| Temperature/stop | inside `inferenceConfig` | top-level kwargs |
| System prompt | list-of-dicts via `system=` | plain string via `system=` |
| Text-bearing event | `contentBlockDelta` | `content_block_delta` (or `stream.text_stream`) |

## Scripts

- [`scripts/bedrock_streaming.py`](scripts/bedrock_streaming.py) — `converse_stream`, iterate `response["stream"]`.
- [`scripts/vertex_streaming.py`](scripts/vertex_streaming.py) — Anthropic SDK raw iterator + `messages.stream()` context manager.

## References

- [Inference parameters: where they live](references/inference-parameters.md) — system prompt, temperature, stop sequences, max_tokens, and prefill wiring per platform.
- [Streaming: the per-platform event-shape deltas](references/streaming.md) — event ordering and which events carry text.

## Source
Course notes: "System Prompts", "Temperature", "Controlling Model Output", "Streaming" (Bedrock);
"System Prompts", "Temperature", "Controlling Model Output", "Response Streaming" (Vertex) —
projects/courses/{bedrock,vertex} files.
