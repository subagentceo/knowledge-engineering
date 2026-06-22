# e2m — envelope-to-mailbox protocol

> Status: **research preview** (established 2026-06-18). Lives in the
> `subagentceo/knowledge-engineering` monolith under `cowork/`. Dogfooded by the
> coworkers; improved incrementally, not specified up front.
>
> Spec format: [CommonMark 0.31.2](https://spec.commonmark.org/0.31.2/).

## What e2m is (and why it's small on purpose)

e2m is the durable, typed substrate the coworkers actually run on. A coworker
never hands another coworker a raw JSON blob; it appends a **typed record** to an
**append-only JSONL file**. That's the whole idea.

Keeping it stupid-simple buys four properties for free:

- **Version control** — every mailbox/queue file is git-diffable plain text.
- **Type safety** — every record validates against one schema (below).
- **No clobbering** — append-only + latest-line-wins means concurrent coworkers
  never overwrite each other; they interleave lines.
- **Knowledge-work, not just code** — a "task" can be drafting an email, a legal
  triage, or a metrics review. e2m carries any domain's work.

It deliberately does **not** add a broker, a daemon, or a database. If you
outgrow JSONL you can project these records into Postgres later — the records are
the contract, the storage is swappable.

## Where it sits among peer protocols

| Protocol | Role | Upstream |
| :-- | :-- | :-- |
| **A2A** | direct peer invocation — coworkers call each other by id, no broker | [a2aproject/A2A](https://github.com/a2aproject/A2A) |
| **ACP** | external HTTP `/run` endpoints consumed by outside clients | [agent-client-protocol](https://github.com/agentclientprotocol/agent-client-protocol) |
| **MCP** | typed tools exposed to models and peer coworkers | [modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) |
| **e2m** | durable typed-envelope mailbox/queue substrate (this doc) | local to `cowork/` |

e2m is the layer the other three coordinate *through*: an MCP tool (`e2m-mcp`)
writes envelopes; an A2A call may drop a task in a peer's queue; an ACP `/run`
result can be posted back as a `result` envelope.

### Inspirations (borrowed, not reinvented)

- **MCP ext-tasks** ([modelcontextprotocol/ext-tasks](https://github.com/modelcontextprotocol/ext-tasks)) —
  the Tasks primitive: durable state machines with a receiver-generated id and
  call-now/fetch-later polling. Our `DurableTask` + `Transition` rows are the
  same idea expressed as JSONL.
- **pg_durable** ([microsoft/pg_durable](https://github.com/microsoft/pg_durable)) —
  durable functions that survive crashes with zero external infra. e2m takes the
  "durable, zero-infra, survives restarts" stance but stays in git-native JSONL
  instead of a Postgres extension (until scale demands otherwise).

## The records (one schema, three kinds)

Every JSONL line is exactly one of three record kinds, discriminated by `_type`.
The canonical definition is **`cowork/schemas/envelope.ts`** — see that file, not
this prose, for field-level truth.

- `_type: "envelope"` — a message between coworkers. `envelope_type ∈ {task, ack,
  result, escalate, notify, summary, operator}`. Lives in `cowork/data/mailbox/<id>.jsonl`.
- `_type: "task"` — a `DurableTask` queue item. Lives in `cowork/data/queues/<domain>.jsonl`.
- `_type: "transition"` — an append-only state-change / ack row; `id` matches the
  task or envelope it transitions. Latest line wins.

Reading rule everywhere: **for a given `id`, the last line is the current state.**

## One source → three language bindings

The protocol is polyglot because the coworkers are: TypeScript orchestrator,
Python scripts, Rust hot paths. We maintain **one** schema and **generate** the
rest — never hand-write parallel definitions (that drift is the bug this protocol
already hit once on day 2).

```
cowork/schemas/envelope.ts            ← canonical TypeScript source (edit here only)
   │
   ├─ ts-to-zod ───────────────▶ envelope.zod.ts        TS/Node runtime validation
   │      └─ (zod) ─────────────▶ envelope.schema.json  JSON Schema interlingua
   │         via ts-json-schema-generator (type E2MRecord)
   │                                   │
   │   datamodel-code-generator ───────┤──▶ envelope.py   Python · pydantic v2
   │                 typify / quicktype ──▶ envelope.rs   Rust · serde
```

Regenerate everything:

```bash
npm run schema:gen        # → envelope.zod.ts + envelope.schema.json
npm run schema:validate   # canon-checks every mailbox + queue record
```

Tooling references:
[ts-to-zod](https://github.com/fabien0102/ts-to-zod),
ts-json-schema-generator,
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) (pydantic),
typify / [quicktype](https://github.com/quicktype/quicktype) (serde).

Each binding is also a redis-compatible payload across the three official clients
([redis-rs](https://github.com/redis-rs/redis-rs),
[node-redis](https://github.com/redis/node-redis),
[redis-py](https://github.com/redis/redis-py)) if/when a cache layer projects the
JSONL into redis — the JSON shape is identical.

## Enforcement & CI

- `cowork/schemas/envelope.ts` — canonical source (this is the wheel; don't rebuild it).
- `cowork/standards/mailbox-envelope-canon.md` — prose canon + legacy→canon mapping.
- `cowork/scripts/mailbox-schema-validate.py` — validator; `npm run schema:validate`.
- `cowork/scripts/type-safety-audit.py` — scheduled 06:00 PST audit (delegates to validator).
- `cowork/mcp/e2m-mcp/server.ts` — the MCP emitter; writes canonical records.

Ties into the durable CI primitives: `/durable-agent-ci-cd-evals` →
`/durable-agent-ci-cd-rubrics` (D1 type-safety) → `/durable-agent-ci-cd-outcomes`
(merge gate), and `/durable-toolchain-install` for the codegen tools.

## Open / next (tracked as DurableTasks, not promises)

1. Generate `envelope.py` (pydantic v2) and `envelope.rs` (serde) from `envelope.schema.json`.
2. Refactor `e2m-mcp/server.ts` to import the generated `envelope.zod.ts` instead
   of its own hand-rolled `Envelope`/`MailboxMessage` zod (collapse the last duplicate).
3. Normalize the queue JSONL (294 legacy records missing `_type`) the same
   red/green way the mailbox was done.
4. Add `schema:gen` drift-check + `schema:validate` to `npm run verify`.
