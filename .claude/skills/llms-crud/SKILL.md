---
name: llms-crud
description: "Use this skill whenever the user asks Claude to look up, fetch, summarize, or navigate the managed-agents API surface on platform.claude.com — agents, sessions, session threads, session events, session resources, environments, vaults, credentials, files, memory stores, memories, skills, skill versions, user profiles. Triggers on phrases like 'create a session', 'archive an agent', 'list memory stores', 'session thread events', 'permission policies', 'multiagent coordinator', 'beta header for managed agents', or any reference to platform.claude.com/llms.txt navigation. This skill carries the URL namespace topology (CRUD verbs × resource tree) for /docs/en/managed-agents/ + /docs/en/api/beta/, deduplicates the 10x SDK-language redundancy in llms.txt, and applies the .md suffix rule from list-subagent-skills before web_fetch. Use BEFORE web_fetch on ANY /managed-agents/ or /api/beta/ URL on platform.claude.com so you fetch the canonical .md and skip the 9 mirror copies."
license: Proprietary
compatibility: "claude.ai web/mobile chat on Max 20x with Claude Opus 4.x. Companion to list-subagent-skills (doc-source rules) and list-default-skills."
metadata:
  author: subagentcowork
  version: "0.2.0"
  spec: https://agentskills.io/specification
  surface: claude.ai
  model_family: claude-opus-4
  vendor: anthropics
  vendor_manifests: vendor/
  source: https://platform.claude.com/llms.txt
  scope: managed-agents
---

# llms-crud — Managed Agents URL Namespace Topology

Compressed, CRUD-shaped lookup for the **managed-agents** slice of `platform.claude.com/llms.txt`. Skip the 10x SDK-language redundancy and go straight to canonical `.md` URLs.

## Why this skill exists

`platform.claude.com/llms.txt` is a flat alphabetical list of ~1400 English URLs. ~90% of its bulk is SDK-language mirroring: every API endpoint appears 10 times (canonical + cli, csharp, go, java, php, python, ruby, terraform, typescript). The actual namespace is much smaller than the file suggests. This skill carries the compressed view for `managed-agents`, so a query like "how do I archive a session thread" maps to one URL without scanning the index.

## Three structural truths about llms.txt

1. **Conceptual docs** live at `/docs/en/managed-agents/<topic>.md`. ~20 pages, no mirrors.
2. **API reference** lives at `/docs/en/api/beta/<resource>[/<sub>][/<verb>].md`. The canonical surface for managed-agents is ~50-60 endpoints.
3. **SDK mirrors** repeat every API ref under `/api/{cli,csharp,go,java,php,python,ruby,terraform,typescript}/<same-path>.md`. Default to the canonical; only fetch a language variant when the user asks for that language explicitly or context makes it obvious.

Apply the `.md` suffix rule from `list-subagent-skills` to every fetch. (`platform.claude.com` is a Mintlify host → append `.md`.)

## Conceptual docs (`/docs/en/managed-agents/`)

Prefix all paths with `https://platform.claude.com`.

| Topic | Path |
|---|---|
| Overview | `/docs/en/managed-agents/overview.md` |
| Quickstart | `/docs/en/managed-agents/quickstart.md` |
| Prototype in Console | `/docs/en/managed-agents/onboarding.md` |
| Define your agent | `/docs/en/managed-agents/agent-setup.md` |
| Define outcomes | `/docs/en/managed-agents/define-outcomes.md` |
| Tools | `/docs/en/managed-agents/tools.md` |
| Agent Skills | `/docs/en/managed-agents/skills.md` |
| MCP connector | `/docs/en/managed-agents/mcp-connector.md` |
| Multiagent sessions | `/docs/en/managed-agents/multi-agent.md` |
| Start a session | `/docs/en/managed-agents/sessions.md` |
| Session event stream | `/docs/en/managed-agents/events-and-streaming.md` |
| Cloud environment setup | `/docs/en/managed-agents/environments.md` |
| Container reference | `/docs/en/managed-agents/cloud-containers.md` |
| Permission policies | `/docs/en/managed-agents/permission-policies.md` |
| Authenticate with vaults | `/docs/en/managed-agents/vaults.md` |
| Attach and download files | `/docs/en/managed-agents/files.md` |
| Memory stores | `/docs/en/managed-agents/memory.md` |
| Access GitHub | `/docs/en/managed-agents/github.md` |
| Subscribe to webhooks | `/docs/en/managed-agents/webhooks.md` |
| Dreams | `/docs/en/managed-agents/dreams.md` |

