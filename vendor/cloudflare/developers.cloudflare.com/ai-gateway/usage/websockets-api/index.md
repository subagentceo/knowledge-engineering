---
title: WebSockets API
description: Use persistent WebSocket connections through AI Gateway for real-time and non-realtime AI interactions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WebSockets API

The AI Gateway WebSockets API provides a persistent connection for AI interactions, eliminating repeated handshakes and reducing latency. This API is divided into two categories:

* **Realtime APIs** \- Designed for AI providers that offer low-latency, multimodal interactions over WebSockets.
* **Non-Realtime APIs** \- Supports standard WebSocket communication for AI providers, including those that do not natively support WebSockets.

## When to use WebSockets

WebSockets are long-lived TCP connections that enable bi-directional, real-time and non realtime communication between client and server. Unlike HTTP connections, which require repeated handshakes for each request, WebSockets maintain the connection, supporting continuous data exchange with reduced overhead. WebSockets are ideal for applications needing low-latency, real-time data, such as voice assistants.

## Key benefits

* **Reduced overhead**: Avoid overhead of repeated handshakes and TLS negotiations by maintaining a single, persistent connection.
* **Provider compatibility**: Works with all AI providers in AI Gateway. Even if your chosen provider does not support WebSockets, Cloudflare handles it for you, managing the requests to your preferred AI provider.

## Key differences

| Feature                 | Realtime APIs                                                                                                                                                  | Non-Realtime APIs                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Purpose**             | Enables real-time, multimodal AI interactions for providers that offer dedicated WebSocket endpoints.                                                          | Supports WebSocket-based AI interactions with providers that do not natively support WebSockets. |
| **Use Case**            | Streaming responses for voice, video, and live interactions.                                                                                                   | Text-based queries and responses, such as LLM requests.                                          |
| **AI Provider Support** | [Limited to providers offering real-time WebSocket APIs.](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/realtime-api/#supported-providers) | [All AI providers in AI Gateway.](https://developers.cloudflare.com/ai-gateway/usage/providers/) |
| **Streaming Support**   | Providers natively support real-time data streaming.                                                                                                           | AI Gateway handles streaming via WebSockets.                                                     |

For details on implementation, refer to the next sections:

* [Realtime WebSockets API](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/realtime-api/)
* [Non-Realtime WebSockets API](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/non-realtime-api/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/websockets-api/#page","headline":"WebSockets API · Cloudflare AI Gateway docs","description":"Use persistent WebSocket connections through AI Gateway for real-time and non-realtime AI interactions.","url":"https://developers.cloudflare.com/ai-gateway/usage/websockets-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/websockets-api/","name":"WebSockets API"}}]}
```
