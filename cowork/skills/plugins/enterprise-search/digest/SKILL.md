---
name: enterprise-search:digest
description: >-
  Summarize a vendor doc surface or topic into a concise digest with citations.
  Use when: "digest <vendor>", "summarize vendor docs on X", "TL;DR vendor/<path>".
coworker_affinity: [pm-coworker, data-coworker]
plugin: enterprise-search
---

<!--
  @cite vendor/                              (25 vendor doc surfaces)
  @cite cowork/skills/plugins/enterprise-search/search/SKILL.md
-->

<digest_protocol>
STEP 1 — Run enterprise-search:search to gather top-10 excerpts on the topic
STEP 2 — Group by subtopic: auth, pricing, limits, integration patterns, error handling
STEP 3 — Write 3–5 sentence digest per group, cite each sentence
STEP 4 — Append eval tail: { coverage_score: N/10, gaps: ["..."] }
</digest_protocol>

<output_format>
## <vendor> — <topic> digest
<cite>vendor/...</cite>

**Auth**: ... @cite vendor/.../auth.md
**Limits**: ... @cite vendor/.../limits.md
**Integration**: ... @cite vendor/.../quickstart.md

eval:
  coverage_score: 8/10
  gaps: ["pricing tier details not in vendor/"]
</output_format>
