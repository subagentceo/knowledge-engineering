# Mailbox / Queue Record Canon (e2m-mcp)

> Single source of truth for every record written to `cowork/data/mailbox/*.jsonl`
> and `cowork/data/queues/*.jsonl`. Reconciles three definitions that drifted apart
> during the day-1/day-2 launch of the cowork/ research-preview surface.
>
> @cite cowork/schemas/envelope.ts
> @cite cowork/mcp/e2m-mcp/server.ts
> @cite cowork/templates/task-state-machine.ts
> @cite cowork/scripts/type-safety-audit.py

## Why this exists

The type-safety audit surfaced that the e2m (envelope-to-mailbox) protocol had
**three disagreeing schemas for its own records**:

| Source | Discriminator | Reality |
| :-- | :-- | :-- |
| `cowork/schemas/envelope.ts` | `_type:"envelope"` + `envelope_type` | the documented canon |
| `cowork/mcp/e2m-mcp/server.ts` (`mailbox_send`) | `type` field, **no `_type`** | what actually got written |
| `type-safety-audit.py` | `_type ∈ {task, message}` | checked for a `message` type nobody emits |

Result: the protocol's own emitter produced records that failed both its own
canonical schema and its own audit. This is a type-safety defect at the source,
not bad data — so the fix is at the schema/emitter, with a one-time normalization
of the records already written.

## The canon

Every record carries a `_type` discriminator with exactly one of three values.

### `_type: "envelope"` — agent-to-agent message

Required: `_type`, `id` (uuid), `envelope_type`, `from`, `to`, `subject`, `at` (ISO-8601), `state`.

- `envelope_type ∈ {task, ack, result, escalate, notify, summary, operator}`
- `state ∈ {pending, read, actioned, archived}`
- Optional: `priority` (1–5), `thread_id`, `reply_to`, `payload`, `requires_decision`, `decision_options`, `ack_required`, `expires_at`.

### `_type: "task"` — DurableTask queue item

Required: `_type`, `id` (uuid), `queue`, `subject`, `state`, `created_at`, `updated_at`.

- `state ∈ {pending, in_progress, blocked, completed, failed}`
- Optional: `from`, `ke_fit_score` (1–5), `owner`, `depends_on`, `blocks`, `payload`, `result`, `error`.

### `_type: "transition"` — state change / ack

Required: `_type`, `id` (uuid of the task/message it transitions), `at` (ISO-8601).

- Optional: `event ∈ {claim, complete, block, unblock, fail, retry, ack, read}`, `prior_state`, `new_state`, `owner`, `status`, `acked_by`, `read_by`, `note`, `error`.

## Legacy → canon mapping (normalization)

| Legacy shape (observed) | Canonical target |
| :-- | :-- |
| `type:"outcome"` + from/to/subject, no `_type` | `_type:"envelope"`, `envelope_type:"result"` |
| `type:"task"` + from/to/subject, no `_type` | `_type:"envelope"`, `envelope_type:"task"` |
| `_type:"message"` (nightly/morning digests) | `_type:"envelope"`, `envelope_type` from `payload` (summary/notify) |
| `_type:"note"` | `_type:"envelope"`, `envelope_type:"notify"` |
| `_type:"ack"` | `_type:"transition"`, `event:"ack"` |
| `{id, status:"acked"/"read", acked_by/read_by, ...}`, no `_type` | `_type:"transition"` |

Mapping is **additive and lossless**: original keys (`type`, `sent_at`, …) are
preserved; only `_type` (and `envelope_type`/`at` where derivable) are added.

## Enforcement

- `cowork/scripts/mailbox-schema-validate.py` — typed validator; RED/GREEN gate.
- `cowork/scripts/type-safety-audit.py` — scheduled 06:00 PST audit; delegates to the canon above.
- `cowork/mcp/e2m-mcp/server.ts` — `mailbox_send` / `mailbox_ack` emit canonical `_type` going forward (root-cause fix).