## API reference (`/docs/en/api/beta/`) — CRUD × resource tree

Source of truth: `vendor/anthropics/platform.claude.com/docs/en/api/beta/`. Read files from there; never web_fetch for lookups covered by the vendor mirror.

```
beta/
├── agents/                   create | list | retrieve | update | archive
│   └── versions/             list
├── sessions/                 create | list | retrieve | update | delete | archive
│   ├── events/               (POST to send user.* events; GET list)
│   ├── resources/            add | list | retrieve | delete
│   └── threads/              list | retrieve | archive
│       └── events/           list | stream
├── environments/             create | list | retrieve | update | delete | archive
│   └── work/                 poll | ack | heartbeat | stop | list | retrieve | update | stats
├── vaults/                   create | list | retrieve | update | delete | archive
│   └── credentials/          create | list | retrieve | update | delete | archive
│       └── mcp_oauth_validate
├── files/                    upload | list | retrieve_metadata | download | delete
├── memory_stores/            create | list | retrieve | update | delete | archive
│   ├── memories/             create | list | retrieve | update | delete
│   └── memory_versions/      list | retrieve | redact
├── skills/                   create | list | retrieve | delete
│   └── versions/             create | list | retrieve | download | delete
├── user_profiles/            create | list | retrieve | update | create_enrollment_url
├── webhooks/                 (collection page)
└── messages/                 (shared with non-beta surface)
    └── batches/              create | list | retrieve | results | cancel | delete
```

**Key additions vs v0.1.0:** `agents/update`, `sessions/update`, `environments/work/` subtree (self-hosted work queue), `vaults/credentials/mcp_oauth_validate`, `files/upload`, `memory_stores/memories/update`, `memory_stores/memory_versions/` subtree, `skills/versions/download`, `user_profiles/list|update`, `webhooks.md`.

### URL pattern (memorize this, build any URL)

```
/docs/en/api/beta/<resource>.md                         ← collection / overview page
/docs/en/api/beta/<resource>/<verb>.md                  ← operation on resource
/docs/en/api/beta/<parent>/<child>.md                   ← nested collection
/docs/en/api/beta/<parent>/<child>/<verb>.md            ← nested operation
```

Verbs in URLs are usually lowercased: `create`, `retrieve`, `list`, `delete`, `archive`. Some are snake_case multi-word: `retrieve_metadata`, `create_enrollment_url`.

### Worked examples

| Question | Canonical URL |
|---|---|
| Create an agent | `/docs/en/api/beta/agents/create.md` |
| Archive an agent | `/docs/en/api/beta/agents/archive.md` |
| List agent versions | `/docs/en/api/beta/agents/versions/list.md` |
| Create a session | `/docs/en/api/beta/sessions/create.md` |
| Retrieve a session thread | `/docs/en/api/beta/sessions/threads/retrieve.md` |
| Archive a session thread | `/docs/en/api/beta/sessions/threads/archive.md` |
| Send events to a session | `/docs/en/api/beta/sessions/events.md` (POST events on the collection page) |
| Stream session thread events | `/docs/en/api/beta/sessions/threads/events.md` |
| Add a session resource | `/docs/en/api/beta/sessions/resources/add.md` |
| Create a vault credential | `/docs/en/api/beta/vaults/credentials/create.md` |
| Archive a memory store | `/docs/en/api/beta/memory_stores/archive.md` |
| Create a memory in a store | `/docs/en/api/beta/memory_stores/memories/create.md` |
| Create a skill version | `/docs/en/api/beta/skills/versions/create.md` |
| Create enrollment URL | `/docs/en/api/beta/user_profiles/create_enrollment_url.md` |
| Download a managed-agent file | `/docs/en/api/beta/files/download.md` |

