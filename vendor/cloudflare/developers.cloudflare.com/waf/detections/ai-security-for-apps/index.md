---
title: AI Security for Apps
description: Detect prompt injection, PII, and unsafe topics in AI application traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI Security for Apps

Applications that use large language models (LLMs) are exposed to threats specific to how LLMs process input — prompt injection attacks, PII exposure in prompts, and prompts about unsafe topics.

AI Security for Apps (formerly Firewall for AI) complements your existing WAF rules with detections designed for these LLM-specific threats. It is model-agnostic — the detections work regardless of which LLM you use.

* [PII detection](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/pii-detection/) — Detect personally identifiable information (PII) in incoming prompts, such as phone numbers, email addresses, social security numbers, and credit card numbers.
* [Unsafe and custom topic detection](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/) — Detect prompts related to unsafe subjects such as violent crimes or hate speech, or custom topics specific to your organization.
* [Prompt injection detection](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/prompt-injection/) — Detect prompts designed to subvert your LLM's intended behavior, such as attempts to make the model ignore its instructions or reveal its system prompt.

When enabled, AI Security for Apps scans incoming requests to [endpoints labeled cf-llm](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/) for LLM prompts that may contain threats. Currently, the detection only handles requests with a JSON content type (`application/json`).

Based on scan results, Cloudflare populates [AI detection fields](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/) — fields you can use in WAF rule expressions. You can use these fields in two ways:

* **Monitor:** Filter by the `cf-llm` label in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to review detection results across your traffic.
* **Mitigate:** Use the fields in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to block or challenge requests based on detection results.

## Availability

AI Security for Apps capabilities vary by Cloudflare plan:

| Capability                                                                                                       | Free | Pro | Business | Enterprise  |
| ---------------------------------------------------------------------------------------------------------------- | ---- | --- | -------- | ----------- |
| **LLM endpoint discovery** — Automatically identify AI-powered endpoints across your web properties              | Yes  | Yes | Yes      | Yes         |
| **AI Security Log Mode Ruleset** — Pre-built ruleset that logs the full request body alongside detection results | No   | No  | No       | Paid add-on |
| **AI detection fields** — PII detection, prompt injection scoring, unsafe topic detection, custom topics         | No   | No  | No       | Paid add-on |

To get access to the [AI Security Log Mode Ruleset](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/log-mode-vs-production-mode/#log-mode) and enable [AI detection fields](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/), contact your account team.

AI Security for Apps is built into the Cloudflare [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/) — the WAF must be enabled on your zone before detection fields can be populated and used in rule expressions.

## More resources

* [AI Gateway](https://developers.cloudflare.com/ai-gateway/) — Monitor, control, and cache requests to LLM providers.
* [What are the OWASP Top 10 risks for LLMs? ↗](https://www.cloudflare.com/learning/ai/owasp-top-10-risks-for-llms/) — Background on the most common security risks for LLM-powered applications.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/#page","headline":"AI Security for Apps · Cloudflare Web Application Firewall (WAF) docs","description":"Detect prompt injection, PII, and unsafe topics in AI application traffic.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}}]}
```
