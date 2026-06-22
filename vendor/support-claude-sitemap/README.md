# vendor/support-claude-sitemap

Deterministic crawl-job mirror of the **`/en/`** Claude Support center (`support.claude.com`), organized per collection. Coworker-optimized: every article is fetched as its `.md` variant, so agents read markdown directly — no HTML→markdown conversion, fewer tokens.

> Status: research preview. Follows the existing crawl-job pattern (sibling: `vendor/claude-sitemap/`). Spec format: [CommonMark 0.31.2](https://spec.commonmark.org/0.31.2/).
>
> @cite scripts/crawl-vendors.ts (support-mdfirst per-host override)
> @cite scripts/lib/url-to-path.ts (support.claude.com topology, `.md` append)
> @cite infra/redis/redis.conf (L2 fixed-size policy)

## operator-optimized vs coworker-optimized

Two representations of the same article — same `id-slug`, different surface:

| audience | url | format | use |
| :-- | :-- | :-- | :-- |
| operator (human) | `…/en/articles/8114491-get-started-with-claude` | HTML | reading in a browser |
| coworker (agent) | `…/en/articles/8114491-get-started-with-claude.md` | Markdown | this mirror; LLM-ingestible, token-cheap |

The crawler fetches the **coworker-optimized `.md`** and writes it verbatim. Collection *pages* (`/en/collections/<id>-<slug>`) have **no** `.md` variant, so we **generate** one (`_collection.md`, an article index) on each crawl — the article set changes daily.

## scope

- **`/en/` only.** Other locales present in `sitemap.xml` are filtered out via `allow_prefixes`.
- 16 collections, 339 articles as of 2026-06-19 — see `collections.yaml` (the deterministic seed).
- Overlap note: `vendor/claude-sitemap/` already flat-mirrors `support.claude.com/en/articles/*.md` mixed into the broader claude.com crawl. This dedicated job adds the **per-collection organization** and **`/en/`-only scope** the flat mirror does not provide.

## layout (deterministic — per-collection subdirectory)

```
vendor/support-claude-sitemap/
  crawl.json                                 # crawl:vendors config (sitemap → /en/ .md, support-mdfirst)
  collections.yaml                           # 16-collection entry inventory (ids, slugs, counts)
  <collection-id>-<collection-slug>/         # e.g. 4078531-claude/
    _collection.md                           # GENERATED article index (site has no collection .md)
    <article-id>-<article-slug>.md           # coworker-optimized article body (fetched .md, verbatim)
  _unmapped/                                  # /en/ articles in sitemap with no collection-page hit
  manifest.yaml                              # per-run: counts, checksums, last_crawled
```

Subdir names match canonical URL topology (`<id>-<slug>` taken verbatim from live URLs) → the same input always produces the same tree.

## crawl phases (Googlebot / Claudebot style)

1. **topology** — read `collections.yaml` (or re-extract from `/en/` via cheerio `a.collection-link`).
2. **map** — cheerio-parse each collection page → the article ids that belong to it. This is the *only* place the collection→article edge is encoded; `sitemap.xml` does not carry it.
3. **fetch** — for each article, GET the `.md` variant through the L1/L2/L3 cache; write verbatim to `<collection>/<article-id>-<slug>.md`. Render `_collection.md` from the mapped list.
4. **reconcile** — parse `sitemap.xml`, keep only `…/en/articles/*.md`, assert every one was placed; orphans → `_unmapped/`.

Idempotent: unchanged bodies preserve mtime (checksums via `scripts/lib/checksums.ts`).

## reuse (don't reinvent)

- `scripts/crawl-vendors.ts` — the crawl runner; **already routes every `support.claude.com` URL through `support-mdfirst`** (append `.md` + `Accept: text/markdown`).
- `scripts/lib/url-to-path.ts` — already topology-aware for `support.claude.com`; auto-appends `.md`.
- `scripts/lib/sitemap-xml.ts` — `parseSitemapXml` (the `/en/` completeness oracle).
- `src/cache/tiered.ts` — L1→L2→L3 read-through (see cache note below).

## cache — fixed size, NOT time based

Tiers reuse `src/cache/tiered.ts`:

| tier | store | sizing |
| :-- | :-- | :-- |
| L1 | in-process LRU (`lru-cache`) | fixed `max` / `maxSize` bytes, no `ttl` |
| L2 | Redis | `maxmemory 512mb` + `maxmemory-policy allkeys-lru` (`infra/redis/redis.conf`) |
| L3 | Postgres `semantic_cache` | durable cold store (no eviction) |

**Reconciliation:** `redis.conf` today also stamps a **7-day object TTL**. To honor "fixed size, not time based," the support-sitemap cache writes keys **without `EXPIRE`** and relies on `allkeys-lru` capacity eviction alone. Verified in-sandbox: a 3-tier fill-then-refill performs **0** origin re-fetches on the warm pass (tokens saved); eviction is capacity-driven and time-independent.

## toolchain (cowork ~2 GB VM)

Cowork runs in a ~2 GB container VM, so bootstrap deterministically before crawling:

```
/durable-toolchain-doctor       # reports node, cheerio, lru-cache, yaml, @crawlee/cheerio already present
/durable-toolchain-install      # no-op unless a gap is found
/durable-toolchain-autoresolve  # closes any remaining gap task
```

The memory ceiling is also *why* L1 stays small/fixed and bulk spills to L2/L3.

## run

```
npm run crawl:vendor -- support-claude-sitemap     # this job only
npm run crawl:vendors                              # all vendors incl. this one
```
