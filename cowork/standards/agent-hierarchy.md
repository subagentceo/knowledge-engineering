# Agent hierarchy — managers · coworkers · teams · subagents

> The four tiers of the `cowork/` chassis and how **e2m** binds them. Grounded in the canonical docs
> (mirrored under `vendor/`, read locally). Companion to `coworker-subagent-delegation.md` (the
> coworker↔subagent contract detail) and `mailbox-envelope-canon.md`.
>
> @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md (subagent definition)
> @cite vendor/anthropics/code.claude.com/docs/en/agent-teams.md (team = shared task list + inter-agent messaging)
> @cite vendor/anthropics/code.claude.com/docs/en/workflows.md (workflows)
> @cite vendor/anthropics/claude.com/docs/cowork/guide/dispatch.md + projects.md + plugins.md (manager / project layer)
> @cite cowork/coworkers/manifest.json · cowork/standards/coworker-subagent-delegation.md

## The four tiers

```text
manager     scheduled, project-level — outcome in → tasks out → routed; runs at night    (cowork/managers, NEW)
  │  dispatches outcomes (Cowork Dispatch / Projects)
  ▼
coworker    domain knowledge worker — manages workflows + a team; e2m-native peer          (cowork/coworkers)
  │  delegates coding via e2m  (see coworker-subagent-delegation.md)
  ▼
team        peers with a SHARED task list + direct messaging — which is exactly what e2m is (cowork/coworkers/teams, NEW)
  │  shared queue + mailbox
  ▼
subagent    deterministic file — tool-restricted, context-isolated, typed e2m output       (src/subagents, .claude/agents)
```

## Manager — the scheduled, project-level tier (turns coworkers into a startup)

A **manager** is the Cowork **Dispatch** pattern run at the **project** level on a **schedule**: you give
it an outcome, it decomposes into tasks and routes each to the surface that fits (coding → Code, knowledge
→ the Cowork project), then surfaces results — "start and come back later." Managers are what run the
company while you sleep.

Already present, just unbound:

- `cowork/scripts/nightly-review.py` (00:00 PST), `morning-summary.py` (07:00 PST), `type-safety-audit.py` (06:00 PST).
- `cowork/artifacts/Scheduled/coworkers-midnight-session`, `coworkers-morning-summary`.
- the `heartbeat` skill + Cowork's scheduled-tasks mechanism.

The new `cowork/managers/` tier names these as project-scoped managers that dispatch outcomes to coworkers
on a cadence. "Turn coworkers into a startup" = a manager owns a project's outcomes and drives the
coworkers to deliver them overnight, then reports at the morning summary.

**Per-domain managers (12).** One manager sits above each coworker — generated from
`cowork/managers/managers.manifest.yaml` (one template, DRY) into `cowork/coworkers/skills/<domain>-manager/`.
Each owns its domain's outcomes and dispatches to its coworker; none executes the work. **`project-manager`
is the default operator router**: when the operator opens a session not attached to a coworker, the request
routes to project-manager, which triages and dispatches — see `cowork/standards/operator-routing.md`.

## Durability & alerting (manager-enforced)

Durability is a first-class concern **at this tier** — a manager's job is not just to dispatch, but to
guarantee work **survives, is observed, and escalates** when it fails. Managers enforce three things on
every subagent they run:

**1. Durable tasks (already true).** Every unit is an append-only e2m DurableTask (latest-line-wins,
git-native JSONL) — it survives restart, compaction, and crash. Transitions (`claim`/`complete`/`block`/
`fail`/`retry`) are the durable audit trail.

**2. Sentry instrumentation (enforced gate).** A subagent that runs uninstrumented fails the manager's
durability gate. Each subagent worker must:

```yaml
sentry:                              # operator provides SENTRY_DSN (env/secret; never committed)
  init: "Sentry.init({ dsn: $SENTRY_DSN, tracesSampleRate: 1.0 })"
  wrap: "captureException on every uncaught error; breadcrumb per tool call + e2m transition"
  tag:  "{ tier: subagent, team: <team>, task_id: <id> }"
gate: "manager refuses to mark a subagent run 'durable' unless Sentry.init ran and the worker is wrapped"
```

