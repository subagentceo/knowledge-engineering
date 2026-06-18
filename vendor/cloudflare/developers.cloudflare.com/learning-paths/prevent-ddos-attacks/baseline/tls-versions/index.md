---
title: Update TLS versions
description: Learn about update tls versions in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update TLS versions

In some circumstances - specifically when an application allows client-initiated SSL/TLS renegotiation - previous versions of SSL/TLS can be more vulnerable to DDoS attacks.

When you use an SSL/TLS certificate issued by Cloudflare[1](#user-content-fn-1), you can reduce the impact of this vulnerability by:

* Updating the [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) accepted by your application.
* Allowing [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/).

## Additional resources

For more details on this vulnerability, refer to [Secure Server- and Client-Initiated SSL Renegotiation ↗](https://crashtest-security.com/secure-client-initiated-ssl-renegotiation/).

## Footnotes

1. Meaning either [Universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [Advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) certificates. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/tls-versions/#page","headline":"Update TLS versions · Cloudflare Learning Paths","description":"Learn about update tls versions in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/tls-versions/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/","name":"Baseline DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/tls-versions/","name":"Update TLS versions"}}]}
```
