---
kind: operator-prompt-seed-heartbeat
date: 2026-05-10
verbatim: false
note: |
  Heartbeat directive from the operator. Same caveat as the parent file
  (operator-2026-05-10.md) applies: this is a reconstruction, not a verbatim
  transcript. Captures the operator's third turn after PR 3 was scaffolded,
  which adds a heartbeat /loop, cross-session memory, the PR 3 → merge →
  PR 4 cycle, and GitHub Project + plugin install directives.
status: load-bearing
parent: operator-2026-05-10.md
sibling: operator-2026-05-10-followup.md
---

# Operator heartbeat directive — 2026-05-10 (third turn)

The operator's third directive. **Dogfood the primitives already
established** in PR 3 (posture XML, /routines umbrella, citation guard,
rubric set, cloud-agent runner scaffold). Treat as part of the Phase 0
working agreement.

## Directives (paraphrased)

### 1. Decompose to dogfood primitives

Decompose the operator prompt against the established primitives and
directives. The lead orchestration agent ingests this decomposition,
posture XML, rubrics, and citations as its load-bearing context.

### 2. One GitHub project, milestones = phases, issues = planned work

There is one GitHub project. Phase 0 is complete. Phases 1-12 are
milestones backed by `rubrics/phase-<N>.md`. Issues hang off each
milestone and link to PRs. The agent autonomously sets this up.

### 3. Heartbeat /loop across sessions with persisted memory

The lead orchestration agent runs as a long-running heartbeat across
multiple Claude Code sessions. Memory persists between sessions; the
heartbeat picks up where the previous session left off. This is the
Boris Cherny "lead orchestration agent that deploys 100% of the code"
pattern.

### 4. Use platform.claude.com docs as guidance (but NOT Managed Agents API)

The operator points to `platform.claude.com/docs/en/managed-agents/...`
as **guidance only**. We do NOT call the Managed Agents API. We DO
adopt the architectural patterns (outcomes, rubrics, memory, dreams,
multi-agent) and translate them into Messages-API-over-OAuth
implementations.

The two new docs to ingest (final PR 3 commits):

- `platform.claude.com/docs/en/managed-agents/dreams.md`
- `platform.claude.com/docs/en/managed-agents/memory.md`

### 5. Turbopuffer hypothesis

Anthropic's managed-agents memory/dreams features are very likely
backed by Turbopuffer. The operator pays for Turbopuffer access
(~$64/mo) but has not yet used it. Phase 11's optional embeddings work
+ Turbopuffer's vector store is the operator-side equivalent of
managed-agents memory: store embeddings and rubric outcomes per agent
session, query semantically across sessions.

### 6. PR 3 → merge → PR 4

After the final Phase 0 commits land, PR 3 gets merged into `main` and
the branch deleted. PR 4 opens from a fresh branch off the merged main,
with three concerns:

1. **Validate PR 3 body's operator-gating steps for Phase 1** —
   surface anything that needs operator action before Phase 1 can
   start (Neon Console install, Cloudflare secret sync, etc.).
2. **GitHub project setup** — create milestones for phases 1-12 backed
   by `rubrics/phase-<N>.md`; create one issue per phase linked to its
   milestone; the issues are the work-tracking surface for future PRs.
3. **Plugin install** — `.claude/plugins.json` with the three Anthropic
   marketplaces (already named in the long-arc plan), plus event-
   listening plugins and language-server plugins for code intelligence.

### 7. Boris Cherny lead orchestration pattern

The lead orchestration agent strategy that deploys 100% of the code to
the codebase. Already cited as the long-arc goal in
`docs/architecture.md`. PR 4's plugin install + GitHub project + the
heartbeat skill operationalize the pattern.

## Final PR 3 commit list (this directive)

1. **0final-a.** `seeds/prompts/operator-2026-05-10-heartbeat.md` —
   this file (the decomposition).
2. **0final-b.** Pull `dreams.md` + `seeds/citations/dreams.md` extract.
3. **0final-c.** Pull `memory.md` + `seeds/citations/memory.md` extract.
4. **0final-d.** `.claude/skills/heartbeat.md` — the cross-session
   orchestrator loop skill (a `/routines run` consumer that itself
   loops over a session-spanning task queue).
5. **0final-e.** Update PR 3 body to surface the operator-gating
   steps that PR 4 must validate.

## Source documents (ingested in the final commits)

| URL | Local path | Drives |
|---|---|---|
| `platform.claude.com/docs/en/managed-agents/dreams.md` | `vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md` | heartbeat skill, Phase 11 Turbopuffer-backed memory work |
| `platform.claude.com/docs/en/managed-agents/memory.md` | `vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md` | heartbeat skill, Phase 11 Turbopuffer-backed memory work |

## What PR 4 must validate

The operator-gating steps for Phase 1 are the items in PR 3's body
under "Status of the cloud-agent runner" plus any new gates discovered
in the dreams/memory ingest:

- Neon Console: install Claude/GitHub integration on
  `subagentceo/knowledge-engineering`.
- Neon → Cloudflare: secret sync (Neon API key + project ID into
  Cloudflare Worker secrets).
- Cloudflare: operator adds `CLAUDE_CODE_OAUTH_TOKEN` and
  `GITHUB_TOKEN` via `wrangler secret put`.
- Turbopuffer: account exists ($64/mo paid). Provision a workspace +
  API token. Hold for Phase 11; not Phase 1.
- Phase 1 is "crawler infrastructure," doesn't need any of the cloud
  secrets — but PR 4's validation report makes the dependency graph
  explicit.
