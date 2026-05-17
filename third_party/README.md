# third_party/

Read-only git submodules pinned to specific upstream commits.

Per [ADR OPR2](../docs/decisions/2026-05-17-third-party-submodules-supersede-opr1.md)
this is the **read-only upstream pin** pattern — distinct from the
sibling-working-repo pattern in [ADR OPR1](../docs/decisions/2026-05-16-polyrepo-sibling-pattern.md).

## Pins (this PR — agent-skills + tools batch)

| Submodule | Upstream | Pinned to |
|---|---|---|
| `redis-agent-skills` | https://github.com/redis/agent-skills | main `4eaff191` [TODO-OPERATOR: no tags upstream] |
| `neon-agent-skills` | https://github.com/neondatabase/agent-skills | main `b76e344e` [TODO-OPERATOR: no tags upstream] |
| `cloudflare-skills` | https://github.com/cloudflare/skills | main `60147cbb` [TODO-OPERATOR: no tags upstream] |
| `agentskills-spec` | https://github.com/agentskills/agentskills | main `2d3e01f5` [TODO-OPERATOR: no tags upstream] |
| `hashicorp-agent-skills` | https://github.com/hashicorp/agent-skills | main `43ca9b0c` [TODO-OPERATOR: no tags upstream] |
| `atlassian-mcp-server` | https://github.com/atlassian/atlassian-mcp-server | main `9b52fb18` [TODO-OPERATOR: no tags upstream] |
| `terragrunt` | https://github.com/gruntwork-io/terragrunt | tag `v1.0.4` |
| `anthropics-knowledge-work-plugins` | https://github.com/anthropics/knowledge-work-plugins | main `a0fda662` [TODO-OPERATOR: no tags upstream] |

## Pins (other PRs)

`workerd`, `workers-sdk`, `dynamic-workflows` are added under PR #191 (OPR2).
`docs-mirrors/` (the on-demand catalog of llms.txt + page-md sources) is
added under PR #192 (OPR3). When all three PRs merge this README is the
union view.

## Rules

1. **Read-only.** Never edit files inside a submodule directory.
   `.github/workflows/third-party-guard.yml` rejects PRs that modify any
   path inside a submodule (only the submodule pointer in the
   superproject may change).
2. **Pinned, never floating.** Each entry must point at a tag or SHA.
   Repos without upstream tags are pinned to a specific main SHA at
   add-time and carry a `[TODO-OPERATOR]` marker.
3. **Bumps are intentional and batched.** Use `scripts/bump-refs.sh`.
   CODEOWNERS gates the resulting PR.
4. **No imports from `src/` yet.** These are for source-level grep and
   reference reading. Wiring imports against the submodule trees is a
   separate future PR.

## Why submodule the 5 agent-skills repos

All five publish Anthropic-style skill packages — `redis/`, `neondatabase/`,
`cloudflare/`, `hashicorp/`, and the `agentskills.io` spec itself. The
platform-engineering plugin (OPE1-9) consumes the same skill shape; having
upstream source local for grep means new skill scaffolds can reuse battle-
tested frontmatter + structure without re-deriving from `vendor/` HTML.

## Why submodule terragrunt + knowledge-work-plugins

- **terragrunt** is the canonical reference for managing dependent
  Terraform configurations (the chassis's `infra/terraform/` already
  uses Cloudflare providers; terragrunt patterns may apply later)
- **anthropics/knowledge-work-plugins** ships the `small-business`
  plugin (and others) — direct reference for plugin authorship in
  `plugins/platform-engineering/`

## Working with submodules

```bash
git submodule update --init --recursive  # after fresh clone
./scripts/bump-refs.sh <name> <tag-or-sha>  # bump a pin
```
