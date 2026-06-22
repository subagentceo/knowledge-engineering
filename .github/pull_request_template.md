<!--
  knowledge-engineering PR template.

  Deterministic, type-safe, durable. Every checkbox maps to a command
  that exits 0 (pass) or non-zero (fail). No subjective judgments.

  See docs/CONVENTIONS.md for the outcome-driven Conventional-Commits
  discipline. Per the operator's framing, "PRs should be part of
  issues" — every PR MUST link to at least one issue via Closes/Refs.
-->

## Outcomes

<!--
  Declare which outcome IDs this PR fulfills. If you can't name
  an outcome, the change is out of scope.
-->

- **O?** — _<one-line outcome description>_

## Issue linkage (mandatory)

Closes #
Refs #

## Summary

<!-- 1-3 bullets. Focus on WHY, not WHAT. -->

-

## Test plan

### Type safety (deterministic — every check has an exit code)

- [ ] `npm run verify` — root verify chain clean
- [ ] `cd frontend && npx tsc --noEmit` — frontend root typecheck
- [ ] `cd frontend/cowork-worker && npx tsc --noEmit && npx vitest run` — 15 tests
- [ ] `cd frontend/coworkers-worker && npx tsc --noEmit && npx vitest run` — 17 tests
- [ ] `cd frontend/mail-worker && npx tsc --noEmit && npx vitest run` — 8 tests
- [ ] `cd frontend/calendar-worker && npx tsc --noEmit && npx vitest run` — 8 tests
- [ ] `cd frontend/agent-inbox-worker && npx tsc --noEmit && npx vitest run` — 11 tests
- [ ] `npx vitest run frontend/tests/worker-configs.test.ts` — 37 worker config cross-validation tests
- [ ] `npx vitest run cowork/schemas/envelope.test.ts` — 24 envelope schema tests
- [ ] `npx vitest run cowork/templates/task-state-machine.test.ts` — 30 state machine tests
- [ ] `npx vitest run cowork/coworkers/tests/manifest.test.ts` — 16 manifest integrity tests

### Durability (deterministic — validates live data against canonical schemas)

- [ ] `python3 -m pytest cowork/scripts/test_e2m_integration.py -v` — 9 integration tests (dispatch round-trip, peer-pair validation, manifest cross-check, zero violations)
- [ ] `python3 -m pytest cowork/scripts/test_dispatch.py -v` — 12 dispatch tests
- [ ] `python3 -m pytest cowork/scripts/test_mailbox_validate.py -v` — 15 validator tests
- [ ] `python3 -m pytest cowork/templates/test_task_models.py -v` — 25 Pydantic state machine tests
- [ ] `python3 -m pytest ollama/test_contract.py -v` — 26 durability contract tests
- [ ] `python3 -m pytest data/models/test_alloydb_models.py -v` — 204 Kimball DW model YAML tests
- [ ] `python3 cowork/scripts/mailbox-schema-validate.py mailbox queues` — 0 violations across all e2m records

### Naming conventions (deterministic — grep exits non-zero on match)

- [ ] `! grep -rn 'pm-coworker' --include='*.ts' --include='*.py' --include='*.json' --include='*.jsonl' | grep -v seeds/memory | grep -v vendor/ | grep -v node_modules` — no banned `pm-coworker` alias
- [ ] `! grep -rn 'ANTHROPIC_API_KEY' cowork/ frontend/ --include='*.ts' --include='*.py' | grep -v vendor/ | grep -v node_modules | grep -v '\.test\.'` — OAuth-only invariant

### CI (automated — required status checks)

- [ ] `npm run verify` + `OSV-Scanner (PR) / osv-scan` — branch protection gate
- [ ] `e2m-unblock` typecheck-workers job — `tsc --noEmit && vitest run` for all 5 workers
- [ ] All commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`)

## Evaluation matrix

| Criterion | Command | Pass condition |
|---|---|---|
| Type safety | `tsc --noEmit` across 6 tsconfigs | exit 0 |
| Test coverage | vitest + pytest combined | 495+ tests pass |
| Schema compliance | `mailbox-schema-validate.py mailbox queues` | 0 violations |
| Naming canon | `grep -rn 'pm-coworker'` (filtered) | 0 matches |
| OAuth invariant | `grep -rn 'ANTHROPIC_API_KEY'` (filtered) | 0 matches |
| CI double-trigger | single `e2m-unblock.yml` with `branches: [main]` | no duplicate workflow |

## Citations

<!--
  Tests cite their source via @cite headers. List citation paths.
-->

- `cowork/schemas/envelope.ts` — canonical e2m types
- `cowork/templates/task-state-machine.ts` — state machine + scoring
- `cowork/coworkers/manifest.json` — 12-coworker registry
- `ollama/contract.py` — Tailscale durability invariant

---

<sub>Every test-plan checkbox is a deterministic command with an exit code. Run the full suite: `npx vitest run && python3 -m pytest cowork/ ollama/ data/ -q`</sub>
