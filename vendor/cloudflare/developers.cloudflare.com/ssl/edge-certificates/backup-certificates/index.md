---
title: Backup certificates
description: How Cloudflare issues backup certificates for redundancy.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Backup certificates

If Cloudflare is providing [authoritative DNS](https://developers.cloudflare.com/dns/zone-setups/full-setup/) for your domain, Cloudflare will issue a backup [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) for every standard Universal certificate issued.

Backup certificates are wrapped with a different private key and issued from a different Certificate Authority — either Google Trust Services, Let's Encrypt, Sectigo, or SSL.com — than your domain's primary Universal SSL certificate.

These backup certificates are not normally deployed, but they will be deployed automatically by Cloudflare in the event of a certificate revocation or key compromise.

For additional details, refer to the [introductory blog post ↗](https://blog.cloudflare.com/introducing-backup-certificates/).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |
| Can opt out? | No  | No       | No         | Yes |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/#page","headline":"Backup certificates · Cloudflare SSL/TLS docs","description":"How Cloudflare issues backup certificates for redundancy.","url":"https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/backup-certificates/","name":"Backup certificates"}}]}
```
