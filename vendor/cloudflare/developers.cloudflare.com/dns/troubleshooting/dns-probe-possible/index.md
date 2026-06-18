---
title: DNS_PROBE_POSSIBLE
description: Learn how to fix the DNS_PROBE_POSSIBLE browser error when using Cloudflare DNS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS\_PROBE\_POSSIBLE

If you or your visitors experience `DNS_PROBE_POSSIBLE` errors after you [activate your domain on Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), review your DNS records in Cloudflare.

Note

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

## Background

`DNS_PROBE_POSSIBLE` means that the resolver could not find [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/) for the requested hostname.

Though visitors sometimes encounter this error — or similarly worded messages from Safari, Edge, or Firefox — because of network or local DNS issues, it might point to an issue with your DNS records in Cloudflare.

## Potential solutions

If you experience `DNS_PROBE_POSSIBLE` errors with a newly activated domain, review your DNS settings in the Cloudflare dashboard.

Check your expected apex domain (`example.com`) and any active subdomains (`www.example.com` or `blog.example.com`). If they do not resolve correctly, you may need to [add a record on the zone apex](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/) or a [subdomain record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/) in Cloudflare DNS.

If you have the correct records set up, make sure those records are also pointing to the correct origin IP address.

After making changes to your DNS records, you may need to wait a few minutes for those changes to take effect.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/troubleshooting/dns-probe-possible/#page","headline":"Fix DNS_PROBE_POSSIBLE error · Cloudflare DNS docs","description":"Learn how to fix the DNS\\_PROBE\\_POSSIBLE browser error when using Cloudflare DNS.","url":"https://developers.cloudflare.com/dns/troubleshooting/dns-probe-possible/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/dns-probe-possible/","name":"DNS_PROBE_POSSIBLE"}}]}
```
