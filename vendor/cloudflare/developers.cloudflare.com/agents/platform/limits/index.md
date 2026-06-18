---
title: Limits
description: Understand the concurrency, storage, and compute time limits that apply to Cloudflare Agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Limits that apply to authoring, deploying, and running Agents are detailed below.

Many limits are inherited from those applied to Workers scripts and/or Durable Objects, and are detailed in the [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) documentation.

| Feature                                                | Limit                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Max concurrent (running) Agents per account            | Tens of millions+ [1](#user-content-fn-1)                                                    |
| Max definitions per account                            | \~250,000+ [2](#user-content-fn-2)                                                           |
| Max state stored per unique Agent                      | 1 GB                                                                                         |
| Max compute time per Agent                             | 30 seconds (refreshed per HTTP request / incoming WebSocket message) [3](#user-content-fn-3) |
| Duration (wall clock) per step [3](#user-content-fn-3) | Unlimited (for example, waiting on a database call or an LLM response)                       |

---

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Footnotes

1. Yes, really. You can have tens of millions of Agents running concurrently, as each Agent is mapped to a [unique Durable Object](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/) (actor). [↩](#user-content-fnref-1)
2. You can deploy up to [500 scripts per account](https://developers.cloudflare.com/workers/platform/limits/), but each script (project) can define multiple Agents. Each deployed script can be up to 10 MB on the [Workers Paid Plan](https://developers.cloudflare.com/workers/platform/pricing/#workers) [↩](#user-content-fnref-2)
3. Compute (CPU) time per Agent is limited to 30 seconds, but this is refreshed when an Agent receives a new HTTP request, runs a [scheduled task](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/), or an incoming WebSocket message. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/platform/limits/#page","headline":"Limits · Cloudflare Agents docs","description":"Understand the concurrency, storage, and compute time limits that apply to Cloudflare Agents.","url":"https://developers.cloudflare.com/agents/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/platform/limits/","name":"Limits"}}]}
```
