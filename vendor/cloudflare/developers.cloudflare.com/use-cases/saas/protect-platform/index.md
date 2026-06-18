---
title: Protect your platform
description: Secure your SaaS platform and your customers' data.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect your platform

SaaS platforms are high-value targets because a single breach can expose data across all tenants. Cloudflare's managed rulesets protect your platform and customer endpoints, rate limiting prevents any single tenant from degrading service for others, and Cloudflare One gates admin tools behind Zero Trust policies.

## Solutions

### Application security

Get automatic protection from vulnerabilities and create your own custom rules. [Learn more about Application security](https://developers.cloudflare.com/waf/).

* **Platform protection** \- Application security's managed rulesets block common attacks against your platform and your customers' endpoints
* **API protection** \- Secure platform Application Programming Interfaces (APIs) with security rules and per-API-key rate limits

### Rate limiting

Limit request rates based on flexible matching criteria. [Learn more about Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Per-tenant limits** \- Apply rate limits per customer identifier to prevent one tenant from degrading service for others

### Cloudflare One

Secure your organization with a cloud security platform that replaces legacy perimeters with Cloudflare's global network. [Learn more about Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

* **Admin security** \- Gate internal dashboards and admin tools behind Zero Trust identity policies

## Get started

1. [Deploy application security managed rulesets](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/)
2. [Configure rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)
3. [Cloudflare Access get started](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/protect-platform/#page","headline":"Protect your platform · Cloudflare use cases","description":"Secure your SaaS platform and your customers' data.","url":"https://developers.cloudflare.com/use-cases/saas/protect-platform/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/saas/","name":"SaaS platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/saas/protect-platform/","name":"Protect your platform"}}]}
```
