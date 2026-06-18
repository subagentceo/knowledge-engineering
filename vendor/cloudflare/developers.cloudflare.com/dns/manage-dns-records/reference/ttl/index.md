---
title: Time to Live (TTL)
description: How DNS Time to Live values affect record caching.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Time to Live (TTL)

**Time to Live (TTL)** is a field on [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) that controls how long each record is cached and — as a result — how long it takes for record updates to reach your end users.

Longer TTLs speed up [DNS lookups ↗](https://www.cloudflare.com/learning/dns/what-is-dns/) by increasing the chance of cached results, but a longer TTL also means that updates to your records take longer to go into effect.

## Proxied records

By default, all [proxied records](https://developers.cloudflare.com/dns/proxy-status/) have a TTL of **Auto**, which is set to 300 seconds. This value cannot be edited.

Since only [records used for IP address resolution](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution) can be proxied, this setting ensures that potential changes to the assigned [anycast IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) will take effect quickly, as recursive resolvers will not cache them for longer than 300 seconds (five minutes).

Note

It may take longer than 5 minutes for you to actually experience record changes, as your local DNS cache may take longer to update.

## Unproxied records

For **DNS only** records, you can choose a TTL between **30 seconds** (Enterprise) or **60 seconds** (non-Enterprise) and **1 day**.

A TTL of **Auto** is set to 300 seconds (five minutes).

## Nameserver TTL

[Nameserver TTL](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#nameserver-ttl) is a separate feature and only affects Cloudflare nameservers and custom nameservers. For other [NS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ns) on your DNS records table, TTL is controlled by their respective TTL fields.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/#page","headline":"Time to Live (TTL) · Cloudflare DNS docs","description":"How DNS Time to Live values affect record caching.","url":"https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/reference/ttl/","name":"Time to Live (TTL)"}}]}
```
