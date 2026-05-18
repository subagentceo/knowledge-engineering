---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OMA5
---

# ADR — map Anthropic Managed Agents memory primitives to chassis memory stores

<!--
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite seeds/citations/memory.md
@cite seeds/citations/define-outcomes.md
@cite docs/decisions/2026-05-17-managed-agents-strategy-adoption.md
-->

## Context

[`vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md)
describes Anthropic's **Managed Agents (MA)** memory model: workspace-scoped
**memory stores** mounted at `/mnt/memory/<name>` inside a session container,
addressed by path, with `read_only` / `read_write` access modes, immutable
**memory versions** (`memver_...`) for audit, and an automatic system-prompt
note describing each mount. Past versions may be reaped after 30 days.

The chassis in this repo does **not** run on Managed Agents (see
[`2026-05-17-managed-agents-strategy-adoption.md`](2026-05-17-managed-agents-strategy-adoption.md)
(OMA1) — OAuth-only on Cloudflare Workers + Sandbox SDK rejects the
`ANTHROPIC_API_KEY` MA requires). OMA1 sketched, in prose, that the chassis
already has a memory-rich substrate: CLAUDE.md cascade, heartbeat seeds, vendor
mirror, auto-memory, posture XML. This ADR (**OMA5**) formalizes that sketch
as a one-to-one mapping table so future contributors can locate the chassis
equivalent of any MA memory primitive without re-deriving it.

## Chassis memory stores (verified 2026-05-17)

Every path below was `ls`-verified on the date of this ADR.

| # | Store | What it persists | Lifespan | Writer | Mount-equivalent |
|---|---|---|---|---|---|
| 1 | `CLAUDE.md` cascade — `~/.claude/CLAUDE.md` (global), `/Users/alexzh/CLAUDE.md` (operator polyrepo), `/Users/alexzh/subagentmcp/CLAUDE.md` (enterprise mirror), `./CLAUDE.md` (this repo) | Identity rules, account inventory, repo layout, project conventions, rotation protocol | Permanent; operator-curated | Operator (Claude may propose edits via PR) | Auto-loaded into every session's system prompt by Claude Code — the chassis analogue of MA's "mount-description-in-system-prompt" behavior. |
| 2 | `seeds/memory/heartbeat/` — `last-tick.md`, `next-actions.md`, `decisions.md`, `open-questions.md`, `goals.md`, `README.md` | Cross-tick orchestrator state: what the previous tick decided, what's queued next, durable decisions, unresolved questions, multi-tick goals | Cross-session (git-versioned) | Agent (heartbeat skill) + operator | Closest analogue to an MA `read_write` store at `/mnt/memory/heartbeat`. |
| 3 | `seeds/citations/` — 20 extracts (memory.md, define-outcomes.md, multi-agent.md, dreams.md, neon-branching.md, turbopuffer.md, openfeature.md, cloudflare-flagship.md, code-execution-tool.md, batch-processing.md, ...) | Quoted snippets of vendor docs that tests `@cite` for grounding | Git-versioned; refreshed when upstream changes | Agent + operator | MA `read_only` mount seeded once and referenced by name. |
| 4 | `seeds/posture/session-start.xml` | Load-bearing prompt primitive: auth posture, commit discipline, /routines pattern, codemode + sandbox posture, doc-rules, sources | Permanent; deliberately edited | Operator + agent (via PR) | MA store `description` + `instructions` fields — the "what is this and how do I use it" mount metadata, materialized as one XML file. |
| 5 | `seeds/memory/dreams/visions.md` | Multi-week vision threads per OMA2 (chassis analogue of MA "dreams") | Cross-session (git-versioned) | Agent + operator | MA `read_write` store at `/mnt/memory/dreams`. |
| 6 | `/Users/alexzh/.claude/projects/-Users-alexzh-subagentmcp-subagentceo-knowledge-engineering/memory/` (auto-memory) — `MEMORY.md`, `reference_mcp_connectors.md` | Agent-private working knowledge written by Claude Code outside git (machine-scoped, not synced across rotation) | Per-machine; survives session but **not** account rotation | Agent (Claude Code auto-writes) | Closest direct analogue to MA's per-session scratchpad inside `/mnt/memory/`, but **machine-local** rather than workspace-scoped. |
| 7 | `vendor/<name>/` — 25 mirrors (anthropics, claude-sitemap, cloudflare, neon, stripe, twilio, workos, elevenlabs, aws, gcp, sentry, intercom, ...) | Immutable bytes from upstream vendor docs | Refreshed on cadence by `scripts/crawl-vendors.ts` | Crawler (agent) | MA `read_only` store: never mutated in-place by agents, only by the refresh job. |

## Mapping: MA memory primitives → chassis stores

| MA primitive (memory.md §) | Chassis equivalent |
|---|---|
| **Memory store** (workspace-scoped collection) | One row in the table above. Stores #2, #3, #5 are the writable ones; #1, #4, #7 are operator/crawler-curated; #6 is machine-local. |
| **Mount at `/mnt/memory/<name>`** with system-prompt note | `CLAUDE.md` cascade (#1) is the auto-included system-prompt note; `seeds/posture/session-start.xml` (#4) is the load-bearing mount description. |
| **`access: read_only` vs `read_write`** | Enforced by convention + git review, not filesystem perms. Vendor mirror (#7) and citations (#3) are de-facto `read_only` for agents inside a tick; heartbeat (#2) and dreams (#5) are `read_write`. |
| **Memory version** (`memver_...`) with immutable history | `git log` on the repo. Every chassis write is a commit with `(O<N>)` trailer — git supplies the audit trail MA gets from `memver_*`. |
| **Version redact** (scrub sensitive content from history) | `git filter-repo` + force-push (operator-only). Not automated. |
| **30-day version reaping** | **N/A** — git retains full history. Chassis is strictly more durable here. |
| **`description` + `instructions` fields** | `CLAUDE.md` per-directory + `seeds/posture/session-start.xml`. |
| **Per-session container scratchpad** | Auto-memory dir (#6). Machine-local, not rotation-portable — see Gaps. |
| **Workspace scoping** | Git repo + branch. Workspace ≅ repo; session ≅ branch/worktree. |

## Gaps (what MA has that the chassis does not)

1. **Cross-machine session scratchpad.** MA's `/mnt/memory/` is workspace-scoped and follows the agent across containers. The chassis auto-memory (#6) is **machine-local** (`/Users/alexzh/.claude/projects/...`) and does not survive the 5-hour rotation across the three Max accounts. **Mitigation:** durable knowledge graduates out of auto-memory into `seeds/memory/heartbeat/` (git-versioned) at end of tick. OMA1 already encodes this discipline; OMA5 makes the gap explicit.
2. **Per-version redact API.** Chassis relies on `git filter-repo`, which is manual and rewrites history. Acceptable given the OAuth-only invariant means no secrets should ever land in git in the first place.
3. **Reaping at 30 days.** Chassis intentionally retains full history. Not a gap — a deliberate inversion.

No critical gap blocks adoption of MA-equivalent workflows on the chassis.

## Consequences

- Future ADRs and skills referencing "memory" must name a row in the table
  above. PRs that introduce a new memory store must add a row to this ADR (or
  supersede it).
- The auto-memory dir (#6) is treated as **ephemeral cache**, never as the
  source of truth. Heartbeat graduation at end-of-tick is the durability
  contract.
- `seeds/citations/memory.md` is the canonical extract; updates to upstream
  `memory.md` flow through the crawler and then through that file.

## Sources

- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md) — MA memory model
- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md) — session lifecycle that attaches stores
- [`seeds/citations/memory.md`](../../seeds/citations/memory.md) — quoted extract
- [`seeds/citations/define-outcomes.md`](../../seeds/citations/define-outcomes.md) — outcome-driven framing
- [`2026-05-17-managed-agents-strategy-adoption.md`](2026-05-17-managed-agents-strategy-adoption.md) (OMA1) — parent ADR this one formalizes
