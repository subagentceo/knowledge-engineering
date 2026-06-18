---
title: Protect your APIs
description: Secure APIs against abuse and injection attacks with schema validation, rate limiting, mTLS, and WAF rules.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect your APIs

APIs are exposed to abuse, injection attacks, and unauthorized access. Cloudflare provides defense in depth with API Shield schema validation, per-endpoint rate limiting, mutual TLS (mTLS) client authentication, and security rules.

## Solutions

### API Shield

Discover, secure, and monitor your APIs. [Learn more about API Shield](https://developers.cloudflare.com/api-shield/).

* **Schema validation** \- Reject requests that do not conform to your OpenAPI specification before they reach your origin

### Rate Limiting

Limit request rates based on flexible matching criteria. [Learn more about Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Rate limiting** \- Prevent abuse and volumetric attacks with per-IP or per-API-key request limits

### mTLS

Mutual TLS client certificate authentication. [Learn more about mTLS](https://developers.cloudflare.com/ssl/client-certificates/).

* **Client authentication** \- Require mutual TLS certificates for machine-to-machine communication

### Application Security

Get automatic protection from vulnerabilities and create your own custom rules. [Learn more about Application Security](https://developers.cloudflare.com/waf/).

* **Attack protection** \- Application security's managed rulesets block SQL injection, Cross-Site Scripting (XSS), and other injection attacks

### Access

Zero Trust access control for applications and infrastructure. [Learn more about Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

* **Identity providers** \- Integrate with Okta, Azure AD, Google Workspace, and other identity providers (IdPs) to gate API access
* **Service tokens** \- Issue long-lived credentials for machine-to-machine authentication between services

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **JWT validation** \- Verify and decode JSON Web Tokens (JWTs) at the edge before requests reach your backend
* **Custom auth logic** \- Build any authentication scheme — API keys, Hash-based Message Authentication Code (HMAC) signatures, custom headers — directly at the edge

## Get started

1. [API Shield get started](https://developers.cloudflare.com/api-shield/get-started/)
2. [Configure rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)
3. [Set up mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/)
4. [Configure applications with Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)
5. [Service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/)
6. [Workers get started](https://developers.cloudflare.com/workers/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/apis/protect-apis/#page","headline":"Protect your APIs · Cloudflare use cases","description":"Secure APIs against abuse and injection attacks with schema validation, rate limiting, mTLS, and WAF rules.","url":"https://developers.cloudflare.com/use-cases/apis/protect-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/apis/","name":"APIs and microservices"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/apis/protect-apis/","name":"Protect your APIs"}}]}
```
