---
name: github-org-security-review
description: >
  Fan github-repo-security-review out over every repo in a GitHub org
  and roll the findings up into a single Jira Epic. Use when the
  operator asks for an "org-wide security check," when onboarding a
  new org, or on a weekly cadence to catch drift.
license: Apache-2.0
compatibility: Requires gh CLI authenticated with read access to all repos in the target org, CLAUDE_CODE_OAUTH_TOKEN in env, and a Jira project to roll up findings into (default: SCRUM on subagentceo.atlassian.net).
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Operator asks for an "org-wide security pass" or "audit subagentceo"
- New repo joined the org and you want it scanned before letting it accumulate technical debt
- Weekly cadence sweep (could be wired into a Routine; see the
  `routines` skill)

# Architecture

`reviewOrg` in [`src/lib/github-security-review.ts`](../../../../src/lib/github-security-review.ts)
iterates the supplied repos, calls `reviewRepo` for each, and rolls
up `totalFindings` across the org. Auth gates:

- `CLAUDE_CODE_OAUTH_TOKEN` for Claude (OAuth-only, never `ANTHROPIC_API_KEY`)
- `gh` CLI for diff fetch + repo enumeration

# Recipe

```ts
import { reviewOrg } from "../../../../src/lib/github-security-review.js";
import { execFileSync } from "node:child_process";

const ORG = "subagentceo";

// Enumerate repos via gh CLI (any [A-Za-z0-9._-]+ name).
const repoList: { name: string }[] = JSON.parse(
  execFileSync("gh", ["repo", "list", ORG, "--limit", "100", "--json", "name"], { encoding: "utf8" }),
);

const repos = repoList.map((r) => ({
  name: r.name,
  // Diff against main as the surface to scan. For a non-PR sweep,
  // use `git log --all --since=1.week.ago -p` instead.
  diff: execFileSync("gh", ["api", `repos/${ORG}/${r.name}/compare/main...HEAD`], { encoding: "utf8" }),
}));

const result = await reviewOrg({
  org: ORG,
  repos,
  callClaude: async (repo, diff) => {
    // Per-repo Claude call here.
    return "...";
  },
});

console.log(`${result.org}: ${result.totalFindings} total pattern findings across ${result.repos.length} repos`);
```

# Jira rollup

Create one Epic per sweep + one Task per repo with findings:

- Epic: `subagentceo__security-sweep__<YYYY-MM-DD>`
- Task: `subagentceo__<repo>__security-findings__<YYYY-MM-DD>`

Use `mcp__MCP_DOCKER__createJiraIssue` (the Atlassian MCP server in
the [`docker-platform-engineering`](../docker-platform-engineering/SKILL.md)
profile). Link tasks to the Epic via `mcp__MCP_DOCKER__createIssueLink`
type=Relates.

# Why org-level

Per-repo security review catches what's in one repo. Org-level
catches **cross-repo patterns** the operator cares about: same key
leaked into two repos (rotate everywhere), Dependabot disabled per
[OSL1](../../../../docs/decisions/2026-05-16-osv-only-no-secret-scanning.md)
(don't propose re-enabling), missing OSV-Scanner CI on a new repo
(propose adding it).

# Citations

- [`src/lib/github-security-review.ts`](../../../../src/lib/github-security-review.ts) — engine (same as repo-level)
- [`plugins/platform-engineering/skills/github-repo-security-review/SKILL.md`](../github-repo-security-review/SKILL.md) — per-repo half
- [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](../../../../docs/decisions/2026-05-16-osv-only-no-secret-scanning.md) — ADR OSL1
- [`vendor/agentskills/agentskills.io/specification.md`](../../../../vendor/agentskills/agentskills.io/specification.md) — skill format
- [`anthropics/claude-code-security-review`](https://github.com/anthropics/claude-code-security-review) — design reference
