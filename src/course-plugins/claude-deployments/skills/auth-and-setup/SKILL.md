---
name: auth-and-setup
description: Setting up auth, region/project routing, and model identifiers for Claude on Bedrock vs Vertex — AWS region + cross-region inference profiles vs Google Cloud project_id + region with the anthropic[vertex] install. Trigger when configuring credentials, picking a region, resolving "model not available in this region" / "invalid model identifier" errors, or choosing which model-id form to use on each platform.
---

# Auth, region routing, and model identifiers

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

The single biggest source of cryptic deployment errors is the **model identifier + region**
pairing. Bedrock can fail to resolve a model when a raw model ID is used in a region that does not
host it — the fix is a **cross-region inference profile ID**. Vertex has no profile concept: a
**model version string** plus `region` + `project_id` on the client handle placement.

## Quick reference

| | Bedrock | Vertex |
|---|---|---|
| Install | `boto3` | `pip install "anthropic[vertex]"` |
| Routing inputs | `region_name` on client + inference-profile ID | `region` + `project_id` on client |
| Model id form | inference-profile ID | model version string |
| "Model not in region" fix | switch to cross-region inference profile | (region is on the client; pick a supported one) |
| Credentials | AWS credential chain | Google application-default credentials |

## References

- [Bedrock: auth, region, and the inference-profile trap](references/bedrock-routing.md)
- [Vertex: auth, region, project, and model identifiers](references/vertex-routing.md)

## Source
Course notes: "Accessing the API", "Making a Request", "Automated Debugging" (Bedrock);
"Accessing the API", "Making a Request" (Vertex) — projects/courses/{bedrock,vertex} files.
