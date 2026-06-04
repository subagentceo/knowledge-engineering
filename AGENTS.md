# AGENTS.md

Codex-facing operating instructions for this repository. These instructions complement `CLAUDE.md`; they do not replace it.

## Required Reading

Before non-trivial work, read:

1. `CLAUDE.md`
2. `DEVELOPER.md`
3. `docs/CONVENTIONS.md`
4. `README.md`

For heartbeat, project-governance, or orchestration work, also read:

1. `seeds/posture/session-start.xml`
2. `docs/PROJECT.md`
3. `docs/pending.md`
4. `seeds/memory/heartbeat/last-tick.md`

## Context File Management

Use the Anthropic `claude-md-management` pattern for AGENTS/CLAUDE context files:
https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management

This applies to every context file in the repo, including:

- `AGENTS.md`
- `CLAUDE.md`
- `plugins/*/CLAUDE.md`
- Any future `CLAUDE.md`, `.claude.md`, `.claude.local.md`, or `AGENTS.md` files

When asked to update project instructions or when you discover durable guidance worth preserving:

1. Inventory context files first:
   ```bash
   find . -name AGENTS.md -o -name CLAUDE.md -o -name .claude.md -o -name .claude.local.md
   ```
2. Choose the narrowest file that should own the instruction. Repo-wide rules belong here or in `CLAUDE.md`; plugin-specific rules belong in that plugin's `CLAUDE.md`.
3. Audit before editing. State what is missing, stale, duplicated, or too broad.
4. Propose concise additions instead of rewriting whole files.
5. Apply only durable, actionable guidance. Do not store transient task notes, status recaps, or one-off debugging observations.
6. Avoid duplication. Prefer linking to the canonical file when a rule already exists.
7. After editing, verify the file is still scannable: clear headings, short bullets, no long narrative blocks.

If the requested change is ambiguous or would alter agent identity, security posture, or repo-wide workflow, ask before editing.

## Repository Shape

This is a TypeScript-first multi-agent research chassis:

- `src/` contains the orchestrator, MCP servers, lanes, agents, and library code.
- `scripts/` contains crawlers, verification tooling, setup scripts, and project automation.
- `vendor/` is a large checked-in documentation mirror. Treat it as external, read-only source material.
- `infra/cloudflare/` contains Cloudflare Worker infrastructure.
- `frontend/` contains the Cloudflare Worker-backed frontend.
- `.claude/` contains Claude skills, agents, plugins, and settings.
- `docs/`, `seeds/`, and `rubrics/` carry governance, prompts, memory, and grading criteria.

Prefer narrow changes that follow existing local patterns.

## Hard Invariants

- OAuth-only: never add, set, document, or depend on `ANTHROPIC_API_KEY`. Use `CLAUDE_CODE_OAUTH_TOKEN`.
- Tests under `scripts/lib/`, `src/lib/`, and `infra/cloudflare/src/` need an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`.
- Commit subjects must end with an outcome ID such as `(O1)`. See `docs/CONVENTIONS.md`.
- PR bodies must link an issue with `Closes #N` or `Refs #N`.
- Do not write runtime code that mutates `vendor/`; it is mirrored external documentation.
- Do not treat `third_party/` as part of the tracked or CI-visible codebase.

## Commands

Use Node 20 or newer.

```bash
npm install
npm run build
npm run lint
npm run verify
```

Targeted checks:

```bash
npm run verify:mcp
npm run verify:citations
npm run verify:gates
npm run verify:libs
npm run verify:coverage
npm run verify:tdd
npm run verify:freshness
npm run verify:project
npm run verify:security-posture
```

Local development:

```bash
npm run dev "<task>"
npm run mcp:bridge
npm run mcp:npm-registry
npm run sandbox:dev
```

Vendor crawling:

```bash
npm run crawl:vendors
npm run crawl:vendor -- <name>
```

## Coding Style

- TypeScript modules are ESM.
- Keep strict TypeScript settings clean; `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are enabled.
- Prefer structured parsing and existing helper modules over ad hoc string manipulation.
- Keep comments sparse and focused on why a constraint exists.
- Use local test helper patterns where present. In tests that call bare `assert.*`, import `assert` explicitly.
- Search with `rg` and avoid traversing large ignored trees unnecessarily.

## Verification Guidance

Run the narrowest meaningful check for small edits, then escalate to broader checks when touching shared behavior:

- Library or MCP changes: `npm run verify:libs` and `npm run verify:mcp`.
- Test additions or edits: `npm run verify:citations` and `npm run verify:tdd`.
- Workflow, posture, or security changes: `npm run verify:security-posture` and relevant workflow tests.
- Before PR handoff: `npm run preflight` when practical, otherwise document which verification commands were run.

If a command cannot run because required local credentials, Terraform state, or network access are unavailable, report that explicitly.

## Frontend and Infra Notes

- `frontend/` and `infra/cloudflare/` have their own package and Wrangler configs. Inspect those local files before running dev or deploy commands.
- Never deploy unless the user explicitly asks.
- For Cloudflare Worker changes, prefer existing Wrangler scripts and repo patterns.

## Agent Conduct

- Work with the current git state. Do not revert unrelated user changes.
- Keep edits scoped to the requested task.
- Do not make commits unless explicitly asked.
- When adding tests or docs, cite the source material expected by the repo's verification chain.
