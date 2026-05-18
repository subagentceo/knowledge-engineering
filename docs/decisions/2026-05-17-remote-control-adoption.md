---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: ORC1
---

# ADR — adopt Claude Code Remote Control as the primary fan-out pattern

<!--
@cite vendor/anthropics/code.claude.com/docs/en/remote-control.md
@cite vendor/anthropics/code.claude.com/docs/en/settings.md
@cite vendor/anthropics/code.claude.com/docs/en/goal.md
@cite seeds/citations/define-outcomes.md
-->

## Context

The operator runs Claude on a Max plan (Pro/Max/Team/Enterprise are
the supported tiers for Remote Control). The chassis previously did
ad-hoc subagent fanout from a single parent Claude Code session,
which serialized work behind that one process's MCP connectors and
OAuth.

[Remote Control](../../vendor/anthropics/code.claude.com/docs/en/remote-control.md)
replaces that pattern. `claude remote-control --capacity 32 --spawn
worktree` runs **one** host process that exposes up to 32 concurrent
claude.ai/code or Claude app sessions, each automatically placed in
its own git worktree (per `--spawn worktree`, documented inline in
[remote-control.md L57](../../vendor/anthropics/code.claude.com/docs/en/remote-control.md))
so file-edit collisions are impossible. All sessions share the host's
MCP connectors and OAuth token — no extra logins, no per-session
configuration.

Combined with [`/goal`](../../vendor/anthropics/code.claude.com/docs/en/goal.md)
("set a completion condition and Claude keeps working across turns
until it's met"), this is the canonical **set-it-and-walk-away**
pattern for this chassis.

The chassis invariant from [OSL1](2026-05-16-osv-only-no-secret-scanning.md)
already forbids `ANTHROPIC_API_KEY` (per `src/oauth/token.ts`), which
matches RC's requirement to run under OAuth-only.

## Operator-only actions

These cannot be done by an agent; the operator must do them once per
device.

| Action | Why operator-only |
| :--- | :--- |
| First-time `/login` on Claude Code CLI | Browser OAuth handshake bound to operator credentials |
| Install Claude Code ≥ v2.1.51 | RC was introduced in 2.1.51 per [remote-control.md L24](../../vendor/anthropics/code.claude.com/docs/en/remote-control.md) |
| Accept workspace-trust dialog in project dir | RC requires trust-accepted workspace (remote-control.md L35) |
| Run `claude remote-control` (or `npm run rc`) to start the host | Foreground long-lived process under operator's shell |
| Scan QR code / phone pair to claude.ai or the Claude app | One-time per device pairing |
| `/config` toggle: **Enable Remote Control for all sessions** (optional) | Personal preference; toggles auto-start (remote-control.md L133) |
| Keep `ANTHROPIC_API_KEY` unset | Already chassis invariant (OSL1); the host fails closed if it's set |

## Agent-capable actions

These are done by Claude (this PR is one of them).

| Action | Artifact |
| :--- | :--- |
| Author this ADR | `docs/decisions/2026-05-17-remote-control-adoption.md` |
| Add the convenience npm script | `package.json` → `"rc"` |
| Author the skill wrapper | `plugins/platform-engineering/skills/remote-control-host/SKILL.md` |
| Register the skill in the plugin manifest | `plugins/platform-engineering/.claude-plugin/plugin.json` |
| Write the verifier test | `src/lib/remote-control-posture.test.ts` |
| Open this PR with `--label automerge` | This PR |

## `/goal` + RC as the "set it and walk away" pattern

1. Operator runs `npm run rc` once (host comes up; QR shown).
2. From claude.ai or the phone, operator opens a session against the host.
3. Operator runs `/goal <completion condition>` in that session.
4. The session keeps taking turns until the small fast model
   ([Haiku by default per goal.md L125](../../vendor/anthropics/code.claude.com/docs/en/goal.md))
   confirms the condition holds. Operator walks away.
5. Up to 32 such sessions can run in parallel, each in its own
   worktree, sharing the host's MCP + OAuth.

## Invariant

This PR also makes the **absence** of
[`disableRemoteControl: true`](../../vendor/anthropics/code.claude.com/docs/en/settings.md)
in any `.claude/settings*.json` under this repo a verified property.
Enforced by `src/lib/remote-control-posture.test.ts`.

## Consequences

- Cross-cutting fan-out work (verifier sweeps, doc refreshes, PR
  review batches) moves from in-session Task spawns to RC sessions.
- Single OAuth login serves all 32 sessions — no rotation-window
  multiplication.
- Per-session worktree isolation eliminates the file-conflict class
  of bugs from in-session parallel edits.

## Citations

- `vendor/anthropics/code.claude.com/docs/en/remote-control.md`
- `vendor/anthropics/code.claude.com/docs/en/settings.md`
- `vendor/anthropics/code.claude.com/docs/en/goal.md`
- `seeds/citations/define-outcomes.md`
