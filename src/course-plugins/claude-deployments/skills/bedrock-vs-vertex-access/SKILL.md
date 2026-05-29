---
name: bedrock-vs-vertex-access
description: Accessing Claude through Amazon Bedrock vs Google Cloud Vertex AI and making a first request on each — the SDK, client, model identifier, message shape, and response-extraction differences side by side. Trigger when choosing or wiring up a cloud-hosted Claude deployment, when code imports boto3 bedrock-runtime or anthropic[vertex] / AnthropicVertex, or when a first-party Anthropic API snippet has to be ported to Bedrock or Vertex.
---

# Bedrock vs Vertex: accessing the API and making a request

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

Both platforms host the **same Claude models**; what changes is the gateway — the SDK, client,
model-id form, and request/response shape. **A Bedrock client is NOT the Anthropic API** (AWS SDK,
`converse`, buried response). Vertex runs the *actual* Anthropic SDK (`messages.create`), so once
the client exists the rest matches `claude-api` almost line-for-line.

## Quick reference

| Concern | Bedrock | Vertex |
|---|---|---|
| Install | `boto3` (AWS SDK) | `pip install "anthropic[vertex]"` |
| Client | `boto3.client("bedrock-runtime", region_name=...)` | `AnthropicVertex(region=..., project_id=...)` |
| Call | `client.converse(modelId=, messages=)` | `client.messages.create(model=, max_tokens=, messages=)` |
| Model identifier | inference-profile ID | model version string |
| Input content | list of `{"text": ...}` dicts | plain string (or Anthropic blocks) |
| Read text | `response["output"]["message"]["content"][0]["text"]` | `message.content[0].text` |

## Scripts

- [`scripts/bedrock_converse.py`](scripts/bedrock_converse.py) — first request via AWS SDK `converse`.
- [`scripts/vertex_messages.py`](scripts/vertex_messages.py) — first request via the Anthropic SDK `messages.create`.

## References

- [The access model and request/response shape](references/access-model.md) — the server-side flow, why the shapes differ, and what is identical across both (see `claude-api`).

## Source
Course notes: "Accessing the API", "Making a Request" — both the
projects/courses/bedrock and projects/courses/vertex files.
