---
title: Embedded
description: Execute function code alongside inference calls using Workers AI embedded function calling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Embedded

Cloudflare has a unique [embedded function calling ↗](https://blog.cloudflare.com/embedded-function-calling) feature that allows you to execute function code alongside your tool call inference. Our npm package [@cloudflare/ai-utils ↗](https://www.npmjs.com/package/@cloudflare/ai-utils) is the developer toolkit to get started.

Embedded function calling can be used to easily make complex agents that interact with websites and APIs, like using natural language to create meetings on Google Calendar, saving data to Notion, automatically routing requests to other APIs, saving data to an R2 bucket - or all of this at the same time. All you need is a prompt and an OpenAPI spec to get started.

REST API support

Embedded function calling depends on features native to the Workers platform. This means that embedded function calling is only supported via [Cloudflare Workers](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/), not via the [REST API](https://developers.cloudflare.com/workers-ai/get-started/rest-api/).

## Resources

* [ Get Started ](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/get-started/)
* [ Examples ](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/)
* [ API Reference ](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/)
* [ Troubleshooting ](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/troubleshooting/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/#page","headline":"Embedded function calling · Cloudflare Workers AI docs","description":"Execute function code alongside inference calls using Workers AI embedded function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/function-calling/","name":"Function calling"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/function-calling/embedded/","name":"Embedded"}}]}
```
