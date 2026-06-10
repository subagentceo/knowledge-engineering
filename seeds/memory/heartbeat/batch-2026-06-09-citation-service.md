---
updated: 2026-06-09T23:00Z
status: queued
---

```yaml
refs:
  res: https://www.anthropic.com/research
  cit: https://platform.claude.com/docs/en/build-with-claude/citations.md
  mem: https://platform.claude.com/docs/en/managed-agents/memory.md
  drm: https://platform.claude.com/docs/en/managed-agents/dreams.md
  csl: https://github.com/citation-style-language/schema
```

# knowledge-engineering-citation-service — next /batch of 10, self-steering queue

product vision: harden this repo into a data-engineer-grade citation service.
vendor/ stays the durable, cache-enabled doc mirror; the product vends
citations (refs: cit, csl) to research teams (refs: res), whose agents get a
citation-based memory store curated over time with dreams (refs: mem, drm).
extends the merged primitives: semantic-cache (PR #429/#430), alloydb kimball
semantics contract + citation warehouse (PR #431).

## queue (priority order — pick top unblocked task each tick)

```yaml
batch:
  - id: B1   # DONE — this PR
    task: citations_* MCP lane on src/mcp/bridge-server.ts vending csl_items +
      dw.rpt_ tables (search, get-by-id, by-year, by-team)
    extends: src/lib/csl.ts, scripts/load-citation-warehouse.ts
    gate: null
  - id: B2   # DONE — this PR
    task: citation memory-store schema — memory.md-shaped citation memories
      (refs: mem) backed by alloydb tables with table-semantics contracts
      (dim_memory SCD II, fact_memory_access)
    extends: src/lib/table-semantics.ts, data/models/alloydb/
    gate: null
  - id: B3   # DONE — this PR
    task: dreams consolidation job (refs: drm) — periodic distillation of
      fact_memory_access + semantic_cache hits into curated citation memories;
      wired via /schedule routine
    extends: .claude/skills/{schedule-bridge,heartbeat}
    gate: B2
  - id: B4
    task: warehouse expansion to full corpus — dim_vendor (SCD I) + facts per
      crawl for all 34 vendors, contracts semver-bumped MINOR
    extends: src/lib/vendor-corpus.ts, data/models/alloydb/
    gate: null
  - id: B5
    task: events_cache_promotion — kimball event_ (append-only) table logging
      DurableStore.persistVolatile promotions, with semantics contract
    extends: src/cache/durable-store.ts
    gate: null
  - id: B6
    task: frontend — rpt_-backed visualizations (citations by year × vendor ×
      team) + citation-service status panel beside the warehouse panel
    extends: frontend/src/{warehouse,citations}.ts
    gate: B4
  - id: B7
    task: contract hardening — populate reserved keys (codeowners, sla_policy,
      data_start_date, load_type) on all alloydb yaml; add npm run verify:dw
      to the verify chain
    extends: schemas/table-semantics.schema.json
    gate: null
  - id: B8
    task: guided cowork setup — role-matched plugin install skill
      (data-engineer | researcher | frontend), connect-your-tools checklist,
      "try a skill" onboarding; coworkers contribute via existing PR loop
    extends: .claude/skills/, src/course-plugins/, docs/prompts/coworker-dev-chain.md
    gate: null
  - id: B9
    task: 24/7 incremental loop — post-crawl routine chaining
      crawl:vendors → ingest:citations → cache:warm → dw:load → rpt refresh;
      heartbeat tick reads THIS file and picks the top unblocked task
    extends: .claude/skills/{heartbeat,refresh-vendors,routines}
    gate: B3, B4
  - id: B10
    task: citations vending format — map csl_items to Claude citations blocks
      (refs: cit) for research-team agents; example under src/examples/ + test
    extends: src/examples/citations.ts
    gate: B1
```

## directives

<self_steering>
After every merge, re-read this file, mark the completed id done with the PR
number, and start the highest-priority unblocked task without waiting for an
operator prompt.
</self_steering>

<contract_first>
Every new alloydb table ships its semver'd table-semantics yaml in the same
PR as its DDL. No contract, no table.
</contract_first>

<one_pr_per_task>
One batch id per PR, labels automerge + skip-cost-gate at creation, rebase
auto-merge. Commit subjects reference the batch id as the outcome: (B<N>).
</one_pr_per_task>

## tl;dr

ten queued tasks turning the repo into knowledge-engineering-citation-service:
mcp citation lane, memory-store + dreams curation, full-corpus warehouse,
promotion events, frontend visualization, contract hardening, guided cowork
onboarding, and the 24/7 crawl→warehouse loop. gates are explicit; tick agents
pick the top unblocked id and self-update this file after each merge.
