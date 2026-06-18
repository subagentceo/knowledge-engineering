---
title: Stop malicious bots
description: Detect and block automated threats while allowing legitimate traffic.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stop malicious bots

Malicious bots perform credential stuffing, content scraping, and inventory hoarding. Cloudflare provides multiple tools to detect and block automated threats while allowing legitimate bots like search engine crawlers.

For a step-by-step workflow that combines these tools into a layered defense, refer to [Stop malicious bots while allowing legitimate traffic](https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/).

## Solutions

### Bot Fight Mode

Baseline bot protection available on all plans, including Free. Challenges requests that match known bot patterns. [Learn more about Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/).

### Super Bot Fight Mode

Granular bot controls for Pro plans and above. Allows verified bots, configures per-category actions, and extends protection to static resources. [Learn more about Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).

### Bot Management

Machine learning-powered bot detection for Enterprise with granular signal detections. Assigns a bot score from 1 (bot) to 99 (human) to every request, along with additional signals for more precise and customizable security rules. [Learn more about Bot Management](https://developers.cloudflare.com/bots/).

### Turnstile

Privacy-preserving challenge for forms and user interactions. Available on all plans at no cost. [Learn more about Turnstile](https://developers.cloudflare.com/turnstile/).

### WAF custom rules

Targeted rules that act on traffic signals including headers, request patterns, and [bot management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/). Available on all plans. [Learn more about custom rules](https://developers.cloudflare.com/waf/custom-rules/).

## Get started

1. [Stop malicious bots while allowing legitimate traffic](https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/) — layered defense guide covering all products above
2. [Enable Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) — quickest single step (Free plan)
3. [Add Turnstile to forms](https://developers.cloudflare.com/turnstile/get-started/) — protect login and signup forms

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/application-security/bots/#page","headline":"Stop malicious bots · Cloudflare use cases","description":"Detect and block automated threats while allowing legitimate traffic.","url":"https://developers.cloudflare.com/use-cases/application-security/bots/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/application-security/","name":"Application security"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/application-security/bots/","name":"Stop malicious bots"}}]}
```
