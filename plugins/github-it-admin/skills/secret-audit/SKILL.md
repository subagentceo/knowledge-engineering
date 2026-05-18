---
name: secret-audit
description: Run the OSEC1 parity verifier (npm run verify:secrets) plus a drift report by secret age. Use to confirm gh-org/repo/local plane parity and identify secrets stale enough to warrant rotation under the OSEC2 quarterly policy.
---

# secret-audit

## When to invoke

- After every rotation (sanity check).
- Before every release (gate that secrets are fresh).
- On the monitor-driven schedule (every 6 hours, see `monitors/monitors.json` `secret-age-watch`).

## Verbs

### READ

```bash
bash "${CLAUDE_PLUGIN_ROOT}/skills/secret-audit/scripts/audit.sh"
```

Steps:
1. Runs `npm run verify:secrets` from the project root. Exits non-zero on parity violations.
2. Runs `gh secret list --json name,updatedAt` for both org and repo.
3. Computes age in days for each secret.
4. Flags any secret whose age exceeds `${user_config.secret_max_age_days}` (default 90).
5. Emits a markdown table to stdout suitable for pasting into an audit ADR.

This skill is **READ-ONLY**. CREATE/UPDATE/DELETE are out of scope — use the vendor-specific skills (`macos-it-admin/skills/*`) or `claude-oauth-rotate` for those.

## Anti-silent-failure rules

1. If `npm run verify:secrets` is not available (OSEC1 not merged), abort with a clear message — don't fake "parity OK".
2. If `gh secret list` returns empty for org, distinguish "no scope access" from "no secrets exist".

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT2-aud-1 | Wraps `npm run verify:secrets` (OSEC1 verifier) | conformance test greps script body |
| OIT2-aud-2 | Computes age in days from `updatedAt` and flags >= `secret_max_age_days` | same test |
| OIT2-aud-3 | Skill is read-only | SKILL.md has no `gh secret set` or `wrangler secrets-store secret create` reference |

## Citations

@cite scripts/verify-secrets-parity.ts (OSEC1)
@cite docs/data/secrets-parity.json
@cite docs/operator-runbooks/secret-rotation.md
