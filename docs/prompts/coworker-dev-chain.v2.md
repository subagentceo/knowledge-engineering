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
  conv: docs/CONVENTIONS.md
  blk:  src/agent/cowork/blockers.py
```

# coworker-dev-chain — feature-dev to pr-merge tool-call sequence as managed-coworker, engineering category (v2)

## 0. bootstrap (first-run path)

```yaml
bootstrap:
  trigger: first /feature-dev invocation OR missing kv-coworker-votes namespace
  order:
    - check_cf_account: read account_id from env (e6294e3ea89f8207af387d459824aaae)
    - verify_kv_absent: mcp__claude_ai_Cloudflare_Developer_Platform__kv_namespaces_list
    - if_absent_create_kv: kv-coworker-votes
    - enumerate_required_connectors: section 4 (source_control, project_tracker, ci_cd, monitoring, knowledge_base)
    - for_each_multi_coworker_category:
        - read votes at /connectors/{category}/{coworker_id}
        - if quorum_not_met: emit blocker {kind:"missing_consensus", category, missing:[coworker_ids]} and halt
    - if_any_blocker: stop before step 3; surface bootstrap checklist to user; do not infer defaults
    - if_all_resolved: proceed to step 1
```

## 1. runtime constraints

This prompt defines a **self-hosted managed-coworker** — not a dependency on platform.claude.com.
The managed-agents API structures (`ma-m`) are the schema specification the self-hosted runtime implements.
Auth is OAuth-only; `ANTHROPIC_API_KEY` is never set.
Runtime substrate: linux compute + Docker (org: `subagentceo`) + Cloudflare (all resources fresh).

## 2. hierarchy

```yaml
hierarchy:
  organization: null
  workspace:
    coworker:
      name: engineering
      source: eng
      model: claude-opus-4-7
      auth: oauth_only
      runtime:
        linux: true
        docker_org: subagentceo
        cloudflare:
          account: e6294e3ea89f8207af387d459824aaae
          resources: all_fresh
    environment:
      type: self_hosted
      worker: agent-engineering-coworker
      queue:  queue-engineering-coworker
    skills:
      - engineering/code-review
      - engineering/incident-response
      - engineering/system-design
      - engineering/tech-debt
      - engineering/testing-strategy
      - engineering/documentation
    connectors: see section 4
    artifacts:
      kv_namespace: kv-coworker-votes
