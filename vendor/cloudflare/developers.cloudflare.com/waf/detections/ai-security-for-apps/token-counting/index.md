---
title: Token counting
description: Count tokens in AI requests and responses for rate limiting.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Token counting

AI Security for Apps (formerly Firewall for AI) provides an estimated token count for each incoming LLM prompt. This lets you monitor prompt sizes, set limits on overly long prompts, and track token usage across your AI endpoints.

## How token counting works

When AI Security for Apps processes a request to a `cf-llm` labeled endpoint, it calculates an approximate token count for the prompt content. The result is available in the **LLM Token count** ([cf.llm.prompt.token\_count](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token%5Fcount/)) field, which you can reference in rule expressions and view in analytics.

Note

**The token count is an estimate.** It uses a general-purpose tokenizer and will not exactly match the token count reported by your LLM provider. Different models use different tokenizers — GPT-4, Claude, Llama, and others all tokenize text differently. Use this field for relative thresholds and anomaly detection, not as a precise measurement for billing or model-specific token budgets.

## Use cases

### Block oversized prompts

Set a hard threshold to block prompts that exceed a certain estimated token count. This prevents unexpectedly large inputs from reaching your model.

* **When incoming requests match**:  
Enter the following expression in the editor:  
`(cf.llm.prompt.token_count gt 4000)`
* **Action**: _Block_

### Rate limit large prompts

Create a [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) that restricts the number of large prompts a single client can send within a time window. This helps prevent abuse where attackers send excessively long prompts to consume model resources.

Enter the following rule expression in the editor:  
`(cf.llm.prompt.token_count gt 2000)`

Set the rate to, for example, 10 requests per minute per IP, with an action of _Block_ or _Managed Challenge_.

### Combine token count with other detections

Target large prompts that also show signs of prompt injection — a common pattern where attackers pad injection attempts with long context.

Example rule expression:  
`(cf.llm.prompt.token_count gt 3000 and cf.llm.prompt.injection_score lt 50)`

## Important considerations

* **Estimate only.** The token count is a general approximation. Actual token consumption at your model may differ depending on the model's tokenizer.
* **Input tokens only.** The token count reflects the incoming prompt. It does not estimate output or response tokens.
* **Extracted prompt only.** The token count is calculated on the prompt text extracted from the request body. Cloudflare extracts the prompt using a set of known JSON paths for major LLM providers. When the prompt cannot be extracted, Cloudflare uses the full request body as a fallback. In these situations, token count will reflect the full request body.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/token-counting/#page","headline":"Token counting · Cloudflare Web Application Firewall (WAF) docs","description":"Count tokens in AI requests and responses for rate limiting.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/token-counting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/ai-security-for-apps/token-counting/","name":"Token counting"}}]}
```
