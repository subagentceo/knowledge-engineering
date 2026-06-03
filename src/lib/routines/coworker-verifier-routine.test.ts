/**
 * Tests for src/lib/routines/coworker-verifier-routine.ts
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite seeds/prompts/loop-orchestrator.md
 */
import {
  KE_COWORKER_VERIFIER_ENV_ID,
  KE_COWORKER_VERIFIER_REPO_URL,
  KE_COWORKER_VERIFIER_SEED_PROMPT,
  makeCoworkerVerifierRoutineBody,
} from "./coworker-verifier-routine.js";
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

console.log("coworker-verifier-routine:");

check("makeCoworkerVerifierRoutineBody returns name === 'ke-coworker-verifier'", () => {
  const body = makeCoworkerVerifierRoutineBody();
  RoutineCreateBodySchema.parse(body);
  if (body.name !== "ke-coworker-verifier") throw new Error(`wrong name: ${body.name}`);
});

check("cron_expression is a valid cron string", () => {
  const body = makeCoworkerVerifierRoutineBody();
  if (typeof body.cron_expression !== "string" || body.cron_expression.length === 0)
    throw new Error("cron_expression is missing or empty");
  // five-field cron: fields separated by spaces
  const fields = body.cron_expression.split(" ");
  if (fields.length !== 5) throw new Error(`expected 5 cron fields, got ${fields.length}`);
});

check("job_config.ccr.environment_id equals KE_COWORKER_VERIFIER_ENV_ID", () => {
  const body = makeCoworkerVerifierRoutineBody();
  if (body.job_config.ccr.environment_id !== KE_COWORKER_VERIFIER_ENV_ID)
    throw new Error("wrong environment_id");
});

check("job_config.ccr.session_context.model is a non-empty string", () => {
  const body = makeCoworkerVerifierRoutineBody();
  const model = body.job_config.ccr.session_context.model;
  if (typeof model !== "string" || model.length === 0)
    throw new Error("model is not a non-empty string");
});

check("events[0].data.message.content contains 'verifier'", () => {
  const body = makeCoworkerVerifierRoutineBody();
  const content = body.job_config.ccr.events[0]?.data.message.content ?? "";
  if (!content.includes("verifier"))
    throw new Error("seed prompt does not mention 'verifier'");
});

check("two calls to makeCoworkerVerifierRoutineBody produce different UUIDs", () => {
  const a = makeCoworkerVerifierRoutineBody();
  const b = makeCoworkerVerifierRoutineBody();
  const uuidA = a.job_config.ccr.events[0]?.data.uuid;
  const uuidB = b.job_config.ccr.events[0]?.data.uuid;
  if (uuidA === uuidB) throw new Error("UUIDs not unique across invocations");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
