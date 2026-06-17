# vendor/

Local mirror of vendor docs. Each top-level dir is one vendor; the
crawler at `scripts/crawl-vendors.ts` reads `<name>/crawl.json` and
emits:

```
vendor/<name>/
  crawl.json                       # config (committed)
  llms.txt                         # discovered llms.txt body (committed)
  urls.md                          # auto-generated index (committed)
  <host>/<path-segments>.md        # fetched bodies (committed in Phase 2+)
```

## How to add a vendor

1. Create `vendor/<new>/crawl.json` (see existing configs for shape).
2. Run `npm run crawl:vendor -- <new>` to validate.
3. Open a PR. CI runs `npm run verify`; auto-merge fires when green.

## How to refresh

- On-demand: `npm run crawl:vendors` (all 12) or `npm run crawl:vendor -- <name>`.
- Scheduled: activate `.claude/skills/refresh-vendors.md` (Phase 5)
  which emits a `/schedule` SlashCommand.
- Heartbeat: the orchestrator calls `crawl:vendors` weekly per
  `seeds/memory/heartbeat/next-actions.md` (Phase 11+).

## Transform strategies (per `scripts/lib/transforms.ts`)

| Strategy | Behavior | Used by |
|---|---|---|
| `verbatim` | URL already has `.md`; fetch as-is | turbopuffer |
| `append-md` | Append `.md` | modelcontextprotocol, anduril |
| `append-md-and-accept` | + `Accept: text/markdown` | stripe, twilio, sentry |
| `cloudflare-index-md` | `developers.cloudflare.com` → `/index.md`; reject HTML | cloudflare |
| `anthropic-mdfirst` | `code.claude.com` / `platform.claude.com` / `claude.com/docs` / `neon.com/guides` → `.md`; reject HTML | anthropics, neon |
| `accept-only` | URL unchanged; Accept header | (reserved) |
| `html-extract` | Fetch HTML; turndown → markdown | brave-search, intercom, sift, arkose-labs |

## Why commit the bodies

Two reasons (per the plan in `docs/architecture.md`):

1. **Offline determinism** — the bridge MCP server reads local-first;
   verify runs without network.
2. **PR auditability** — vendor changes appear as diffs against the
   committed mirror.

Repo size budget: <500 MB initial cap. Per-vendor `page_cap` keeps
each vendor bounded.

Phase 2 crawls all 12 and commits the bodies. Phase 1 (current) ships
the crawler + configs only.
