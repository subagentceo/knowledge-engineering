---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OBP2
---

# ADR — guardrails audit: consistency, jailbreak, prompt-leak

Map three Anthropic best-practice guardrail docs onto this chassis's
posture. Decide what to adopt, what to ratify-as-already-done, and what
to explicitly NOT adopt — with rationale.

## Context

The chassis is an **internal-only** multi-agent research and
operations surface. There is one operator (alex-jadecli + two rotation
aliases), zero external users, and no public-facing chat endpoint. Every
session runs under OAuth as the operator; `ANTHROPIC_API_KEY` is rejected
at every layer (see `src/oauth/token.ts`, the Worker env-sanitizer, the
Sandbox container env-sanitizer).

This shape inverts the usual best-practice prior:

- **Public-facing chatbot** — adversarial users probing for jailbreaks,
  exfiltrating system prompts, exploiting non-deterministic outputs to
  produce inconsistent or harmful responses. Guardrails are
  load-bearing.
- **This chassis** — the only "user" is the operator. The only
  "jailbreak" is the operator self-jailbreaking; the only "leak" is the
  operator reading the system prompt they already wrote and committed
  to git (`seeds/posture/session-start.xml` is intentionally public).
  Output consistency is the one concern that still matters, because
  consistency feeds the verify chain that gates auto-merge.

This ADR audits the three docs against that surface and ratifies the
existing primitives where they already cover the risk. **Explicit
non-adoption with rationale** is the expected outcome for two of the
three sections; that is valuable in its own right because it documents
why the chassis does not carry the corresponding ceremony.

The three source docs are not currently mirrored under
`vendor/anthropics/platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/`
— that directory ships only `handle-streaming-refusals.md` in the
2026-05 crawl snapshot. They live on the canonical site and should be
picked up by the next `refresh-vendors` sweep. See TODO-OPERATOR at the
bottom.

## Decision

### Section A — Increase output consistency

**Source:** `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency.md`
(not yet in `vendor/` mirror — `TODO-OPERATOR: refresh-vendors`).

**Doc's typical recommendations:**

1. Provide examples in the system prompt (few-shot).
2. Use JSON / structured output formats.
3. Lower temperature for deterministic tool use.
4. Pre-fill the assistant turn with a structural prefix.
5. Test outputs against a fixed-fixture eval suite.

**Chassis primitives already covering this:**

