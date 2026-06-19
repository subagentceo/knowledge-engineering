/**
 * Canonical Envelope schema for all e2m-mcp mailbox messages.
 * @cite cowork/templates/task-state-machine.ts
 * @cite cowork/data/mailbox/
 *
 * "mail" = sending an Envelope to a mailbox.
 * "mailbox" = the append-only JSONL file at cowork/data/mailbox/<recipient>.jsonl
 * "envelope" = the typed container that wraps every message — never a raw string.
 *
 * Coworkers MUST emit Envelopes, never raw JSON blobs.
 * The `payload` field is the only open schema — everything else is typed.
 */

export type EnvelopeType =
  | "task"       // delegate work to a recipient coworker
  | "ack"        // acknowledge receipt of a task envelope
  | "result"     // return the outcome of a completed task
  | "escalate"   // surface a blocker that needs human or pm-coworker decision
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
  requires_decision?: boolean          // if true, operator/pm-coworker must respond
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
  payload?: Record<string, unknown>
}

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
 * Usage: const e = makeEnvelope("pm-coworker", "operator", "summary", { queues: stats })
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
