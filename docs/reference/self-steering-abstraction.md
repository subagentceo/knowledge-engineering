# Self-steering abstraction layer

> Design (not yet built, except §0 which shipped). How the executed steering loop
> (`src/agent/knowledge-agent/steer.ts`) grows from "drive my own fleet" into a
> reusable, plugin-loaded, multi-lane, cross-language steering chassis — grounded
> in the Anthropic reference harnesses the operator named.
>
> Status legend: **SHIPPED** · **NEXT** · **DESIGN**

---

## §0 — What shipped (the spine everything else hangs on) — SHIPPED

`steerKnowledgeLoop` converts ~1860 lines of *modeled* steering into *executed*
steering. It drives the `corpus-viewer` `TaskEnvelope` DAG, dispatches each
producer through `knowledge-agent`'s `runKnowledgeTask` (`claude -p` via the
Agent SDK `query()`), grades it with a paired verifier, and **re-dispatches on a
failing verdict** — the loop decides the next step, not the outer model.

The five steering decisions, all in code:

| Decision    | Mechanism                                                   |
| ----------- | ---------------------------------------------------------- |
| readiness   | `assertDependenciesSatisfied` (DAG)                        |
| blast radius| `assertToolsAllowed` + `assertWithinBudget`               |
| concurrency | `assertSinglyInProgressPerSubagent`                       |
| quality gate| verifier `pass`/`warn` → done; `fail` → retry w/ rubric  |
| cost gate   | cumulative `usage.costUsd` vs `maxBudgetUsd`              |

This is the substrate. §1–§4 add layers above it without changing it.

---

## §1 — Plugins as per-lane capability bundles — NEXT

**Problem today:** each `SubagentSpec` hard-codes a tool allowlist. Capabilities
(code review, simplification, Swift migration, SDK scaffolding) are not
composable — to give the answerer code-review ability I'd hand-edit `tools[]`.

**The lever:** SDK `Options.plugins: SdkPluginConfig[]` (verified present in
`sdk.d.ts@0.2.138`, line 1535) + `AgentDefinition.skills?: string[]`. A plugin
bundles skills + agents + an `.mcp.json` + hooks — exactly the structure in the
`create-cowork-plugin` SKILL the operator pasted.

**Design:** add an optional `plugins: string[]` to `SubagentSpec`, mapped to
`query({ options: { plugins } })` per dispatch. Reuse the official plugins rather
than reinvent (github.com/anthropics/claude-plugins-official/plugins):

| Reference plugin    | Lane it equips                | How the loop uses it |
| ------------------- | ----------------------------- | -------------------- |
| `code-review`       | a `code-reviewer` SubagentSpec| becomes the *verifier* for code-producing tasks — replaces a hand-written rubric with the plugin's review skill |
| `code-simplify`     | a post-pass producer          | a DAG task that runs after a producer passes, gated by its own verifier (simplify must not change behavior) |
| `swift-lift`        | the corpus-viewer Swift port  | the Phase-1/2 Swift work in `goal-my-objective-sharded-bird.md` becomes a steered DAG, not a manual port |
| `agent-sdk-dev`     | the chassis building itself   | the answerer that edits `src/agent/` loads this to stay current with SDK surface — self-improving |

The `defending-code-reference-harness/CLAUDE.md` pattern is the *posture* layer:
its CLAUDE.md is a load-bearing prompt that pins how the harness reasons about
code changes (verify-before-report, adversarial cross-check). Mirror that posture
into `seeds/posture/` and load it as the steer loop's stable cached system prefix
(the `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` split already in `src/agent/run.ts:54`).

**Reference (TS coding ground truth):** continue using
github.com/anthropics/claude-agent-sdk-typescript +
github.com/modelcontextprotocol/typescript-sdk as the API source of truth (as in
all `src/agent/` work so far). The `skills/claude-api/typescript` skill is the
in-repo distilled form (`src/course-plugins/claude-api/`).

---

## §2 — The knowledge-work LANE abstraction — SHIPPED (engineering + data) / scaffolded (rest)

**Today** there were two implicit lanes: code (corpus-viewer) and npm/docs
(knowledge-agent). The `knowledge-work-plugins` domains are a *third tier* ABOVE
both: knowledge *work*, not just *retrieval*. This is now built —
`src/agent/knowledge-agent/lanes.ts`, grounded in the real clone at
`third_party/anthropics-knowledge-work-plugins/`.

