# Full-Stack Cloud Agent runner

Per-task: Cloudflare Sandbox (ephemeral compute) + Neon database branch
(ephemeral data) + Claude Code CLI (driven by `CLAUDE_CODE_OAUTH_TOKEN`,
**not** `ANTHROPIC_API_KEY`).

**Citations.**
- `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`
- `seeds/prompts/operator-2026-05-10-followup.md` (OAuth-substitution
  resolution to the cited guide's `ANTHROPIC_API_KEY` directive)

## Status

**Scaffolded only — not deployed.** Phase 0g of PR #3.

Deployment requires operator-side action (Phase 8 rubric):

1. Install Neon's Claude / GitHub integration on `subagentceo` →
   `knowledge-engineering`.
2. Sync Neon API key + project ID to Cloudflare Worker secrets via the
   integration's automation.
3. Operator manually adds `CLAUDE_CODE_OAUTH_TOKEN` and `GITHUB_TOKEN`
   secrets via `wrangler secret put` (or the dashboard).
4. Run `wrangler deploy`.

`wrangler secret list` after the four steps must show:

- `NEON_API_KEY`
- `NEON_PROJECT_ID`
- `GITHUB_TOKEN`
- `CLAUDE_CODE_OAUTH_TOKEN`

and **must NOT** show `ANTHROPIC_API_KEY`.

## Architecture

```
POST /run { repoUrl, task }
        │
        ▼
[ Cloudflare Worker: src/worker.ts ]
        │
        ├── env-sanitize          (reject ANTHROPIC_API_KEY)
        ├── createNeonBranch      (ephemeral Neon branch → DATABASE_URL)
        ├── getSandbox            (ephemeral Cloudflare Sandbox)
        ├── cloneRepo             (sandbox.exec git clone)
        ├── checkoutBranch        (per-agent git branch)
        ├── setEnvVars            (CLAUDE_CODE_OAUTH_TOKEN + DATABASE_URL)
        ├── runClaude             (claude --dangerously-skip-permissions)
        ├── commitChanges         (git add/commit)
        ├── pushBranch            (git push origin <agentId>)
        ├── createPR              (gh pr create)
        └── return                ({ agentId, databaseUrl, prUrl })
```

## Conflict-resolution log

The cited Neon guide forwards `ANTHROPIC_API_KEY` into the sandbox via
`sandbox.setEnvVars()`. The operator posture's hard rule is OAuth-only:
`ANTHROPIC_API_KEY` must never be set. Resolution: substitute
`CLAUDE_CODE_OAUTH_TOKEN`. The Worker's `sanitizeEnv()` enforces this
at runtime — any attempt to forward `ANTHROPIC_API_KEY` throws
`ApiKeyForbiddenError` before the sandbox call.

See `seeds/prompts/operator-2026-05-10-followup.md` for the long-form
explanation.

## Files

- `wrangler.jsonc` — Containers + Durable Objects bindings; scaffold only.
- `Dockerfile` — Cloudflare sandbox base image + `gh` + Claude Code CLI.
- `src/worker.ts` — runner with env-sanitizer + Neon branching + Claude run.
- `.dev.vars.example` — required local-dev secrets (no values).
- `package.json` — runtime deps (`@cloudflare/sandbox`,
  `@neondatabase/api-client`).
