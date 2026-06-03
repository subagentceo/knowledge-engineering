/**
 * CCR RoutineCreateBody for ke-loop-orchestrator.
 *
 * Fires every 60 minutes on env_01Cz5mzNxXr5yJBqmJGdky7u.
 * Creates a CCR session that reads seeds/prompts/loop-orchestrator.md
 * and executes one full autonomous loop tick.
 *
 * RemoteTrigger is CLI/web-only; cannot be called from inside a CCR
 * session (OMA1). Run scripts/setup-loop-orchestrator.ts from the
 * operator CLI to register or update the routine.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 */
import type { RoutineCreateBody } from "../schemas/routine.js";

export const KE_LOOP_ORCHESTRATOR_ENV_ID = "env_01Cz5mzNxXr5yJBqmJGdky7u";
export const KE_LOOP_ORCHESTRATOR_REPO_URL =
  "https://github.com/subagentceo/knowledge-engineering";

export const KE_LOOP_ORCHESTRATOR_SEED_PROMPT = `You are the autonomous loop orchestrator for github.com/subagentceo/knowledge-engineering. Your full operating prompt is in seeds/prompts/loop-orchestrator.md — read it first, then execute one full loop tick.

## Constraints (always active)
- auth is oauth-only. ANTHROPIC_API_KEY is never set anywhere. fail closed if present.
- every git commit ends with (O<N>). e.g. \`feat(mailbox): add ack retry (O3)\`
- BANNED_RE: /^(chore|ci)(\\([^)]*\\))?:\\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\\b.*\\bci\\b/i — commits matching this are rejected.
- npm run verify must pass before any merge to main.
- never \`git add -A\` or \`git add .\` — always add specific files.
- never \`--no-verify\` on commits.
- test files: @cite vendor/, seeds/, or rubrics/ only.`;

/**
 * Factory: returns a RoutineCreateBody with a fresh UUID per invocation.
 * The UUID must be unique per routine create/update call — call this at
 * registration time, not at module load.
 */
export function makeLoopOrchestratorRoutineBody(): RoutineCreateBody {
  return {
    name: "ke-loop-orchestrator",
    cron_expression: "0 * * * *",
    enabled: true,
    job_config: {
      ccr: {
        environment_id: KE_LOOP_ORCHESTRATOR_ENV_ID,
        session_context: {
          model: "claude-sonnet-4-6",
          sources: [
            {
              git_repository: {
                url: KE_LOOP_ORCHESTRATOR_REPO_URL,
                branch: "main",
              },
            },
          ],
          allowed_tools: [
            "Bash",
            "Read",
            "Write",
            "Edit",
            "Glob",
            "Grep",
            "WebFetch",
            "WebSearch",
            "Task",
            "TaskCreate",
            "TaskGet",
            "TaskList",
            "TaskOutput",
            "TaskStop",
            "TaskUpdate",
          ],
        },
        events: [
          {
            data: {
              uuid: crypto.randomUUID(),
              session_id: "",
              type: "user",
              parent_tool_use_id: null,
              message: {
                content: KE_LOOP_ORCHESTRATOR_SEED_PROMPT,
                role: "user",
              },
            },
          },
        ],
      },
    },
  };
}
