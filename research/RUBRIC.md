# ERD tooling rubric — Claude-agent-driven visualization of Fivetran connector schemas

Scope: evaluate packages/libraries a Claude agent could use to render, CRUD, and version entity-relationship
diagrams (ERDs) sourced from Fivetran-landed schemas (e.g. the Fivetran Claude Platform connector, which as of
2026-07-06 syncs Files API + Skills API tables — see `SUMMARY.md` for the Compliance API caveat).

Each candidate in `<lang>/research.jsonl` is scored 0–5 on the dimensions below. Scores are estimates based on
public docs/repos as of 2026-07-06, not hands-on benchmarking.

| Dimension | 0 | 3 | 5 |
|---|---|---|---|
| `crud_score` | GUI-only, no programmatic create/update/delete of entities or relationships | Programmatic create+read, update/delete require workarounds | Full CRUD via plain text, JSON, or API — an agent can add/rename/remove entities and edges without touching a UI |
| `versioning_score` | No diffable representation; state lives only in a binary/proprietary format | Diffable but noisy (large XML/JSON blobs, unstable ordering) | Git-diff-clean text format; changes over time show as small, readable diffs; supports timestamped snapshots |
| `aesthetic_score` | Cluttered default layout, no styling control, hard to read past ~10 entities | Adequate default layout, some styling hooks | Polished default output, CSS/theme-able, holds up at 50+ entities, reads well to a non-engineer |
| `agent_operability` | Requires a browser/human-in-the-loop GUI to render or edit | CLI/build-step usable but needs local toolchain setup | Single CLI call or library import; runs headlessly in CI with no display server |
| `maintenance_signal` | No commits/releases in 12+ months | Sporadic maintenance | Active releases within the last ~90 days as of 2026-07-06 |
| `licensing` | Commercial-only, per-seat | Open-core (free tier + paid Pro) | Fully OSS (MIT/Apache/BSD) |

## Overall verdict

See `SUMMARY.md` for the top-5 cross-language shortlist and the per-language breakdown in each
`research/<language>/research.jsonl` file.
