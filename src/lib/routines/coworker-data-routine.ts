/**
 * CCR RoutineCreateBody for ke-coworker-data.
 *
 * Fires every 4 hours on env_01Cz5mzNxXr5yJBqmJGdky7u.
 * Creates a CCR session that runs one vendor-mirror refresh tick
 * via npm run crawl:vendors and commits changed surfaces to PRs.
 *
 * RemoteTrigger is CLI/web-only; cannot be called from inside a CCR
 * session (OMA1). Run scripts/setup-coworker-data.ts from the
 * operator CLI to register or update the routine.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 */
import type { RoutineCreateBody } from "../schemas/routine.js";

export const KE_COWORKER_DATA_ENV_ID = "env_01Cz5mzNxXr5yJBqmJGdky7u";
export const KE_COWORKER_DATA_REPO_URL =
  "https://github.com/subagentceo/knowledge-engineering";

export const KE_COWORKER_DATA_SEED_PROMPT = `You are ke-coworker-data for github.com/subagentceo/knowledge-engineering. Run one vendor-mirror refresh tick.

## Steps
1. git fetch origin main && git checkout main && git pull origin main
2. npm run crawl:vendors
3. git diff --stat HEAD -- vendor/ to see what changed
4. If no changes: write a one-line note to .claude/mailbox/agent_orchestrator.jsonl: {"type":"mailbox_outcome","tick":"coworker-data","semver":"v0.5.0-O2","from":"coworker-data","to":"agent_orchestrator","status":"achieved","ts":"<ISO>","summary":"vendor mirror up to date, no changes"} then exit 0.
5. If changes: for each changed vendor surface, git add the specific vendor/<name>/ files, commit with subject feat(vendor): refresh <name> mirror (O2), push to a new branch feat/vendor-refresh-<name>-<YYYYMMDD>, open a PR with automerge label.
6. Write mailbox_outcome achieved with evidence list of PR URLs.

## Constraints
- auth is oauth-only. ANTHROPIC_API_KEY is never set anywhere.
- every git commit ends with (O<N>). e.g. feat(vendor): refresh cloudflare mirror (O2)
- never git add -A or git add . — always add specific files.
- never --no-verify on commits.`;

/**
 * Factory: returns a RoutineCreateBody with a fresh UUID per invocation.
 * The UUID must be unique per routine create/update call — call this at
 * registration time, not at module load.
 */
export function makeCoworkerDataRoutineBody(): RoutineCreateBody {
  return {
    name: "ke-coworker-data",
    cron_expression: "0 */4 * * *",
    enabled: true,
    job_config: {
      ccr: {
        environment_id: KE_COWORKER_DATA_ENV_ID,
        session_context: {
          model: "claude-sonnet-4-6",
          sources: [
            {
              git_repository: {
                url: KE_COWORKER_DATA_REPO_URL,
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
                content: KE_COWORKER_DATA_SEED_PROMPT,
                role: "user",
              },
            },
          },
        ],
      },
    },
  };
}
