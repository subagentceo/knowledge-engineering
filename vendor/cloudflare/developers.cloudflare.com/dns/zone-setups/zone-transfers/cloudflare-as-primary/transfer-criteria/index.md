---
title: Records transfer
description: Which records transfer when Cloudflare is primary.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Records transfer

Consider the sections below to understand the expected behaviors, depending on DNS record type and proxied status.

## Proxied records

For each [proxied DNS record](https://developers.cloudflare.com/dns/proxy-status/) in your zone, Cloudflare will transfer out two `A` and two `AAAA` records.

These records correspond to the [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips) used for proxying traffic.

## DNS-only CNAME records

As explained in [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname), Cloudflare uses a process called [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/) to return the final IP address instead of the CNAME target. CNAME flattening improves performance and is also what allows you to set a CNAME record on the zone apex.

Depending on the [settings](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/) you have, when you use DNS-only CNAME records with outgoing zone transfers, you can expect the following:

* For DNS-only CNAME records on the zone apex, Cloudflare will always transfer out the flattened IP addresses.
* For DNS-only CNAME records on subdomains, Cloudflare will only transfer out flattened IP addresses if the setting [**CNAME flattening for all CNAME records**](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) is enabled.

Per-record CNAME flattening

For records using [per-record CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record) (meaning **CNAME flattening for all CNAME records** is disabled), Cloudflare will transfer out the CNAME, not the flattened IP address.

## Records that are not transferred

The following records are not transferred out when you use Cloudflare as primary:

* [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/)
* TXT records used for TLS certificate validation
* DNS-only [Load Balancing](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/) records

Note

Proxied Load Balancing records are transferred as explained in [Proxied records](#proxied-records).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/transfer-criteria/#page","headline":"Records transfer · Cloudflare DNS docs","description":"Which records transfer when Cloudflare is primary.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/transfer-criteria/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/","name":"Cloudflare as Primary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/transfer-criteria/","name":"Records transfer"}}]}
```
