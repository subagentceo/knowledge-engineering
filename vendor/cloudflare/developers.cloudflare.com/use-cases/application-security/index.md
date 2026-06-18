---
title: Application security
description: Protect web applications and APIs with Cloudflare Application security (WAF), DDoS protection, bot security, API Shield, and client-side security.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application security

Protect your website or application from attacks, bots, and abuse. Cloudflare's application security (also known as Web Application Firewall or WAF) blocks SQL injection, XSS, and OWASP Top 10 vulnerabilities. DDoS Protection mitigates volumetric and application-layer attacks automatically. Bot Security uses machine learning to score every request. API Shield validates API traffic against your OpenAPI specification. Client-side security monitors third-party scripts for malicious behavior.

* [ Block application attacks ](https://developers.cloudflare.com/use-cases/application-security/block-attacks/)
* [ Mitigate DDoS attacks ](https://developers.cloudflare.com/use-cases/application-security/ddos/)
* [ Stop malicious bots ](https://developers.cloudflare.com/use-cases/application-security/bots/)
* [ Protect against client-side threats ](https://developers.cloudflare.com/use-cases/application-security/client-side/)
* [ Secure API endpoints ](https://developers.cloudflare.com/use-cases/application-security/api-endpoints/)

## Architecture patterns

### Web application security

Protect a website or web application from common attacks:

* **SSL/TLS** encrypts all traffic between visitors and Cloudflare
* **Security rules** managed rulesets block SQL injection, XSS, and OWASP Top 10 vulnerabilities
* **DDoS Protection** mitigates volumetric and application-layer attacks automatically
* **Bot Security** scores every request and blocks automated threats

### API security

Secure Application Programming Interface (API) endpoints with schema enforcement and authentication:

* **API Shield** validates requests against your OpenAPI specification
* **Rate Limiting** prevents abuse with per-endpoint request limits
* **mTLS** authenticates known clients with mutual TLS certificates

### Client-side defense

Protect visitors from threats that execute in the browser:

* **Client-side security** monitors third-party scripts loading on your pages
* **Turnstile** replaces CAPTCHAs on forms with a privacy-preserving challenge
* **Content security rules** block requests from known malicious sources

---

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). All solutions in this use case require your domain's DNS records to be proxied through Cloudflare so that traffic passes through Cloudflare's network before reaching your origin.

---

## Related resources

[Security best practices](https://developers.cloudflare.com/learning-paths/application-security/) 

Structured learning path for application security.

[Security Analytics](https://developers.cloudflare.com/waf/analytics/) 

Analyze security events and fine-tune your configuration.

[Security case studies](https://www.cloudflare.com/case-studies/) 

Explore how companies secure their applications with Cloudflare.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/application-security/#page","headline":"Application security · Use cases · Cloudflare use cases","description":"Protect web applications and APIs with Cloudflare Application security (WAF), DDoS protection, bot security, API Shield, and client-side security.","url":"https://developers.cloudflare.com/use-cases/application-security/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/application-security/","name":"Application security"}}]}
```
