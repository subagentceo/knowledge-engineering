/**
 * `@coworkers/e2m-ts` — the e2m envelope contract.
 *
 * Bare-minimum, strict TypeScript binding of `cowork/schemas/envelope.ts`. Three record kinds
 * (Envelope · DurableTask · Transition), their inferred types, and one `parse` entry point.
 * Nothing speculative — this package IS the contract, it does not extend it.
 *
 * @see cowork/schemas/envelope.zod.ts (the canonical source this mirrors, field-for-field)
 */
import { z } from "zod";

const priority = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

export const envelopeType = z.union([
  z.literal("task"),
  z.literal("ack"),
  z.literal("result"),
  z.literal("escalate"),
  z.literal("notify"),
  z.literal("summary"),
  z.literal("operator"),
]);

export const envelopeState = z.union([
  z.literal("pending"),
  z.literal("read"),
  z.literal("actioned"),
  z.literal("archived"),
]);

export const envelope = z.object({
  _type: z.literal("envelope"),
  id: z.string(),
  envelope_type: envelopeType,
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  at: z.string(),
  state: envelopeState,
  priority: priority.optional(),
  thread_id: z.string().optional(),
  reply_to: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  requires_decision: z.boolean().optional(),
  decision_options: z.array(z.string()).optional(),
  ack_required: z.boolean().optional(),
  expires_at: z.string().optional(),
});

export const durableTask = z.object({
  _type: z.literal("task"),
  id: z.string(),
  queue: z.string(),
  subject: z.string(),
  state: z.union([
    z.literal("pending"),
    z.literal("in_progress"),
    z.literal("completed"),
    z.literal("blocked"),
    z.literal("failed"),
  ]),
  created_at: z.string(),
  updated_at: z.string(),
  from: z.string().optional(),
  ke_fit_score: priority.optional(),
  owner: z.string().optional(),
  depends_on: z.array(z.string()).optional(),
  blocks: z.array(z.string()).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  result: z.record(z.string(), z.unknown()).optional(),
  error: z.string().optional(),
});

export const transitionEvent = z.union([
  z.literal("claim"),
  z.literal("complete"),
  z.literal("block"),
  z.literal("unblock"),
  z.literal("fail"),
  z.literal("retry"),
  z.literal("ack"),
  z.literal("read"),
]);

export const transition = z.object({
  _type: z.literal("transition"),
  id: z.string(),
  at: z.string(),
  event: transitionEvent.optional(),
  prior_state: z.string().optional(),
  new_state: z.string().optional(),
  owner: z.string().optional(),
  status: z.string().optional(),
  acked_by: z.string().optional(),
  read_by: z.string().optional(),
  note: z.string().optional(),
  error: z.string().optional(),
});

export const e2mRecord = z.union([envelope, durableTask, transition]);
export const mailboxRecord = z.union([envelope, transition]);
export const queueRecord = z.union([durableTask, transition]);

export type Envelope = z.infer<typeof envelope>;
export type DurableTask = z.infer<typeof durableTask>;
export type Transition = z.infer<typeof transition>;
export type E2MRecord = z.infer<typeof e2mRecord>;
export type EnvelopeType = z.infer<typeof envelopeType>;
export type EnvelopeState = z.infer<typeof envelopeState>;
export type TransitionEvent = z.infer<typeof transitionEvent>;

/** The single entry point. Parse one e2m record; throws on contract violation. */
export function parse(value: unknown): E2MRecord {
  return e2mRecord.parse(value);
}

/** Non-throwing variant — for the manager's evaluator gate. */
export function safeParse(value: unknown): z.SafeParseReturnType<unknown, E2MRecord> {
  return e2mRecord.safeParse(value);
}
