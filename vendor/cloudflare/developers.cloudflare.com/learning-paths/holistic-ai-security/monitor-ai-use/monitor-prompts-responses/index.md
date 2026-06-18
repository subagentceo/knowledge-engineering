---
title: Monitor prompts and responses
description: Inspect AI prompts using TLS decryption.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor prompts and responses

When you enable [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption), you can review the prompts and responses for supported AI applications. This allows you to understand three key things about AI application usage:

* The sanctioned and unsanctioned AI tools your users are engaging with.
* How they are interacting with them.
* What information they are sharing.
![Log entry for a prompt detected using AI prompt protection.](https://developers.cloudflare.com/_astro/gateway-prompt-log.CZ61RAFw_lrWfS.webp) 

You can use this in conjunction with [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) to detect sensitive data potentially being used in prompts, with or without explicitly blocking the action. You can use DLP to log AI prompt topics by turning on [Capture generative AI prompt content in logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#turn-on-ai-prompt-content-logging-for-a-dlp-policy) for the policy.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/monitor-prompts-responses/#page","headline":"Monitor prompts and responses · Cloudflare Learning Paths","description":"Inspect AI prompts using TLS decryption.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/monitor-prompts-responses/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/","name":"Monitor AI usage at your organization"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/monitor-prompts-responses/","name":"Monitor prompts and responses"}}]}
```
