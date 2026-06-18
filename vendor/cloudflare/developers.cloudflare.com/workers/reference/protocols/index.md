---
title: Protocols
description: Supported protocols on the Workers platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protocols

Cloudflare Workers support the following protocols and interfaces:

| Protocol               | Inbound                                                                                                                                                                                                                                                                                                                                                | Outbound                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **HTTP / HTTPS**       | Handle incoming HTTP requests using the [fetch() handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/)                                                                                                                                                                                                                      | Make HTTP subrequests using the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/)                   |
| **Direct TCP sockets** | Support for handling inbound TCP connections is [coming soon ↗](https://blog.cloudflare.com/workers-tcp-socket-api-connect-databases/)                                                                                                                                                                                                                 | Create outbound TCP connections using the [connect() API](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) |
| **WebSockets**         | Accept incoming WebSocket connections using the [WebSocket API](https://developers.cloudflare.com/workers/runtime-apis/websockets/)                                                                                                                                                                                                                    |                                                                                                                                |
| **HTTP/3 (QUIC)**      | Accept inbound requests over [HTTP/3 ↗](https://www.cloudflare.com/learning/performance/what-is-http3/) by enabling it on your [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) in **Speed** \> **Settings** \> **Protocol Optimization** area of the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). |                                                                                                                                |
| **SMTP**               | Use [Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) to process and forward email, without having to manage TCP connections to SMTP email servers                                                                                                                                                      | [Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/)                               |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/reference/protocols/#page","headline":"Protocols · Cloudflare Workers docs","description":"Supported protocols on the Workers platform.","url":"https://developers.cloudflare.com/workers/reference/protocols/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/reference/protocols/","name":"Protocols"}}]}
```
