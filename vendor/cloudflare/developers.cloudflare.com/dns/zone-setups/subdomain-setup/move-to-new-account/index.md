---
title: Migrate to new account
description: Move a subdomain zone to a different Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate to new account

When using a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), you can have your subdomain as a separate zone within the same account as the parent domain or within a different account.

If you have already [created a standalone subdomain zone](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/) within the same account, you can still move it to a separate account.

1. [Add the subdomain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to a new Cloudflare account.
2. In the original subdomain zone, [export](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#export-records) the DNS records.
3. Review the exported records, delete any unnecessary ones, and [import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#import-records) them into the new subdomain zone.
4. Update the `NS` records in the parent zone to refer to the newly assigned nameservers of the child zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/#page","headline":"Migrate subdomain to a new account · Cloudflare DNS docs","description":"Move a subdomain zone to a different Cloudflare account.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/subdomain-setup/","name":"Subdomain setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/subdomain-setup/move-to-new-account/","name":"Migrate to new account"}}]}
```
