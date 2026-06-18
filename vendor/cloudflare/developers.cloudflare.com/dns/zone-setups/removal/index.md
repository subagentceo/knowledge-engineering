---
title: Zone removal
description: Remove a zone from your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zone removal

If domains on Free zones remain in the [Pending](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#pending) or [Moved](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#moved) status for too long, Cloudflare automatically removes them from your account and the Cloudflare network. Refer to [zone statuses](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) for more details.

You can also [manually remove a domain](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) from Cloudflare.

If you need to re-add a domain to your account, follow the [regular onboarding flow](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). Cloudflare will assign a new nameserver pair when you re-add the domain, so you must [update your registrar](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) with the new nameservers. Refer to [nameserver assignment](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method) for details.

Purged zones

By default, your zone will be automatically purged seven days after the removal. In this case, even if you re-add the domain to the same Cloudflare account, none of the zone settings are expected to be restored. Refer to [zone statuses](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) for more details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/removal/#page","headline":"Zone removal · Cloudflare DNS docs","description":"Remove a zone from your Cloudflare account.","url":"https://developers.cloudflare.com/dns/zone-setups/removal/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/removal/","name":"Zone removal"}}]}
```
