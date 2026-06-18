---
title: Verify a domain with CNAME
description: Troubleshoot domain verification failures caused by proxied CNAME records, CNAME flattening, or NS record conflicts.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify a domain with CNAME

When configuring services from external providers - such as email services, for example - it is possible that they require you to verify your domain by placing a CNAME record at your zone, similar to the following:

```

<value>._domainkey.example.com CNAME <hostname>.<service provider domain>


```

Consider the sections below if this is not working correctly for you.

## Causes

You may find issues if you have one of the following:

* The CNAME record you created for domain verification is set to [**Proxied**](https://developers.cloudflare.com/dns/proxy-status/).
* The CNAME record is correctly set to DNS only (not proxied) but, in your [zone settings ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings), [**CNAME flattening for all CNAME records**](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) is on.
* The CNAME record is correctly set to DNS only (not proxied) but CNAME flattening is set [for that record specifically](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record).
* An [NS record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) exists, causing a different DNS provider to be authoritative for the subdomain.

## Solution

Make sure that:

* In your zone DNS settings: [**CNAME flattening for all CNAME records**](https://developers.cloudflare.com/dns/cname-flattening/) is turned off.
* On the DNS records table: you have filled in the CNAME record fields correctly, proxy status is set to **DNS only**, and **Flatten** is turned off.
* You have the correct NS configuration, and either:  
   * Make sure that the CNAME record is set as expected with the DNS provider that the NS record points to.  
   * Review your configuration for other DNS records that may be affected by the NS record. Once you are aware of any consequences or have made any necessary adjustments, remove the NS record so that the CNAME is resolved to the target you configured on Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/cname-domain-verification/#page","headline":"Cannot verify a domain with CNAME · Cloudflare DNS docs","description":"Troubleshoot domain verification failures caused by proxied CNAME records, CNAME flattening, or NS record conflicts.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/cname-domain-verification/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/cname-domain-verification/","name":"Verify a domain with CNAME"}}]}
```
