---
title: Custom nameservers
description: Use your own branded nameservers with Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using Cloudflare-branded nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

To use custom nameservers, a zone must be using Cloudflare as Primary ([Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS provider.

## Configuration scope

* [ Set up zone custom nameservers ](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/)
* [ Set up account custom nameservers ](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/)
* [ Set up tenant custom nameservers ](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/)

## Availability

* Zone custom nameservers are available for zones on Business or Enterprise plans. Via API or on the dashboard.
* Account custom nameservers are available for customers on Business (after [contacting Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/)) or Enterprise plans. Once configured, account custom nameservers can be used by all zones in the account, regardless of the zone plan. Via API or on the dashboard.
* Tenant custom nameservers, if created by the tenant owner, will be available to all zones belonging to any account that is part of the tenant. Via API only.

## Restrictions

Custom nameservers are organized in different sets (`ns_set`). Each namesever set must have at least two and no more than five custom nameserver names.

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/#page","headline":"Custom nameservers · Cloudflare DNS docs","description":"Use your own branded nameservers with Cloudflare.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/custom-nameservers/","name":"Custom nameservers"}}]}
```
