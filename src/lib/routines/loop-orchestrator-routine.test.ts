/**
 * Tests for src/lib/routines/loop-orchestrator-routine.ts
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 */
import {
  KE_LOOP_ORCHESTRATOR_ENV_ID,
  KE_LOOP_ORCHESTRATOR_REPO_URL,
  KE_LOOP_ORCHESTRATOR_SEED_PROMPT,
  makeLoopOrchestratorRoutineBody,
} from "./loop-orchestrator-routine.js";
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

console.log("loop-orchestrator-routine:");

check("makeLoopOrchestratorRoutineBody passes RoutineCreateBodySchema", () => {
  const body = makeLoopOrchestratorRoutineBody();
  RoutineCreateBodySchema.parse(body);
});

check("routine fires every hour on the correct environment", () => {
  const body = makeLoopOrchestratorRoutineBody();
  if (body.cron_expression !== "0 * * * *") throw new Error("wrong cron");
  if (body.job_config.ccr.environment_id !== KE_LOOP_ORCHESTRATOR_ENV_ID)
    throw new Error("wrong env_id");
});

check("routine targets knowledge-engineering main branch", () => {
  const body = makeLoopOrchestratorRoutineBody();
  const src = body.job_config.ccr.session_context.sources[0];
  if (!src) throw new Error("no sources");
  if (src.git_repository.url !== KE_LOOP_ORCHESTRATOR_REPO_URL)
    throw new Error("wrong repo url");
  if (src.git_repository.branch !== "main")
    throw new Error("wrong branch");
});

check("seed prompt references loop-orchestrator.md", () => {
  if (!KE_LOOP_ORCHESTRATOR_SEED_PROMPT.includes("loop-orchestrator.md"))
    throw new Error("missing reference");
});

check("allowed_tools includes the orchestrator core tool set", () => {
  const body = makeLoopOrchestratorRoutineBody();
  const tools = body.job_config.ccr.session_context.allowed_tools;
  for (const t of ["Bash", "Read", "Write", "Edit", "Task"] as const) {
    if (!tools.includes(t)) throw new Error(`missing ${t}`);
  }
});

check("each invocation generates a unique event UUID", () => {
  const a = makeLoopOrchestratorRoutineBody();
  const b = makeLoopOrchestratorRoutineBody();
  const uuidA = a.job_config.ccr.events[0]?.data.uuid;
  const uuidB = b.job_config.ccr.events[0]?.data.uuid;
  if (uuidA === uuidB) throw new Error("UUIDs not unique across invocations");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
