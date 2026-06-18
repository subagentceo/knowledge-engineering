---
title: Protect origin IP address
description: Learn about protect origin ip address in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect origin IP address

Though Cloudflare automatically hides your origin server IP address when you [proxy your DNS records](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/proxy-dns-records/), there are other ways to discover an IP address.

To prevent attackers from discovering your origin's IP address, review the following suggestions.

## Rotate IP addresses

DNS records are in the public domain, meaning that - even though your IP addresses are hidden once you proxy your DNS records - someone could uncover historical records of your addresses.

For additional security, you could rotate the IP addresses of your origin server, which would also require [updating your DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) within Cloudflare.

## Review unproxied DNS records

Unproxied DNS records - also known as **DNS-only** records - can sometimes contain origin IP information, especially those used for FTP or SSH.

Review these records to make sure they do not contain origin IP information or use [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/) to proxy these records.

## Conceal unproxied DNS records

If you need to have **DNS-only** records that contain origin IP information, use non-standard names for these records. This action makes dictionary scans of your DNS less likely to expose your origin IP address.

For example, instead of `ftp.example.com`, you could use `827450184590183489.example.com` or `cloudflare-docs-are-great.example.com`.

## Evaluate mail infrastructure

If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP address.

Cloudflare recommends using non-contiguous IPs from different IP ranges.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/protect-origin-ip/#page","headline":"Protect origin IP address · Cloudflare Learning Paths","description":"Learn about protect origin ip address in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/protect-origin-ip/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/protect-origin-ip/","name":"Protect origin IP address"}}]}
```
