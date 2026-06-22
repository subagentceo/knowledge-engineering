---
name: enterprise-search:knowledge-synthesis
description: >-
  Cross-vendor synthesis: compare how multiple vendors handle the same concept.
  Use when: "compare Neon vs AlloyDB", "how do CF and AWS differ on X",
  "synthesize vendor approaches to <topic>".
coworker_affinity: [product-management-coworker, engineering-coworker, data-coworker]
plugin: enterprise-search
---

<!--
  @cite vendor/                              (25 vendor doc surfaces)
  @cite cowork/skills/plugins/enterprise-search/search/SKILL.md
  @cite cowork/skills/plugins/enterprise-search/digest/SKILL.md
-->

<synthesis_protocol>
STEP 1 — Identify N vendors relevant to the topic (from 25 vendor surfaces)
STEP 2 — Run enterprise-search:search for each vendor in parallel
STEP 3 — Extract: approach, limits, auth model, pricing signal, integration complexity
STEP 4 — Build comparison matrix (vendor × dimension)
STEP 5 — Write synthesis recommendation with @cite provenance
</synthesis_protocol>

<output_format>
| Dimension       | Vendor A | Vendor B | Vendor C |
|-----------------|----------|----------|----------|
| Auth model      | ...      | ...      | ...      |
| Latency target  | ...      | ...      | ...      |

**Recommendation**: ... @cite vendor/...
</output_format>
