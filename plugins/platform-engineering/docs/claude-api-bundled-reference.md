# Plugin reference — bundled `/claude-api` Agent Skill

> Audience: authors of skills under `plugins/platform-engineering/skills/`.
> Outcome: **OAPI1**.

## TL;DR

The `claude-api` skill is **bundled with Claude Code** by Anthropic. Source:
[`anthropics/skills/tree/main/skills/claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api).
**Do not re-implement it inside this plugin.** When a chassis-authored skill needs Anthropic
SDK behavior (prompt caching, model migration, Managed Agents onboarding, batch API, files
API, citations, Memory tool, extended thinking), defer to `/claude-api`.

## Surface summary

| Capability | Owner |
| :--- | :--- |
| Model migration (4.5 → 4.6 → 4.7, retired models) | `/claude-api migrate` (bundled) |
| Managed Agents onboarding | `/claude-api managed-agents-onboard` (bundled) |
| Prompt-cache tuning, batch API, files API, citations, Memory, extended thinking | `/claude-api` free-form (bundled) |
| AlloyDB / Voyage / Turbopuffer wiring | `plugins/platform-engineering/skills/turbopuffer-embeddings` (this plugin) |
| Citation/test/outcome discipline | `plugins/platform-engineering/skills/citations-tests-outcomes` (this plugin) |

## Authoring guidance for plugin skills

1. **Don't duplicate.** If a skill in this plugin finds itself explaining "how to bump the
   Claude model in this file," delete that section and instead say: "run `/claude-api migrate`."
2. **Don't gate on it.** `/claude-api` is bundled — do not add a `requires:` field that
   references it. Bundled skills have no manifest entry; they ship with the CLI.
3. **Do cross-reference.** When a skill's body mentions Anthropic SDK behavior, link to
   `docs/operator-runbooks/claude-api-skill-usage.md` (the operator runbook for OAPI1).
4. **OAuth-only invariant.** Nothing in `/claude-api`'s bundled body sets
   `ANTHROPIC_API_KEY`. If a future revision starts proposing it, file an issue — the chassis
   fails closed on that key per `src/oauth/token.ts`.

## How to confirm a session has it loaded

See the operator runbook's "Verifying the skill is loaded" section
(`docs/operator-runbooks/claude-api-skill-usage.md`). Short version: type `/` at the Claude
Code prompt; `claude-api` should appear marked **Skill**.

## Citations

- `vendor/anthropics/code.claude.com/docs/en/skills.md` — bundled-skill mechanics.
- [`github.com/anthropics/skills/tree/main/skills/claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api) — upstream source.
- `docs/operator-runbooks/claude-api-skill-usage.md` — operator-facing runbook for OAPI1.
