# Using agent memory

Give your agents persistent memory that survives across sessions using memory stores.

---

Each Managed Agents session starts with a fresh context by default. When a session ends, anything the agent learned is gone. Memory stores let the agent carry information across sessions: user preferences, project conventions, prior mistakes, and domain context.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDKs set the beta header automatically.
</Note>

## Overview

A **memory store** is a workspace-scoped collection of text documents optimized for Claude. When you attach a store to a session, it is mounted as a directory inside the session's container. The agent reads and writes it with the same file tools it uses for the rest of the filesystem, and a note describing each mount is automatically added to the system prompt so the agent knows where to look. The [agent toolset](/docs/en/managed-agents/tools) is required for these interactions.

Each **memory** in a store is addressed by a path and can be read and edited directly via the API or Console.

Every change to a memory creates an immutable **memory version**, giving you an audit trail and point-in-time recovery for everything the agent writes.

## Create a memory store

Give the store a `name` and a `description`. The description is passed to the agent, telling it what the store contains.

```python
store = client.beta.memory_stores.create(
    name="User Preferences",
    description="Per-user preferences and project context.",
)
print(store.id)  # memstore_01Hx...
```

The memory store `id` (`memstore_...`) is what you pass when attaching the store to a session.

### Seed it with content (optional)

Pre-load a store with reference material before any agent runs:

```python
client.beta.memory_stores.memories.create(
    store.id,
    path="/formatting_standards.md",
    content="All reports use GAAP formatting. Dates are ISO-8601...",
)
```

<Tip>
Individual memories within the store are capped at 100 kB (~25k tokens). Structure memory as many small focused files, not a few large ones.
</Tip>

## Attach a memory store to a session

Memory stores are attached in the session's `resources[]` array when the session is created. Unlike file and repository resources, memory stores can only be attached at session creation time.

Optionally include `instructions` to provide session-specific guidance. You can configure `access` as well. It defaults to `read_write`, but `read_only` is also supported.

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[
        {
            "type": "memory_store",
            "memory_store_id": store.id,
            "access": "read_write",
            "instructions": "User preferences and project context. Check before starting any task.",
        }
    ],
)
```

<Warning>
Memory stores attach with `read_write` access by default. If the agent processes untrusted input, a successful prompt injection could write malicious content into the store. Use `read_only` for reference material, shared lookups, and any store the agent does not need to modify.
</Warning>

A maximum of **8 memory stores** are supported per session.

### How the agent accesses memory

Each attached store is mounted inside the session's container as a directory under `/mnt/memory/`, and the agent reads and writes it with the standard [agent toolset](/docs/en/managed-agents/tools). Writes are persisted back to the store and stay in sync across sessions that share it.

`access` is enforced at the filesystem level: a `read_only` mount rejects writes, while writes to a `read_write` mount produce [memory versions](#audit-memory-changes) attributed to the session.

## View and edit memories

Memory stores can be managed directly via the API. Use this for building review workflows, correcting bad memories, or seeding stores before any session runs.

### List memories

```python
page = client.beta.memory_stores.memories.list(
    store.id,
    path_prefix="/",
    order_by="path",
    depth=2,
)
for item in page.data:
    print(item.type, item.path)
```

### Read a memory

```python
retrieved = client.beta.memory_stores.memories.retrieve(
    mem.id,
    memory_store_id=store.id,
)
print(retrieved.content)
```

### Create a memory

`memories.create` creates a memory at a given `path`. Create does not overwrite; to change an existing memory, use `memories.update`.

```python
mem = client.beta.memory_stores.memories.create(
    store.id,
    path="/preferences/formatting.md",
    content="Always use tabs, not spaces.",
)
```

### Update a memory

`memories.update()` modifies an existing memory by ID. You can change `content`, `path` (a rename), or both.

```python
client.beta.memory_stores.memories.update(
    mem.id,
    memory_store_id=store.id,
    path="/archive/2026_q1_formatting.md",
)
```

#### Safe content edits (optimistic concurrency)

To avoid clobbering a concurrent write, pass a `content_sha256` precondition:

```python
client.beta.memory_stores.memories.update(
    memory_id=mem.id,
    memory_store_id=store.id,
    content="CORRECTED: Always use 2-space indentation.",
    precondition={"type": "content_sha256", "content_sha256": mem.content_sha256},
)
```

### Delete a memory

```python
client.beta.memory_stores.memories.delete(
    mem.id,
    memory_store_id=store.id,
)
```

## Audit memory changes

Every mutation to a memory creates an immutable **memory version** (`memver_...`). Use the version endpoints to audit who changed what and when, to inspect or restore a prior snapshot, and to scrub sensitive content out of history with redact.

Versions are retained for 30 days. There is no dedicated restore endpoint; to roll back, retrieve the version you want and write its `content` back with `memories.update`.

### List versions

```python
versions = client.beta.memory_stores.memory_versions.list(
    store.id,
    memory_id=mem.id,
)
for v in versions:
    print(f"{v.id}: {v.operation}")
```

### Retrieve a version

```python
version = client.beta.memory_stores.memory_versions.retrieve(
    version_id,
    memory_store_id=store.id,
)
print(version.content)
```

### Redact a version

Redact scrubs content out of a historical version while preserving the audit trail. A version that is the current head of a live memory cannot be redacted.

```python
client.beta.memory_stores.memory_versions.redact(
    version_id,
    memory_store_id=store.id,
)
```

## Manage memory stores

### List stores

```python
for s in client.beta.memory_stores.list(include_archived=True):
    print(s.id, s.name, s.archived_at)
```

### Archive a store

Archiving makes a store read-only and prevents it from being attached to new sessions. Archiving is one-way; there is no unarchive.

```python
client.beta.memory_stores.archive(store.id)
```

To permanently remove a store along with all of its memories and versions, use `memory_stores.delete`.

## Limits

Default capacity and rate limits apply to memory stores while this feature is in beta. [Contact support](https://support.claude.com) if you need higher limits.
