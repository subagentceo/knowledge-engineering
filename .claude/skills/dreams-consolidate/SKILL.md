---
name: dreams-consolidate
description: Curate the citation memory-store with the dreams pattern — aggregate dw.fact_memory_access reads and rewrite hot dim_memory rows (SCD II, curation_source=dreams) via npm run dreams:consolidate. Use when the user asks to "dream", "consolidate memories", "curate citations", or wants the recurring nightly schedule emitted. Requires postgres running and the B2 memory tables loaded.
---

# dreams-consolidate

reflect on accumulated memory accesses; rewrite hot citation memories so future agents read curated content. deterministic distillation (access stats), not an LLM pass — see refs for the managed-dreams analogue.

```yaml
refs:
  drm: vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
  mem: data/models/alloydb/dim_memory.yaml
  fct: data/models/alloydb/fact_memory_access.yaml
```

## run once

```bash
service postgresql start
npm run dreams:consolidate            # threshold: 3 accesses
npm run dreams:consolidate -- --min-accesses 5
```

## recurring (via /schedule bridge)

emit: `/schedule "every day 03:00" npm run dreams:consolidate`

## invariants

<scd2_curation>
Dreams never UPDATE memory content in place — close the current row, insert a new one with curation_source=dreams. `git`-style history inside the table.
</scd2_curation>

<csl_block_preserved>
The ```csl-json``` block survives curation verbatim; memoryToCslJson must round-trip before and after a dream.
</csl_block_preserved>
