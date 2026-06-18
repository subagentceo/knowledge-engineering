---
title: DNS Firewall
description: Protect and accelerate authoritative nameservers with DNS-level caching and DDoS mitigation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS Firewall

Speed up and protect entire authoritative nameservers

 Enterprise-only paid add-on 

Cloudflare DNS Firewall proxies all DNS queries to your nameservers through Cloudflare’s global network. This action protects upstream nameservers from DDoS attacks and reduces load by caching DNS responses.

![Diagram showing protection provided by DNS Firewall. For more details, read further.](https://developers.cloudflare.com/_astro/dns-firewall-overview.DCpibQR6_Z18bd30.webp) 

DNS Firewall is for customers who need to speed up and protect entire authoritative nameservers. If you need to speed up and protect individual zones, refer to Cloudflare DNS [Setups](https://developers.cloudflare.com/dns/zone-setups/).

---

## How DNS Firewall works

When a DNS query for your domain takes place:

1. Queries go to the Cloudflare data center that is closest to the website visitor. This is determined by the location of the DNS resolver.
2. Cloudflare tries to return a DNS response from cache.
3. If the response is not available in cache, Cloudflare queries the upstream authoritative nameservers.
4. After returning the response from the nameservers, Cloudflare temporarily caches it for subsequent DNS queries.

---

## Benefits

DNS Firewall provides the following benefits while allowing your organization total control over your authoritative nameservers:

* DDoS mitigation
* High availability
* Global distribution
* Enhanced performance
* Bandwidth savings
* [Rate limiting per data center](https://developers.cloudflare.com/dns/dns-firewall/setup/#additional-options)
* Minimum and maximum cache TTL specification
* DNS [ANY ↗](https://datatracker.ietf.org/doc/html/rfc8482) query type block

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/dns/dns-firewall/#page","headline":"DNS Firewall · Cloudflare DNS docs","description":"Protect and accelerate authoritative nameservers with DNS-level caching and DDoS mitigation.","url":"https://developers.cloudflare.com/dns/dns-firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dns-firewall/","name":"DNS Firewall"}}]}
```
