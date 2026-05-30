---
runbook: container-parity
outcome: This MacBook recreates the Managed-Agents cloud sandbox toolchain locally, codified + self-checked, so the operator runs their own managed-agents-equivalent instead of paying for managed agents — and silent toolchain degradations fail fast instead of breaking at runtime.
unblocks: Local managed-agents-equivalent development; reproducible agent sandboxes without per-task cloud spend
operator-manual-steps:
  - run ./setup.sh (or scripts/parity/setup.sh) once on a fresh Mac
  - keep AlloyDB Omni + DragonflyDB containers running (the local data plane)
outcome_id: O1
---

# Operator runbook: Managed-Agents cloud-sandbox parity (local MacBook)

Recreates the
[Managed Agents cloud sandbox](https://platform.claude.com/docs/en/managed-agents/agent-setup)
toolchain on this MacBook so the operator runs their **own** managed-agents
equivalent instead of paying Anthropic for managed agents. The spec is
**codified** (not prose) and **self-checked** so a missing or downgraded tool
fails fast rather than silently breaking an agent run.

Three artifacts, modeled on the existing `secrets-parity` pattern (a data file +
a pure checker + a verify-chain test):

| Artifact | Role |
| --- | --- |
| `docs/data/toolchain-parity.json` | The codified spec: every language (+ floor), package manager, DB client, and utility the cloud sandbox ships, plus the deliberate local DB-server divergence. |
| `src/lib/toolchain-parity.ts` | Pure checker (version comparison + pass/fail). Shared by the doctor and the verify test. |
| `src/lib/toolchain-parity.test.ts` | Verify-chain test (`npm run verify`) asserting the table shape, floors, and checker behavior. |
| `scripts/parity/setup.sh` | Idempotent installer — brings a fresh Mac to spec via Homebrew + mise. |
| `scripts/parity/doctor.sh` | Fail-fast auditor — probes the host, exits nonzero on any drift. |

## Spec → local mapping

Cloud sandbox (Ubuntu 22.04, x86_64, 8 GB / 10 GB, network off by default;
beta header `managed-agents-2026-04-01`):

| Row | Cloud floor | This host |
| --- | --- | --- |
| Python | 3.12+ (pip, uv) | python@3.14 + pip + uv (brew) |
| Node.js | 20+ (npm, yarn, pnpm) | mise node 20 + 22 + LTS; npm/yarn/pnpm; bun |
| Go | 1.22+ | go (brew) |
| Rust | 1.77+ | rustc + cargo (~/.cargo) |
| Java | 21+ (maven, gradle) | openjdk@21 + gradle + maven (brew) |
| Ruby | 3.3+ (bundler, gem) | mise ruby 3.3 (host system ruby is 2.6 — do NOT use it) |
| PHP | 8.3+ (composer) | php 8.5 + composer (brew) |
| C/C++ | GCC 13+ (make, cmake) | Apple clang + make + cmake + conan |
| Linters | black, eslint, prettier, ruff, mypy | all present (brew + npm -g) |

## The deliberate database divergence

The cloud sandbox runs **no database servers** — only clients (`psql`,
`redis-cli`, plus local SQLite). This host **intentionally diverges**: it runs
the real data plane locally because Neon went out of budget. See the data-plane
migration ADR + tasks (SCRUM-32..35).

| Container | Image | Port | Replaces |
| --- | --- | --- | --- |
| `alloydb` | `google/alloydbomni:latest` | `5433:5432` | Neon (managed Postgres) |
| `dragonfly` | `dragonflydb/dragonfly` | `6379` | managed Redis |

Both are Postgres-wire / Redis-wire compatible, so the existing `psql` /
`redis-cli` clients (the parity requirement) connect unchanged. The 8-CPU host
sits near-idle (~2.5% CPU, ~1.7 GB / 7.6 GB RAM), so the local data plane is
effectively free.

## Usage

```bash
./setup.sh                 # full bootstrap: npm deps + parity toolchain + env check
scripts/parity/setup.sh    # toolchain only (idempotent; --dry-run to preview)
scripts/parity/doctor.sh   # fail-fast drift check (exit 1 on any missing/below-floor tool)
```

`doctor.sh` is safe to wire into a SessionStart hook or pre-commit so drift is
caught the moment it appears. The `npm run verify` chain runs
`toolchain-parity.test.ts`, so the codified spec itself can't silently rot.

## OAuth-only invariant

Every script asserts `ANTHROPIC_API_KEY` is unset and exits if it is present —
the same fail-closed posture as `src/oauth/token.ts` and the cloud-env-vars
contract. Claude auth is `CLAUDE_CODE_OAUTH_TOKEN`, never the API key.
