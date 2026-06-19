/**
 * resume.schema.ts
 *
 * Typed resume_state block. Every field that cannot be recovered from
 * conversation context is null — never inferred, never guessed.
 *
 * Mirrors the Anthropic Outcomes API terminal states:
 *   satisfied | needs_revision | max_iterations_reached | failed | interrupted
 *   https://platform.claude.com/docs/en/managed-agents/define-outcomes
 */

import { z } from 'zod';

// ── Terminal states (Outcomes API, ported to Max plan) ───────────────────────
export const TerminalStateSchema = z.enum([
  'satisfied',
  'needs_revision',
  'max_iterations_reached',
  'failed',
  'interrupted',
]);
export type TerminalState = z.infer<typeof TerminalStateSchema>;

// ── Eval tail row (mirrors structured-prompt-evaluator rubric band) ──────────
export const EvalRowSchema = z.object({
  id: z.string(),
  score: z.union([z.literal(0), z.literal(1), z.literal(3), z.literal(5)]),
  evidence: z.string().max(120),
});
export type EvalRow = z.infer<typeof EvalRowSchema>;

// ── Resume state block ────────────────────────────────────────────────────────
export const ResumeStateSchema = z.object({
  last_complete_artifact: z.string().nullable(),
  last_complete_rung:     z.string().nullable(),
  last_file_written:      z.string().nullable(),
  last_status:            TerminalStateSchema.nullable(),
  iter_count:             z.number().int().nonnegative().nullable(),
  iter_max:               z.number().int().positive().nullable(),
  plan_file:              z.string().nullable(),
  rubric_file:            z.string().nullable(),
  blocked_on:             z.string().max(200).nullable(),
  citations_carried:      z.number().int().nonnegative().default(0),
  schemaRef:              z.string().nullable(),

  // eval tail — appended after every resume
  eval: z.array(EvalRowSchema).length(5).optional(),
});
export type ResumeState = z.infer<typeof ResumeStateSchema>;

// ── Interrupt marker (embedded in HTML comment at output boundary) ───────────
// <!-- SAFELY_RESUME: stopped after <last_unit>. Next: <next_unit>. iter=<n>/<max>. citations=<count>. schemaRef=<urn|null>. -->
export const InterruptMarkerSchema = z.object({
  stopped_after: z.string(),
  next:          z.string(),
  iter:          z.number().int().nonnegative(),
  iter_max:      z.number().int().positive().nullable(),
  citations:     z.number().int().nonnegative(),
  schemaRef:     z.string().nullable(),
});
export type InterruptMarker = z.infer<typeof InterruptMarkerSchema>;

/**
 * Parse an interrupt marker from the raw HTML comment string.
 * Returns null if the comment does not match the expected shape.
 *
 * Expected format:
 *   <!-- SAFELY_RESUME: stopped after X. Next: Y. iter=N/M. citations=C. schemaRef=S. -->
 */
export function parseInterruptMarker(raw: string): InterruptMarker | null {
  const m = raw.match(
    /<!--\s*SAFELY_RESUME:\s*stopped after (.+?)\.\s*Next:\s*(.+?)\.\s*iter=(\d+)\/(\d+|null)\.\s*citations=(\d+)\.\s*schemaRef=([^\s.]+)\.\s*-->/,
  );
  if (!m) return null;
  const result = InterruptMarkerSchema.safeParse({
    stopped_after: m[1].trim(),
    next:          m[2].trim(),
    iter:          parseInt(m[3], 10),
    iter_max:      m[4] === 'null' ? null : parseInt(m[4], 10),
    citations:     parseInt(m[5], 10),
    schemaRef:     m[6] === 'null' ? null : m[6].trim(),
  });
  return result.success ? result.data : null;
}

/**
 * Serialise an interrupt marker to the canonical HTML comment format.
 */
export function serializeInterruptMarker(m: InterruptMarker): string {
  return `<!-- SAFELY_RESUME: stopped after ${m.stopped_after}. Next: ${m.next}. iter=${m.iter}/${m.iter_max ?? 'null'}. citations=${m.citations}. schemaRef=${m.schemaRef ?? 'null'}. -->`;
}

// ── SKILL_ID ──────────────────────────────────────────────────────────────────
export const RESUME_SKILL_ID = 'structured-prompt-resume' as const;
