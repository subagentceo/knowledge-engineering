# e2m-workspaces — Project RAG

> **This file is the Claude project knowledge stub.**
> It is loaded into every session as persistent context.
> Keep it under 100 kB. Link to sub-documents rather than inlining large content.

---

## How Auth Works in This Environment

This project does NOT use `ANTHROPIC_API_KEY` as an environment variable.
Instead, auth is handled transparently by Anthropic's egress proxy infrastructure.

### The Layered Auth Architecture

```
[Artifact iframe / Claude Code sandbox]
    └─ fetch('https://api.anthropic.com/v1/messages', { body: ... })
         │   ← NO x-api-key header needed in code
         └─ Intercepted by claude.ai parent (Service Worker / postMessage bridge)
              └─ x-api-key injected from session credentials
                   └─ → 160.79.104.10 (Anthropic egress proxy)
                             TLS: CN=*.anthropic.com, issuer=Egress Gateway SDS CA (production)
                                  └─ → real api.anthropic.com backend

[bash_tool / raw container shell]
    └─ curl/node with no key → 401 (no interception here)
```

### What This Means for Code

**In Artifacts (iframe JS / React):** call the API with no key — the proxy injects it:
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },  // no x-api-key needed
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  })
});
```

**In Claude Code / managed agent sessions:** the SDK picks up auth from the session context automatically — no env var needed.

**In bash_tool / raw shell:** API calls return 401. The container has no credentials.
Use this layer for filesystem ops, schema generation, git, builds — not API calls.

### How the Proxy Works (verified in this container)

```bash
# /etc/hosts entry — hardcoded, no DNS needed
160.79.104.10   api.anthropic.com

# TLS cert presented by 160.79.104.10
subject: CN=*.anthropic.com
issuer:  O=Anthropic, CN=Egress Gateway SDS Issuing CA (production)
# ↑ Internal CA — NOT the public Cloudflare cert a browser would see
# ↑ Container trusts it via NODE_EXTRA_CA_CERTS + REQUESTS_CA_BUNDLE → system bundle
```

The egress proxy terminates TLS, identifies the session, and injects credentials
before forwarding to the real API. The container never holds a key.

### For Self-Hosted Environments (setup-linux/macos/winget)

When running a self-hosted worker outside this managed container, you DO need real credentials:
```bash
# Worker authenticates with environment-scoped key (not the API key)
ANTHROPIC_ENVIRONMENT_ID=env_...
ANTHROPIC_ENVIRONMENT_KEY=envkey_...   # issued when you create the environment
# ant beta:worker uses these — not ANTHROPIC_API_KEY
```

---

## Protocol Stack

```
e2m (Envelope2Mailbox)           ← this project's protocol
├── ext-yaml-tasks               ← task payload schemas (YAML source of truth)
├── ext-yaml-oauth               ← OAuth credential payload schemas
└── managed-agents-memory        ← Anthropic Memory Store schema bindings
    ├── yaml/                    ← canonical schema
    ├── rust/                    ← serde + data classes
    ├── python/                  ← pydantic v2
    └── typescript/              ← zod validators
```

Peer protocols (reference only, not owned):
- MCP (Model Context Protocol) — `ext-tasks`, `ext-auth`, `ext-apps` clones
- A2A (Agent2Agent)
- ACP (AgentClientProtocol)

---

## Setup Scripts

| Script | Platform | Auth model |
|--------|----------|------------|
| `setup-scripts/setup-web.sh` | Any (Artifact/Claude Code) | Egress proxy — no key needed |
| `setup-scripts/setup-chat.sh` | Any | Egress proxy — no key needed |
| `setup-scripts/setup-code.sh` | Any | Egress proxy — no key needed |
| `setup-scripts/setup-linux.sh` | Ubuntu/Debian | `ANTHROPIC_ENVIRONMENT_KEY` (worker auth) |
| `setup-scripts/setup-macos.sh` | macOS (brew) | `ANTHROPIC_ENVIRONMENT_KEY` (worker auth) |
| `setup-scripts/setup-winget.sh` | Windows 11 | `ANTHROPIC_ENVIRONMENT_KEY` (worker auth) |
| `setup-scripts/setup-desktop.sh` | macOS/Win | Claude Desktop session auth (no key in config) |

Run any script with `--dry-run` to preview without executing.

---

## Managed Agents Memory — Schema Index

Source: `https://platform.claude.com/docs/en/managed-agents/memory`
Beta header: `managed-agents-2026-04-01` (SDK sets automatically in session context)

| Layer | File | Description |
|-------|------|-------------|
| YAML | `managed-agents-memory/yaml/memory.yaml` | Canonical schema (JSON Schema 2020-12 in YAML) |
| Rust | `managed-agents-memory/rust/src/lib.rs` | serde Deserialize/Serialize |
| Python | `managed-agents-memory/python/memory.py` | Pydantic v2 models |
| TypeScript | `managed-agents-memory/typescript/memory.ts` | Zod schemas + inferred types |
| Docs | `managed-agents-memory/docs/overview.md` | Human-readable summary |

Type-safety cascade: **YAML → TypeScript/Zod → Rust/serde → Python/Pydantic**

---

## Key Resource IDs (fill in after bootstrap)

```yaml
# project-rag/resource-ids.yaml
memory_stores:
  project_context:  memstore_...   # e2m project context store
  shared_reference: memstore_...   # read-only shared reference store
agents:
  coordinator:      agent_...
environments:
  default:          env_...
  environment_key:  envkey_...     # worker auth — keep secure
```

---

## Workspace Layout

```
e2m-workspaces/
├── CLAUDE.md                        ← THIS FILE (project RAG stub)
├── project-rag/
│   ├── resource-ids.yaml            ← live resource IDs
│   └── session-log.md               ← notable session outcomes
├── setup-scripts/
│   ├── setup-web.sh
│   ├── setup-chat.sh
│   ├── setup-code.sh
│   ├── setup-linux.sh
│   ├── setup-macos.sh
│   ├── setup-winget.sh
│   └── setup-desktop.sh
├── managed-agents-memory/           ← Memory API schema bindings
│   ├── yaml/memory.yaml
│   ├── rust/src/lib.rs
│   ├── python/memory.py
│   └── typescript/memory.ts
├── ext-yaml-tasks/                  ← e2m task schemas
├── ext-yaml-oauth/                  ← e2m OAuth schemas
├── e2m-skill/SKILL.md               ← Claude skill for this project
└── [cloned MCP ext repos]/          ← read-only reference
```

---

## Conventions

- All IDs: UUIDv7 preferred for sortability
- All timestamps: ISO 8601 / RFC 3339
- Memory paths: POSIX paths under `/`, e.g. `/preferences/formatting.md`
- Memory size limit: 100 kB per memory, 2,000 memories per store, 8 stores per session
- Beta header: `managed-agents-2026-04-01` — SDK injects in session, add manually for raw curl
- Access default: `read_write` — use `read_only` for shared reference stores
- **Never put ANTHROPIC_API_KEY in code, env, or config files for this project**
