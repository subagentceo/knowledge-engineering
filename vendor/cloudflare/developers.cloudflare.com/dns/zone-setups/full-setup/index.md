---
title: Primary setup (Full)
description: Use Cloudflare as your primary DNS provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Primary setup (Full)

Cloudflare DNS offers a few different [setup options](https://developers.cloudflare.com/dns/zone-setups/). A primary setup (also known as full) is the most common and the only one available for Free or Pro plans.

In a primary setup, Cloudflare is your primary authoritative DNS provider, which means that, when a visitor tries to access your website or application, DNS resolvers will consider the [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/) that you have on Cloudflare.

For this to work, you must go through a few steps that involve not only Cloudflare, but also your registrar and your previous DNS provider (if you were using one). Refer to [Set up a primary zone](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) for detailed instructions.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/full-setup/#page","headline":"Primary setup (Full) · Cloudflare DNS docs","description":"Use Cloudflare as your primary DNS provider.","url":"https://developers.cloudflare.com/dns/zone-setups/full-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/full-setup/","name":"Primary setup (Full)"}}]}
```
