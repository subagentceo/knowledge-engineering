---
title: DNSSEC
description: Sign your zone with DNSSEC for DNS security.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNSSEC

DNS Security Extensions (DNSSEC) adds an extra layer of authentication to DNS, ensuring requests are not routed to a spoofed domain.

For additional background on DNSSEC, visit the [Cloudflare Learning Center ↗](https://www.cloudflare.com/learning/dns/dns-security/).

When you [enable DNSSEC](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/), Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

Note:

Cloudflare automatically adds **DS** records for domains using Cloudflare Registrar or those using `.ch` and `.cz` top-level domains.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/dnssec/#page","headline":"DNSSEC · Cloudflare Learning Paths","description":"Sign your zone with DNSSEC for DNS security.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/dnssec/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/default-traffic-security/","name":"Default traffic security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/default-traffic-security/dnssec/","name":"DNSSEC"}}]}
```
