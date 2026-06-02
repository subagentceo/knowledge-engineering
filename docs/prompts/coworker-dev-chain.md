```yaml
refs:
  fd:   /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/feature-dev/commands/feature-dev.md
  rpt:  /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/pr-review-toolkit/commands/review-pr.md
  cc:   /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/commit-commands/commands
  sg:   /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/security-guidance/hooks
  rl:   /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/ralph-loop/commands
  slsp: /home/alexzh/subagentmcp/subagentplugins/claude-plugins-official/plugins/swift-lsp/README.md
  eng:  /home/alexzh/subagentmcp/subagentplugins/knowledge-work-plugins/engineering
  kwc:  eng/CONNECTORS.md
  ma:   vendor/anthropics/platform.claude.com/docs/en/managed-agents
  ma-m: docs/managed-agents-models.ts
```

# coworker-dev-chain — feature-dev to pr-merge tool-call sequence as managed-coworker, engineering category

## 1. runtime constraints

This prompt defines a **self-hosted managed-coworker** — not a dependency on platform.claude.com.
The managed-agents API structures (`ma-m`) are the schema specification the self-hosted runtime implements.
Auth is OAuth-only; `ANTHROPIC_API_KEY` is never set.
Runtime substrate: linux compute + Docker (org: `subagentceo`) + Cloudflare (all resources fresh).

## 2. hierarchy

```yaml
hierarchy:
  organization: null  # workspace-scoped
  workspace:
    coworker:
      name: engineering
      source: eng   # knowledge-work-plugins/engineering
      model: claude-opus-4-7
      auth: oauth_only   # ANTHROPIC_API_KEY never used
      runtime:
        linux: true
        docker_org: subagentceo
        cloudflare:
          account: e6294e3ea89f8207af387d459824aaae
          resources: all_fresh  # nothing reused from existing CF state
    environment:
      type: self_hosted
      worker: agent-engineering-coworker   # fresh CF Worker
      queue:  queue-engineering-coworker   # fresh CF Queue
    skills:
      - engineering/code-review
      - engineering/incident-response
      - engineering/system-design
      - engineering/tech-debt
      - engineering/testing-strategy
      - engineering/documentation
    connectors: see section 4
    artifacts:
      kv_namespace: kv-coworker-votes   # fresh; consensus state for shared connectors
```

## 3. tool-call chain (ordered)

Steps run in order unless marked `parallel_with`. Gates are hard blocks — do not advance without resolution.

```yaml
chain:
  - step: 1
    name: security_hook_register
    plugin: security-guidance (refs: sg)
    trigger: PreToolUse(Edit|Write|Bash)
    type: always_on_hook
    blocks_next: false
    note: must be registered before any file edits; fires on every write, warns on injection/XSS patterns

  - step: 2
    name: sourcekit_lsp_attach
    plugin: swift-lsp (refs: slsp)
    trigger: session_start
    type: environment_setup
    lsp: sourcekit-lsp (ships with Swift toolchain)
    tool_calls: [mcp__lsp__initialize, mcp__lsp__textDocument_definition, mcp__lsp__textDocument_references, mcp__lsp__textDocument_diagnostic]
    sourcekit_config: .sourcekit-lsp/config.json  # {"swiftPM":{"configuration":"debug"}}
    blocks_next: false
    note: attach before feature-dev so code-explorer agents have go-to-def and find-refs

  - step: 3
    name: feature_dev
    plugin: feature-dev (refs: fd)
    trigger: /feature-dev "$FEATURE_DESCRIPTION"
    type: orchestrated_workflow
    phases:
      - 1_discovery:      clarify feature scope; create TodoWrite list
      - 2_exploration:    parallel [code-explorer × 2-3]; read returned file lists
      - 3_questions:      present ALL ambiguities to user; WAIT for answers (refs: fd phase 3)
      - 4_architecture:   parallel [code-architect × 2-3]; present approaches + recommendation; WAIT
      - 5_implementation: user-approved approach only; follow codebase conventions; update todos
      - 6_quality_review: parallel [code-reviewer × 3]: simplicity/DRY, bugs, conventions
      - 7_summary:        mark todos done; summarize decisions + modified files
    tool_calls: [Task, Read, Glob, Grep, Edit, Write, Bash]
    gates:
      - phase_3_user_answers_required
      - phase_4_user_architecture_approval
      - phase_5_no_start_without_approval
    blocks_next: true

  - step: 4
    name: security_scan_post_edit
    plugin: security-guidance (refs: sg)
    trigger: PostToolUse(Write|Edit)
    type: hook
    tool_calls: [Read]
    parallel_with: 3
    blocks_next: false
    note: reads every modified file; emits warnings before continuing; does not block but flags

  - step: 5
    name: commit
    plugin: commit-commands (refs: cc)
    trigger: /commit
    type: git_workflow
    tool_calls: [Bash(git add:*), Bash(git status:*), Bash(git commit:*)]
    convention: "feat|fix|refactor(<scope>): <description> (O<N>)"
    note: convention suffix (O<N>) enforced per docs/CONVENTIONS.md
    blocks_next: true

  - step: 6
    name: pr_review
    plugin: pr-review-toolkit (refs: rpt)
    trigger: /review-pr
    type: orchestrated_review
    sub_agents:
      parallel:
        - comment-analyzer      # code comment accuracy
        - pr-test-analyzer      # test coverage quality
        - silent-failure-hunter # error handling gaps
        - type-design-analyzer  # type invariants (when new types added)
        - code-reviewer         # project guidelines conformance
        - code-simplifier       # simplicity + DRY
    tool_calls: [Task, Bash(git diff:*), Read, Glob]
    output: consolidated findings with severity [low|medium|high]
    gate: user_decides_fix_or_skip_per_finding
    blocks_next: true

  - step: 7
    name: commit_push_pr
    plugin: commit-commands (refs: cc)
    trigger: /commit-push-pr
    type: git_workflow
    tool_calls: [Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*)]
    blocks_next: false

  - step: 8
    name: ralph_iterate
    plugin: ralph-loop (refs: rl)
    trigger: /ralph-loop "$PROMPT" --max-iterations 10 --completion-promise "ALL CHECKS PASS"
    type: while_loop
    mechanism: stop-hook intercepts exit; feeds same prompt; Claude sees own prior work in files + git log
    gate: only_when_step_6_has_severity_high_findings_or_ci_red
    blocks_next: false
```

