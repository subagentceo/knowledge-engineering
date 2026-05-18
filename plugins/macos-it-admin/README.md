# macos-it-admin

Operator-side IT admin plugin for token CRUD across the 5 vendor APIs this chassis depends on.

## Install

```bash
# from repo root
npx tsx scripts/install-plugins.ts macos-it-admin
```

Or via the plugin marketplace if/when published.

## Skills

| Skill | What it does |
|---|---|
| `cloudflare-crud` | Create / Read / Update / Delete Cloudflare API tokens via REST, piped to gh + wrangler |
| `turbopuffer-crud` | Browser-only token CRUD (Turbopuffer has no admin API) |
| `neon-crud` | CRUD over Neon API keys via REST + neonctl fallback |
| `parallel-ai-crud` | CRUD over Parallel.ai API keys (Search + Task plans) |
| `nimbleway-crud` | CRUD over Nimble (a.k.a. Nimbleway) admin tokens |

## Quick start

1. **Bootstrap one minter per scriptable vendor** (one-time, ~5 min each):
   ```bash
   security add-generic-password -a "$USER" -s CF_TOKEN_MINTER -w
   security add-generic-password -a "$USER" -s NEON_TOKEN_MINTER -w
   security add-generic-password -a "$USER" -s PARALLEL_TOKEN_MINTER -w
   security add-generic-password -a "$USER" -s NIMBLEWAY_TOKEN_MINTER -w
   ```
   Paste the dashboard-minted minter token at each silent prompt. See each skill's `SKILL.md` for the exact dashboard URL and required scope.

2. **Use the CRUD scripts** — see `CLAUDE.md` for the per-vendor command shape.

## Why scripts, not browser clicks

The 2026-05-17 incident captured a Cloudflare API token in conversation context via a screenshot, requiring immediate rotation. Any browser-driven mint flow has the same risk because the value displays once and any UI inspection captures it. Scripts pipe `fetch()` → child stdin with the value never traversing stdout or disk. ADR `docs/decisions/2026-05-17-cf-token-mint.md` (OSEC3) is the canonical writeup.

## What this plugin does NOT do

- **Doesn't mint the minter tokens themselves.** That's the one-time browser step you can't script away (chicken-and-egg).
- **Doesn't manage the Cloudflare Secrets Store contents** directly — that's `wrangler secrets-store`, invoked by the `--runtime` flag on each skill's create script.
- **Doesn't perform vendor billing or account ops.** Token CRUD only.

## Conventions

Every script:
- Reads the minter from macOS keychain (no env vars for secrets)
- Writes only to stderr for status (`[OIT1] minted "<name>" (id=<id>)`)
- Pipes token value via `spawnSync({ input: value, stdio: ["pipe", ...] })` — never `--value <value>` on argv
- Exits non-zero with a `[<vendor>] WRITE VERIFY FAILED` message if read-after-write doesn't see the new resource

## Related

- `plugins/platform-engineering/` — the other operator-side plugin (AlloyDB, Docker MCP, embeddings bridge)
- `docs/decisions/2026-05-17-*.md` — OSEC1, OSEC2, OSEC3
- `docs/operator-runbooks/secret-rotation.md` — human rotation runbook
