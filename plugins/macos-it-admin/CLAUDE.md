# CLAUDE.md — macos-it-admin plugin

## What this plugin is

Operator-side IT admin tooling that an autonomous Claude session can invoke to perform **CRUD on vendor API tokens** without exposing values through the conversation context.

Built in response to the 2026-05-17 incident where minting a Cloudflare API token via Claude in Chrome required screenshotting the one-shot value, capturing it in the conversation and forcing an immediate rotation. The fix codified in ADR `docs/decisions/2026-05-17-cf-token-mint.md` (OSEC3) generalizes here to 5 vendors.

## The minter pattern (load-bearing)

For each vendor whose API supports token management:

1. **Operator-bootstrap (once)** — mint one long-lived narrow-scope "minter" token via the vendor's browser dashboard. Store in macOS keychain:
   ```bash
   security add-generic-password -a "$USER" -s <VENDOR>_TOKEN_MINTER -w
   # (paste at silent prompt)
   ```
2. **Subsequent token CRUD (script)** — the skills here read the minter from keychain via `security find-generic-password -w`, hit the vendor's REST API, pipe the response value directly into:
   - `gh secret set --org subagentceo --visibility selected --repos knowledge-engineering <NAME>`
   - `gh secret set <NAME>` (repo scope)
   - (optional) `wrangler secrets-store secret create $CLOUDFLARE_SECRETS_STORE_ID --name <NAME>` for runtime tier per OSEC2

Value is held only in a Buffer between fetch() and child stdin. Never written to disk. Never logged. Never printed to stdout.

## Skills

| Skill | Vendor | API token management | MCP connector | CLI fallback |
|---|---|---|---|---|
| `cloudflare-crud` | Cloudflare | Yes (`POST /user/tokens`) | Cloudflare Developer Platform | `wrangler` + REST |
| `turbopuffer-crud` | Turbopuffer | **No (browser-only)** | None | Manual dashboard |
| `neon-crud` | Neon | Yes (`POST /api_keys`) | Neon | `neonctl` + REST |
| `parallel-ai-crud` | Parallel.ai | Yes (`POST /api-keys`) | Parallel Search / Parallel Task | REST |
| `nimbleway-crud` | Nimbleway | Yes (admin API) | Nimble | REST |

## Anti-silent-failure rules

1. **Never `console.log(value)`, `writeFileSync(value)`, or any equivalent.** Tested by `src/lib/macos-it-admin-noleak.test.ts` (greps every skill's referenced script).
2. **Status messages go to stderr** (`console.error`), never stdout. stdout is reserved for pipe targets (and even there, the value never appears).
3. **Every CRUD action emits an audit line** — `[<vendor>] minted "<name>" (id=<id>) → gh org+repo` — naming the token but never the value.
4. **Read-after-write verification** — after every Create or Update, the skill must verify via a read endpoint that the new resource exists. If verification fails the skill must report `[<vendor>] WRITE VERIFY FAILED` and abort the next step.

## Operator workflow

Typical rotation cycle (quarterly):

```bash
# Cloudflare — already done
tsx scripts/secret-mint/cf-token-mint.ts \
  --template infra/cloudflare/token-templates/edit-cloudflare-workers.json \
  --secret-name CLOUDFLARE_API_TOKEN

# Neon
tsx plugins/macos-it-admin/skills/neon-crud/scripts/create.ts \
  --name "knowledge-engineering-rotation-$(date +%Y-Q%q)" \
  --secret-name NEON_API_KEY

# Parallel.ai
tsx plugins/macos-it-admin/skills/parallel-ai-crud/scripts/create.ts \
  --secret-name PARALLEL_API_KEY

# Nimbleway
tsx plugins/macos-it-admin/skills/nimbleway-crud/scripts/create.ts \
  --secret-name NIMBLEWAY_API_KEY

# Turbopuffer — browser, prompted explicitly
tsx plugins/macos-it-admin/skills/turbopuffer-crud/scripts/create.ts
# (prints the manual steps; operator pastes value into a `read -rs` prompt)
```

After all five, run `npm run verify:secrets` to confirm OSEC1 parity.

## Why each skill ships its own script

Skills are self-contained agentskills.io packages — the script lives at `skills/<vendor>-crud/scripts/<verb>.ts`. The Cloudflare one is the existing `scripts/secret-mint/cf-token-mint.ts` (kept at repo root for compatibility with OSEC3's documented bootstrap); the other four are new and live inside the plugin tree.

## Related ADRs / docs

- `docs/decisions/2026-05-17-secrets-parity.md` (OSEC1) — three-plane parity model
- `docs/decisions/2026-05-17-secret-store-tiers.md` (OSEC2) — Cloudflare Secrets Store + GH org canonical tiers
- `docs/decisions/2026-05-17-cf-token-mint.md` (OSEC3) — the minter pattern this plugin generalizes
- `docs/operator-runbooks/secret-rotation.md` — the human-side rotation procedure