**The abstraction (shipped):** a `Lane` = { `fleet: SubagentSpec[]`, `skills`,
`verifierSkill`, `schemaRefs`, `scripts: LaneScript[]`, `pluginPath` }. The steer
loop is lane-agnostic — `laneResolvers(lane)` builds the `specFor`/`seedFor` it
takes, so a domain is *data*, not a code change. The `lanes.test.ts` proof drives
a DAG through `ENGINEERING_LANE`'s resolvers → `all-done`.

Each domain maps to its REAL plugin (skill names are the actual `skills/<name>`
dirs in the clone, verified on disk by a test):

| Domain | Real skills (count) | Verifier skill | Scripts today |
| ------ | ------------------- | -------------- | ------------- |
| `engineering` ✅ | architecture, code-review, debug, deploy-checklist, documentation, incident-response, standup, system-design, tech-debt, testing-strategy (10) | `code-review` (its SKILL.md *is* a structured reviewer) | run-tests + typecheck (pre-verify gates) |
| `data` ✅ | analyze, build-dashboard, create-viz, data-context-extractor, data-visualization, explore-data, sql-queries, statistical-analysis, validate-data, write-query (10) | `validate-data` | `package_data_skill.py` (the one real script in the clone) |
| `productivity` | memory-management, task-management, start, update (+dashboard.html) | `task-management` | — |
| `product-management` | competitive-brief, metrics-review, product-brainstorming, roadmap-update, sprint-planning, stakeholder-update, synthesize-research, write-spec | `metrics-review` | — |
| `enterprise-search` | digest, knowledge-synthesis, search, search-strategy, source-management | `knowledge-synthesis` | — |
| `design` | accessibility-review, design-critique, design-handoff, design-system, research-synthesis, user-research, ux-copy | `design-critique` | — |
| `cowork-plugin-management` | cowork-plugin-customizer, create-cowork-plugin | `create-cowork-plugin` | — |

`cowork-plugin-management` is the self-improvement lane: it runs the real
`create-cowork-plugin` workflow as a steered DAG, so the chassis can *author new
lanes for itself*.

**Skills carry scripts — the deterministic gate (operator insight, shipped).**
The real `data` and `bio-research` skills bundle `scripts/` trees (Python). A
`LaneScript` with `stage: "pre-verify"` runs BETWEEN model dispatches: after a
producer returns but before the model-verifier is spent, the loop runs the script
(e.g. `run-tests.ts`, `tsc --noEmit`, a SQL `EXPLAIN` validator). A non-zero exit
is a deterministic `fail` — it rejects the producer for free, reserving the
expensive model-verifier for outputs that already pass the cheap mechanical gate.
This is the in-code analogue of "don't ask the model what the test runner can
tell you." (Wiring the script execution into the loop body is the next step;
the `LaneScript` contract + the gate semantics are defined now.)

The DAG generalizes produce → **[script gate]** → verify → (retry|done), with a
domain-specific verifier skill. `design` wants a *panel* (N judges, majority
gate) — a loop parameter (`verifiers: SubagentSpec[]`), not a new loop.

---

## §3 — Python `knowledge-cowork-agent` on redis-py + Docker — DESIGN

**Why Python + why now:** the operator's running stack is already here —
`dragonfly` (redis-compatible) on `:6379` and `alloydb` on `:5433`, both up,
`redis-py 7.4.0` + Python 3.14.4 installed (matches the workspace cpython pin).
The TS chassis is in-process and ephemeral; a Python sibling adds **durable,
cross-session steering memory** — the exact thing that bit me this session when
the channel dropped and I lost loop state.