## 4. connector categories (refs: kwc)

MCP servers are provisioned conditionally. Categories marked `multi_coworker` require consensus before mounting.
Consensus written to CF KV namespace `kv-coworker-votes` at key `/connectors/{category}/{coworker_id}`.

```yaml
connector_categories:
  - category: source_control
    placeholder: "~~source control"
    default: github
    options: [github, gitlab, bitbucket]
    required_for: [step_5_commit, step_6_pr_review, step_7_push_pr]
    consensus: single_coworker
    note: engineering coworker is the sole consumer of source-control in this scope

  - category: project_tracker
    placeholder: "~~project tracker"
    default: linear
    options: [linear, jira, asana, shortcut]
    required_for: [step_3_feature_dev_phase_1]
    consensus: multi_coworker
    shared_with: [product-management, design]
    quorum: "ceil(sharing.length / 2) + 1"

  - category: ci_cd
    placeholder: "~~CI/CD"
    default: github_actions
    options: [github_actions, circleci, buildkite, jenkins]
    required_for: [step_7_commit_push_pr]
    consensus: multi_coworker
    shared_with: [ops]
    quorum: "ceil(sharing.length / 2) + 1"

  - category: monitoring
    placeholder: "~~monitoring"
    default: datadog
    options: [datadog, newrelic, grafana, splunk]
    required_for: [standup_command, incident_command]
    consensus: multi_coworker
    shared_with: [ops, customer-support]
    quorum: "ceil(sharing.length / 2) + 1"

  - category: knowledge_base
    placeholder: "~~knowledge base"
    default: notion
    options: [notion, confluence, guru, coda]
    required_for: [documentation_skill]
    consensus: multi_coworker
    shared_with: [product-management, design, customer-support]
    quorum: "ceil(sharing.length / 2) + 1"
```

## 5. cloudflare fresh resources

```yaml
cf_resources:
  account: e6294e3ea89f8207af387d459824aaae   # Alex@jadecli.com
  verify_absent_before_creating: true           # mcp__claude_ai_Cloudflare_Developer_Platform__workers_list + kv_namespaces_list
  workers:
    - name: agent-engineering-coworker
      type: environment_worker                  # implements self-hosted EnvironmentWorker SDK pattern
      entry: src/cf/engineering-environment-worker.ts
  queues:
    - name: queue-engineering-coworker
  kv_namespaces:
    - name: kv-coworker-votes                  # shared consensus store; all coworker categories write here
  secret_store:
    - name: coworker-oauth-tokens              # OAuth tokens per connector; never exposed to env vars
```

## 6. outcome loop (ralph pattern)

```yaml
outcome_loop:
  - step: verify_cf_absent
    tool: mcp__claude_ai_Cloudflare_Developer_Platform__workers_list
    assert: no resource named agent-engineering-coworker exists
  - step: provision_cf_resources
    tools: [kv_namespace_create, workers (via wrangler deploy)]
    output: [kv_id, worker_url, queue_id]
  - step: upload_engineering_skills
    input: knowledge-work-plugins/engineering/skills/*
    output: skill_ids[]   # /v1/skills/versions per skill (spec: ma-m)
  - step: create_environment
    input: worker_url
    output: env_id        # /v1/environments self_hosted (spec: ma-m)
  - step: check_connector_consensus
    input: connector_categories with multi_coworker
    tool: CFKVClient reads kv-coworker-votes
    output: approved_mcp_server_urls[]
  - step: start_session
    input: env_id, approved connectors, skill_ids
    output: session_id    # /v1/sessions (spec: ma-m)
  - step: execute_chain
    steps: [1..8]
    output: merged PR
```

