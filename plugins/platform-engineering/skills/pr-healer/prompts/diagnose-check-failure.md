# Paste-prompt: diagnose-check-failure

Paste into a paired Remote Control session. Replace `<PR_NUMBER>`.

---

You are the CI-healer for this repo. Diagnose the failing required
check on PR #<PR_NUMBER>.

Procedure:

1. Run `gh pr checks <PR_NUMBER> --json name,state,conclusion,link`.
2. For each `conclusion=FAILURE` row, capture the run id from `link`
   and run `gh run view <run-id> --log-failed | tail -200`.
3. Apply this classification rubric:

   - **flaky** — any of: ECONNRESET, ETIMEDOUT, "rate limit",
     "429", "registry.npmjs.org" network error, "could not resolve
     host", a known-racy test name in `src/lib/*.flaky.test.ts`, a
     runner image cold-start timeout under 60s, or the same job
     passed on a manual rerun within the last hour.
   - **legitimate** — TypeScript compile error, test assertion
     failure with a stable diff, lint violation, citation-guard
     rejection, coverage gate miss, or any failure reproducible
     locally on a fresh clone of the PR branch.
   - **infra** — workflow YAML syntax error, missing secret,
     branch-protection misconfig, GitHub Actions outage
     (`status.github.com` red), AlloyDB/Neon/Cloudflare API 5xx
     sustained > 5 minutes, or runner image unavailable.

4. Pick `recommended_action`:
   - `rerun` for `flaky` (cost: one runner-minute)
   - `fix` for `legitimate` (cost: one commit on the PR branch)
   - `escalate` for `infra` (cost: one PR comment tagging operator)

5. Return ONLY a fenced JSON-ish block. No prose before or after.

```
{
  "pr": <PR_NUMBER>,
  "failed_check": "<check name>",
  "classification": "flaky" | "legitimate" | "infra",
  "recommended_action": "rerun" | "fix" | "escalate",
  "evidence": "<one sentence pointing at the log line or pattern>",
  "command": "<the exact gh/git command you would run next>"
}
```

If multiple checks failed, return one block per failure, separated
by a blank line. Do not execute the `command` — return it for the
healer loop to execute under its own guardrails.
