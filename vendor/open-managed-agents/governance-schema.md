# OMA Fork Governance Schema

## Fork governance

| Field | Value |
| :--- | :--- |
| Upstream | `open-managed-agents/main` |
| Fork | `subagentceo/managedsubagents` |
| Sync policy | Track upstream; cherry-pick security fixes; no merge back to upstream |
| KE-specific changes | OAuth patch (t12-2); CF Workers deployment config; KV session store |
| Applied patches | t12-2 OAuth patch |

Changes in this fork are KE-specific. They do not go back upstream because they assume the OAuth-only invariant which upstream does not enforce.

## Agent policy

```yaml
allowedModels:
  - claude-opus-4-8
  - claude-sonnet-4-6
  - claude-haiku-4-5
maxTokensPerSession: 200000
requiresOAuth: true   # hardcoded — not configurable via env
```

`requiresOAuth` is enforced at the middleware layer (`packages/server/src/middleware/auth.ts`). It is not a runtime flag — the middleware always validates a Bearer OAuth token and never falls back to an API key.

## Environment validation (fail-closed)

The server performs environment validation at startup before binding any port or accepting requests:

| Check | Outcome on failure |
| :--- | :--- |
| `ANTHROPIC_API_KEY` is present | Startup abort — log `FATAL: ANTHROPIC_API_KEY detected; OAuth-only invariant violated` |
| `CLAUDE_CODE_OAUTH_TOKEN` is absent | Startup abort — log `FATAL: CLAUDE_CODE_OAUTH_TOKEN required` |

These checks run before any route registration. A misconfigured deployment fails loudly rather than accepting requests and failing at the Anthropic API boundary.

## Banned environment variables

| Variable | Enforcement point |
| :--- | :--- |
| `ANTHROPIC_API_KEY` | Worker env-sanitizer (Cloudflare Worker entrypoint) — stripped before `packages/server` init |

The env-sanitizer in the CF Worker entrypoint deletes `ANTHROPIC_API_KEY` from `env` before passing it to the server. Even if a deployment accidentally injects this variable, it never reaches the provider.

## Deployment approval

`coworker-security` must scan any diff before production deploy. This applies to:
- Changes under `packages/server/src/providers/`
- Changes under `packages/server/src/middleware/auth.ts`
- Changes to `wrangler.toml` bindings
- Any new environment variable references

## Patch inventory

| patch_id | file | description | applied | upstream_issue |
| :--- | :--- | :--- | :--- | :--- |
| t12-2 | `packages/server/src/providers/anthropic.ts` | Replace `ANTHROPIC_API_KEY` with `CLAUDE_CODE_OAUTH_TOKEN` Bearer header | 2026-06-05 | N/A — KE-specific invariant |
