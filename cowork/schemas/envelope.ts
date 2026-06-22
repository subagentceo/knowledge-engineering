/**
 * CANONICAL SCHEMA SOURCE for the e2m (envelope-to-mailbox) protocol.
 *
 * This file is the SINGLE SOURCE OF TRUTH. All other bindings are GENERATED,
 * never hand-edited:
 *   ts-to-zod              envelope.ts  → envelope.zod.ts     (runtime validation)
 *   zod-to-json-schema     *.zod.ts     → envelope.schema.json (interlingua)
 *   datamodel-code-gen     *.schema.json→ envelope.py          (Python · pydantic v2)
 *   typify / quicktype     *.schema.json→ envelope.rs          (Rust · serde)
 * Regenerate with: npm run schema:gen   (see cowork/schemas/E2M-PROTOCOL.md)
 *
 * Three record kinds live in the JSONL files, discriminated by `_type`:
 *   "envelope"   — a message between coworkers (cowork/data/mailbox/<id>.jsonl)
 *   "task"       — a DurableTask queue item   (cowork/data/queues/<domain>.jsonl)
 *   "transition" — a state-change / ack row appended after an envelope or task
 *
 * Coworkers MUST emit these typed records, never raw JSON blobs.
 * The `payload` field is the only open schema — everything else is typed.
 *
 * @cite cowork/templates/task-state-machine.ts
 * @cite cowork/schemas/E2M-PROTOCOL.md
 * @cite https://github.com/fabien0102/ts-to-zod
 * @cite cowork/data/mailbox/
 */

export type EnvelopeType =
  | "task"       // delegate work to a recipient coworker
  | "ack"        // acknowledge receipt of a task envelope
  | "result"     // return the outcome of a completed task
  | "escalate"   // surface a blocker that needs human or product-management-coworker decision
  | "notify"     // informational, no action required
  | "summary"    // periodic digest (nightly review, morning summary, etc.)
  | "operator"   // message TO the operator (human) for review or decision

export type EnvelopeState =
  | "pending"    // not yet read by recipient
  | "read"       // recipient has read it
  | "actioned"   // recipient has acted on it (created tasks, replied, etc.)
  | "archived"   // no further action needed

export interface Envelope {
  _type: "envelope"                    // discriminator — always "envelope"
  id: string                           // uuid v4
  envelope_type: EnvelopeType
  from: string                         // sender coworker id OR "operator"
  to: string                           // recipient coworker id OR "operator"
  subject: string                      // one-line human-readable description
  at: string                           // ISO-8601 sent timestamp
  state: EnvelopeState                 // lifecycle state
  priority?: 1 | 2 | 3 | 4 | 5       // 5=highest; defaults to 3
  thread_id?: string                   // groups related envelopes in a conversation
  reply_to?: string                    // envelope id this is a reply to
  payload?: Record<string, unknown>    // task-specific structured data
  requires_decision?: boolean          // if true, operator/product-management-coworker must respond
  decision_options?: string[]          // allowed responses if requires_decision=true
  ack_required?: boolean               // if true, recipient must send back type=ack
  expires_at?: string                  // ISO-8601; if set, auto-archive after this time
}

/**
 * DurableTask — queued work items in cowork/data/queues/<domain>.jsonl
 * Separate from Envelope: tasks are claimed by coworkers, envelopes are messages between them.
 */
export interface DurableTask {
  _type: "task"
  id: string
  queue: string                        // domain queue name (NOT "domain" — that key is invalid)
  subject: string
  state: "pending" | "in_progress" | "completed" | "blocked" | "failed"
  created_at: string
  updated_at: string
  from?: string                        // who dispatched this task
  ke_fit_score?: 1 | 2 | 3 | 4 | 5   // knowledge-engineering fit score; 5=highest priority
  owner?: string                       // coworker that claimed it
  depends_on?: string[]                // task ids that must complete first
  blocks?: string[]                    // task ids this one blocks
  payload?: Record<string, unknown>
  result?: Record<string, unknown>     // set on completion
  error?: string                       // set on block/fail
}

export type TransitionEvent =
  | "claim" | "complete" | "block" | "unblock" | "fail" | "retry"  // task lifecycle
  | "ack" | "read"                                                  // envelope lifecycle

/**
 * Transition — an append-only state-change row for a task or envelope.
 * The id matches the task/envelope it transitions; latest-line-wins on read.
 */
export interface Transition {
  _type: "transition"
  id: string                           // id of the task/envelope being transitioned
  at: string                           // ISO-8601
  event?: TransitionEvent
  prior_state?: string
  new_state?: string
  owner?: string
  status?: string                      // legacy ack status: "acked" | "read"
  acked_by?: string
  read_by?: string
  note?: string
  error?: string
}

/** A mailbox JSONL line is one of these. */
export type MailboxRecord = Envelope | Transition
/** A queue JSONL line is one of these. */
export type QueueRecord = DurableTask | Transition
/** Any e2m record. */
export type E2MRecord = Envelope | DurableTask | Transition

/**
 * OperatorEnvelope — narrowing of Envelope for messages TO the operator.
 * These appear in cowork/data/mailbox/operator.jsonl and are surfaced
 * in the Cowork UI as the operator's inbox.
 */
export interface OperatorEnvelope extends Envelope {
  envelope_type: "operator" | "escalate" | "summary"
  to: "operator"
  requires_decision: boolean
  // operator's response goes into cowork/data/queues/operator.jsonl
  // as a DurableTask with from="operator"
}

/**
 * Helper: build a minimal valid Envelope.
 * Usage: const e = makeEnvelope("product-management-coworker", "operator", "summary", { queues: stats })
 */
export function makeEnvelope(
  from: string,
  to: string,
  envelope_type: EnvelopeType,
  payload?: Record<string, unknown>,
  overrides?: Partial<Envelope>
): Envelope {
  return {
    _type: "envelope",
    id: crypto.randomUUID(),
    envelope_type,
    from,
    to,
    subject: overrides?.subject ?? `${envelope_type} from ${from}`,
    at: new Date().toISOString(),
    state: "pending",
    priority: 3,
    payload,
    ...overrides,
  }
}
