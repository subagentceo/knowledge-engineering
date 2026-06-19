---
name: e2m-workspaces
description: >
  E2M (Envelope2Mailbox) protocol design, schema authoring, and workspace tooling for the
  e2m-workspaces Claude project. Use this skill whenever working on the e2m protocol,
  its YAML schemas, type-safety cascade (YAML → TypeScript/Zod → Rust/serde → Python/Pydantic),
  ext-yaml-tasks, ext-yaml-oauth, managed-agents container setup, or anything comparing e2m
  to MCP, A2A, or ACP. Also use for scaffolding new e2m repos, generating type bindings from
  YAML schemas, writing envelope/mailbox definitions, or planning the e2m Anthropic model runtime
  integration. If the user mentions envelopes, mailboxes, e2m, ext-yaml-*, or multi-agent
  protocol design in this project — use this skill.
---

# E2M Workspaces Skill

## Protocol Overview

**E2M (Envelope2Mailbox)** is a new multi-agent, multi-platform communications protocol.
It sits alongside MCP (Model Context Protocol), A2A (Agent2Agent), and ACP (AgentClientProtocol),
with a distinct design philosophy:

| Protocol | Primary abstraction | Transport | Schema first |
|----------|--------------------|-----------|----|
| MCP | Tools/Resources/Prompts via JSON-RPC | HTTP/SSE/stdio | TypeScript |
| A2A | Tasks between agents | HTTP | JSON |
| ACP | Agent capabilities | HTTP | OpenAPI |
| **E2M** | **Envelopes routed to Mailboxes** | **Any** | **YAML → multi-lang** |

### Core Concepts

- **Envelope**: The atomic unit. A typed, routable wrapper with a header (routing + provenance) and a payload (typed by `payloadKind`).
- **Mailbox**: A named, addressable endpoint that receives Envelopes. Identified by `{protocol}:{host}/{name}`.
- **PayloadKind**: Discriminates the payload shape. Current kinds: `task`, `oauth`, `event`, `query`, `reply`, `error`.

### Design Principles

1. **YAML-first**: Human-readable, LLM-friendly, portable. YAML schemas are the source of truth.
2. **Type cascade**: Every schema flows YAML → TypeScript/Zod → Rust (serde + data classes) → Python (Pydantic).
3. **Anthropic model runtime compatible**: The runtime target for agent execution is Anthropic's model API; schemas must be compatible with `claude-sonnet-4-*` tool use and structured outputs.
4. **Protocol-agnostic transport**: Envelopes can carry MCP, A2A, ACP, or e2m-native payloads.

---

## Workspace Layout

```
e2m-workspaces/
├── ext-yaml-tasks/           # Task payload schemas + RPC methods
│   └── schema/draft/
│       ├── envelope.yaml     # Core envelope (shared across all ext repos)
│       └── tasks.yaml        # Task payload (extends MCP ext-tasks)
├── ext-yaml-oauth/           # OAuth credential payload schemas
│   └── schema/draft/
│       └── oauth.yaml        # OAuth flows (client_creds, token_exchange, agent_delegation)
├── e2m-skill/                # This skill
└── [cloned MCP ext repos]/   # Reference: ext-tasks, ext-auth, experimental-ext-*
    ├── ext-tasks/            # MCP Tasks extension (TypeScript source of truth)
    ├── ext-auth/             # MCP OAuth extensions (MDX specifications)
    └── experimental-ext-*/   # Experimental MCP extensions for reference
```

The cloned MCP repos are **read-only reference**. Do not modify them. Use them to:
- Compare e2m task schema with MCP's `schema/draft/schema.ts` and `schema.json`
- Reference OAuth flows from `ext-auth/specification/draft/`
- Understand MCP extension patterns before designing new e2m extensions

---

## Type-Safety Cascade

When generating code from a YAML schema, always follow this order:

### 1. YAML → JSON Schema
The YAML files use JSON Schema draft 2020-12 syntax. They're valid JSON Schema
expressed in YAML. This is the canonical source.

### 2. YAML → TypeScript/Zod
Use `ts-to-zod` pattern (same as MCP ext-tasks uses). Generate:
- `schema.ts` — TypeScript interfaces (pure types, no runtime)
- `schema.zod.ts` — Zod validators derived from the interfaces

Example for envelope header:
```typescript
import { z } from "zod";

export const MailboxAddressSchema = z.object({
  protocol: z.enum(["e2m", "mcp", "a2a", "acp"]),
  host: z.string(),
  name: z.string(),
  version: z.string().optional(),
});
export type MailboxAddress = z.infer<typeof MailboxAddressSchema>;

export const EnvelopeStatusSchema = z.enum([
  "pending", "delivered", "processing", "completed",
  "failed", "cancelled", "expired",
]);
```

### 3. TypeScript/Zod → Rust (serde)
Derive `Serialize`, `Deserialize`, `Debug`, `Clone` on all structs.
Use `#[serde(rename_all = "camelCase")]` to match YAML field names.
Use `#[serde(tag = "status")]` for discriminated unions (e.g. `TaskPayload`).

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "status", rename_all = "snake_case")]
pub enum TaskPayload {
    Pending(PendingTaskPayload),
    Working(WorkingTaskPayload),
    InputRequired(InputRequiredTaskPayload),
    Delegated(DelegatedTaskPayload),
    Completed(CompletedTaskPayload),
    Failed(FailedTaskPayload),
    Cancelled(CancelledTaskPayload),
}
```

### 4. TypeScript → Python/Pydantic
Use `pydantic.v1` or Pydantic v2. Use `Literal` for discriminator fields.
Use `model_validator` for cross-field constraints.

```python
from pydantic import BaseModel
from typing import Literal, Union
from datetime import datetime

