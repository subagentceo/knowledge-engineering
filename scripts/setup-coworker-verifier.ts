/**
 * Operator setup script for ke-coworker-verifier CCR routine.
 *
 * Emits the RoutineCreateBody JSON that an operator pastes into the
 * claude.ai RemoteTrigger create call (CLI or web). Does NOT make live
 * API calls — RemoteTrigger is CLI/web-only and cannot be called from
 * inside a CCR session (OMA1).
 *
 * Usage:
 *   npx tsx scripts/setup-coworker-verifier.ts
 *
 * Then POST the printed JSON to:
 *   POST https://api.claude.ai/v1/code/triggers
 *   Authorization: Bearer <your-oauth-token>
 *   Content-Type: application/json
 *
 * To update an existing routine, POST to:
 *   POST https://api.claude.ai/v1/code/triggers/<trigger_id>
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 */
import { makeCoworkerVerifierRoutineBody } from "../src/lib/routines/coworker-verifier-routine.js";

const body = makeCoworkerVerifierRoutineBody();
console.log(JSON.stringify(body, null, 2));
