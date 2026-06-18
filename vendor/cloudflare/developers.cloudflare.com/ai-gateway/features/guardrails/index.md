---
title: Guardrails
description: Evaluate AI Gateway prompts and responses for harmful content and enforce safety policies across providers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Guardrails

Guardrails help you deploy AI applications safely by intercepting and evaluating both user prompts and model responses for harmful content. Acting as a proxy between your application and [model providers](https://developers.cloudflare.com/ai-gateway/usage/providers/) (such as OpenAI, Anthropic, DeepSeek, and others), AI Gateway's Guardrails ensure a consistent and secure experience across your entire AI ecosystem.

Guardrails proactively monitor interactions between users and AI models, giving you:

* **Consistent moderation**: Uniform moderation layer that works across models and providers.
* **Enhanced safety and user trust**: Proactively protect users from harmful or inappropriate interactions.
* **Flexibility and control over allowed content**: Specify which categories to monitor and choose between flagging or outright blocking.
* **Auditing and compliance capabilities**: Receive updates on evolving regulatory requirements with logs of user prompts, model responses, and enforced guardrails.

## Video demo

## How Guardrails work

AI Gateway inspects all interactions in real time by evaluating content against predefined safety parameters. Guardrails work by:

1. Intercepting interactions: AI Gateway proxies requests and responses, sitting between the user and the AI model.
2. Inspecting content:  
   * User prompts: AI Gateway checks prompts against safety parameters (for example, violence, hate, or sexual content). Based on your settings, prompts can be flagged or blocked before reaching the model.  
   * Model responses: Once processed, the AI model response is inspected. If hazardous content is detected, it can be flagged or blocked before being delivered to the user.
3. Applying actions: Depending on your configuration, flagged content is logged for review, while blocked content is prevented from proceeding.

## Related resource

* [Cloudflare Blog: Keep AI interactions secure and risk-free with Guardrails in AI Gateway ↗](https://blog.cloudflare.com/guardrails-in-ai-gateway/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/#page","headline":"Guardrails · Cloudflare AI Gateway docs","description":"Evaluate AI Gateway prompts and responses for harmful content and enforce safety policies across providers.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/guardrails/","name":"Guardrails"}}]}
```