| Recommendation | Chassis primitive |
| :--- | :--- |
| Few-shot examples | `seeds/posture/session-start.xml` ships the load-bearing XML primitive; operator seeds (`seeds/prompts/operator-2026-05-*.md`) provide canonical examples per session. |
| Structured output | Outcome IDs (`O<N>`) enforced by `src/lib/conventions.test.ts` on every commit after 2026-05-15T04:30Z. Every commit terminates with `(OBP2)` or equivalent — deterministic structural suffix. |
| Deterministic tool use | MCP bridge surfaces 16+ tools across 5 lanes (`engineering_*`, `blog_*`, `support_*`, `llms_*`, `vendor_*`) with progressive disclosure via `search_tools`. Tool names are stable across sessions. |
| Fixed-fixture evals | Citation guard (`scripts/lib/citation-guard.ts`) requires every test file to carry an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`. The verify chain (`npm run verify`) is the chassis's eval harness; rubrics under `rubrics/phase-{0..16}.md` are the fixed fixtures. |
| Pre-fill structural prefix | Outcome-ID prefix on commits and conventional-commits scope (e.g., `docs(adr):`) provide the same affordance at the artifact layer. |

**Proposed deltas:** none. The chassis already runs this discipline
harder than the doc recommends, because the verify chain refuses to
green if `@cite` or `(O<N>)` are missing. Ratify as ADOPTED.

**Action count:** 0 net new actions. 5 existing primitives ratified.

### Section B — Mitigate jailbreaks

**Source:** `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks.md`
(not yet in `vendor/` mirror — `TODO-OPERATOR: refresh-vendors`).

Related primary research mirror that IS local:
`vendor/anthropic-sitemap/research/many-shot-jailbreaking.md`.

**Doc's typical recommendations:**

1. Harden the system prompt against role-play overrides.
2. Add content-moderation classifiers in front of and behind the model.
3. Refuse-and-redirect patterns for hostile inputs.
4. Adversarial red-team eval suites.

**Chassis surface:**

The only entity that can issue an input to this chassis is the
operator. The operator wrote and committed the system prompt. The
operator can edit it any time. The operator can also just shell out
and run `claude -p "<arbitrary>"` directly. There is no adversarial
input channel. The threat model that motivates jailbreak mitigation
**does not exist here**.

**Proposed deltas:** NOT-MUCH-TO-DO. Specifically, we explicitly
DECLINE to add:

- Content-moderation classifiers (no third-party input to moderate).
- Refuse-and-redirect prompt patterns (the operator wants the agent to
  do what they ask; refusal is a bug, not a feature, in this surface).
- Adversarial red-team eval suites (the verify chain already exercises
  the chassis under the workloads it actually runs; an adversarial
  suite would test a threat that is not in our model).

We DO keep one thing the doc would recommend: the system prompt is
load-bearing and version-controlled (`seeds/posture/session-start.xml`).
If the prompt ever drifts in a way that breaks outcome discipline, the
git history is the audit trail.

**Action count:** 0 net new actions. 3 explicit non-adoptions logged.

### Section C — Reduce prompt leak

**Source:** `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-prompt-leak.md`
(not yet in `vendor/` mirror — `TODO-OPERATOR: refresh-vendors`).

**Doc's typical recommendations:**

1. Delimit user input from system instructions with clear tags.
2. Train the model (via prompt) to refuse "repeat your instructions"
   requests.
3. Avoid putting secrets in the system prompt.
4. Use the `system` parameter rather than embedding instructions in
   `user` turns.

**Chassis surface:**

The "system prompt" in this chassis is `seeds/posture/session-start.xml`
plus the contents of `CLAUDE.md`, `~/.claude/CLAUDE.md`, and the project
`docs/PROJECT.md`. **All of it is committed to git in public-readable
form.** Leak prevention is therefore moot: anyone with read access to
the repo can `cat` the prompt directly. The chassis is designed for
this — the operator wants the prompt to be inspectable so any Claude in
the rotation can pick up where the last left off.

The one recommendation that DOES apply:

- **No secrets in the prompt.** The chassis enforces this via OSV
  scanning (`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`,
  OSL1) and the OAuth-only invariant (no `ANTHROPIC_API_KEY` anywhere).
  Secrets live in 1Password / Cloudflare env, never in `seeds/`.

**Proposed deltas:** none. The chassis's posture (prompt is public,
secrets are out-of-band) is structurally incompatible with prompt-leak
ceremony. Ratify as INTENTIONALLY-OUT-OF-SCOPE.

**Action count:** 0 net new actions. 1 existing invariant (no-secrets)
ratified.

## Summary

| Doc | Risk level in chassis | Action |
| :--- | :--- | :--- |
| Increase output consistency | **Medium** — feeds verify chain that gates auto-merge | RATIFY 5 existing primitives; 0 net new |
| Mitigate jailbreaks | **Low** — single-operator surface, no adversarial input | EXPLICITLY DECLINE 3 ceremonies; 0 net new |
| Reduce prompt leak | **N/A** — prompt is public-by-design, secrets are out-of-band | RATIFY no-secrets invariant; 0 net new |

Net new actions across all three sections: **0**. The ADR's value is
ratification + explicit non-adoption with rationale, not new work.

## Consequences

- Future sessions that wonder "should we adopt content moderation /
  prompt-leak refusal patterns / etc." can read this ADR and skip the
  audit.
- If the chassis ever sprouts an external-input surface (e.g., a
  public-facing webhook, a Slack bridge that accepts non-operator
  messages, a multi-tenant deployment), this ADR's threat-model
  assumption breaks and **all three sections must be re-audited**.
- The `TODO-OPERATOR` below should be cleared on the next
  `refresh-vendors` sweep so the three source docs are locally
  citable.

## TODO-OPERATOR

`refresh-vendors` does not currently mirror the three
`strengthen-guardrails` pages beyond `handle-streaming-refusals.md`.
Confirm the crawl seed list includes:

- `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency`
- `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks`
- `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-prompt-leak`

Once mirrored, swap the canonical-URL citations below for local
`vendor/` paths and add per-doc extracts to `seeds/citations/`.

## Citations

- `vendor/anthropics/platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/handle-streaming-refusals.md`
  — only `strengthen-guardrails` doc currently mirrored; sibling for
  the three audited docs.
- `vendor/anthropic-sitemap/research/many-shot-jailbreaking.md` — primary
  research mirror covering the jailbreak threat model referenced in
  Section B.
- `seeds/citations/define-outcomes.md` — outcome-ID discipline that
  underwrites Section A's consistency claim.
- Canonical URLs pending mirror (see TODO-OPERATOR):
  `platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/{increase-consistency,mitigate-jailbreaks,reduce-prompt-leak}`.
