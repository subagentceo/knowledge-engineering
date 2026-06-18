---
title: How Agent Memory works
description: A high-level overview of how Agent Memory extracts, stores, and retrieves knowledge from conversations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Agent Memory works

Agent Memory is a managed service that gives your applications persistent, AI-powered memory. It automatically turns raw conversations into structured knowledge and retrieves the right context when you need it.

## Memory types

Agent Memory classifies every extracted memory into one of four types:

* **Facts** — Stable knowledge about a person, project, or tool. Preferences, identities, relationships, and goals. Facts evolve over time through supersession: when a newer fact replaces an older one on the same topic, the old version is preserved but the latest surfaces in recall results.
* **Events** — Completed actions anchored to a point in time. Deployments, decisions, milestones, and observations. Events accumulate and do not conflict with each other.
* **Instructions** — Reusable procedures, workflows, and conventions. Like facts, instructions support supersession when updated.
* **Tasks** — Short-lived, session-scoped items such as active investigations and follow-ups. Tasks are deprioritized after the session ends.

## How ingestion works

When you call `ingest()`, Agent Memory processes the conversation through several stages:

1. **Extraction** — AI reads the conversation and identifies discrete, memorable items. Each item is a standalone piece of knowledge with a clear summary and supporting content.
2. **Classification** — Each extracted item is classified into a memory type (fact, event, instruction, or task) and assigned a topic key, keywords, and search queries for later retrieval.
3. **Deduplication** — The system checks for duplicates against both the current batch and existing stored memories. Facts and instructions with the same topic key supersede older versions rather than creating duplicates.
4. **Storage** — Memories are written to durable storage with full-text search indexes. Non-task memories are also embedded as vectors for semantic search.

Raw conversation messages are always stored verbatim alongside extracted memories, preserving the original transcript for full-text search.

## How recall works

When you call `recall()`, Agent Memory runs multiple retrieval strategies in parallel:

1. **Query analysis** — AI analyzes your query to determine the best retrieval approach, generating keyword terms, topic keys, and semantic search vectors.
2. **Parallel retrieval** — The system simultaneously searches across keyword indexes, topic key lookups, semantic vector indexes, and raw conversation messages.
3. **Scoring and ranking** — Results from all sources are combined and ranked to surface the most relevant memories while maintaining diversity across retrieval methods.
4. **Synthesis** — AI generates a natural language answer from the top-ranked memories, grounded in the actual stored content.

If no memories match the query, `recall()` returns an empty answer rather than hallucinating a response.

## Idempotency and deduplication

Agent Memory is designed for safe re-ingestion:

* **Messages are content-addressed.** Each message gets a deterministic ID derived from its content and session. Sending the same message twice does not create a duplicate.
* **Sessions are deterministic.** If you do not provide a `sessionId`, one is derived from the message content. The same conversation always maps to the same session.
* **Facts and instructions evolve.** When a new memory shares a topic key with an existing one (for example, "editor preference"), the old memory is marked as superseded. The latest version surfaces in recall results, but the full history is preserved.

## Related resources

[ Profiles and namespaces ](https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/) Understand the isolation model for memory storage. 

[ Workers API ](https://developers.cloudflare.com/agent-memory/api/workers-api/) Configure bindings and use profiles from Worker code. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/concepts/how-agent-memory-works/#page","headline":"How Agent Memory works · Cloudflare Agent Memory docs","description":"A high-level overview of how Agent Memory extracts, stores, and retrieves knowledge from conversations.","url":"https://developers.cloudflare.com/agent-memory/concepts/how-agent-memory-works/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-memory/","name":"Agent Memory"}},{"@type":"ListItem","position":3,"item":{"@id":"/agent-memory/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agent-memory/concepts/how-agent-memory-works/","name":"How Agent Memory works"}}]}
```