**Architecture (mirror the TS chassis, don't fork it):**

```
knowledge-cowork-agent/  (Python; github.com/anthropics/redis-py)
├── steer.py          # mirrors steer.ts: same DAG + verifier-retry + budget gate
├── memory.py         # redis-py against dragonfly :6379 — the steering state store
├── state.py          # psycopg against alloydb :5433 — durable TaskEnvelope ledger
└── lanes/            # one module per §2 lane
```

- **dragonfly (`:6379`, redis-compatible)** = hot steering memory:
  - `HSET steer:<run>:attempts <taskId> <n>` — survives a process restart, so a
    dropped session *resumes the loop* instead of restarting it.
  - `XADD steer:<run>:events` — an append-only stream of dispatch/verdict events
    (the `onStep` narration, durable) → cross-session observability.
  - `SET steer:<run>:budget <spent>` with `INCRBYFLOAT` — the cost gate becomes
    multi-process-safe.
- **alloydb (`:5433`)** = durable task ledger: the `TaskEnvelope` DAG + final
  `structured_output` per task, queryable history of every steered run (the
  `data` lane in §2 reads its own runs back).
- **Python `claude -p`:** the Agent SDK has a Python binding
  (`agent-sdk/python.md` in vendor/), and `skills/claude-api/python` is the
  distilled API guide — same `query()` + `outputFormat` + `structured_output`
  surface as TS, so `steer.py` is a near-line-for-line port.

The two chassis share nothing at runtime but share the *protocol*: a TS loop and
a Python loop can cooperate on one DAG because the state lives in
dragonfly/alloydb, not in either process. That's the cross-language self-steering.

---

## §4 — VS Code as the human-in-the-loop surface — DESIGN

The steer loop is autonomous, but the operator works in VS Code (this session
is VS Code; `vendor/anthropics/code.claude.com/docs/en/vs-code.md` is mirrored).
Two integration points make the loop *steerable by a human without stopping it*:

1. **URI handoff (`vscode://anthropic.claude-code/open?prompt=...&session=...`).**
   When the loop hits a `max-attempts` or `deadlock` stop, it emits a VS Code
   deep link pre-filled with the failing task + its rubric, and the resumable
   `session` id. The operator clicks it, lands in a Claude Code tab with full
   context, fixes the blocker, and the loop resumes from dragonfly state (§3).
   This is the *escalation* path — the loop asks for help in the operator's IDE
   instead of silently failing (the failure mode I hit manually this session).

2. **`mcp__ide__getDiagnostics` as a PostToolUse steering signal.** The VS Code
   extension exposes a built-in `ide` MCP server with `getDiagnostics` (the
   Problems panel — language-server errors). Wire it as a `PostToolUse` hook on
   any code-producing task: after an `Edit`, the loop reads diagnostics and, if
   the edit introduced an error, treats it as a verifier `fail` and retries —
   *before* the verifier even runs. This is the in-code analogue of the no-op
   `lastCrawled` edit that slipped past me this session: a PostToolUse
   diagnostic re-check would have caught it immediately.

Both use SDK levers already in `sdk.d.ts`: `hooks` (line 1321) and the IDE MCP
server (`settingSources: ["project"]` picks it up automatically under VS Code).

---

## Build order (when the operator opts in)

1. **§1 plugins-per-lane** — smallest, highest leverage: add `plugins`/`skills`
   to `SubagentSpec`, wire to `query()`, load `code-review` as a verifier. One
   commit; tests with the scripted fake query().
2. **§4.2 diagnostics-as-fail** — a `PostToolUse` hook in `steer.ts`; cheap,
   catches a whole class of silent failures.
3. **§2 lane abstraction** — refactor `specFor`/`seedFor`/`schemaFor` into a
   `Lane` record; add the `engineering` lane first (reuses §1 plugins).
4. **§3 Python chassis** — the durable-memory sibling; unblocks resume-across-
   session, then §4.1 escalation.

Each step is independently shippable and testable with the injected-fake pattern
the chassis already uses — no live API, no live services required for the tests
(the dragonfly/alloydb integration tests gate on container availability, like
the existing `vendor-cleanliness` skip pattern).

---

## Citations

- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md` — AgentDefinition surface
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md` — outputFormat / structured_output
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/python.md` — Python binding for §3
- `vendor/anthropics/code.claude.com/docs/en/vs-code.md` — URI handler + ide MCP for §4
- `src/agent/knowledge-agent/steer.ts` — the shipped §0 spine
- External (operator-named, not yet mirrored): github.com/anthropics/defending-code-reference-harness,
  claude-plugins-official, knowledge-work-plugins, redis-py, claude-agent-sdk-typescript,
  modelcontextprotocol/typescript-sdk
