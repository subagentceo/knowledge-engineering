/**
 * Operator setup script for ke-loop-orchestrator CCR routine.
 *
 * Emits the RoutineCreateBody JSON that an operator pastes into the
 * claude.ai RemoteTrigger create call (CLI or web). Does NOT make live
 * API calls — RemoteTrigger is CLI/web-only and cannot be called from
 * inside a CCR session (OMA1).
 *
 * Usage:
 *   npx tsx scripts/setup-loop-orchestrator.ts
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
import { makeLoopOrchestratorRoutineBody } from "../src/lib/routines/loop-orchestrator-routine.js";

const body = makeLoopOrchestratorRoutineBody();
console.log(JSON.stringify(body, null, 2));
