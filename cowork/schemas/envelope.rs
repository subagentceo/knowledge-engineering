// TODO: verify serde tagging matches envelope.ts precisely, quicktype output may need manual correction
//
// quicktype's Rust target has no internally-tagged-enum / serde(tag = "_type")
// support: it flattens Envelope | DurableTask | Transition into ONE struct
// (E2MRecord) with every field Option<...> except `id` and the `Type` enum,
// instead of a proper tagged union. This compiles (verified via a scratch
// cargo build) but does not enforce the same shape guarantees as
// envelope.ts/envelope.zod.ts — e.g. nothing stops constructing an E2MRecord
// with envelope_type set but queue also set. Regenerated from
// envelope.schema.json via:
//   quicktype --src-lang schema --src envelope.schema.json --lang rust \
//     --top-level E2MRecord --visibility public --derive-debug --derive-clone
// Candidates for a follow-up: typify (better serde-tag support) or hand-written
// #[serde(tag = "_type")] enum wrapping three structs generated separately.
//
// Example code that deserializes and serializes the model.
// extern crate serde;
// #[macro_use]
// extern crate serde_derive;
// extern crate serde_json;
//
// use generated_module::E2MRecord;
//
// fn main() {
//     let json = r#"{"answer": 42}"#;
//     let model: E2MRecord = serde_json::from_str(&json).unwrap();
// }

use serde::{Serialize, Deserialize};
use std::collections::HashMap;

/// Any e2m record.
///
/// DurableTask — queued work items in cowork/data/queues/<domain>.jsonl Separate from
/// Envelope: tasks are claimed by coworkers, envelopes are messages between them.
///
/// Transition — an append-only state-change row for a task or envelope. The id matches the
/// task/envelope it transitions; latest-line-wins on read.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct E2MRecord {
    #[serde(rename = "_type")]
    pub e2_m_record_type: Type,

    pub ack_required: Option<bool>,

    pub at: Option<String>,

    pub decision_options: Option<Vec<String>>,

    pub envelope_type: Option<EnvelopeType>,

    pub expires_at: Option<String>,

    pub from: Option<String>,

    pub id: String,

    pub payload: Option<HashMap<String, Option<serde_json::Value>>>,

    pub priority: Option<f64>,

    pub reply_to: Option<String>,

    pub requires_decision: Option<bool>,

    pub state: Option<EnvelopeState>,

    pub subject: Option<String>,

    pub thread_id: Option<String>,

    pub to: Option<String>,

    pub blocks: Option<Vec<String>>,

    pub created_at: Option<String>,

    pub depends_on: Option<Vec<String>>,

    pub description: Option<String>,

    pub due_date: Option<String>,

    pub error: Option<String>,

    pub estimated_hours: Option<f64>,

    pub evaluator: Option<Evaluator>,

    pub jira_key: Option<String>,

    pub ke_fit_score: Option<f64>,

    pub owner: Option<String>,

    pub queue: Option<String>,

    pub result: Option<HashMap<String, Option<serde_json::Value>>>,

    pub updated_at: Option<String>,

    pub acked_by: Option<String>,

    pub event: Option<TransitionEvent>,

    pub new_state: Option<String>,

    pub note: Option<String>,

    pub prior_state: Option<String>,

    pub read_by: Option<String>,

    pub status: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Type {
    Envelope,

    Task,

    Transition,
}

/// CANONICAL SCHEMA SOURCE for the e2m (envelope-to-mailbox) protocol.
///
/// This file is the SINGLE SOURCE OF TRUTH. All other bindings are GENERATED, never
/// hand-edited:   ts-to-zod              envelope.ts  → envelope.zod.ts     (runtime
/// validation)   zod-to-json-schema     *.zod.ts     → envelope.schema.json (interlingua)
/// datamodel-code-gen     *.schema.json→ envelope.py          (Python · pydantic v2)
/// typify / quicktype     *.schema.json→ envelope.rs          (Rust · serde) Regenerate
/// with: npm run schema:gen   (see cowork/schemas/E2M-PROTOCOL.md)
///
/// Three record kinds live in the JSONL files, discriminated by `_type`:   "envelope"   — a
/// message between coworkers (cowork/data/mailbox/<id>.jsonl)   "task"       — a DurableTask
/// queue item   (cowork/data/queues/<domain>.jsonl)   "transition" — a state-change / ack
/// row appended after an envelope or task
///
/// Coworkers MUST emit these typed records, never raw JSON blobs. The `payload` field is the
/// only open schema — everything else is typed.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EnvelopeType {
    Ack,

    Escalate,

    Notify,

    Operator,

    Result,

    Summary,

    Task,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Evaluator {
    pub fail_if: Vec<String>,

    pub pass_if: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TransitionEvent {
    Ack,

    Block,

    Claim,

    Complete,

    Fail,

    Read,

    Retry,

    Unblock,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EnvelopeState {
    Actioned,

    Archived,

    Blocked,

    Completed,

    Failed,

    #[serde(rename = "in_progress")]
    InProgress,

    Pending,

    Read,
}
