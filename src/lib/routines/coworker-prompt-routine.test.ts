/**
 * Tests for src/lib/routines/coworker-prompt-routine.ts
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 */
import {
  KE_COWORKER_PROMPT_ENV_ID,
  KE_COWORKER_PROMPT_REPO_URL,
  KE_COWORKER_PROMPT_SEED_PROMPT,
  makeCoworkerPromptRoutineBody,
} from "./coworker-prompt-routine.js";
import { RoutineCreateBodySchema } from "../schemas/routine.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("coworker-prompt-routine:");

check("makeCoworkerPromptRoutineBody passes RoutineCreateBodySchema", () => {
  const body = makeCoworkerPromptRoutineBody();
  RoutineCreateBodySchema.parse(body);
});

check("routine fires daily at 2am UTC on correct environment", () => {
  const body = makeCoworkerPromptRoutineBody();
  if (body.cron_expression !== "0 2 * * *") throw new Error("wrong cron");
  if (body.job_config.ccr.environment_id !== KE_COWORKER_PROMPT_ENV_ID)
    throw new Error("wrong env_id");
});

check("routine targets knowledge-engineering main branch", () => {
  const body = makeCoworkerPromptRoutineBody();
  const src = body.job_config.ccr.session_context.sources[0];
  if (!src) throw new Error("no sources");
  if (src.git_repository.url !== KE_COWORKER_PROMPT_REPO_URL)
    throw new Error("wrong repo url");
  if (src.git_repository.branch !== "main")
    throw new Error("wrong branch");
});

check("seed prompt references structured-prompt-evaluator", () => {
  if (!KE_COWORKER_PROMPT_SEED_PROMPT.includes("structured-prompt-evaluator"))
    throw new Error("missing reference");
});

check("allowed_tools contains Bash Read Write Edit and Task", () => {
  const body = makeCoworkerPromptRoutineBody();
  const tools = body.job_config.ccr.session_context.allowed_tools;
  for (const t of ["Bash", "Read", "Write", "Edit", "Task"] as const) {
    if (!tools.includes(t)) throw new Error(`missing ${t}`);
  }
});

check("each invocation generates unique UUID", () => {
  const a = makeCoworkerPromptRoutineBody();
  const b = makeCoworkerPromptRoutineBody();
  const uuidA = a.job_config.ccr.events[0]?.data.uuid;
  const uuidB = b.job_config.ccr.events[0]?.data.uuid;
  if (uuidA === uuidB) throw new Error("UUIDs not unique across invocations");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