**OpenTelemetry is the telemetry backbone** — Cowork activity is *not* in audit logs, the Compliance API,
or data exports, so OTel is Anthropic's official monitoring path (reuse `src/mcp/lanes/telemetry.ts` +
`vendor/opentelemetry`). **Sentry is the error sink that ingests the OTLP error spans** — not the source of
truth. The Sentry DSN is operator-supplied config, like the OAuth posture — no key committed.
(refs: cowork-platform-facts.md)

**3. Escalation → alert.** On a captured exception or a `fail`/`block` transition, the manager raises an
alert through one channel only:

```text
subagent error / fail
  → Sentry captureException            (observability)
  → e2m task_transition fail|block      (durable; append-only)
  → e2m escalate/operator envelope → cowork/data/mailbox/operator.jsonl
  → iMessage delivery to the operator's phone   (cowork/plugins/imessage: AppleScript + chat.db, local)
  → autoresolve self-heal attempt (durable-toolchain-autoresolve pattern); if exhausted, stays escalated
```

### Alert channel policy (honest autonomy verdict)

| channel | status | why |
| :-- | :-- | :-- |
| **iMessage** | **primary** | `cowork/plugins/imessage` sends via AppleScript + reads `chat.db` locally — **no tokens, no OAuth, 100% on-device**; the operator is already signed in. |
| Slack | **not used** | needs a Slack app + OAuth + bot token — human-created credentials an agent cannot generate or enter. |
| Telegram | **not used** | needs a @BotFather bot token + chat_id — same human-in-the-loop requirement. |

Rule applied: Slack/Telegram are wired **only** if setup is 100% no-human-in-the-loop; neither qualifies,
so they stay dormant (the `telegram`/`discord` plugins remain installed but unwired). iMessage is the sole
alert sink. Sending an iMessage is side-effectful — the manager dispatches it; the operator approves the
channel once via `/imessage:access`.

## Coworker — manages workflows + a team

Established: 12 + operator (`cowork/coworkers/manifest.json`). A coworker runs **workflows** and owns a
**team**. It receives a manager's dispatched outcome (or the operator's) and either does the knowledge work
itself or delegates coding to its team. e2m-native (a2a / e2m / mcp / acp per the protocol matrix).

## Team vs subagent — why e2m is what *makes* a team

Anthropic's own distinction: **subagents only report results back to the parent and never talk to each
other; a team shares a task list, members claim work, and they message each other directly.** That
shared-list-plus-messaging is *exactly* e2m — the append-only **queue** (the shared task list) plus the
**mailbox** (inter-agent messaging). So:

- **subagent** = report-only worker; the parent receives only its final typed message.
- **team** = subagents/coworkers coordinating over the e2m queue + mailbox.

e2m is the **type-safe, durable, git-native realization of Anthropic's (experimental, flag-gated) agent-teams
concept** — no `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`, no in-memory-only task list; the shared list is JSONL.

## Subagent — the deterministic file

Per the SDK spec: a subagent is a **filesystem markdown file** (`.claude/agents/` or `src/subagents/<name>`)
with frontmatter declaring `name`, `description` (drives delegation), `tools` (restricted), and `model`. It
runs **context-isolated** (fresh conversation; only its final message returns) and **tool-restricted** (least
privilege). e2m adds the contract: its **structured final output is a typed e2m envelope/result**, and its
task carries an `evaluator` (the outcome). That is the "deterministic files with defined tools + structured,
type-safe I/O, composable across subagents and coworkers" the design calls for.

## A workflow, top to bottom

