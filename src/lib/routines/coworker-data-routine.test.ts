/**
 * Tests for src/lib/routines/coworker-data-routine.ts
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 */
import {
  KE_COWORKER_DATA_ENV_ID,
  KE_COWORKER_DATA_REPO_URL,
  KE_COWORKER_DATA_SEED_PROMPT,
  makeCoworkerDataRoutineBody,
} from "./coworker-data-routine.js";
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

console.log("coworker-data-routine:");

check("makeCoworkerDataRoutineBody passes RoutineCreateBodySchema", () => {
  const body = makeCoworkerDataRoutineBody();
  RoutineCreateBodySchema.parse(body);
});

check("routine fires every 4 hours on the correct environment", () => {
  const body = makeCoworkerDataRoutineBody();
  if (body.cron_expression !== "0 */4 * * *") throw new Error("wrong cron");
  if (body.job_config.ccr.environment_id !== KE_COWORKER_DATA_ENV_ID)
    throw new Error("wrong env_id");
});

check("routine targets knowledge-engineering main branch", () => {
  const body = makeCoworkerDataRoutineBody();
  const src = body.job_config.ccr.session_context.sources[0];
  if (!src) throw new Error("no sources");
  if (src.git_repository.url !== KE_COWORKER_DATA_REPO_URL)
    throw new Error("wrong repo url");
  if (src.git_repository.branch !== "main")
    throw new Error("wrong branch");
});

check("seed prompt references crawl:vendors command", () => {
  if (!KE_COWORKER_DATA_SEED_PROMPT.includes("crawl:vendors"))
    throw new Error("missing reference");
});

check("allowed_tools contains Bash and Read but not WebFetch", () => {
  const body = makeCoworkerDataRoutineBody();
  const tools = body.job_config.ccr.session_context.allowed_tools;
  for (const t of ["Bash", "Read"] as const) {
    if (!tools.includes(t)) throw new Error(`missing ${t}`);
  }
  if (tools.includes("WebFetch")) throw new Error("WebFetch must not be present");
});

check("each invocation generates a unique event UUID", () => {
  const a = makeCoworkerDataRoutineBody();
  const b = makeCoworkerDataRoutineBody();
  const uuidA = a.job_config.ccr.events[0]?.data.uuid;
  const uuidB = b.job_config.ccr.events[0]?.data.uuid;
  if (uuidA === uuidB) throw new Error("UUIDs not unique across invocations");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