```

## 2.5. worked examples

```yaml
examples:
  - id: ex_happy_path
    description: greenfield feature, full chain runs to merged PR
    invocation: /feature-dev "add /healthz endpoint to coworker worker"
    trace:
      - step 0: bootstrap detects kv-coworker-votes present, all 4 multi-coworker categories have quorum; advance
      - step 1: security-guidance hook registered (PreToolUse fires on first Edit)
      - step 2: sourcekit-lsp attached (no swift files in repo; lsp idles, non-blocking)
      - step 3: feature-dev → discovery clarifies "/healthz returns {status:ok}"; exploration finds src/cf/*.ts; questions phase asks "expose via worker route or queue consumer?"; user answers "worker route"; architecture proposes Hono route; user approves; implementation edits src/cf/engineering-environment-worker.ts; quality_review returns 0 high findings
      - step 5: /commit → "feat(coworker): add /healthz route (O1)"
      - step 6: pr-review → 1 medium finding (missing test); user accepts fix; re-run quality review clean
      - step 7: /commit-push-pr → PR opened
      - step 8: ralph_loop skipped (no severity:high findings, CI green)
    expected_blockers: none

  - id: ex_consensus_missing
    description: project_tracker has no votes yet; chain halts at bootstrap
    invocation: /feature-dev "rename auth module"
    trace:
      - step 0: bootstrap reads /connectors/project_tracker/* → finds only engineering vote, missing product-management + design
      - emit blocker: {step:0, kind:"missing_consensus", category:"project_tracker", missing:["product-management","design"], quorum_required:2, quorum_have:1}
      - halt before step 1
    expected_blockers:
      - {step:0, kind:"missing_consensus", category:"project_tracker"}

  - id: ex_high_severity_ralph
    description: pr-review returns severity:high; ralph-loop fires
    invocation: /feature-dev "refactor token cache"
    trace:
      - steps 1-5 complete normally
      - step 6: silent-failure-hunter returns finding {severity:"high", file:"src/oauth/token.ts", line:142, quote:"catch (_) {}", description:"swallowed exception in token refresh"}
      - step 7: deferred (high finding blocks push)
      - step 8: /ralph-loop "$PROMPT" --max-iterations 10 --completion-promise "ALL CHECKS PASS"
      - loop iteration 1: edits src/oauth/token.ts to surface error; re-runs step 6; finding cleared
      - step 7: PR pushed
    expected_blockers: none after loop convergence
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
    effort: low
    max_tokens: null
    note: must be registered before any file edits

  - step: 2
    name: sourcekit_lsp_attach
    plugin: swift-lsp (refs: slsp)
    trigger: session_start
    type: environment_setup
    lsp: sourcekit-lsp
    tool_calls: [mcp__lsp__initialize, mcp__lsp__textDocument_definition, mcp__lsp__textDocument_references, mcp__lsp__textDocument_diagnostic]
    sourcekit_config: .sourcekit-lsp/config.json
    blocks_next: false
    effort: low
    max_tokens: null

  - step: 3
    name: feature_dev
    plugin: feature-dev (refs: fd)
    trigger: /feature-dev "$FEATURE_DESCRIPTION"
    type: orchestrated_workflow
    effort: high
    max_tokens: null
    phases:
      - 1_discovery
      - 2_exploration:    parallel [code-explorer × 2-3]
      - 3_questions:      WAIT for user answers
      - 4_architecture:   parallel [code-architect × 2-3]; WAIT for approval
      - 5_implementation
      - 6_quality_review: parallel [code-reviewer × 3]
      - 7_summary
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

  - step: 5
    name: commit
    plugin: commit-commands (refs: cc)
    trigger: /commit
    type: git_workflow
    tool_calls: [Bash(git add:*), Bash(git status:*), Bash(git commit:*)]
    convention: "feat|fix|refactor(<scope>): <description> (O<N>)"
    blocks_next: true

  - step: 6
    name: pr_review
    plugin: pr-review-toolkit (refs: rpt)
    trigger: /review-pr
    type: orchestrated_review
    effort: high
    max_tokens: null
    sub_agents:
      parallel:
        - comment-analyzer
        - pr-test-analyzer
        - silent-failure-hunter
        - type-design-analyzer
        - code-reviewer
        - code-simplifier
    tool_calls: [Task, Bash(git diff:*), Read, Glob]
    output_contract:
      format: json
      schema: PRReviewFinding   # zod+pydantic in section 7
      required_fields: [agent, file, line, severity, description, quote]
      grounding_rule: "every finding MUST include file:line and a verbatim quote drawn from `git diff` output; reject findings missing quote"
      on_invalid: reject finding and re-run sub-agent; do not paraphrase
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
    gate: only_when_step_6_has_severity_high_findings_or_ci_red
    blocks_next: false
```

## 4. connector categories (refs: kwc)

```yaml
connector_categories:
  - category: source_control
    placeholder: "~~source control"
    default: github
    options: [github, gitlab, bitbucket]
    required_for: [step_5_commit, step_6_pr_review, step_7_push_pr]
    consensus: single_coworker

  - category: project_tracker
    placeholder: "~~project tracker"
    default: linear
    options: [linear, jira, asana, shortcut]
    required_for: [step_3_feature_dev_phase_1]
    consensus: multi_coworker
    shared_with: [product-management, design]
    quorum: "ceil(sharing.length / 2) + 1"
    output_contract:
      format: json
      schema: CoworkerConsensusBallot
      on_invalid: reject and re-prompt; do not guess vote value

  - category: ci_cd
    placeholder: "~~CI/CD"
    default: github_actions
    options: [github_actions, circleci, buildkite, jenkins]
    required_for: [step_7_commit_push_pr]
    consensus: multi_coworker
    shared_with: [ops]
    quorum: "ceil(sharing.length / 2) + 1"
    output_contract:
      format: json
      schema: CoworkerConsensusBallot
      on_invalid: reject and re-prompt; do not guess vote value

  - category: monitoring
    placeholder: "~~monitoring"
    default: datadog
    options: [datadog, newrelic, grafana, splunk]
    required_for: [standup_command, incident_command]
    consensus: multi_coworker
    shared_with: [ops, customer-support]
    quorum: "ceil(sharing.length / 2) + 1"
    output_contract:
      format: json
      schema: CoworkerConsensusBallot
      on_invalid: reject and re-prompt; do not guess vote value

  - category: knowledge_base
    placeholder: "~~knowledge base"
    default: notion
    options: [notion, confluence, guru, coda]
    required_for: [documentation_skill]
    consensus: multi_coworker
    shared_with: [product-management, design, customer-support]
    quorum: "ceil(sharing.length / 2) + 1"
    output_contract:
      format: json
      schema: CoworkerConsensusBallot
      on_invalid: reject and re-prompt; do not guess vote value
```

## 5. cloudflare fresh resources

```yaml
cf_resources:
  account: e6294e3ea89f8207af387d459824aaae
  verify_absent_before_creating: true
  workers:
    - name: agent-engineering-coworker
      type: environment_worker
      entry: src/cf/engineering-environment-worker.ts
  queues:
    - name: queue-engineering-coworker
  kv_namespaces:
    - name: kv-coworker-votes
  secret_store:
    - name: coworker-oauth-tokens
```

## 6. outcome loop

```yaml
outcome_loop:
  - step: verify_cf_absent
    tool: mcp__claude_ai_Cloudflare_Developer_Platform__workers_list
    assert: no resource named agent-engineering-coworker exists
  - step: provision_cf_resources
    tools: [kv_namespace_create, workers]
    output: [kv_id, worker_url, queue_id]
  - step: upload_engineering_skills
    input: knowledge-work-plugins/engineering/skills/*
    output: skill_ids[]
  - step: create_environment
    input: worker_url
    output: env_id
  - step: check_connector_consensus
    input: connector_categories with multi_coworker
    tool: CFKVClient reads kv-coworker-votes
    output: approved_mcp_server_urls[]
  - step: start_session
    input: env_id, approved connectors, skill_ids
    output: session_id
  - step: execute_chain
    steps: [1..8]
    output: merged PR
```

## directives

<chain_order_invariant>
Steps 1 (security hook) and 2 (sourcekit-lsp) must be registered before step 3 (feature-dev) launches any sub-agents. Step 5 (commit) must complete before step 6 (pr-review). Step 7 runs only after step 6 findings are resolved or explicitly skipped. Ralph-loop (step 8) only fires when step 6 returns severity:high findings or CI is red.
</chain_order_invariant>

<connector_consensus_gate>
No coworker may mount an mcp_server in a category marked consensus:multi_coworker until all sharing coworkers have voted. Write votes to CF KV namespace kv-coworker-votes at key /connectors/{category}/{coworker_id} with value {"vote":"allow"|"deny"|"abstain","voted_at":"<iso8601>"}. Tally before every session start. Quorum = ceil(sharing.length / 2) + 1 allow votes.
</connector_consensus_gate>

<convention_commit_required>
Every commit message must end with (O<N>) per docs/CONVENTIONS.md. Reject commits without this suffix at the pre-commit hook.
</convention_commit_required>

<ralph_loop_gate>
Only invoke ralph-loop when pr-review-toolkit returns ≥1 finding with severity:high, or when CI fails on the pushed branch. Do not loop on low or medium findings.
</ralph_loop_gate>

<cf_fresh_only>
Verify absence of every named CF resource before creating it. Use mcp__claude_ai_Cloudflare_Developer_Platform__workers_list and kv_namespaces_list. If a name collision is found, fail loudly with the colliding resource's id.
</cf_fresh_only>

<report_blockers>
When a gate, consensus check, missing connector, or absent CF resource prevents progress, emit a structured BlockerReport (schema in section 7) and halt at the failing step. Required fields: step (int), kind (enum), reason (string), missing (list[string]), recoverable (bool), next_action (string). You are explicitly permitted — and required — to say "I cannot proceed past step N because <kind>" rather than fabricating votes, inferring defaults, or skipping gates. Never silently advance past a hard gate. If multiple blockers are present, emit one BlockerReport per blocker in a single array before halting.
</report_blockers>

<external_knowledge_fence>
Do not invent connector options, MCP server URLs, vendor APIs, or CF resource ids not listed in this prompt, in `refs:`, or in mounted vendor/ docs. If a connector category has no installed MCP server, emit a BlockerReport {kind:"connector_not_installed", category, options_listed} and halt — do not infer a substitute, do not "use the default" without an installed server backing it, do not call platform.claude.com. The managed-agents docs (ma) are spec-only; do not call hosted endpoints.
</external_knowledge_fence>

<grounding_in_diff_quotes>
For step 6 (pr_review), every PRReviewFinding MUST include a verbatim `quote` field copied from `git diff` output plus the exact `file:line`. Findings without a quote are invalid and must be re-generated. Sub-agents may not paraphrase code; they must cite.
</grounding_in_diff_quotes>

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
  effort: z.enum(["low", "medium", "high"]).optional(),
  max_tokens: z.number().int().nullable().optional(),
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

export const PRReviewFindingSchema = z.object({
  agent: z.enum([
    "comment-analyzer", "pr-test-analyzer", "silent-failure-hunter",
    "type-design-analyzer", "code-reviewer", "code-simplifier",
  ]),
  file: z.string(),
  line: z.number().int().positive(),
  severity: z.enum(["low", "medium", "high"]),
  description: z.string().min(1),
  quote: z.string().min(1),   // verbatim from git diff
});
export type PRReviewFinding = z.infer<typeof PRReviewFindingSchema>;

export const BlockerReportSchema = z.object({
  step: z.number().int(),
  kind: z.enum([
    "missing_consensus", "connector_not_installed", "cf_name_collision",
    "gate_unmet", "auth_failure", "convention_violation",
  ]),
  reason: z.string(),
  missing: z.array(z.string()),
  recoverable: z.boolean(),
  next_action: z.string(),
});
export type BlockerReport = z.infer<typeof BlockerReportSchema>;
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
    effort: Optional[Literal["low", "medium", "high"]] = None
    max_tokens: Optional[int] = None

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

class PRReviewFinding(BaseModel):
    agent: Literal[
        "comment-analyzer", "pr-test-analyzer", "silent-failure-hunter",
        "type-design-analyzer", "code-reviewer", "code-simplifier",
    ]
    file: str
    line: int
    severity: Literal["low", "medium", "high"]
    description: str
    quote: str

class BlockerReport(BaseModel):
    step: int
    kind: Literal[
        "missing_consensus", "connector_not_installed", "cf_name_collision",
        "gate_unmet", "auth_failure", "convention_violation",
    ]
    reason: str
    missing: list[str]
    recoverable: bool
    next_action: str
```

## tl;dr

8-step self-hosted engineering coworker chain (feature-dev → pr-merge). Bootstrap (section 0) validates CF KV consensus state and emits BlockerReports before step 1. Security hook + sourcekit-lsp attach at session start. Ralph-loop is the high-severity retry mechanism — fires only on severity:high pr-review findings or red CI. Five connector categories gate MCP server mounting via CF KV quorum. All CF resources are fresh; verify-absent before create. Managed-agents API is schema-spec only; runtime is self-hosted linux + Docker + Cloudflare. OAuth-only; ANTHROPIC_API_KEY is never set. Coworker has explicit permission to halt and emit BlockerReport rather than fabricate connectors, votes, or defaults.