```text
manager (nightly)            dispatch outcome O: "ship the support-claude-docs MCP search tool"
  → coworker (engineering)   claim O; plan the workflow; declare the evaluator (pass_if / fail_if)
    → team (engineering-subagents)   shared e2m queue; members claim subtasks
      → subagent (feature-dev)  tool-restricted file; RED → GREEN → REFACTOR over the plugin chain
      → subagent (pr-review)    reviews; messages feature-dev via the mailbox (team, not report-only)
    → rubric gate (durable-agent-ci-cd-*)  scores + merge-gates
  → coworker   complete O ONLY if evaluator.pass_if holds; else escalate to the manager
→ manager (morning)          summary: O done / blocked, surfaced to the operator
```

Outcome (manager / coworker) ⊃ rubric (CI) ⊃ tests (subagent TDD red/green/refactor) — the governance
nesting from `coworker-subagent-delegation.md`, now spanning all four tiers.

## Provider portability (1p bootstrap → 3p rollout)

The whole hierarchy is **provider-agnostic** — managers, coworkers, teams, subagents, e2m, and the durable
stack are all repo-owned and local. The inference *provider* underneath is a single swap, set in
**Developer → Configure Third-Party Inference → Gateway** (base URL + credential kind + custom headers +
model list). That is the bootstrap-to-scale knob:

```text
1p (now)   Cowork on Anthropic claude.ai (your Max subscription) — budget bootstrap, full feature set
3p (later) Cowork on 3P → gateway → AWS Bedrock | Google Vertex AI | Microsoft Foundry
           token-billed by the cloud provider (no seat licensing); on Vertex/Bedrock Anthropic
           never sees prompts or completions (refs: cowork/3p/feature-matrix.md, overview.md)
```

3P is configured via MDM (Jamf / Intune / Group Policy) + the gateway endpoint — no Anthropic admin
console. The agent layers don't change; only the inference backend does. (See `ollama/AUTH-LANES.md` for
the per-request inference lanes — this is the provider lane.)

### The portability gotcha (why the custom layers matter)

Per the 3P feature matrix, several **1p-only** features are absent on 3P — and they're exactly the ones a
naive design would lean on:

| 1p feature absent on 3P | the repo's portable replacement |
| :-- | :-- |
| **Dispatch / mobile** (—) | managers = e2m + own scheduled jobs (`nightly-review`, `morning-summary`, `heartbeat`) — NOT native Dispatch |
| chat-history search + nightly summary (Chat-tab, 1p) | the manager morning-summary over the e2m queues |
| Anthropic 1P connectors (—) | local / remote MCP + the org-plugins marketplace (both ✓ on 3P) |
| project / plugin sharing (—) | git (the monolith) |

This is the strategic payoff of building managers on **your own e2m + scheduled primitives** instead of
the native Dispatch feature: the architecture **survives the 1p→3p transition**. A design that leaned on
Dispatch would break the moment you moved to Bedrock / Vertex / Foundry. Memory on 3P is device-stored —
which is already where the durable L1/L2/L3 + memory-store + dreams stack lives.

## Don't-reinvent ledger

- **managers** → the scheduled jobs + `Scheduled/` artifacts + `heartbeat` skill + Cowork scheduled-tasks already exist; only the `cowork/managers/` naming + project binding is new.
- **coworkers**, e2m, workflows → already exist (manifest, `envelope.ts`).
- **teams** → the e2m queue + mailbox already provide the shared-list + messaging that *is* a team; only the `cowork/coworkers/teams/` binding is new.
- **subagents** → `src/subagents/*` + `.claude/agents/*` already exist; the e2m typed-I/O contract is the only addition.
- **durability/alerting** → e2m DurableTasks + the operator mailbox + the `imessage` plugin already exist; the manager-enforced **Sentry gate** and the **iMessage-only escalation** are the new policy. Slack/Telegram excluded (no autonomous setup).
- **provider portability** → the gateway (Configure Third-Party Inference) is first-party; the agent layers + e2m + durable stack are repo-owned, so they carry 1p→3p unchanged. Only the inference backend swaps. Building managers on e2m (not native Dispatch) is what keeps it portable.
