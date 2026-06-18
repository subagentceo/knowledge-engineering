---
title: Round-robin DNS
description: Distribute traffic across multiple origins with round-robin DNS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Round-robin DNS

To randomly distribute traffic across multiple servers, set up multiple DNS `A` or `AAAA` records for the same hostname.

Use this setup for simple, [round-robin load balancing ↗](https://www.cloudflare.com/learning/dns/glossary/round-robin-dns/). If you need more fine-grained control over traffic distribution — including automatic failover, intelligent routing, and more — set up our [add-on load balancing service](https://developers.cloudflare.com/load-balancing/).

## Example scenario

The following example illustrates how you would distribute traffic intended for `www.example.com`. Though the example uses `A` records, you could also use `AAAA` records.

After [creating an account](https://developers.cloudflare.com/fundamentals/account/create-account/) and [updating your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) for `example.com`, you might [create multiple subdomain DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for `www`:

| Type | Name | IPv4 address |
| ---- | ---- | ------------ |
| A    | www  | 192.0.2.1    |
| A    | www  | 192.0.2.2    |
| A    | www  | 192.0.2.3    |

The exact behavior of your DNS routing would depend on the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of each record.

### All records unproxied

If all associated records were unproxied, any request to Cloudflare's nameservers would return the three `A` records you previously added.

Each client (oftentimes a browser), would decide which IP address to send the request to. If one IP address fails, the client would choose another option. All requests would be sent directly to the origin server (either `192.0.2.1`, `192.0.2.2`, or `192.0.2.3`, using the example above).

### All records proxied (recommended)

If all associated records were proxied, any request to Cloudflare's nameservers would return two `A` records from Cloudflare's list of IP addresses.

Each client (oftentimes a browser) would decide which Cloudflare IP address to send the request to. Cloudflare would then receive that request and — if Cloudflare needed to contact your origin server — we would pick one of the three IP addresses specified in your DNS records (either `192.0.2.1`, `192.0.2.2`, or `192.0.2.3`, using the example above).

Beyond reducing requests to your origin server, this setup allows your application to take advantage of Cloudflare's [Zero downtime failover](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/#zero-downtime-failover). When a request to one IP address fails, Cloudflare automatically retries the request to other IP addresses associated with the same hostname. This behavior prevents end users from experiencing downtime.

### Unproxied and proxied records

If you have a mix of proxied and unproxied records associated with the same hostname, requests happen as if you had [all proxied records](#all-records-proxied-recommended).

This approach is not typically recommended because it can lead to unexpected behavior. For example, if you had two unproxied records and one proxied record, Cloudflare would treat all records as proxied. However, if you deleted the single proxied record, your remaining two unproxied records would immediately be treated as unproxied.

We recommend either using all proxied or all unproxied records to avoid surprises when you make changes to your DNS records.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/#page","headline":"Round-robin DNS · Cloudflare DNS docs","description":"Distribute traffic across multiple origins with round-robin DNS.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/round-robin-dns/","name":"Round-robin DNS"}}]}
```
