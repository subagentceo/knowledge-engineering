# Snapshots

> npm-style dist-tag scheme for tracking versioned chassis state.

Modeled on npm's `latest` / `next` / `stable` dist-tags
(e.g. https://www.npmjs.com/package/@anthropic-ai/claude-code/v/2.1.142,
https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk/v/0.3.142).
Each snapshot is a frozen capture of:

- the plan file under `/root/.claude/plans/` (cross-session continuity)
- the relevant `/root/.claude/` host config (settings, skills, hooks)
- the npm package versions installed across all three workspaces (root, `frontend/`, `infra/cloudflare/`)
- the Claude Code Web platform context (cloud sandbox env, session-id linking, network allowlist coverage)
- a reference to the originating long-running Claude Code on the Web session

## Current dist-tags

| Tag | Snapshot | What it points to |
|---|---|---|
| **stable** | [`2026-05-15-stable/`](./2026-05-15-stable/SNAPSHOT.md) | End of Phase 13.B+ session (6 PRs merged: O1-O8) |
| **next** | — | Reserved for Phase 14 (docs refresh + RUNBOOK.md per [issue #49](https://github.com/subagentceo/knowledge-engineering/issues/49)) OR the agent-sdk `0.2.x → 0.3.x` minor bump, whichever lands first |
| **latest** | `HEAD` of `main` | Continuously updated as PRs merge |

## Why snapshots exist

A long-running Claude Code on the Web session (per
https://code.claude.com/docs/en/claude-code-on-the-web.md) can span
multiple days and produce many merged PRs. The session transcript
itself is private (`.jsonl` under `/root/.claude/projects/`), but the
**plan file**, **host config**, and **installed package versions** are
artifacts the operator wants to version and reference. The npm
dist-tag analogy gives a familiar mental model: snapshot the chassis
at a known-good state, label it `stable`, plan the next bump as
`next`, and let `latest` keep moving on `main`.

## How to cut a new snapshot

1. Branch off `main` as `claude/phase-<N>-snapshot-<label>`.
2. Create `docs/snapshots/<YYYY-MM-DD>-<label>/` with the same shape
   as `2026-05-15-stable/`:
   - `SNAPSHOT.md` — top-level manifest (cites the originating session)
   - `plans/` — copy of `/root/.claude/plans/*.md`
   - `claude/` — copy of `/root/.claude/settings.json` + relevant
     `skills/`, `hooks/` (NEVER `.credentials.json`, `projects/`,
     `sessions/`, `session-env/`)
   - `installations.md` — `npm ls --depth=0` per workspace
   - `web-environment.md` — Claude Code Web platform context
3. Update this README's "Current dist-tags" table.
4. Open a draft PR titled `snapshot: <label> — <one-line summary>`.

## Citations

- npm dist-tag mechanics: https://docs.npmjs.com/adding-dist-tags-to-packages
- Claude Code on the Web environment: https://code.claude.com/docs/en/claude-code-on-the-web.md
- Claude Desktop (Code tab) — surface for accessing Web sessions: https://code.claude.com/docs/en/desktop.md
- Platform comparison (CLI / Desktop / VS Code / JetBrains / Web / Mobile): https://code.claude.com/docs/en/platforms.md
