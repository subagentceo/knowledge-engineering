---
title: Secure API endpoints
description: Protect APIs with schema validation, rate limiting, and authentication.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secure API endpoints

API endpoints are vulnerable to schema violations, abuse, and unauthorized access. Cloudflare API Shield validates requests against your OpenAPI specification, and mutual TLS (mTLS) authenticates known clients with certificates.

## Solutions

### API Shield

Discover, secure, and monitor your APIs. [Learn more about API Shield](https://developers.cloudflare.com/api-shield/).

* **API discovery** \- Automatically identify API endpoints in your traffic, including undocumented ones
* **Schema validation** \- Reject requests that do not conform to your OpenAPI specification
* **Sequence mitigation** \- Detect and block API abuse patterns such as out-of-order requests

### mTLS

Mutual TLS client certificate authentication. [Learn more about mTLS](https://developers.cloudflare.com/ssl/client-certificates/).

* **mTLS authentication** \- Require client certificates for machine-to-machine API access

## Get started

1. [API Shield get started](https://developers.cloudflare.com/api-shield/get-started/)
2. [Set up mTLS](https://developers.cloudflare.com/ssl/client-certificates/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/application-security/api-endpoints/#page","headline":"Secure API endpoints · Cloudflare use cases","description":"Protect APIs with schema validation, rate limiting, and authentication.","url":"https://developers.cloudflare.com/use-cases/application-security/api-endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/application-security/","name":"Application security"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/application-security/api-endpoints/","name":"Secure API endpoints"}}]}
```
