# CLAUDE.md — pr-audit-template plugin

## Purpose

Per-merged-PR **audit follow-up generator**. After every PR merges, this plugin runs against the session transcript that produced the PR and emits:

1. A **follow-up PR body** summarizing the audit (no code change — pure documentation of how the merge happened).
2. **Top N issue bodies** (default 3) for the highest-impact findings — wasted tool calls, redundant operations, latency hotspots, low-throughput patterns.

The goal is **build → use → iterate → improve** the merge process itself by surfacing where the agent wasted calls so the next iteration is leaner.

## Why this exists

The OAUTO12+OAUTO14 chain unblocked the auto-merge gate. With ~24 PRs drained in one session via the `merge-loop.sh` workflow, the next bottleneck is **agent throughput**: how many tool calls per merged PR, how much latency per call, how often the agent re-reads files it already read, retries failing commands, or fans out to subagents that don't help.

Outcome: this plugin's audit data informs the next ADR / workflow change that improves throughput.

## Audit source

`~/.claude/projects/<project-slug>/<session-id>.jsonl` — the native Claude Code session transcript. Each line is a JSON record of type `assistant`, `user`, `attachment`, `system`, `file-history-snapshot`, etc.

**No OTLP/OpenTelemetry needed.** The transcript already contains every tool call, timestamp, and response. Reading it directly avoids the OTLP collector/exporter complexity that lives in `jadebot/` and other repos.

## Skills

| Skill | Verbs | Backend |
|---|---|---|
| `transcript-parse` | READ (extract tool calls + timings from JSONL) | shell + jq |
| `waste-analyze` | READ (rank tool calls by waste signal) | TS script in scripts/ |
| `pr-audit-body` | CREATE (emit PR body + 3 issue bodies via template) | TS script + handlebars-style template |

## userConfig

| Key | Type | Default | Purpose |
|---|---|---|---|
| `transcript_root` | string | `~/.claude/projects` | Per-host directory of JSONL transcripts |
| `top_findings` | number | `3` | How many findings → issues per audit |
| `gh_repo` | string | `subagentceo/knowledge-engineering` | Where audit PR + issues land |

## Anti-silent-failure rules (inherited from OIT1/OIT2)

1. Never `console.log(value)` of any audit data — write to stderr or to a structured output file
2. Every audit run produces an artifact at `docs/audits/<merged-pr-number>.md` (read-after-write verify)
3. Top-N selection must be deterministic given the same transcript (no randomness in ranking)
4. If the transcript is missing or empty for a PR's session, fail loudly with non-zero exit — do not silently emit an empty audit

## Outcome family

- **OAUDIT1** — plugin scaffold (this PR)
- **OAUDIT2** — `transcript-parse` skill + tests
- **OAUDIT3** — `waste-analyze` skill + ranking heuristic
- **OAUDIT4** — `pr-audit-body` skill + dogfood on the next merged PR

Each outcome is its own atomic commit per `docs/CONVENTIONS.md`.

## Related ADRs / docs

- `docs/decisions/2026-05-17-auto-merge-recovery.md` (OAUTO12) — the unblock that motivates auditing throughput
- `docs/decisions/2026-05-16-enterprise-control-plane.md` (OCP1) — this plugin extends control-plane meta with throughput data
- `plugins/github-it-admin/CLAUDE.md` — scaffold this plugin mirrors
- `plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md` — outcome discipline this plugin enforces

## Plugin spec citations

- https://code.claude.com/docs/llms.txt
- https://docs.claude.com/en/docs/claude-code/plugins-reference
