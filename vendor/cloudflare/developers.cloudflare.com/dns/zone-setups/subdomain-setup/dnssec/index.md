---
title: Enable DNSSEC
description: Enable DNSSEC for a subdomain zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable DNSSEC

As opposed to the [normal process](https://developers.cloudflare.com/dns/dnssec/) for enabling DNSSEC, DNSSEC with a subdomain setup requires a few additional steps.

## Requirements

To use DNSSEC for a subdomain setup, DNSSEC must be enabled on the parent zone. After enabling DNSSEC on the parent zone, you should wait the minimum TTL value (specified in the [SOA record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) of the parent zone) to ensure DNS resolvers provide the same DNS query responses.

## Setup

1. [Create](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#how-to) the child zone.
2. Make sure the child zone is [active](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) on Cloudflare and that DNS resolution is working properly for your subdomain.
3. [Enable DNSSEC](https://developers.cloudflare.com/dns/dnssec/) for the child zone and save the information provided within the DS record output.
4. On the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page of the parent zone, [add the DS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) from the previous step.  
![Screenshot showing how to add a DS record within Cloudflare](https://developers.cloudflare.com/_astro/ds-record-example.eCudbis6_1s6vlD.webp)
5. Add an A record to the child zone to validate DNS resolution.
6. Wait two to six hours. Then, [test the A record](https://developers.cloudflare.com/dns/dnssec/troubleshooting/#test-dnssec-with-dig) added in the previous step using multiple DNS resolvers with DNSSEC validation (`1.1.1.1`, `8.8.8.8`, and `9.9.9.9`). For example, if the A record is for `test.child.example.com`: `dig test.child.example.com +dnssec @1.1.1.1`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/#page","headline":"Enable DNSSEC - subdomain setup · Cloudflare DNS docs","description":"Enable DNSSEC for a subdomain zone.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/subdomain-setup/","name":"Subdomain setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/subdomain-setup/dnssec/","name":"Enable DNSSEC"}}]}
```
