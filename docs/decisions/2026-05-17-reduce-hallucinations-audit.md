---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OBP1
supersedes: none
---

# ADR — reduce-hallucinations audit against the chassis prompt surface

## Context

Anthropic publishes a canonical "Reduce hallucinations" prompt-engineering
guide on platform.claude.com (path `/docs/en/build-with-claude/prompt-engineering/reduce-hallucinations`).
The doc is **not** currently in the local vendor mirror — `find
vendor/anthropics -iname "*hallucin*"` returns zero files under the
`docs/en/build-with-claude/` tree, and `vendor/anthropics/urls.md` does
not list a `reduce-hallucinations` path. **TODO-OPERATOR:** add the
prompt-engineering directory to the platform.claude.com crawl source
list so future ADRs can `@cite` the file directly.

The principles the doc canonically advances (recovered from the
operator's own paste-prompts and from the indirect mention in
`vendor/anthropics/code.claude.com/docs/en/champion-kit.md` — the
"hallucination is usually a context problem" line) are:

1. **Give Claude an explicit out.** Allow "I don't know" / "TODO" /
   "needs operator" as first-class responses instead of forcing a
   confident guess.
2. **Cite-or-defer.** Require Claude to ground claims in a retrieved
   document, or explicitly state the gap.
3. **Anchor in retrieved evidence first.** Prefer "read the file, then
   answer" over "answer from memory."
4. **Ask Claude to verify before asserting.** Run the test, read the
   actual output, then claim done.
5. **Use chain-of-verification.** Decompose a claim into checkable
   sub-claims with their own sources.
6. **Constrain to context.** Tell Claude "answer only from the
   following passage" when the source is in-band.

This ADR audits the chassis against (1)-(6), records where we already
clear the bar, and proposes 5 concrete deltas as follow-up outcome IDs.
No prompt edits land in this PR.

## Current chassis state (what we already do well)

- **`@cite` discipline** (`scripts/lib/citation-guard.ts`): every test
  file must name a `vendor/`/`seeds/`/`rubrics/` source. This is
  principle (2) **mechanically enforced** — stronger than the doc's
  advice.
- **Vendor mirror grounding**: 25 vendor doc surfaces under `vendor/`
  give Claude a local, deterministic retrieval target — principle (3).
- **OAuth-only invariant**: irrelevant to hallucinations, but it
  prevents the failure mode where Claude papers over a missing
  credential by fabricating a key value.
- **"Say so explicitly when you can't test" guidance** in the
  operator's global `~/.claude/CLAUDE.md` and in the executing-plans
  skill's `verification-before-completion` subskill — principles (1)
  and (4) already encoded at the operator-prefs layer.
- **Posture XML directives D1-D11** carry cite-target validation (a
  schema test in `src/lib/posture-shape.test.ts` enforces that every
  `<cite>` in `session-start.xml` resolves to a real file) — this is
  principle (2) applied to the load-bearing system prompt itself.

**Honest assessment:** the chassis already exceeds the doc on (2) and
(3). It is *under-spec* on (1), (5), and (6) at the prompt-surface
layer — the discipline lives in test infra and operator prefs but is
not surfaced in the runtime system prompt or in skills templates.

## Deltas (proposed; NOT applied in this PR)

### Delta 1 — explicit "out" in session-start posture (OBP1a)

**File:** `seeds/posture/session-start.xml`
**Change:** add a new `<d>` directive `D12` named `cite-or-defer`,
applies to all primitives, body: *"When uncertain about a fact, prefer
'I need to read the file' or 'TODO-OPERATOR: <gap>' over a confident
guess. Hallucinations in this chassis are escalated as bugs, not
tolerated as style."*
**Principles satisfied:** (1), (2).

### Delta 2 — cite-or-defer block in SKILL.md authoring template (OBP1b)

**File:** propose a new section in each `plugins/platform-engineering/skills/*/SKILL.md`
under a "When the source is ambiguous" heading, telling skill-invoked
sessions to surface the ambiguity with a `TODO-OPERATOR:` rather than
proceed. Start with `citations-tests-outcomes/SKILL.md` since it is
the meta-skill that propagates discipline.
**Principles satisfied:** (1), (2).

### Delta 3 — retrieve-then-answer order in operator seeds (OBP1c)

**File:** `seeds/prompts/system-orchestrator.md` and
`seeds/prompts/orchestrator.system.md` — add an opening rule: *"Read
the vendor file before answering a vendor-shaped question. If the
file is not in the mirror, mark TODO-OPERATOR and stop, do not
substitute training-data knowledge."*
**Principles satisfied:** (3), (1).

### Delta 4 — chain-of-verification scaffold for subagent prompts (OBP1d)

**File:** `seeds/prompts/subagent-verifier.md` and
`subagent-npm-research.md`. Add a section "Self-check before
returning" listing 3 sub-claims the agent decomposes its answer into,
each with its own citation. This formalizes principle (5) for the
two highest-fanout subagents.
**Principles satisfied:** (5), (2).

### Delta 5 — TODO-OPERATOR taxonomy (OBP1e)

**File:** new `docs/TODO-OPERATOR.md` documenting the canonical use of
the marker (the "out" Claude is permitted to take), so it is a
**first-class artifact** rather than ad-hoc string. PR template
already references `TODO-OPERATOR`; this delta makes it discoverable.
**Principles satisfied:** (1).

## Follow-up outcome IDs

- **OBP1a** — apply Delta 1 (posture XML D12)
- **OBP1b** — apply Delta 2 (SKILL.md template extension)
- **OBP1c** — apply Delta 3 (orchestrator seeds retrieve-then-answer)
- **OBP1d** — apply Delta 4 (subagent self-check scaffold)
- **OBP1e** — apply Delta 5 (TODO-OPERATOR taxonomy doc)

Each follow-up is a single small PR, ready-for-review, automerge-labeled.

## Citations

- `seeds/citations/define-outcomes.md` — outcome-driven discipline this ADR adopts
- `vendor/anthropics/code.claude.com/docs/en/champion-kit.md` — the
  "hallucination is usually a context problem" framing this ADR
  inherits
- `seeds/posture/session-start.xml` — file targeted by Delta 1
- `plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md` —
  file targeted by Delta 2

## Open question (for the operator)

The canonical Anthropic reduce-hallucinations doc itself is not in the
mirror. **TODO-OPERATOR:** add `platform.claude.com/docs/en/build-with-claude/prompt-engineering/reduce-hallucinations`
(and the sibling prompt-engineering pages) to the crawl source list,
then re-cite this ADR. Until then, the principles (1)-(6) above are
restated from training-data summary and from the indirect mention in
`champion-kit.md`; they should be treated as best-effort, not as a
verbatim transcription.
