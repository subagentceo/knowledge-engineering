/**
 * CCR RoutineCreateBody for ke-coworker-prompt.
 *
 * Fires daily at 2am UTC on env_01Cz5mzNxXr5yJBqmJGdky7u.
 * Creates a CCR session that runs one prompt-evaluation tick:
 * iterates seeds/prompts/*.md, scores via structured-prompt-evaluator,
 * proposes opus-4-7 rewrites when score < 80, opens PRs for improvements.
 *
 * RemoteTrigger is CLI/web-only; cannot be called from inside a CCR
 * session (OMA1). Run scripts/setup-coworker-prompt.ts from the
 * operator CLI to register or update the routine.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 */
import type { RoutineCreateBody } from "../schemas/routine.js";

export const KE_COWORKER_PROMPT_ENV_ID = "env_01Cz5mzNxXr5yJBqmJGdky7u";
export const KE_COWORKER_PROMPT_REPO_URL =
  "https://github.com/subagentceo/knowledge-engineering";

export const KE_COWORKER_PROMPT_SEED_PROMPT = `You are ke-coworker-prompt for github.com/subagentceo/knowledge-engineering. Run one prompt-evaluation tick.

## Steps
1. List seeds/prompts/*.md — collect all prompt file paths.
2. For each prompt file:
   a. Read the prompt file content.
   b. Score it on the 12-criterion structured-prompt-evaluator rubric (use /structured-prompt-evaluator skill). Capture weighted score 0–100.
   c. If score >= 80: log "PASS <slug> score=<n>" and skip.
   d. If score < 80: use Agent({model:"claude-opus-4-7"}) to propose a rewrite. System: "You are an expert prompt engineer. Rewrite the following Claude Code prompt to score higher on the structured-prompt-evaluator 12-criterion rubric (minimize prose, maximize cited batched tool calls, outcome-driven, no clarifying questions). Return only the rewritten prompt text."
   e. Run /structured-prompt-evaluator on the rewrite. If new_score > old_score: write rewrite to the same file, commit as feat(prompts): improve <slug> prompt <old>→<new> (O3), push to claude/prompt-improve-<slug>-<YYYYMMDD>, open PR with label automerge.
3. Cache scores to seeds/memory/prompt-scores/<slug>.json (create dir if missing).
4. Append mailbox_outcome to .claude/mailbox/agent_orchestrator.jsonl: {"type":"mailbox_outcome","tick":"coworker-prompt","semver":"v0.5.0-O3","from":"coworker-prompt","to":"agent_orchestrator","status":"achieved","ts":"<ISO>","summary":"<N> prompts evaluated, <M> rewrites opened"}.

## Constraints
- auth is oauth-only. ANTHROPIC_API_KEY is never set anywhere.
- every git commit ends with (O<N>). e.g. feat(prompts): improve loop-orchestrator prompt score 72→88 (O3)
- never git add -A or git add . — always add specific files.
- never --no-verify on commits.
- BANNED_RE rejects subjects matching /^(chore|ci)(\\([^)]*\\))?:\\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\\b.*\\bci\\b/i.`;

/**
 * Factory: returns a RoutineCreateBody with a fresh UUID per invocation.
 * The UUID must be unique per routine create/update call — call this at
 * registration time, not at module load.
 */
export function makeCoworkerPromptRoutineBody(): RoutineCreateBody {
  return {
    name: "ke-coworker-prompt",
    cron_expression: "0 2 * * *",
    enabled: true,
    job_config: {
      ccr: {
        environment_id: KE_COWORKER_PROMPT_ENV_ID,
        session_context: {
          model: "claude-opus-4-7",
          sources: [
            {
              git_repository: {
                url: KE_COWORKER_PROMPT_REPO_URL,
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
                content: KE_COWORKER_PROMPT_SEED_PROMPT,
                role: "user",
              },
            },
          },
        ],
      },
    },
  };
}
