---
name: enterprise-search:search-strategy
description: >-
  Plan a multi-step research strategy before executing expensive vendor doc fetches.
  Use when: "how should I research X", "plan a search for Y", "build a research plan".
coworker_affinity: [product-management-coworker, engineering-coworker]
plugin: enterprise-search
---

<!--
  @cite seeds/posture/session-start.xml      (citation tool order of preference)
  @cite cowork/coworkers/manifest.json       (25 vendor surfaces)
-->

<strategy_protocol>
STEP 1 — Classify the topic: architecture | API | pricing | integration | security | limits
STEP 2 — Identify which of 25 vendor surfaces are relevant (list them)
STEP 3 — Order by: vendor/ local (zero-latency) → context7 → CF MCP → web_fetch
STEP 4 — Estimate: N parallel reads, expected coverage %, gaps to fill
STEP 5 — Output a YAML research plan; do NOT execute it — caller decides to proceed
</strategy_protocol>

<output_format>
```yaml
topic: "<query>"
classification: architecture | API | pricing | integration | security | limits
vendors_to_search: [neon, cloudflare, stripe, ...]
steps:
  - tool: Glob + Grep
    targets: ["vendor/neon/**/*.md", "vendor/cloudflare/**/*.md"]
    parallel: true
  - tool: mcp__plugin_context7__query-docs
    only_if: vendor/ miss
estimated_coverage: 80%
gaps: ["ElevenLabs pricing not mirrored"]
```
</output_format>
