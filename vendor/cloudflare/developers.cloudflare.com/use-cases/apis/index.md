---
title: APIs and microservices
description: Build, protect, and monitor APIs with Cloudflare Workers, API Shield, rate limiting, mTLS, and Logpush.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# APIs and microservices

Build, secure, and manage Application Programming Interfaces (APIs) with rate limiting, authentication, and observability. Cloudflare Workers deploys API handlers globally with automatic scaling. API Shield validates requests against your OpenAPI specification. Rate Limiting prevents abuse. mTLS authenticates machine-to-machine communication. Cloudflare Tunnel and Access secure internal microservices. Logpush and Workers Analytics Engine provide monitoring.

* [ Deploy APIs at the edge ](https://developers.cloudflare.com/use-cases/apis/deploy-apis/)
* [ Protect your APIs ](https://developers.cloudflare.com/use-cases/apis/protect-apis/)
* [ Connect your internal network services ](https://developers.cloudflare.com/use-cases/apis/internal-services/)
* [ Monitor your APIs ](https://developers.cloudflare.com/use-cases/apis/monitor-apis/)

## Architecture patterns

### Secure API gateway

Protect your APIs with defense in depth:

* **API Shield** validates requests against your OpenAPI schema
* **Security rules** managed rulesets block SQL injection, XSS, and OWASP Top 10 vulnerabilities
* **Rate Limiting** prevents abuse and Distributed Denial of Service (DDoS) attacks
* **mTLS** (mutual TLS) authenticates known clients with certificates

### Edge-native APIs

Build APIs that run entirely on Cloudflare:

* **Workers** handles request routing and business logic
* **D1** or **KV** stores application data
* **Queues** handles async processing and webhooks

### Microservices mesh

Connect and secure internal services:

* **Cloudflare Tunnel** exposes services without public IPs
* **Access** enforces identity-based policies between services
* **Workers** acts as an API gateway for external consumers

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) installed on your machine.
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) with DNS records proxied through Cloudflare. This is required for API Shield, rate limiting, and application security.
* For securing internal services with Cloudflare Tunnel and Access: a [Cloudflare One organization](https://developers.cloudflare.com/cloudflare-one/setup/) created in the Cloudflare dashboard.

---

## Related resources

[API Shield documentation](https://developers.cloudflare.com/api-shield/) 

Complete documentation for API discovery, schema validation, and security.

[Workers examples](https://developers.cloudflare.com/workers/examples/) 

Code examples for building APIs with Workers.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/apis/#page","headline":"APIs and microservices · Use cases · Cloudflare use cases","description":"Build, protect, and monitor APIs with Cloudflare Workers, API Shield, rate limiting, mTLS, and Logpush.","url":"https://developers.cloudflare.com/use-cases/apis/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/apis/","name":"APIs and microservices"}}]}
```
