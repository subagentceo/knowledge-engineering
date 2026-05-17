# Runbook: Model migration via `/claude-api migrate` (OAPI2)

> Operator workflow for bumping the chassis default Claude model (e.g.
> Opus 4.6 → 4.7, Sonnet 4.6 → 4.7) using the bundled `claude-api` skill
> shipped with Claude Code. Pure operator procedure — no chassis code
> lives in this runbook.

The chassis model policy (per OMSG1 — see Citations) is:

| Role | Model |
| :--- | :--- |
| Orchestrator / planner | `claude-opus-4-7` |
| Code-review / feature-dev / security-review subagents | `claude-sonnet-4-6` |
| Crawl / triage | `claude-haiku-4-5` |

When Anthropic ships a newer default and the chassis decides to adopt it,
this runbook is the checklist the operator follows.

---

## 1. When to invoke

Trigger `/claude-api migrate` whenever **either** of the following files
gains a new model string (these are the two single-source-of-truth files
called out in the OMSG1 deferral note):

- [ ] `src/lib/token-counting.ts` — counts tokens against a named model
- [ ] `src/examples/_client.ts` — sets the default model for example
      scripts and the orchestrator's inner loop

Also invoke when a subagent definition under `.claude/agents/` or
`.claude/skills/*/SKILL.md` bumps its `model:` frontmatter, since the
skill will then sweep call sites for SDK-constant drift.

Do **not** invoke for:

- One-off experiments in `/tmp` or scratch dirs
- Cross-repo (sibling) migrations — those need their own PR per sibling
- The `claude-api` skill itself (that lives behind OAPI1, separate PR)

---

## 2. Pre-flight checks

Run each, in order. Abort if any fails.

- [ ] **Clean working tree.**
      `git status --porcelain` returns empty.
- [ ] **On a fresh branch off `main`.**
      `git checkout main && git pull --ff-only origin main`
      `git checkout -b claude/omsg-mig-<from>-to-<to>`
- [ ] **CI green on `main`.**
      `gh run list --branch main --limit 3 --json conclusion,workflowName`
      — every recent run must be `success`.
- [ ] **Vendor mirror has the new model's docs.**
      `ls vendor/anthropics/platform.claude.com/docs/en/models/<new-model>.md`
      If missing: `npm run crawl:vendor -- anthropics` and commit the
      mirror update on a separate PR before migrating.
- [ ] **OAuth-only invariant intact.**
      `grep -R "ANTHROPIC_API_KEY" src/ apps/` returns no setters (matches
      in `src/oauth/token.ts` rejecting the key are expected).
- [ ] **No in-flight model bump PR.**
      `gh pr list --search "in:title migrate" --state open` is empty.

---

## 3. Invocation patterns

The `claude-api` skill is bundled with Claude Code — no install step.
Invoke it via slash command inside a Claude Code session anchored at the
repo root.

| Scope | Command |
| :--- | :--- |
| Whole codebase | `/claude-api migrate this codebase to claude-opus-4-7` |
| One subtree | `/claude-api migrate everything under src/ to claude-opus-4-7` |
| Specific files | `/claude-api migrate apps/api.py and apps/worker.py to claude-opus-4-7` |
| Subagent only | `/claude-api migrate .claude/agents/code-review.md to claude-sonnet-4-7` |

What the skill handles automatically (per its spec — see Citations):

- SDK constant swaps (e.g. `Model.CLAUDE_OPUS_4_6` → `Model.CLAUDE_OPUS_4_7`)
- Removal of parameters the new model rejects
  (e.g. `temperature`, `top_p`, `top_k` are gone on Opus 4.7)
- `thinking: {type: "enabled", budget_tokens: N}` →
  `thinking: {type: "adaptive"}`
- Prefill → structured-outputs conversion
- Beta-header cleanup (e.g. `effort-2025-11-24`,
  `fine-grained-tool-streaming-2025-05-14`)
- Effort calibration — recommends
  `output_config: { effort: "xhigh" }` for coding workloads on Opus 4.7

Review every diff the skill proposes. Reject any change that touches
`src/oauth/token.ts` or the Worker env-sanitizer — those are load-bearing
for the OAuth-only invariant.

---

## 4. Post-migration verification

- [ ] **Verify chain passes.**
      `npm run verify`
      Covers citation guard, conventions, type-check, unit tests.
- [ ] **Integration tests.**
      `npm run test:integration` if present; otherwise run the example
      scripts that exercise the bumped path:
      `npm run dev "smoke: 1+1 with new model"`
- [ ] **Token-counting still matches.**
      Re-run any baseline assertions in
      `src/lib/token-counting.test.ts` — token counts can shift across
      model versions and previously-pinned numbers may need updating.
- [ ] **Cost + rate-limit re-baseline.**
      Pull one orchestrator transcript through `/cost` and compare $/run
      and TPM against the pre-migration baseline. Log results in
      `seeds/memory/heartbeat/last-tick.md`.
- [ ] **Subagent smoke.**
      Trigger each lane the bump touches — code-review, feature-dev,
      security-review — and confirm they still return structured output.

If any check fails, **do not patch around it in the migration PR.** Open
a follow-up issue and either back out the bump or land a targeted fix
behind its own outcome ID.

---

## 5. Outcome ID convention

Commits in a model-migration PR use:

```
(OMSG-MIG-<from>-to-<to>)
```

Examples:

```
chore(models): bump default orchestrator to claude-opus-4-7 (OMSG-MIG-4-6-to-4-7)
test(token-counting): re-baseline for opus 4.7 (OMSG-MIG-4-6-to-4-7)
docs(adr): record opus 4.7 adoption rationale (OMSG-MIG-4-6-to-4-7)
```

The convention test (`src/lib/conventions.test.ts`) accepts the dashed
form because it matches `(O[A-Z0-9-]+)`. Verify locally with
`npm run verify` before push.

PR title:

```
chore(models): migrate chassis default to <new-model> (OMSG-MIG-<from>-to-<to>)
```

Push with `--label automerge` if all checks pass; otherwise open as
draft.

---

## 6. Rollback

If a regression surfaces after merge:

1. `git revert <merge-sha>` on a new branch.
2. Title: `revert: model migration to <new-model> (OMSG-MIG-<to>-to-<from>)`
3. Land via the standard automerge path.
4. File an issue with reproducer and link both the original and revert
   PRs.

---

## Citations

- `vendor/anthropics/code.claude.com/docs/en/commands.md` — bundled
  slash-command surface; documents `/claude-api`.
- `claude-api` skill spec — not yet mirrored under `vendor/`.
  [TODO-OPERATOR] Mirror once OAPI1 lands; until then reference the
  upstream skill source at
  `https://github.com/anthropics/claude-code/tree/main/skills/claude-api`.
- OMSG1 ADR — chassis model policy (Opus 4.7 / Sonnet 4.6 / Haiku 4.5).
  Currently in flight as PR
  [`subagentceo/knowledge-engineering#208`](https://github.com/subagentceo/knowledge-engineering/pull/208).
  [TODO-OPERATOR] After merge, update this link to
  `docs/decisions/2026-05-17-messages-api-strategy-adoption.md`.
