# Runbook — Using the bundled `/claude-api` Agent Skill

> Outcome: **OAPI1** — reference the official Anthropic `claude-api` Agent Skill from the chassis so chassis-authored skills, ADRs, and runbooks can cite it as the canonical surface for Anthropic SDK migration and Managed Agents onboarding.
> Audience: operator + any Claude session running in this repo.
> Status: live as of 2026-05-17.

## What `claude-api` is

`claude-api` is an **official open-source Agent Skill** maintained by Anthropic at
[`anthropics/skills/tree/main/skills/claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api).
It ships **bundled** with Claude Code — every Max account in the rotation already has it. The
chassis does **not** re-vendor the skill content; it references it.

Per `vendor/anthropics/code.claude.com/docs/en/skills.md`, bundled skills are prompt-based:
they give Claude detailed instructions and let it orchestrate work using its tools. They are
invoked with `/<skill-name>` the same as any other skill.

## When `/claude-api` activates

**Auto-activation triggers** (from the skill's own description, surfaced via Claude Code's
skill matcher):

- The file under edit imports `anthropic` (Python) or `@anthropic-ai/sdk` (TypeScript/Node).
- The user asks about the Claude API, Anthropic SDK, or Managed Agents.
- The user adds, modifies, or tunes a Claude feature in a file — caching, extended thinking,
  context-window compaction, tool use, the Message Batches API, the Files API, citations,
  Memory tool, or model selection (Opus / Sonnet / Haiku).
- Questions about prompt-cache hit rate inside an Anthropic SDK project.

**Auto-skip conditions:**

- The file imports `openai` or another non-Anthropic provider SDK.
- The filename signals a non-Anthropic path (`*-openai.py`, `*-generic.py`).
- The work is provider-neutral or general programming / ML.

**Manual invocation:** type `/claude-api` at the Claude Code prompt. Subcommands follow.

## Main subcommands

| Subcommand | Use when |
| :--- | :--- |
| `/claude-api migrate` | Migrating between Claude model versions (Opus 4.5 → 4.6, 4.6 → 4.7, retired-model replacements) or upgrading SDK majors. Reads the file under edit, identifies model IDs and deprecated parameters, proposes the patch. |
| `/claude-api managed-agents-onboard` | Onboarding a workload to the Managed Agents platform (`platform.claude.com`). Walks the operator through outcome definition, tool surface design, and the first scaffold consistent with `vendor/anthropics/platform.claude.com/docs/en/managed-agents/`. |

The skill also responds to free-form questions ("how do I enable prompt caching here?") — the
subcommand list above is non-exhaustive; the skill body in the bundled distribution is the
source of truth.

## Chassis cross-references

- **OMSG1** (model-selection policy ADR, [TODO-OPERATOR] not yet authored — placeholder for
  the ADR that pins which Claude model the chassis defaults to per lane). When `/claude-api migrate`
  proposes a model bump, the operator should reconcile against OMSG1 before accepting.
- **OAPI2 runbook** (migration workflow runbook, future — companion to this doc). OAPI2 will
  capture the end-to-end "run `/claude-api migrate`, verify against `vendor/anthropics/`,
  open PR" loop.
- **OPE3** (skill conformance, future — under the platform-engineering plugin). OPE3 will
  enforce that chassis-authored skills under `plugins/platform-engineering/skills/` do not
  duplicate `/claude-api`'s surface and instead defer to it for Anthropic-SDK questions.
- **Polyrepo posture** — `seeds/posture/session-start.xml` mandates OAuth-only auth. The
  `/claude-api` skill is environment-agnostic; nothing in its bundled body conflicts with the
  no-`ANTHROPIC_API_KEY` invariant.

## Verifying the skill is loaded

Per `vendor/anthropics/code.claude.com/docs/en/skills.md`, bundled skills appear alongside
custom skills in the Claude Code session's available-skills list. To verify in a live session:

1. Open the Claude Code prompt.
2. Type `/` and scroll the command palette — `claude-api` should appear, marked **Skill** in
   the purpose column per the bundled-skill convention.
3. Alternatively, type `/claude-api` directly — the skill loads on demand without any
   `npm install` or `plugin install` step.
4. If `/claude-api` does not appear: the local Claude Code CLI may be older than the version
   that bundled it. Run `claude --version` and compare against the most recent CLI changelog
   at `code.claude.com/docs/en/changelog.md`. Bundled skills land on the CLI release train,
   not the Desktop release train — do not check the Desktop changelog for skill availability.

## What this runbook is **not**

- Not a re-implementation of `claude-api`. The skill is bundled; the chassis just points at it.
- Not a substitute for reading the skill source on GitHub when a behavior is unclear.
- Not authoritative on Anthropic SDK behavior — `vendor/anthropics/` extracts and the live
  documentation at [`platform.claude.com/docs`](https://platform.claude.com/docs) are.

## Citations

- `vendor/anthropics/code.claude.com/docs/en/skills.md` — bundled-skill mechanics + `claude-api`
  is listed by name as a bundled skill.
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/skills-guide.md` —
  Agent-Skills authoring guide that `claude-api` itself conforms to.
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/skills.md` — Managed Agents
  + skills interaction surface; relevant to `/claude-api managed-agents-onboard`.
- [`github.com/anthropics/skills/tree/main/skills/claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api)
  — upstream source for the bundled skill. [TODO-OPERATOR] add to the anthropics crawl
  source list so the next vendor refresh mirrors the skill's `SKILL.md` under
  `vendor/anthropics/skills/claude-api/`.
- OMSG1 ADR — model-selection policy (forward reference; ADR not yet authored).