class CompletedTaskPayload(BaseModel):
    taskId: str
    status: Literal["completed"]
    result: dict
    createdAt: datetime
    lastUpdatedAt: datetime

TaskPayload = Annotated[
    Union[PendingTaskPayload, WorkingTaskPayload, CompletedTaskPayload, ...],
    Field(discriminator="status")
]
```

---

## Schema Authoring Rules

When writing or extending e2m YAML schemas:

1. **All `$defs` first**, then reference with `$ref`. Never inline complex types.
2. **`additionalProperties: false`** on every leaf object unless explicitly extensible (`meta`, `data`, `result`).
3. **Discriminated unions** use `discriminator.propertyName` at the union level and a `const` on each variant.
4. **`format: uuid`** on all ID fields. UUIDv7 is recommended for sortability.
5. **`format: date-time`** for all timestamps. ISO 8601 / RFC 3339.
6. **Nullable fields**: use `type: [string, "null"]` (JSON Schema) not `nullable: true` (OpenAPI).
7. **Descriptions are required** on all `required` fields. Optional on non-required if obvious.
8. **Extension fields**: always prefixed `io.e2m/` in `$id` and extension identifiers.

---

## Managed Agents Container

The workspace uses a `managed-agents` container pattern. See `infra/docker/docker-compose.yml`
for the full stack (AlloyDB Omni PG18 + Redis Stack + flagd + OTel collector).

**Auth model**: No `ANTHROPIC_API_KEY` in containers. Auth is handled by the egress proxy
(`160.79.104.10`, issuer: `Egress Gateway SDS CA`). Workers use `ANTHROPIC_ENVIRONMENT_KEY`
(environment-scoped, issued at environment creation — not the API key). See `CLAUDE.md`.

The `managed-agents` pattern means:
- Each agent is a container with a well-known mailbox address
- Envelopes are routed by the `to.host` field matching a container name
- The Anthropic model runtime agents use `host: "anthropic:{model_id}"`

---

## Repo Conventions

New `ext-yaml-*` repos follow this structure:
```
ext-yaml-{name}/
├── README.md
├── LICENSE               # Apache 2.0
├── package.json          # for schema generation scripts
├── tsconfig.json
├── schema/
│   └── draft/
│       ├── {name}.yaml   # YAML source of truth
│       ├── {name}.ts     # Generated TypeScript interfaces
│       └── {name}.json   # Generated JSON Schema (from YAML)
├── docs/
│   └── specification/
│       └── draft/
│           └── {name}.mdx
└── scripts/
    └── generate-schemas.ts
```

---

## Reference Files

- `ext-tasks/schema/draft/schema.ts` — MCP task types (TypeScript source)
- `ext-tasks/schema/draft/schema.json` — MCP task JSON Schema (generated)
- `ext-tasks/docs/specification/draft/tasks.mdx` — MCP task spec (MDX)
- `ext-auth/specification/draft/oauth-client-credentials.mdx` — OAuth 2.1 client credentials spec
- `ext-auth/specification/draft/enterprise-managed-authorization.mdx` — Enterprise SSO spec
- `experimental-ext-skills/docs/` — Skills over MCP working group docs (design reference)
- `infra/docker/docker-compose.yml` — Full local stack (AlloyDB Omni PG18, Redis Stack, flagd, OTel)
- `infra/alloydb/schema.sql` — PostgreSQL 18 DDL for e2m_envelopes, e2m_tasks, e2m_flag_overrides
- `infra/redis/client.ts` — ioredis client with Bloom filter dedup, envelope queue, memory cache
- `infra/otel/tracing.ts` — OTel trace helpers, E2M_ATTRS semantic attributes
- `infra/openfeature/flags.ts` — Feature flag definitions (model routing, cache TTL, db backend, auth model)

Read the MCP ext refs before designing new e2m extensions — the e2m schema should be
compatible with (or cleanly composable with) the MCP equivalents.

---

## Companion Skill: e2m-typed-style

The `/e2m-typed-style` skill is the **I/O style layer** for this project. Where this skill
covers protocol design and schema authoring, `e2m-typed-style` governs how Claude
normalizes inputs and structures outputs during e2m sessions.

**Use `e2m-typed-style` when:**
- You need `E2MInput` / `E2MOutput` envelope normalization for every message
- Generating cross-language type code (Rust/Python/TypeScript) from a schema
- Configuring `output_config.format` or SDK-level structured outputs
- Managing context window / caching / compaction for long e2m sessions

**Key shared concepts:**

| Concept | Defined in |
|---------|-----------|
| `E2MInput` / `E2MOutput` YAML schemas | `e2m-typed-style` |
| Rust serde / Pydantic / Zod full implementations | `e2m-typed-style` → `references/type-definitions.md` |
| `output_config.format` JSON Schema | `e2m-typed-style` → `references/structured-outputs.md` |
| Cache breakpoints + compaction strategy | `e2m-typed-style` → `references/context-management.md` |
| Envelope YAML schemas (`envelope.yaml`, `tasks.yaml`, `oauth.yaml`) | **this skill** |
| Type cascade rules (YAML → Zod → serde → Pydantic) | **this skill** |
| Infra stack (AlloyDB, Redis, flagd, OTel) | **this skill** |
| Auth model (egress proxy, environment key) | `CLAUDE.md` |