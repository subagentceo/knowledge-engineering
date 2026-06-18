---
title: Internal zones
description: Explore internal DNS zones in Cloudflare. These zones organize DNS records for resources accessible only within your private network, queried via Cloudflare Gateway.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Internal zones

Internal DNS zones are groupings of internal DNS records. While [public DNS records](https://developers.cloudflare.com/dns/manage-dns-records/) contain information about resources that you want to make available to the public Internet, [internal DNS records](https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/) allow you to manage resources that should only be available within your private network.

Refer to [Manage internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/) for a full list of configuration conditions and step-by-step instructions.

Internal DNS zones do not get assigned Cloudflare nameservers and can only be queried via [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) when linked to a [DNS view](https://developers.cloudflare.com/dns/internal-dns/dns-views/). The Gateway configuration must exist within the same Cloudflare account where the internal zone exists.

## Resources

* [ Manage internal zones ](https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/)
* [ Manage internal DNS records ](https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/)
* [ Reference zones ](https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/#page","headline":"Internal zones · Cloudflare DNS docs","description":"Explore internal DNS zones in Cloudflare. These zones organize DNS records for resources accessible only within your private network, queried via Cloudflare Gateway.","url":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/internal-zones/","name":"Internal zones"}}]}
```
