# OMA4 — Managed-Agents files posture: NOT-ADOPT (chassis vendor/ + git is more debuggable)

- **Status:** accepted
- **Date:** 2026-05-17
- **Deciders:** alex-jadecli
- **Outcome anchor:** OMA4
- **Related:** OMA1 (managed-agents dreams), OMA2/OMA5 (vendor-mirror coverage for managed-agents docs), OPE1 (platform-engineering plugin: Voyage → Turbopuffer → AlloyDB), OPR1 (polyrepo sibling pattern)

## Context

Anthropic's Managed Agents (MA) platform exposes a **file-mounting primitive** distinct from the chassis's existing storage substrates. Per the upstream docs (cited below), an MA session can:

1. Accept file uploads via the Files API (`POST /files`, returns a `file_id`).
2. Mount those files into the agent's session container at a specified path.
3. Read/process them from within the MA-hosted execution environment, with lifecycle tied to the MA session/container — not to the operator's filesystem or git.

This is structurally different from what this chassis already uses for "give the agent some bytes to read":

| Substrate | Owner | Persistence | Use today |
| :--- | :--- | :--- | :--- |
| `vendor/<name>/` (e.g., `vendor/anthropics/`, `vendor/cloudflare/`) | this repo, in git | git history, replayable, byte-on-disk-as-truth | 25 vendor doc mirrors via `scripts/crawl-vendors.ts` |
| Turbopuffer + AlloyDB (per OPE1) | Cloudflare Worker, Voyage embeddings | external services, RAG-flavored | semantic retrieval over the same mirrors |
| Cloudflare Worker Sandbox | per-invocation container | ephemeral compute, dies with the request | tool execution, no durable file state |
| **MA Files (proposed)** | **Anthropic** | **opaque, session/container-scoped** | **not adopted** |

OMA2/OMA5 confirmed `vendor/anthropics/platform.claude.com/docs/en/managed-agents/files.md` is mirrored locally, so this decision is being made against the real upstream contract — not a guess.

## Analysis

### Pros of adopting MA-hosted files

1. **Anthropic-managed lifecycle.** Upload-then-mount is a single coherent primitive owned by the platform; no need for the chassis to reason about file-to-container plumbing inside the MA execution environment.
2. **Native to the session container.** When a chassis sub-agent eventually runs *inside* an MA session (rather than the current local-orchestrator + Worker Sandbox topology), MA-mounted files are the lowest-friction way to hand bytes to that agent. The MA container does not have access to the operator's `vendor/` tree.
3. **Bounded blast radius for large or sensitive payloads.** A file mounted into a single session container does not persist into git history; for transient inputs (a user-uploaded PDF in a forking founder's product) this is actually the correct posture, not a downside.
4. **Already documented + SDK-supported** behind the `managed-agents-2026-04-01` beta header. No bespoke client code needed.

### Cons of adopting MA-hosted files *now*

1. **Duplicates the chassis's existing "bytes-on-disk-as-truth" pattern.** Today, every vendor surface a sub-agent reads is a real path under `vendor/`. That is grep-able, diff-able, git-bisect-able, and reviewable in a PR. MA-hosted file IDs are none of those — they are opaque handles whose contents are observable only by calling back to Anthropic.
2. **Adds an Anthropic-side dependency to the read path.** The chassis is OAuth-only and already depends on Anthropic for inference. Adding *storage* dependency too widens the failure mode (an Anthropic outage stops reads, not just generations) and complicates the offline/replay story that makes `npm run verify` deterministic.
3. **Opaque persistence vs git-as-memory.** The chassis's whole posture (`seeds/memory/heartbeat/`, ADRs, citation extracts) is "memory lives in git so any Claude on any of the 3 Max accounts picks up where the last left off." MA-hosted files are scoped to a session/container; rotating to a different account, replaying a tick, or grading a phase later cannot recover that state without explicit re-upload bookkeeping the chassis doesn't have.
4. **Citation discipline breaks.** Every test in this repo carries an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/` (enforced by `scripts/lib/citation-guard.ts`). An MA `file_id` is not a citable path. Adopting MA files for any verifier-reachable input would require either weakening the citation guard or maintaining a parallel mirror anyway — at which point the mirror is the source of truth and the upload is just a transport.
5. **No current need.** The chassis's largest reader (the orchestrator + sub-agents) runs locally or in the Worker Sandbox, both of which can read `vendor/` directly. There is no use case today where a sub-agent runs inside an MA-hosted container and needs files the operator's filesystem can't supply.

## Decision

**NOT-ADOPT** Managed-Agents file uploads + container-mounting for this chassis at this time.

The chassis continues to use `vendor/<name>/` (git-tracked, crawled by `scripts/crawl-vendors.ts`) as the canonical "bytes-on-disk-as-truth" substrate, with Turbopuffer + AlloyDB (per OPE1) as the semantic retrieval layer over those same bytes. The Cloudflare Worker Sandbox remains the ephemeral compute layer.

This is not a rejection of MA files as a primitive — it is a posture choice: the chassis's debuggability, audit-ability, and replayability come from the fact that **every byte a sub-agent reads is on disk in this repo**. Trading that for an opaque, Anthropic-hosted handle has no near-term payoff.

## Reversal conditions

Re-open this decision if **any** of the following becomes true:

1. **Size pressure.** Chassis grows file inputs >GB scale (e.g., a forking founder's product ingests large customer datasets) that no longer fit comfortably in git. `vendor/` was designed for documentation mirrors, not data lakes. MA files (or a separate object-store binding) would be the right answer.
2. **MA-hosted sub-agents.** A future phase moves orchestration *into* MA sessions (rather than running it locally + dispatching to the Worker Sandbox). At that point sub-agents cannot reach the operator's `vendor/` tree, and mounting bytes via the Files API becomes the natural transport.
3. **Per-session ephemeral inputs.** A use case appears where input bytes are inherently session-scoped (a user-uploaded PDF in a hosted product surface) and committing them to `vendor/` would be wrong — too coarse, too persistent, and a privacy hazard. MA files are the correct primitive for that.
4. **Anthropic deprecates the local-orchestrator model** or makes MA files the only path for some capability the chassis depends on. (Unlikely — the API surface is additive — but listed for completeness.)

Each reversal condition is concrete and operator-checkable, not vibes-based. If none of these fire, the chassis stays on `vendor/` + git.

## Citations

- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/files.md` — upstream contract for upload-then-mount (the `managed-agents-2026-04-01` beta).
- `docs/decisions/2026-05-17-managed-agents-dreams.md` (OMA1) — the umbrella managed-agents-adoption decision this ADR is a child of.
- `docs/decisions/2026-05-16-platform-engineering-plugin.md` (OPE1) — Voyage → Turbopuffer → AlloyDB bridge that already covers the "retrieval over mirrored bytes" use case.
- `seeds/citations/define-outcomes.md` — outcome-driven posture; this ADR's reversal conditions are the operator-checkable outcomes that would flip the decision.
