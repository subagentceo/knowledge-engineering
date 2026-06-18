---
title: Agent Memory
description: Persistent, scoped memory for agents that need to remember users, organizations, and domain-specific context across conversations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agent Memory

Persistent, scoped memory for agents that need to remember users, organizations, and domain-specific context across conversations.

Note

Agent Memory is in private beta. To understand the memory model, refer to [How Agent Memory works](https://developers.cloudflare.com/agent-memory/concepts/how-agent-memory-works/).

Agent Memory gives agents durable memory across conversations without requiring you to build your own extraction, storage, search, and summarization pipeline. Ingest conversations to extract memories automatically, or explicitly remember information when your application already knows what to store.

Use Agent Memory to remember user preferences, company operating rules, support history, project state, or the state of a specific object.

**Agent Memory gives you:**

* Isolated profiles for users, agents, tenants, teams, or application entities
* Namespaces for separating applications, environments, or memory layers
* Automatic extraction of facts, events, instructions, and tasks from conversations
* APIs to add, list, recall, and delete memories
* Profile summaries for observing what Agent Memory remembers
[ Get started ](https://developers.cloudflare.com/agent-memory/get-started/) [ Learn how it works ](https://developers.cloudflare.com/agent-memory/concepts/how-agent-memory-works/) 

---

## Features

###  Scoped memory profiles 

Store memories in isolated profiles for users, agents, teams, tenants, or application entities. Use namespaces to separate applications, environments, or memory layers.

[ Learn about profiles ](https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/) 

###  Automatic memory extraction 

Ingest conversations to extract memories automatically, or explicitly add important information when your agent already knows what should be remembered.

[ Review the API ](https://developers.cloudflare.com/agent-memory/api/workers-api/#ingest-conversations) 

###  Recall memories across agent executions 

Retrieve relevant memory when an agent needs durable context that is not present in the current prompt, conversation, or execution.

[ Recall memories ](https://developers.cloudflare.com/agent-memory/api/workers-api/#recall-memories) 

---

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Agent Memory is accessed through a Worker binding. Build serverless applications that use persistent memory.

**[Agents](https://developers.cloudflare.com/agents/)** 

Build AI-powered agents with persistent state, tool use, and real-time communication.

---

## More resources

[Get started](https://developers.cloudflare.com/agent-memory/get-started/) 

Add durable memory recall and ingestion to an agent.

[How Agent Memory works](https://developers.cloudflare.com/agent-memory/concepts/how-agent-memory-works/) 

Learn how Agent Memory extracts, classifies, and retrieves knowledge from conversations.

[Workers API](https://developers.cloudflare.com/agent-memory/api/workers-api/) 

Use Agent Memory from a Worker through an `agent_memory` binding.

[HTTP API](https://developers.cloudflare.com/agent-memory/api/http-api/) 

Use Agent Memory from services that call the Cloudflare API directly.

[Limits](https://developers.cloudflare.com/agent-memory/platform/limits/) 

Review validation limits and constraints for Agent Memory.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agent-memory/#page","headline":"Cloudflare Agent Memory docs · Cloudflare Agent Memory docs","description":"Persistent, scoped memory for agents that need to remember users, organizations, and domain-specific context across conversations.","url":"https://developers.cloudflare.com/agent-memory/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-memory/","name":"Agent Memory"}}]}
```
