<!-- @cite vendor/cloudflare/developers.cloudflare.com/flagship/index.md -->
<!-- Outcome: 2026-06-05-O12 -->

# CF Worker Exceptions — Investigation 2026-06-03

Investigated 2026-06-05. CF account `e6294e3ea89f8207af387d459824aaae` (Alex@jadecli.com).
Account has **38 workers** across **108 domains** (50 zones visible, more paginated).

## The 4 Workers Throwing Exceptions

From the prior-session firehose (`docs/firehose/2026-06-03.md`):

> `subagentdispatch`, `subagentlegal`, `subagentfinance`, `subagentengineering` — each had
> 30–31 `scriptThrewException` errors Jun 1–3.

### Root Cause: `ANTHROPIC_API_KEY` set as secret binding

All four workers share an identical binding profile including `ANTHROPIC_API_KEY` as a
`secret_text` binding. The chassis hard rule (CLAUDE.md, `src/oauth/token.ts`) rejects
`ANTHROPIC_API_KEY` at every layer — it fails closed. These workers were deployed from a
pre-OAuth fork of the subagent chassis that still used direct API key auth.

| Worker | Type | Vertical | Exception trigger |
|---|---|---|---|
| `subagentdispatch` | Compiled Wasm/Next.js (OpenNext) | Orchestrator | `ANTHROPIC_API_KEY` env rejected by OAuth gate |
| `subagentlegal` | Compiled Wasm/Next.js (OpenNext) | Legal | Same; plus `SITE_SLUG=legal` unresolvable route |
| `subagentfinance` | Compiled Wasm/Next.js (OpenNext) | Finance | Same |
| `subagentengineering` | Compiled Wasm/Next.js (OpenNext) | Engineering | Same |

### Shared bindings (all 4 workers)

```
ANTHROPIC_API_KEY   secret_text         <- BANNED by repo posture (OAuth-only)
ASSETS              assets
CASSETTES           r2_bucket
CRON_SECRET         secret_text
DATABASE_URL        secret_text
LTF_API_KEY         secret_text
REPLAY_MODE         plain_text
RESEND_API_KEY      secret_text
STRIPE_*            secret_text (x4)
WORKER_SELF_REFERENCE service
```

`subagentlegal`, `subagentfinance`, `subagentengineering` additionally bind:
`SITE_DOMAIN`, `SITE_SLUG`, `SITE_VERTICAL` as `plain_text`.

### Why 30–31 exceptions each

The workers are scheduled/cron workers. Each cron tick fires the handler; the OAuth gate at
startup rejects the `ANTHROPIC_API_KEY` binding presence and throws before the fetch
handler can respond. 30–31 invocations over Jun 1–3 is approximately one cron per hour
over 1.3 days.

### Analytics API note

The Cloudflare Workers Analytics GraphQL (`workersInvocationsAdaptive`) returned no rows for
this account during the investigation window. This is consistent with Workers Free tier:
aggregated analytics require Workers Paid ($5/month) for persistent retention. The exception
counts cited above were captured via the Workers Observability MCP in the prior session
(cf-graphql-snapshot-2026-06-03.json).

## Recommended fix

Option A — **Migrate to OAuth**: Remove `ANTHROPIC_API_KEY` binding; wire
`src/oauth/token.ts` to fetch the bearer token from the secrets store. Eliminates exceptions
at source.

Option B — **Delete/disable workers**: These workers are pre-OMA-fork prototypes. If no
longer needed, `DELETE /accounts/{accountId}/workers/scripts/{name}` for each.

Option C — **Suppress via wrangler `[triggers]`**: Remove cron triggers to stop exception
generation while migration is planned.

## Other workers with exception risk (secondary findings)

| Worker | Risk | Reason |
|---|---|---|
| `relay-runner` | Medium | `JSON.parse(await env.DATA.get("commit-jobs"))` — throws `SyntaxError` if KV key is deleted or returns `null` |
| `build-trigger` | Low | Hardcoded `RUN_ID = 26906884498`; no try/catch; stale run ID returns 404, but `jobs.jobs?.[0]` returns `undefined` and returns gracefully |
| `gh-harvest` | Low | Fetches `anthropics/knowledge-work-plugins` (may 404); `j.tree || []` handles it gracefully |
| `outcomes-mcp` | Low-medium | Uses experimental `worker_loader` binding; availability on current plan not confirmed |

## Account snapshot (2026-06-05)

- Workers deployed: 38
- KV namespaces: 7
- Zones: 108 (50 returned per page, more paginated)
- Analytics tier: Workers Free (no persistent analytics rows returned)
