---
title: Coding agents
description: Route coding agents such as Claude Code, GitHub Copilot CLI, and Pi through AI Gateway for observability, caching, rate limiting, and cost tracking.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Coding agents

Coding agents send model requests to a provider on your behalf. By pointing the agent at AI Gateway instead of the provider, you observe and control that traffic without changing how you work.

## Why route a coding agent through AI Gateway

Routing a coding agent through AI Gateway gives you:

* **Observability** — view every request, token count, and latency in the dashboard.
* **Caching** — return [cached responses](https://developers.cloudflare.com/ai-gateway/features/caching/) for repeated prompts.
* **Rate limiting** — cap request volume with [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/).
* **Cost tracking** — attribute spend across sessions and models.
* **Data Loss Prevention** — scan prompts and responses for secrets, credentials, and other sensitive data with [DLP](https://developers.cloudflare.com/ai-gateway/features/dlp/).

## Set up your agent

Follow the setup guide for your coding agent:

* [Claude Code](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/)
* [GitHub Copilot CLI](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/github-copilot-cli/)
* [Pi](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/)

## Protect sensitive code with DLP

Coding agents routinely send source code, configuration files, and snippets to model providers. That traffic can include API keys, customer data, or other sensitive material. Because AI Gateway sits between the agent and the provider, you can inspect and control it without changing the agent.

[Data Loss Prevention (DLP)](https://developers.cloudflare.com/ai-gateway/features/dlp/) scans request and response bodies against [detection profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) and either flags or blocks matches. Use it to catch secrets, credentials, or regulated data leaving (or returning to) the agent.

Note

Many coding agents stream responses by default. When DLP response scanning is enabled, AI Gateway buffers the full provider response before returning it, which increases time-to-first-token. If you need low-latency streaming, set the DLP policy **Check** to **Request** only, or use a separate gateway for latency-sensitive traffic. Refer to [streaming behavior](https://developers.cloudflare.com/ai-gateway/features/dlp/#streaming-behavior).

## Verify it works

After you configure a tool, confirm that traffic reaches AI Gateway.

1. Send a prompt from the coding agent.
2. In the Cloudflare dashboard, go to the **AI Gateway** page.  
[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
3. Select your gateway, then select **Logs**. Confirm that the request appears with its model, token count, and latency.

For more information on logs, refer to [Logging](https://developers.cloudflare.com/ai-gateway/observability/logging/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#page","headline":"Coding agents · Cloudflare AI Gateway docs","description":"Route coding agents such as Claude Code, GitHub Copilot CLI, and Pi through AI Gateway for observability, caching, rate limiting, and cost tracking.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/coding-agents/","name":"Coding agents"}}]}
```
