# OMA OAuth Patch (t12-2 — CRITICAL)

## Problem

The `open-managed-agents` fork uses `ANTHROPIC_API_KEY` in the Anthropic provider:

```typescript
// packages/server/src/providers/anthropic.ts (CURRENT — WRONG)
const client = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});
```

This violates the OAuth-only invariant. `ANTHROPIC_API_KEY` must never be set.

## Fix

Replace with OAuth Bearer token:

```typescript
// packages/server/src/providers/anthropic.ts (PATCHED)
const client = new Anthropic({
  defaultHeaders: {
    Authorization: `Bearer ${env.CLAUDE_CODE_OAUTH_TOKEN}`,
  },
});
```

## Steps to apply

1. Fork `open-managed-agents` into `subagentceo/managedsubagents`
2. Clone the fork
3. Apply the diff above to `packages/server/src/providers/anthropic.ts`
4. Remove any `ANTHROPIC_API_KEY` references from `.env.example`
5. Add `CLAUDE_CODE_OAUTH_TOKEN` to `.env.example`
6. Push and open PR against the fork's `main`

## Validation

After applying: `grep -r "ANTHROPIC_API_KEY" packages/` should return zero results.
`grep -r "CLAUDE_CODE_OAUTH_TOKEN" packages/` should return the provider file.

## References

- OAuth-only invariant: `src/oauth/token.ts`, `CLAUDE.md`
- Ticket: t12-2 in `docs/firehose/2026-06-03.md`
