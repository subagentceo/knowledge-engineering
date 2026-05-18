---
name: remote-control-host
description: >
  Run a Claude Code Remote Control host on the operator's machine
  with capacity 32 and per-session git worktree spawn. Use when the
  operator wants to fan out work across many concurrent claude.ai or
  Claude-app sessions sharing one host's MCP connectors and OAuth
  token, when pairing the phone/web app to a local repo, or when
  combining `/goal` with RC for set-it-and-walk-away runs. Requires
  Claude Code v2.1.51+, a trust-accepted workspace, and
  ANTHROPIC_API_KEY unset (already a chassis invariant).
license: Apache-2.0
compatibility: Claude Code v2.1.51+ on the operator's Max plan (Pro/Max/Team/Enterprise tier required). OAuth-only.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Operator wants to fan out 2-32 concurrent sessions over the phone
  or claude.ai against this repo
- Combining `/goal` with a remote session for set-it-and-walk-away
- Onboarding a new device: pairing once via QR
- Debugging "why is RC blocked" (managed-settings `disableRemoteControl`)

# Steps

## 1. One-time per device (operator-only)

1. Install Claude Code v2.1.51 or later. Verify with `claude --version`.
2. From the repo root, run `claude` once and accept the workspace
   trust dialog.
3. Confirm `ANTHROPIC_API_KEY` is unset (`env | grep ANTHROPIC_API_KEY`
   must be empty). This is already a chassis invariant per
   [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](../../../../docs/decisions/2026-05-16-osv-only-no-secret-scanning.md)
   and the OAuth gate at `src/oauth/token.ts`.

## 2. Start the host

```
npm run rc
```

Equivalent to `claude remote-control --capacity 32 --spawn worktree`.
The host prints a session URL and (with spacebar toggle) a QR code.
Each on-demand session lands in its own git worktree, so 32 sessions
can edit independently without conflict.

## 3. Pair from claude.ai or the Claude app

Scan the QR with the phone OR open the printed URL on claude.ai/code.
The session inherits the host's MCP connectors and OAuth token — no
extra login.

## 4. Use `/goal` for unattended runs

In any paired session:

```
/goal all verify gates green and PR ready-for-review
```

The session keeps taking turns until the small fast model (Haiku by
default) confirms the condition. Walk away.

## 5. Stop the host

`Ctrl-C` in the host terminal. All paired sessions are dropped.

# Invariant this repo enforces

`disableRemoteControl: true` must NOT appear in any
`.claude/settings*.json` under this repo. Enforced by
[`src/lib/remote-control-posture.test.ts`](../../../../src/lib/remote-control-posture.test.ts)
in the `verify:libs` gate.

# Citations

- [`vendor/anthropics/code.claude.com/docs/en/remote-control.md`](../../../../vendor/anthropics/code.claude.com/docs/en/remote-control.md) — RC reference, capacity/spawn flags, v2.1.51 requirement
- [`vendor/anthropics/code.claude.com/docs/en/settings.md`](../../../../vendor/anthropics/code.claude.com/docs/en/settings.md) — `disableRemoteControl` managed setting (v2.1.128+)
- [`vendor/anthropics/code.claude.com/docs/en/goal.md`](../../../../vendor/anthropics/code.claude.com/docs/en/goal.md) — `/goal` works through Remote Control
- [`docs/decisions/2026-05-17-remote-control-adoption.md`](../../../../docs/decisions/2026-05-17-remote-control-adoption.md) — ORC1 ADR
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — outcome doctrine
