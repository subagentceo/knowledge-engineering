---
title: Monitor your APIs
description: Monitor API traffic, discover undocumented endpoints, and track custom business metrics.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor your APIs

Understanding how your APIs are used — request volume, latency, error rates, and undocumented endpoints — is essential for reliability and security. Cloudflare API Shield Analytics discovers endpoints from observed traffic, Logpush streams logs to your analytics platform, and Workers Analytics Engine tracks custom business metrics.

## Solutions

### API Shield Analytics

Discover endpoints and monitor API traffic patterns. [Learn more about API Shield Analytics](https://developers.cloudflare.com/api-shield/security/api-discovery/).

* **API discovery** \- Automatically find undocumented endpoints from observed traffic
* **Traffic analysis** \- Understand request volume, latency, and usage patterns per endpoint

### Logpush

Stream logs from Cloudflare products to external destinations. [Learn more about Logpush](https://developers.cloudflare.com/logs/).

* **Log export** \- Stream detailed API request logs to your Security Information and Event Management (SIEM) system, data warehouse, or analytics platform

### Workers Analytics Engine

Store and query time-series analytics data from Workers. [Learn more about Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/).

* **Custom metrics** \- Track business-specific Key Performance Indicators (KPIs) such as per-customer usage and error rates

## Get started

1. [API Shield get started](https://developers.cloudflare.com/api-shield/get-started/)
2. [Configure Logpush](https://developers.cloudflare.com/logs/logpush/)
3. [Workers Analytics Engine get started](https://developers.cloudflare.com/analytics/analytics-engine/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/apis/monitor-apis/#page","headline":"Monitor your APIs · Cloudflare use cases","description":"Monitor API traffic, discover undocumented endpoints, and track custom business metrics.","url":"https://developers.cloudflare.com/use-cases/apis/monitor-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/apis/","name":"APIs and microservices"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/apis/monitor-apis/","name":"Monitor your APIs"}}]}
```
