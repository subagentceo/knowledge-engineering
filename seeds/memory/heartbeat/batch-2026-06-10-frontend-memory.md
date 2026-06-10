---
updated: 2026-06-10T05:00Z
status: queued
---

```yaml
refs:
  ccw: https://code.claude.com/docs/en/claude-code-on-the-web.md
  cit: https://platform.claude.com/docs/en/build-with-claude/citations.md
  mem: https://platform.claude.com/docs/en/managed-agents/memory.md
  csl: https://github.com/citation-style-language/schema
  ppc: docs/research/2026-06-10-pay-per-crawl.md   # deep-research report (this PR)
```

# frontend + memory batch — next 10 PRs, self-steering queue (B11–B20)

operator directive (2026-06-10): the next 10 agent pull requests improve the
frontend for human citations and agent memory structure, and optimize usage
and development of the cache and postgres/alloydb tables with semantics.
secondary: grow pay-per-crawl traffic to subagentknowledge.com (refs: ppc).
extends batch-2026-06-09 (B1–B10, complete).

## queue (priority order — pick top unblocked task each tick)

```yaml
batch:
  - id: B11  # DONE — this PR
    task: human citation UX — per-citation detail view with copy-as
      CSL-JSON | BibTeX | APA, stable deep links (#cite/<csl-id>), and the
      year strip linking into the filtered table
    extends: frontend/src/citations.ts
    gate: null
  - id: B12  # DONE — this PR
    task: memory browser panel — dim_memory rows (path, curation_source,
      SCD II history) rendered from a loader-emitted memories.json feed
    extends: frontend/src/warehouse.ts, scripts/load-citation-warehouse.ts
    gate: null
  - id: B13
    task: close the dreams loop — citations_* MCP lane records reads into
      dw.fact_memory_access (per its 5m sla_policy); KE_AGENT_ID attribution
    extends: src/mcp/lanes/citations.ts, src/lib/citation-memory.ts
    gate: null
  - id: B14
    task: rpt_citations_by_team + rpt_vendor_freshness contracts + DDL +
      loader stages; feeds emitted as static JSON for the frontend
    extends: data/models/alloydb/, scripts/load-citation-warehouse.ts
    gate: null
  - id: B15
    task: cache-optimized search — citations_search backed by the
      lru-bm25 volatile tier (BM25 ranking replaces all-terms includes);
      hit/miss counters surfaced via telemetry lane
    extends: src/cache/lru-bm25.ts, src/mcp/lanes/citations.ts
    gate: null
  - id: B16
    task: postgres 18 semantics pass — verify DDL against postgres 18
      (generated columns, identity, make_interval), add allowed_operations
      key per contract (which agent data ops are permitted: read | append |
      scd2_rewrite | full_refresh), enforce in verify:dw
    extends: src/lib/table-semantics.ts, schemas/, data/models/alloydb/
    gate: null
  - id: B17
    task: crawler surface — llms.txt + sitemap.xml + stable per-citation
      URLs served by the worker so paying crawlers can discover the corpus
      (refs: ppc growth strategies)
    extends: frontend/src/worker.ts, frontend/scripts/
    gate: null
  - id: B18
    task: pay-per-crawl enrollment — operator runbook + worker 402 posture
      per the report's enrollment checklist (refs: ppc); decide pricing
      tiers for citation feeds vs vendor mirror pages
    extends: docs/operator-runbooks/, frontend/src/worker.ts
    gate: B17
  - id: B19
    task: memory MCP surface — memory_read / memory_write tools backed by
      dw.dim_memory (memory.md path+content shape), reads logged to
      fact_memory_access
    extends: src/mcp/lanes/citations.ts, src/mcp/repo-mail.ts (pattern)
    gate: B13
  - id: B20
    task: frontend delivery perf — cache-control + early hints per the
      report's cloudflare 2026 recommendations; measure with the existing
      build sizes as baseline (refs: ppc)
    extends: frontend/src/worker.ts, frontend/wrangler.jsonc
    gate: B17
```

## directives

<self_steering>
After every merge, re-read this file, mark the completed id done, and start
the highest-priority unblocked task without waiting for an operator prompt.
</self_steering>

<contract_first>
Every new alloydb table ships its semver'd table-semantics yaml in the same
PR as its DDL. No contract, no table. allowed_operations (B16) extends this:
no semantics, no agent write.
</contract_first>

<one_pr_per_task>
One batch id per PR, labels automerge + skip-cost-gate at creation, rebase
auto-merge. Commit subjects reference the batch id as the outcome: (B<N>).
</one_pr_per_task>

<human_first_frontend>
Frontend ids (B11, B12, B17, B20) optimize for a researcher copying a usable
citation in one tap on mobile — the screenshot test: filter input readable,
strips not overlapping, copy buttons reachable.
</human_first_frontend>

## tl;dr

ten queued prs: citation detail ux, memory browser, access-fact wiring, two
new rpt tables, bm25 cache search, postgres-18 + allowed_operations
semantics, crawler surface, pay-per-crawl enrollment, memory mcp tools,
delivery perf. ppc report feeds B17/B18/B20. same loop discipline as B1–B10.
