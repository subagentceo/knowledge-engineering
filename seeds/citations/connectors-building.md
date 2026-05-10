---
slug: connectors-building
source: https://claude.com/docs/connectors/building.md
local: vendor/anthropics/claude.com/docs/connectors/building.md
drives: bridge-as-connector (long-arc, Phase 12)
---

# connectors-building — extract

## Header tree

- # Building custom connectors
  - ## Getting started
    - ### Key resources
  - ## Transport & authentication
    - ### Supported transports
    - ### Authentication features
  - ## Protocol features
    - ### Supported
    - ### Not yet supported
  - ## Technical specifications
  - ## Testing your server
  - ## Related topics

## Plan-relevant pull quotes

> Build your own MCP servers to connect Claude to your tools and data.

> **Authentication is the most common stumbling block.** Before you
> build, read the [authentication reference] — Claude's auth support
> differs from the generic MCP spec in a few important ways.

> **Hosting Solutions:** Platforms like Cloudflare offer remote MCP
> server hosting with autoscaling and OAuth management.

## Why this drives Phase 12 (long-arc)

Phase 12 (deferred until a future PR — rubric scaffold only) repackages
the bridge MCP server as a Connector for use in claude.ai and Claude
Code clients without local install. The cited doc's mention of
**Cloudflare for remote MCP server hosting with OAuth management**
aligns with our Phase 0g/8 Cloudflare Sandbox stance and our
OAuth-only posture — the long-arc end state is a Connector hosted on
the same Cloudflare infrastructure that runs the cloud-agent runner.
