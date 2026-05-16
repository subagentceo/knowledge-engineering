---
name: github-repo-security-review
description: >
  Run a diff-aware two-pass security review on a single GitHub repo:
  fast regex scan for well-known secret formats (AWS, GitHub PAT,
  Anthropic, OpenAI, Stripe) plus a semantic Claude pass for
  context-dependent vulnerabilities. Replaces GitHub-native secret
  scanning + Dependabot with a $0 OAuth-only equivalent. Use when
  reviewing a PR for secret leaks, when bootstrapping a new repo,
  when responding to an OSV-Scanner alert, or when an operator asks
  for a security pass on a specific repo.
license: Apache-2.0
compatibility: Requires gh CLI authenticated as a user with read access to the repo, CLAUDE_CODE_OAUTH_TOKEN in env (NOT ANTHROPIC_API_KEY), and OSV-Scanner running in CI for the dependency-vuln half.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Reviewing a PR before merging
- Bootstrapping a new repo in the subagentceo org
- Following up on an OSV-Scanner CVE finding to assess blast radius
- After an operator asks: "is this repo safe to publish?"

# Architecture

Two passes per ADR OSL1:

1. **Pattern scan** (fast, deterministic): `scanDiffForSecretPatterns`
   in [`src/lib/github-security-review.ts`](../../../../src/lib/github-security-review.ts).
   Carefully scoped regexes anchored on prefixes that don't false-
   positive on test data. Honors:
   - `ignoreCommentLines` — `// example: AKIA...` is skipped
   - `ignoreFixturePrefix` — `ghp_FIXTURE_*` is skipped
   - deletion-only — `-const KEY = "..."` doesn't flag
2. **Semantic pass** (slow, contextual): caller-provided
   `callClaude` hits Claude Code via `CLAUDE_CODE_OAUTH_TOKEN` and
   asks for context-dependent vulns (logic bugs, auth bypasses,
   prototype-pollution gadgets, etc.).

OAuth-only posture: constructor throws if `ANTHROPIC_API_KEY` is
set. Same gate as
[`turbopuffer-alloydb-bridge`](../turbopuffer-embeddings/SKILL.md).

# Recipe

```ts
import { reviewRepo } from "../../../../src/lib/github-security-review.js";
import { execFileSync } from "node:child_process";

const diff = execFileSync("gh", ["pr", "diff", "176"], { encoding: "utf8" });

const result = await reviewRepo({
  owner: "subagentceo",
  repo: "knowledge-engineering",
  diff,
  callClaude: async ({ owner, repo, diff }) => {
    // Use Claude Code SDK with CLAUDE_CODE_OAUTH_TOKEN.
    // Return Claude's notes as a string.
    return "...";
  },
});

console.log(`${result.patternFindings.length} pattern findings:`);
for (const f of result.patternFindings) {
  console.log(`  - ${f.kind} @ line ${f.line}: ${f.match.slice(0, 12)}…`);
}
console.log("Claude notes:");
console.log(result.claudeNotes);
```

# Why we replaced GitHub-native

Per [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](../../../../docs/decisions/2026-05-16-osv-only-no-secret-scanning.md):
GitHub Advanced Security pricing > $0; we already have OSV-Scanner
covering CVEs + our own Claude pass covering semantic + secret-pattern.
No reason to layer on the paid product.

# Citations

- [`src/lib/github-security-review.ts`](../../../../src/lib/github-security-review.ts) — engine
- [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](../../../../docs/decisions/2026-05-16-osv-only-no-secret-scanning.md) — ADR OSL1
- [`vendor/osv-scanner/google.github.io/osv-scanner/usage/index.md`](../../../../vendor/osv-scanner/google.github.io/osv-scanner/usage/index.md) — OSV CLI usage
- [`anthropics/claude-code-security-review`](https://github.com/anthropics/claude-code-security-review) — design reference (forked the two-pass concept, replaced `ANTHROPIC_API_KEY` auth with `CLAUDE_CODE_OAUTH_TOKEN`)
- [`anthropics/claude-code-base-action`](https://github.com/anthropics/claude-code-base-action) — Claude-from-Action reference