## SDK language mirrors

For any canonical `…/api/beta/<path>.md`, the same content also exists at:

```
/docs/en/api/cli/beta/<path>.md
/docs/en/api/csharp/beta/<path>.md
/docs/en/api/go/beta/<path>.md
/docs/en/api/java/beta/<path>.md
/docs/en/api/php/beta/<path>.md
/docs/en/api/python/beta/<path>.md
/docs/en/api/ruby/beta/<path>.md
/docs/en/api/terraform/beta/<path>.md
/docs/en/api/typescript/beta/<path>.md
```

**Default to canonical.** Pick a language variant only when the user says "in Python" / "show me the TypeScript example" / their project file extension makes it obvious. The canonical page already includes language tabs — fetching the per-language page is rarely needed.

## Lookup recipe

When the user asks about a managed-agents operation:

1. **Identify the resource.** agents, sessions, threads, events, resources (under sessions), environments, work (under environments), vaults, credentials, files, memory_stores, memories, memory_versions, skills, versions (under skills or agents), user_profiles.
2. **Identify the verb.** create, retrieve, list, update, delete, archive — or resource-specific: add, upload, download, retrieve_metadata, create_enrollment_url, poll, ack, heartbeat, stop, stats, stream, redact, mcp_oauth_validate.
3. **Pick the namespace.**
   - "How does X work" / "what is X" → conceptual: `vendor/anthropics/platform.claude.com/docs/en/managed-agents/<topic>.md`
   - "How do I call X" / "what's the request shape" → API ref: `vendor/anthropics/platform.claude.com/docs/en/api/beta/<resource>[/<sub>]/<verb>.md`
4. **Read the local file directly.** The vendor mirror at `vendor/anthropics/platform.claude.com/` contains all mirrored content — zero network, zero tokens. `Read` or `Bash cat` the file path directly.
5. **Fall back to `web_fetch` only** when the file is missing from vendor (new endpoint shipped after last crawl). Then run `npm run crawl:vendor -- anthropics` to update the mirror.
6. **If unsure the file exists**, `ls vendor/anthropics/platform.claude.com/docs/en/api/beta/<resource>/` to enumerate the available verbs.

## When to crawl instead of fetch

`npm run crawl:vendor -- anthropics` instead of `web_fetch` when:
- A file is absent from vendor but present in urls.md (stale mirror — re-crawl to sync).
- The user asks to refresh the managed-agents docs to the latest.

## Out of scope (other namespaces in llms.txt)

This skill currently covers only the `managed-agents` slice. Sibling top-level sections exist and should be addressed in future versions of llms-crud or in a sibling skill:

- `/docs/en/agents-and-tools/` — tool use, MCP, agent-skills authoring
- `/docs/en/build-with-claude/` — Messages API, prompt caching, vision, files, batch processing
- `/docs/en/manage-claude/` — Admin API, compliance, WIF
- `/docs/en/api/` (non-beta root) — messages, completions, models, batches
- `/docs/en/api/admin/` — admin API (workspaces, members, keys, invites, usage/cost)
- `/docs/en/api/compliance/` — compliance API (apps, chats, files, projects, groups, roles, activities)

For these, fall back to the doc-source rule from `list-subagent-skills` and consult `vendor/anthropics/urls.md` if present.

## See also

- `list-subagent-skills` — `.md` suffix rule + vendor URL manifests
- `list-default-skills` — Anthropic-shipped skills inventory
- Source index: `https://platform.claude.com/llms.txt`
- Spec: `https://agentskills.io/specification`
