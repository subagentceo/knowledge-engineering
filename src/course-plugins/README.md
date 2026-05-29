# course-plugins — a course-grounded knowledge layer over `src/`

A Claude Code **plugin marketplace**, structured exactly like
[`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins)
(`.claude-plugin/marketplace.json` → one dir per plugin → `.claude-plugin/plugin.json` +
`skills/<skill>/SKILL.md`). The difference from the Anthropic role-plugins: every skill here is
**distilled from an Anthropic course transcript** and, where the topic is a Claude Code feature,
**grounded by citing the actual implementation in this workspace's vendored `src/`** — the same
anti-hallucination contract as `apps/topology-memory`.

## Component decomposition (the `src/` mirror)

Each skill follows the Anthropic thin-orchestrator convention (as in
`bio-research/skills/instrument-data-to-allotrope`), mirroring how `src/` itself breaks a feature
into small parts:

```
skills/<skill>/
  SKILL.md          ← thin orchestrator: frontmatter + overview + links + grounding + source
  references/*.md   ← deep conceptual detail, one file per sub-topic (no frontmatter)
  scripts/*         ← runnable code, where the course showed real code (.py / .js / .md)
```

Totals: **55 skills → 55 SKILL.md (now 18–45 lines) + 103 references + 45 scripts**. `claude-api`,
`claude-deployments`, and `model-context-protocol` carry runnable `scripts/` (the code-bearing
courses); `claude-cowork` and `ai-fluency` are references-only (usage / pedagogy, no code).
Every reference and script is linked from its SKILL.md by a relative markdown link — no orphans.

## Self-contained scripts (programmatic tool calling)

All 41 Python scripts declare their dependencies inline via [PEP 723](https://peps.python.org/pep-0723/),
so they run with no setup:

```bash
uv run src/course-plugins/<plugin>/skills/<skill>/scripts/<name>.py
```

`uv` resolves and caches the declared deps per run — no virtualenv, no `pip install`, no global
package-manager churn (it stays inside `~/.cache/uv`). The host already has every runtime the
[agentskills.io scripts guide](https://agentskills.io) lists (`uv` 0.11.8, Python 3.14, Node 24,
`npx`, `bun`, `deno`, `ruby`, `go`) — nothing needed installing. The 3 `claude-code` hook scripts
are Node and run with `node` (built-ins only, no deps). See `PROVENANCE.md` for the dependency map
and the verification gate.

## Why this lives in `src/`

`src/` is the deobfuscated Claude Code spec; `CLAUDE.md` forbids patching it in place. This
directory does **not** patch the CLI — it is a self-contained marketplace *next to* the spec that
points back into it. A skill that says "Plan Mode researches before executing" links to
`src/tools/EnterPlanModeTool/`, so the claim is checkable against the installed code, not recalled.

## Plugins

| Plugin | Source course(s) | Grounds into `src/` |
|---|---|---|
| `claude-code` | Claude Code in Action | yes — commands, tools, hooks, skills |
| `claude-api` | Building with the Claude API + course notes | no (API-side) |
| `claude-deployments` | Claude with Amazon Bedrock; Claude with Vertex AI | no (API-side) |
| `model-context-protocol` | Intro to MCP; MCP Advanced Topics | partial — `src/` MCP client/server plumbing |
| `claude-cowork` | Introduction to Claude Cowork | no (Cowork surface) |
| `ai-fluency` | AI Fluency for Educators / Students; Teaching AI Fluency | no (pedagogy) |

## Install (in any Claude Code session)

```
/plugin marketplace add /Users/alexzh/claude-xcode-workspace/src/course-plugins
/plugin install claude-code@course-plugins
```

## Provenance contract

Every skill cites its source course note inline. `PROVENANCE.md` records the source file +
sha256 of each transcript and the `src/` paths each plugin links to. Truth is the transcript and
the installed code — never hand-recalled. See `PROVENANCE.md`.
