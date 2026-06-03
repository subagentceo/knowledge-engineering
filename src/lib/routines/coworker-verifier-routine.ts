/**
 * CCR RoutineCreateBody for ke-coworker-verifier.
 *
 * Fires on pull_request.opened / .synchronize events.
 * Creates a CCR session that runs the pr-review-toolkit (code-review skill)
 * at effort=medium, posts inline comments, labels PR advisory-only.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 */
import type { RoutineCreateBody } from "../schemas/routine.js";

export const KE_COWORKER_VERIFIER_ENV_ID = "env_01Cz5mzNxXr5yJBqmJGdky7u";
export const KE_COWORKER_VERIFIER_REPO_URL =
  "https://github.com/subagentceo/knowledge-engineering";

export const KE_COWORKER_VERIFIER_SEED_PROMPT = `You are ke-coworker-verifier for github.com/subagentceo/knowledge-engineering. Run the pr-review-toolkit on the latest open PR.

## Steps
1. Resolve the PR number: read env var KE_PR_NUMBER if set, else run \`gh pr list --state open --limit 1 --json number --jq '.[0].number'\` and use that value as PR.
2. Run /code-review at effort=medium on the PR diff: \`gh pr diff $PR\` to get the diff, then invoke the code-review skill targeting that diff.
3. If findings exist: post each finding as an advisory PR comment (never request-changes, never block automerge):
   \`gh pr comment $PR --body "<finding>"\`
4. Determine severity label:
   - If any finding has HIGH severity: \`gh pr edit $PR --add-label "verifier-changes-requested"\`
   - Otherwise: \`gh pr edit $PR --add-label "verifier-approved"\`
5. Write mailbox_outcome to .claude/mailbox/agent_orchestrator.jsonl:
   {"type":"mailbox_outcome","tick":"coworker-verifier","semver":"v0.5.0-O6","from":"coworker-verifier","to":"agent_orchestrator","status":"achieved","ts":"<ISO>","summary":"PR #<N> reviewed: <M> findings, label=<label>"}

## Constraints
- auth is oauth-only. ANTHROPIC_API_KEY is never set anywhere. fail closed if present.
- advisory-only: never use --request-changes, never block automerge.
- every git commit ends with (O<N>). e.g. fix(routines): patch coworker-verifier (O6)
- never git add -A or git add . — always add specific files.
- never --no-verify on commits.
- BANNED_RE rejects subjects matching /^(chore|ci)(\\([^)]*\\))?:\\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\\b.*\\bci\\b/i.`;

/**
 * Factory: returns a RoutineCreateBody with a fresh UUID per invocation.
 * The UUID must be unique per routine create/update call — call this at
 * registration time, not at module load.
 */
export function makeCoworkerVerifierRoutineBody(): RoutineCreateBody {
  return {
    name: "ke-coworker-verifier",
    cron_expression: "0 * * * *",
    enabled: true,
    job_config: {
      ccr: {
        environment_id: KE_COWORKER_VERIFIER_ENV_ID,
        session_context: {
          model: "claude-sonnet-4-6",
          sources: [
            {
              git_repository: {
                url: KE_COWORKER_VERIFIER_REPO_URL,
                branch: "main",
              },
            },
          ],
          allowed_tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"],
        },
        events: [
          {
            data: {
              uuid: crypto.randomUUID(),
              session_id: "",
              type: "user",
              parent_tool_use_id: null,
              message: {
                content: KE_COWORKER_VERIFIER_SEED_PROMPT,
                role: "user",
              },
            },
          },
        ],
      },
    },
  };
}
