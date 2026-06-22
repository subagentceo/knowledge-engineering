# Runbook — support-claude-sitemap: crawl → warehouse → frontend

> Decomposition of the end-to-end pipeline that lands `support.claude.com` `/en/` help
> articles as coworker-optimized `.md`, organized per collection, into the vendor mirror →
> AlloyDB citation warehouse → subagentknowledge.com frontend.
>
> Status: research preview. The crawl runs in an egress-permitted environment (see Constraint);
> everything else is deterministic and offline.
>
> @cite vendor/support-claude-sitemap/crawl.json
> @cite .claude/skills/refresh-vendors/SKILL.md
> @cite scripts/load-citation-warehouse.ts
> @cite frontend/scripts/build-vendor-manifest.ts

## Constraint — where the crawl runs

The live fetch is **not** run from a restricted chat/cowork session. `refresh-vendors` is explicit:
"Do NOT invoke from within a session when egress is blocked — use `npm run service:refresh:local` instead."
Run the crawl on the operator machine, CI, or the WSL2 box (e2m doc §9), then commit the resulting `.md`.

Done offline here: the 16 per-collection subdirs, each `_collection.md`, `manifest.yaml`, and `organize.mjs` — all materialized deterministically from `collections.yaml`, no network.

## Pipeline (ordered)

| # | step | command / skill | env | output |
| :-- | :-- | :-- | :-- | :-- |
| 1 | toolchain | `/durable-toolchain-doctor` | cowork 2 GB VM | confirms node/cheerio/lru-cache/yaml present |
| 2 | crawl | `npm run crawl:vendor -- support-claude-sitemap` (skill `refresh-vendors`) | egress-permitted | flat `support.claude.com/en/articles/*.md` |
| 3 | map | crawl's cheerio parse of each `/en/collections/<id>` page | egress-permitted | `collection-map.json` (collection → article ids) |
| 4 | organize | `node vendor/support-claude-sitemap/organize.mjs --articles <flat> --map collection-map.json` | offline | `<id>-<slug>/*.md` + `_collection.md` + `manifest.yaml` |
| 5 | warehouse | `npm run dw:load` (skill `citation-service-loop`, model `kimball-model-yaml`) | DB | `dw.dim_vendor` (+SCD I row, vendor #35) + `dw.fact_vendor_crawl` append |
| 6 | frontend | `npm run build` → `build-vendor-manifest.ts` | offline | `vendor-manifest.json` lists support pages; SPA renders via `vendor-loader.ts` |
| 7 | cache warm | `semantic-cache` skill | redis/pg | L1/L2/L3 fixed-size `allkeys-lru`, no TTL — token savings on re-serve |

## Changes by directory

### vendor/ (done in this change)

- `support-claude-sitemap/crawl.json` — crawl config (sitemap → `support-mdfirst` → `/en/` → topology).
- `support-claude-sitemap/collections.yaml` — 16-collection seed (339 articles, as of 2026-06-19).
- `support-claude-sitemap/<id>-<slug>/_collection.md` × 16 — generated indexes (articles pending crawl).
- `support-claude-sitemap/organize.mjs` + `manifest.yaml` — deterministic flat → per-collection organizer.
- **Dedup:** remove `https://support.claude.com/en/articles/` from `vendor/claude-sitemap/crawl.json` `allow_prefixes`, and drop `https://support.claude.com/sitemap.xml` from its `sitemap_xml_sources`, so support lives only here. (claude-sitemap's support mirror is currently empty — no migration needed.)

### data/ (no model edit — auto-discovered)

`scripts/load-citation-warehouse.ts` reads `data/models/alloydb/*.yaml` and scans the `vendor/*` corpus, so `dim_vendor` (SCD I) and `fact_vendor_crawl` pick up support-claude-sitemap automatically on `npm run dw:load`. The vendor lane is corpus-driven, not registry-driven — no new model `*.yaml` required. (Optional: a `data/models/alloydb/seeds/` row for a deterministic pre-crawl count.)

### frontend/ (build-time pickup)

- `frontend/scripts/build-vendor-manifest.ts` globs `vendor/**/*.md` → support pages enter `vendor-manifest.json` with no code change.
- `frontend/src/vendor-loader.ts` renders them (marked + DOMPurify).
- Optional UX: surface the 16 collections as accordion sections (`frontend/src/accordion.ts`), using each `_collection.md` as the section index; `citations.ts` can cite article `.md` by CSL id; `cache-status.ts` already reflects the L1/L2/L3 tiers.

### cowork/ (this runbook + dispatched tasks)

- `cowork/runbooks/support-claude-sitemap.md` — this file.
- `cowork/data/queues/engineering.jsonl` — DurableTask: crawl + organize.
- `cowork/data/queues/data.jsonl` — DurableTask: `dw:load` + manifest rebuild (`depends_on` the crawl task).

### .claude/ (skills — run; minimal edits)

- Run: `refresh-vendors` (crawl), `citation-service-loop` (full pipeline), `semantic-cache` (warm), `durable-toolchain-doctor` (preflight), `kimball-model-yaml` (only if model yaml changes).
- Edit (minor): `refresh-vendors` SKILL.md vendor count ("all 25 vendor surfaces") if hard-coded; otherwise it is dynamic.

## Verification gates

- organize: `manifest.yaml` `present` per collection == `collections.yaml` `last_articles_count` (± live drift).
- warehouse: `dw.dim_vendor` has `vendor_name='support-claude-sitemap'`; `frontend/public/vendor-stats.json` includes it.
- frontend: `vendor-manifest.json` lists the 16 collection pages; SPA renders an article `.md`.
- freshness: `npm run verify:freshness` green for support-claude-sitemap.