## directives

<chain_order_invariant>
Steps 1 (security hook) and 2 (sourcekit-lsp) must be registered before step 3 (feature-dev) launches any sub-agents.
Step 5 (commit) must complete before step 6 (pr-review). Step 7 (commit-push-pr) runs only after step 6 findings are resolved or explicitly skipped. Ralph-loop (step 8) only fires when step 6 returns severity:high findings or CI is red.
</chain_order_invariant>

<connector_consensus_gate>
No coworker may mount an mcp_server in a category marked consensus:multi_coworker until all sharing coworkers have voted. Write votes to CF KV namespace kv-coworker-votes at key /connectors/{category}/{coworker_id} with value {"vote":"allow"|"deny"|"abstain","voted_at":"<iso8601>"}. Tally before every session start. Quorum = ceil(sharing.length / 2) + 1 allow votes.
</connector_consensus_gate>

<convention_commit_required>
Every commit message must end with (O<N>) per docs/CONVENTIONS.md. The /commit command receives scope and tag as arguments. Reject commits without this suffix at the pre-commit hook. Example: "feat(coworker): add engineering chain (O1)".
</convention_commit_required>

<ralph_loop_gate>
Only invoke ralph-loop when pr-review-toolkit returns ≥1 finding with severity:high, or when CI fails on the pushed branch. Do not loop on low or medium findings — resolve those interactively in step 6.
</ralph_loop_gate>

<cf_fresh_only>
Verify absence of every named CF resource before creating it. Use mcp__claude_ai_Cloudflare_Developer_Platform__workers_list and kv_namespaces_list. If a name collision is found, fail loudly with the colliding resource's id — do not reuse it.
</cf_fresh_only>

## 7. schemas

```typescript
// @cite docs/managed-agents-models.ts
import { z } from "zod";

export const DevChainStepSchema = z.object({
  step: z.number().int(),
  name: z.string(),
  plugin: z.string(),
  trigger: z.string(),
  type: z.enum([
    "always_on_hook", "environment_setup", "orchestrated_workflow",
    "git_workflow", "orchestrated_review", "while_loop", "hook",
  ]),
  blocks_next: z.boolean(),
  parallel_with: z.number().int().optional(),
  gate: z.string().optional(),
});
export type DevChainStep = z.infer<typeof DevChainStepSchema>;

export const ConnectorCategorySchema = z.object({
  category: z.string(),
  placeholder: z.string(),
  default: z.string(),
  options: z.array(z.string()),
  required_for: z.array(z.string()),
  consensus: z.enum(["single_coworker", "multi_coworker"]),
  shared_with: z.array(z.string()).optional(),
  quorum: z.string().optional(),
});
export type ConnectorCategory = z.infer<typeof ConnectorCategorySchema>;

export const CoworkerConsensusBallotSchema = z.object({
  coworker_id: z.string(),
  category: z.string(),
  vote: z.enum(["allow", "deny", "abstain"]),
  voted_at: z.string().datetime(),
});
export type CoworkerConsensusBallot = z.infer<typeof CoworkerConsensusBallotSchema>;
```

```python
# @cite src/agent/cowork/models.py
from __future__ import annotations
from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel

class DevChainStep(BaseModel):
    step: int
    name: str
    plugin: str
    trigger: str
    type: Literal[
        "always_on_hook", "environment_setup", "orchestrated_workflow",
        "git_workflow", "orchestrated_review", "while_loop", "hook",
    ]
    blocks_next: bool
    parallel_with: Optional[int] = None
    gate: Optional[str] = None

class ConnectorCategory(BaseModel):
    category: str
    placeholder: str
    default: str
    options: list[str]
    required_for: list[str]
    consensus: Literal["single_coworker", "multi_coworker"]
    shared_with: list[str] = []
    quorum: Optional[str] = None

class CoworkerConsensusBallot(BaseModel):
    coworker_id: str
    category: str
    vote: Literal["allow", "deny", "abstain"]
    voted_at: datetime
```

## tl;dr

8-step tool-call chain maps feature-dev through to pr-merge as a single self-hosted engineering coworker; security hook and sourcekit-lsp attach at session start and run continuously. The ralph-loop is the high-severity retry mechanism — it fires only on severity:high pr-review findings or red CI. Five connector categories gate MCP server mounting: source-control is single-coworker; project-tracker, CI/CD, monitoring, and knowledge-base require multi-coworker consensus via CF KV. All CF resources are fresh; nothing from existing Cloudflare state is reused. Managed-agents API structures serve as the schema specification only — runtime is self-hosted on linux + Docker + Cloudflare.
