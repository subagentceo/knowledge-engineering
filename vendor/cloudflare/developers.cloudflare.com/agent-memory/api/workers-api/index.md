---
title: Workers API
description: Configure the Agent Memory binding and use memory profiles from Worker code.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers API

Use the Workers API to access Agent Memory from your [Worker](https://developers.cloudflare.com/workers/). The binding connects your Worker to a [namespace](https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/) containing profiles, which are isolated memory stores for your agent.

## Configure the binding

Add an `agent_memory` entry to your Wrangler configuration. The `binding` field is the variable name you use in Worker code, and the `namespace` field is the Agent Memory namespace to bind to.

* [  wrangler.jsonc ](#tab-panel-5115)
* [  wrangler.toml ](#tab-panel-5116)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "agent_memory": [

    {

      "binding": "MEMORY",

      "namespace": "<NAMESPACE_NAME>"

    }

  ]

}


```

TOML

```

[[agent_memory]]

binding = "MEMORY"

namespace = "<NAMESPACE_NAME>"


```

To bind multiple namespaces, add multiple entries to the `agent_memory` array.

## Generated types

Run `npx wrangler types` to generate the binding type in `worker-configuration.d.ts`:

worker-configuration.d.ts

```

interface Env {

  MEMORY: AgentMemoryNamespace;

}


```

## Namespace methods

Use namespace methods on the binding to access and manage memory profiles.

### `getProfile(profileName)`

Gets a memory profile by name. If the profile does not exist, Agent Memory creates it.

* `profileName` ` string ` required: Name of the profile to access. Maximum 100 characters.
* Returns ` Promise<AgentMemoryProfile> `

The first `getProfile()` call for a new profile may take longer while Agent Memory creates the profile.

### `deleteProfile(profileName)`

Marks a profile and all its memories and messages for deletion.

* `profileName` ` string ` required: Name of the profile to delete. Maximum 100 characters.
* Returns ` Promise<void> `

## Profile methods

Call profile methods after you get a profile from the binding.

TypeScript

```

type AgentMemoryMemory = {

  id: string;

  type: "fact" | "event" | "instruction" | "task";

  summary: string;

  content: string;

  sessionId: string | null;

  createdAt: Date;

  updatedAt: Date;

};


```

### `ingest(messages, options?)`

Processes a conversation and extracts structured memories from it. Agent Memory identifies facts, events, instructions, and tasks automatically, so you do not need to specify what to remember.

* `messages` ` Iterable<AgentMemoryMessage> ` required: Conversation messages to process.
* `options.sessionId` ` string | null ` optional: Identifier for the conversation session. Maximum 64 characters. If omitted, Agent Memory derives one from the message content.
* Returns ` Promise<void> `

TypeScript

```

type AgentMemoryMessage = {

  role: "system" | "user" | "assistant";

  content: string; // Max 32 KB

  timestamp?: Date;

};


```

`ingest()` is idempotent. Re-ingesting the same conversation does not create duplicate memories.

### `remember(memory)`

Stores a single memory explicitly. Use `remember()` when your application or agent already knows what should be stored, instead of passing a conversation to `ingest()` for extraction.

* `memory.content` ` string ` required: Memory content to store. The service classifies and summarizes automatically.
* `memory.sessionId` ` string | null ` optional: Identifier for the related conversation session.
* Returns ` Promise<AgentMemoryMemory> `

### `recall(query, options?)`

Searches stored memories in the profile and returns a synthesized answer grounded in the stored content.

* `query` ` string ` required: Natural language question or search query. Maximum 1 KB (1,024 bytes UTF-8).
* `options.thinkingLevel` ` "low" | "medium" | "high" ` optional (default: "low"): Controls retrieval breadth. Higher levels search more candidates but take longer.
* `options.responseLength` ` "short" | "medium" | "long" ` optional (default: "medium"): Controls the verbosity of the synthesized answer.
* `options.referenceDate` ` Date | string ` optional: Temporal anchor for date-relative queries.
* Returns ` Promise<AgentMemoryRecallResult> `

TypeScript

```

type AgentMemoryRecallResult = {

  count: number;

  answer: string;

  candidates: AgentMemoryScoredCandidate[];

};


type AgentMemoryScoredCandidate = {

  id: string;

  summary: string;

  sessionId: string | null;

  score: number;

};


```

If no memories match the query, `recall()` returns an empty answer.

### `list(options?)`

Lists memories stored in the profile. Returns a paginated, filterable view of stored memories. Use the returned `cursor` (when present) to fetch the next page.

* `options.limit` ` number ` optional (default: 20, max: 500): Maximum number of memories to return.
* `options.cursor` ` string ` optional: Opaque cursor from a previous page.
* `options.sessionId` ` string ` optional: Exact-match session filter.
* `options.type` ` "fact" | "event" | "instruction" | "task" ` optional: Exact-match memory-type filter.
* Returns ` Promise<AgentMemoryListMemoriesResult> `

TypeScript

```

type AgentMemoryMemoryListEntry = Omit<AgentMemoryMemory, "content">;


type AgentMemoryListMemoriesResult = {

  memories: AgentMemoryMemoryListEntry[];

  cursor?: string;

};


```

List entries omit `content`. Use `get(memoryId)` to retrieve the full memory.

### `get(memoryId)`

Retrieves a memory by ID.

* `memoryId` ` string ` required: Memory ID.
* Returns ` Promise<AgentMemoryMemory> `

Throws an error if the memory does not exist.

### `delete(memoryId)`

Deletes a memory by ID. Removes the memory and any source messages linked to it. Returns the deleted memory.

* `memoryId` ` string ` required: Memory ID.
* Returns ` Promise<AgentMemoryMemory> `

Throws an error if the memory does not exist.

### `deleteSession(sessionId)`

Marks all memories and messages in the profile that are tagged with the given session ID for deletion. Rows from other sessions in the same profile are untouched. Idempotent: deleting a session ID that has no rows is a no-op.

* `sessionId` ` string ` required: Session ID to delete. Maximum 64 characters.
* Returns ` Promise<void> `

### `getSummary(options?)`

Generates a structured Markdown summary of everything stored in a memory profile. Use it to inspect what Agent Memory remembers about a profile.

* `options.sessionId` ` string | null ` optional: Session ID to scope the "Last Session" section of the summary. If omitted, Agent Memory uses the most recent session.
* Returns ` Promise<AgentMemoryGetSummaryResponse> `

TypeScript

```

type AgentMemoryGetSummaryResponse = {

  summary: string;

};


```

## Limits

| Parameter                  | Limit                      |
| -------------------------- | -------------------------- |
| Messages per ingest() call | 500                        |
| Message content size       | 32 KB (32,768 bytes UTF-8) |
| Session ID length          | 64 characters              |
| recall() query size        | 1 KB (1,024 bytes UTF-8)   |

Refer to [Limits](https://developers.cloudflare.com/agent-memory/platform/limits/) for the complete list of constraints.

## Next steps

[ HTTP API ](https://developers.cloudflare.com/agent-memory/api/http-api/) Use Agent Memory from services that call the Cloudflare API directly. 

[ Get started ](https://developers.cloudflare.com/agent-memory/get-started/) Add durable memory recall and ingestion to an agent. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/api/workers-api/#page","headline":"Workers API · Cloudflare Agent Memory docs","description":"Configure the Agent Memory binding and use memory profiles from Worker code.","url":"https://developers.cloudflare.com/agent-memory/api/workers-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-memory/","name":"Agent Memory"}},{"@type":"ListItem","position":3,"item":{"@id":"/agent-memory/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/agent-memory/api/workers-api/","name":"Workers API"}}]}
```
