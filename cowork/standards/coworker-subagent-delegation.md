# Coworker → Subagent delegation (ODD-on-TDD over the plugin chain)

> How a domain **coworker** dispatches coding work to a specialized **subagent** team that **chains
> `cowork/plugins` capabilities** (skills, plugins, MCPs, agents), governed by outcome-driven
> development over TDD red/green/refactor. Dogfoods e2m. Companion to `mailbox-envelope-canon.md`.
>
> @cite cowork/coworkers/manifest.json (coworkers — e2m-native, can initiate work)
> @cite src/subagents/ (the coding workers: feature-dev, pr-review, ralph-loop, swift-lsp, …)
> @cite cowork/plugins/ (52 capability plugins: 12 LSPs + MCP connectors + skill/command/agent plugins)
> @cite plugins/platform-engineering/skills/citations-tests-outcomes (the ODD-on-TDD discipline)
> @cite .claude/skills/durable-agent-ci-cd-rubrics + -evals + -outcomes (the rubric / outcome gate)
> @cite cowork/schemas/envelope.ts (DurableTask + `evaluator`)

## Three tiers, one protocol (e2m)

```text
coworker        domain knowledge worker — owns the OUTCOME, not the code     (cowork/coworkers)
   │  e2m DurableTask (evaluator = pass_if / fail_if = the outcome)
   ▼
subagent team   <domain>-subagents — the coding crew                          (cowork/coworkers/teams + src/subagents)
   │  chains capabilities per task
   ▼
plugin chain    LSP + MCP + skill/command/agent plugins, composed per task    (cowork/plugins, 52)
```

- **Coworker** owns *what / why* — the outcome. It never writes code; it dispatches a typed task.
- **Subagent** (`src/subagents/<name>/{index,worker}.ts`) owns *how* — it executes code.
- **Plugin chain** is the set of `cowork/plugins` capabilities a subagent composes for that task.

## The delegation IS an e2m DurableTask (this is the dogfooding)

The coworker writes a task whose `evaluator` block is the outcome, declared up front:

```yaml
_type: task
queue: engineering-subagents
from: engineering-coworker
subject: "Add the support-claude-docs MCP read_search tool"
evaluator:                                  # ODD — the outcome, declared before work starts
  pass_if:
    - "npm run verify green"
    - "new tool has a failing-then-passing test with an @cite header"
    - "PR body has Outcomes + Test plan + Citations sections"
  fail_if:
    - "tests red"
    - "any path-traversal guard missing on the new tool"
ke_fit_score: 4
```

The subagent team `claim`s it, executes (below), and may only `complete` when `evaluator.pass_if`
holds — **not** merely when tests are green. Failure → `block` / `fail` → escalates a DurableTask back.
Transition rows are the audit trail (latest-line-wins). No new mechanism — this is the existing e2m
Envelope / Task / Transition.

## ODD ⊃ rubric ⊃ TDD (the governance nesting)

```text
outcome   (coworker)   evaluator.pass_if / fail_if — declared before work starts (define-outcomes)
  ⊃ rubric  (CI gate)   durable-agent-ci-cd-{evals,rubrics,outcomes} — scores + merge-gates the work
    ⊃ tests (subagent)  TDD red → green → refactor; @tdd stage tags in commit titles
```

"Done" = the coworker's **outcome** is satisfied, the **rubric** clears, and **tests** are green — in
that order of authority. A subagent's PR is not done at green tests; it's done at outcome satisfied.

## The subagent capability chain (over `cowork/plugins`)

A subagent composes a chain of plugins. Roles:

| role | cowork/plugins | use in the chain |
| :-- | :-- | :-- |
| code intelligence | 12 LSPs — `typescript-lsp`, `pyright-lsp`, `rust-analyzer-lsp`, `swift-lsp`, `gopls-lsp`, `clangd-lsp`, `jdtls-lsp`, `kotlin-lsp`, `ruby-lsp`, `php-lsp`, `lua-lsp`, `csharp-lsp` | per-language navigation, types, refactor |
| external systems (MCP) | `github`, `gitlab`, `linear`, `asana`, `context7`, `playwright`, `serena`, `firebase`, … | docs lookup, issues/PRs, browser tests |
| workflow (skill / command / agent plugins) | `feature-dev`, `code-review`, `code-simplifier`, `code-modernization`, `pr-review-toolkit`, `security-guidance`, `commit-commands`, `ralph-loop` | explore → implement → review → commit |

Worked chain — a TypeScript feature dispatched to `engineering-subagents`:

```text
1. context7 (MCP)                → pull the library API docs (@cite)
2. typescript-lsp                → navigate types, find call sites
3. feature-dev (plugin)          → RED: write the failing test (@tdd red, @cite header)
4. typescript-lsp + worker.ts    → GREEN: implement until the test passes (@tdd green)
5. code-simplifier               → REFACTOR (@tdd refactor)
6. code-review + pr-review-toolkit + security-guidance → rubric pass
7. github (MCP)                  → open the PR (Outcomes + Test plan + Citations body)
8. commit-commands               → outcome-tagged Conventional Commit (… (O7))
→ task_transition complete ONLY if evaluator.pass_if holds; else block → escalate
```

The chain is **domain-tuned**: design-subagents leans on `frontend-design` + `playwright`;
data-subagents on the warehouse SQL + `serena`; an iOS task on `swift-lsp`. Same e2m contract,
different plugin chain.

## The team binding (the one genuinely new piece)

`cowork/coworkers/teams/<domain>-subagents.yaml` (the currently-empty `teams/` slot) declares a
coworker's coding crew — which `src/subagents` workers it runs and which `cowork/plugins` it may chain:

```yaml
team: engineering-subagents
parent: engineering-coworker
queue: cowork/data/queues/engineering-subagents.jsonl
workers: [feature-dev, pr-review, commit-commands]        # src/subagents
plugins:                                                  # cowork/plugins allowlist
  intelligence: [typescript-lsp, pyright-lsp, rust-analyzer-lsp]
  systems: [github, context7, serena]
  workflow: [feature-dev, code-review, code-simplifier, security-guidance, commit-commands]
governance:
  outcome: "evaluator (from the dispatching DurableTask)"
  rubric: durable-agent-ci-cd-rubrics
  tdd: citations-tests-outcomes                           # @tdd red/green/refactor
```

## Don't-reinvent ledger

- coworkers, e2m, the `evaluator` block, transitions → already exist (manifest, `envelope.ts`).
- subagent workers → already exist (`src/subagents/*`).
- plugin capabilities (12 LSPs, MCP connectors, skill/command/agent plugins) → already exist (`cowork/plugins/*`, 52).
- ODD + TDD discipline → already exist (`citations-tests-outcomes`, `durable-agent-ci-cd-*`).
- **New:** only the `cowork/coworkers/teams/<domain>-subagents.yaml` binding + the dispatch convention above.
