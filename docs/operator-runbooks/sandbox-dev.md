---
title: sandbox-dev
description: Run the Cloudflare Worker (Sandbox runner) locally for development. Closes Phase 8 issue #12 acceptance criterion C1 ("End-to-end local run").
phase: 8
issue: 12
acceptance: C1
---

# Operator runbook: `npm run sandbox:dev`

## Why

Phase 8 (issue #12) C1 calls for a local end-to-end run:

> `npm run sandbox:dev` accepts a POST to `/run` and returns the same orchestrator output as `npm run dev` locally. Sandbox runs `claude` with `CLAUDE_CODE_OAUTH_TOKEN` only — no `ANTHROPIC_API_KEY`.

The script wires the operator's local environment into `infra/cloudflare/`'s `wrangler dev`, which spins up a local Worker with the Sandbox Durable Object bindings declared in `infra/cloudflare/wrangler.jsonc`.

## Prereqs

- Node ≥ 20
- `wrangler` (installed transitively under `infra/cloudflare/node_modules/`; falls back to `npx wrangler` if global)
- `CLAUDE_CODE_OAUTH_TOKEN` exported in the shell (per OAuth-only posture; `ANTHROPIC_API_KEY` MUST be unset)
- Optional: `NEON_API_KEY` + `NEON_PROJECT_ID` if you want the Worker to actually create per-PR branches

## Run

```bash
unset ANTHROPIC_API_KEY
export CLAUDE_CODE_OAUTH_TOKEN="..."   # from `claude setup-token` or your local creds
npm run sandbox:dev
```

`wrangler dev` opens a local listener (default `127.0.0.1:8787`). It hot-reloads on file changes under `infra/cloudflare/src/`.

## POST a task

```bash
curl -X POST http://127.0.0.1:8787/run \
  -H 'Content-Type: application/json' \
  -d '{"repoUrl": "https://github.com/subagentceo/knowledge-engineering", "task": "What does vendor_pages do?"}'
```

The Worker:

1. Env-sanitizes the request (rejects any inbound `ANTHROPIC_API_KEY` — see `infra/cloudflare/src/env-sanitize.test.ts`)
2. Optionally creates a Neon branch (gated on `NEON_API_KEY`)
3. Starts a Sandbox via `getSandbox(env.Sandbox, sessionId)`
4. Clones the repo, runs `claude`, commits, pushes, opens a PR
5. Returns `{ agentId, prUrl }`

In `sandbox:dev` mode without operator-side Neon/CF credentials, the Worker still boots and the env-sanitizer + outbound-allowlist tests run against it — useful for fast local iteration on those code paths.

## Outbound allowlist behavior

`infra/cloudflare/src/outbound-allowlist.ts` enforces a hard allowlist (Phase 8 C2). In local dev, any `fetch()` to a host not on the allowlist throws `OutboundDeniedError`. To extend for one-off local testing, set `OUTBOUND_ALLOWLIST_EXTRA` in `infra/cloudflare/.dev.vars`:

```ini
# infra/cloudflare/.dev.vars (gitignored)
OUTBOUND_ALLOWLIST_EXTRA=internal.example,another.example
```

The base allowlist always includes Anthropic + Neon + GitHub + the 21 vendor docs hosts; extras stack on top, never override.

## Verifying acceptance criteria locally

| AC | Verify |
| :--- | :--- |
| **C1** `sandbox:dev` accepts POST /run | `curl` example above returns 200 (or a structured error if creds missing) |
| **C2** outbound allowlist enforced | `npx tsx infra/cloudflare/src/outbound-allowlist.test.ts` → 26 passed, 0 failed |
| **C3** `cloudflareIndexMd` validator | `npx tsx scripts/lib/transforms.test.ts` → all transforms tests pass |
| **C4** `wrangler deploy` succeeds | **Operator action** — requires `secrets.CLOUDFLARE_API_TOKEN` (issue #33) |

## Closes / refs

- Refs [#12](https://github.com/subagentceo/knowledge-engineering/issues/12) acceptance criterion C1 + C2
- Refs [#33](https://github.com/subagentceo/knowledge-engineering/issues/33) — operator runbook for `secrets.CLOUDFLARE_API_TOKEN` (closes C4 once run)
- Cited from `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md#default-allowed-domains`
- Cited from `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`
