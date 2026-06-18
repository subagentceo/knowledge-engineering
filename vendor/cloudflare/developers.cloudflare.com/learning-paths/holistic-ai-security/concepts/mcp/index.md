---
title: What is Model Context Protocol (MCP)?
description: Learn how MCP connects AI agents to data.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# What is Model Context Protocol (MCP)?

[Model Context Protocol (MCP) ↗](https://www.cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) is a standardized way for AI agents to get the information and tools they need to operate. Similar to how an API works, it is a protocol that allows AI programs to connect to external sources of information and take actions in the real world, going beyond the limits of their original training data.

## How does MCP work?

MCP uses a client-server architecture where an AI agent acts as the client and sends requests to a server. This allows the AI agent to connect to multiple servers at once to get the information it needs. An MCP server is a program that exposes capabilities to AI agents, giving them access to new datasets or tools — like an email service to send messages on behalf of a user.

## What are the security concerns with MCP?

MCP doesn't have native authentication, authorization, or encryption. Because it functions similarly to an API, many of the same security considerations apply. If developers do not proactively implement security measures like Transport Layer Security (TLS) and rate limiting, MCP servers can be vulnerable to attacks, data leaks, and unauthorized access. Organizations must ensure that they validate inputs and protect confidential data to secure their MCP implementations.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/concepts/mcp/#page","headline":"What is Model Context Protocol (MCP)? · Cloudflare Learning Paths","description":"Learn how MCP connects AI agents to data.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/concepts/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/concepts/mcp/","name":"What is Model Context Protocol (MCP)?"}}]}
```
