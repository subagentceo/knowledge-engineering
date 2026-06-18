---
title: NS records already exist
description: Resolve conflicts with existing NS records.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# NS records already exist

As you try to create a new DNS record, Cloudflare displays the following error:

```

NS records with that host already exist. (Code:81056)


```

## Causes

When a child domain (`blog.example.com`) of your domain (`example.com`) has been set up as a separate [subdomain zone](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), corresponding `NS` records must have been placed within the parent zone.

When you are managing DNS records for the parent zone (in this example, `example.com`), you cannot create IP address resolution records (`A`, `AAAA`, or `CNAME`) with a name that specifies the same subdomain that already exists as a separate subdomain zone.

| Type | Name | Content   | TTL  |
| ---- | ---- | --------- | ---- |
| A    | blog | 192.0.2.0 | Auto |

## Solution

Before creating such records, remove any `NS` records with the same name.

Important

This action might be reverting an existing subdomain setup and may incur in downtime. Refer to [Rollback subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/rollback/) for more guidance.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/#page","headline":"Existing NS records block new record creation · Cloudflare DNS docs","description":"Resolve conflicts with existing NS records.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/existing-ns-record/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/existing-ns-record/","name":"NS records already exist"}}]}
```
