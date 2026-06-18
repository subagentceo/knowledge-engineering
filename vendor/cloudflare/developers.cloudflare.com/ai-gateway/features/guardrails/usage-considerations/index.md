---
title: Usage considerations
description: Understand latency, availability, language support, and Workers AI usage when enabling AI Gateway Guardrails.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Usage considerations

Guardrails currently uses [Llama Guard 3 8B ↗](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/) on [Workers AI](https://developers.cloudflare.com/workers-ai/) to perform content evaluations. The underlying model may be updated in the future, and we will reflect those changes within Guardrails.

Since Guardrails runs on Workers AI, enabling it incurs usage on Workers AI. You can monitor usage through the Workers AI Dashboard.

## Additional considerations

* **Model availability**: If at least one hazard category is set to `block`, but AI Gateway is unable to receive a response from Workers AI, the request will be blocked. Conversely, if a hazard category is set to `flag` and AI Gateway cannot obtain a response from Workers AI, the request will proceed without evaluation. This approach prioritizes availability, allowing requests to continue even when content evaluation is not possible.
* **Latency impact**: Enabling Guardrails adds some latency. Enabling Guardrails introduces additional latency to requests. Typically, evaluations using Llama Guard 3 8B on Workers AI add approximately 500 milliseconds per request. However, larger requests may experience increased latency, though this increase is not linear. Consider this when balancing safety and performance.
* **Handling long content**: When evaluating long prompts or responses, Guardrails automatically segments the content into smaller chunks, processing each through separate Guardrail requests. This approach ensures comprehensive moderation but may result in increased latency for longer inputs.
* **Supported languages**: Llama Guard 3.3 8B supports content safety classification in the following languages: English, French, German, Hindi, Italian, Portuguese, Spanish, and Thai.
* **Streaming support**: Streaming is not supported when using Guardrails.

Note

Llama Guard is provided as-is without any representations, warranties, or guarantees. Any rules or examples contained in blogs, developer docs, or other reference materials are provided for informational purposes only. You acknowledge and understand that you are responsible for the results and outcomes of your use of AI Gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/#page","headline":"Usage considerations · Cloudflare AI Gateway docs","description":"Understand latency, availability, language support, and Workers AI usage when enabling AI Gateway Guardrails.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/guardrails/","name":"Guardrails"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/features/guardrails/usage-considerations/","name":"Usage considerations"}}]}
```
