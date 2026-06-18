---
title: Tools
description: Define and use tools in Cloudflare Agents to interact with external APIs, process data, and perform actions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tools

### What are tools?

Tools enable AI systems to interact with external services and perform actions. They provide a structured way for agents and workflows to invoke APIs, manipulate data, and integrate with external systems. Tools form the bridge between AI decision-making capabilities and real-world actions.

## Tools on Cloudflare Agents

Cloudflare Agents support several tool patterns. Choose the smallest one that fits the job:

| Pattern           | Use when                                                                                  | Start here                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Server-side tools | The tool can run entirely in the Worker, such as fetching an API or querying SQL          | [Chat agents](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#server-side-tools) |
| Client-side tools | The tool needs browser APIs such as geolocation, clipboard, or local storage              | [Chat agents](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#client-side-tools) |
| Human approvals   | The tool is sensitive and needs a user decision before it runs                            | [Human-in-the-loop](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/)         |
| MCP tools         | You want to expose or consume tools through the Model Context Protocol                    | [Model Context Protocol](https://developers.cloudflare.com/agents/model-context-protocol/)                         |
| Agents as tools   | You want a chat agent to run another chat-capable sub-agent as a retained, streaming tool | [Agents as tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/)                         |

### Understanding tools

In an AI system, tools are typically implemented as function calls that the AI can use to accomplish specific tasks. For example, a travel booking agent might have tools for:

* Searching flight availability
* Checking hotel rates
* Processing payments
* Sending confirmation emails

Each tool has a defined interface specifying its inputs, outputs, and expected behavior. This allows the AI system to understand when and how to use each tool appropriately.

### Common tool patterns

#### API integration tools

The most common type of tools are those that wrap external APIs. These tools handle the complexity of API authentication, request formatting, and response parsing, presenting a clean interface to the AI system.

#### Model Context Protocol (MCP)

The [Model Context Protocol ↗](https://modelcontextprotocol.io/introduction) provides a standardized way to define and interact with tools. Think of it as an abstraction on top of APIs designed for LLMs to interact with external resources. MCP defines a consistent interface for:

* **Tool Discovery**: Systems can dynamically discover available tools
* **Parameter Validation**: Tools specify their input requirements using JSON Schema
* **Error Handling**: Standardized error reporting and recovery
* **State Management**: Tools can maintain state across invocations

#### Data processing tools

Tools that handle data transformation and analysis are essential for many AI workflows. These might include:

* CSV parsing and analysis
* Image processing
* Text extraction
* Data validation

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/concepts/tools/#page","headline":"Tools · Cloudflare Agents docs","description":"Define and use tools in Cloudflare Agents to interact with external APIs, process data, and perform actions.","url":"https://developers.cloudflare.com/agents/concepts/tools/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/concepts/tools/","name":"Tools"}}]}
```
