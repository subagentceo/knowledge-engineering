---
title: Limitations
description: Review the current limitations of Cloudflare Organizations during the public beta.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limitations

The following limitations apply during the public beta.

| Limitation              | Description                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organization creation   | You must be a Super Administrator of an Enterprise account to create an Organization.                                                                                                                   |
| Adding accounts         | Once you've created an Organization, accounts of any plan type can be added. You must have Super Administrator access to the account, and it cannot already belong to another Organization.             |
| Account and zone limits | Each organization supports up to 500 accounts and 5,000 zones.                                                                                                                                          |
| Roles                   | Organization Super Administrator is the only role available during the beta. Additional roles will be available in a future release.                                                                    |
| Organization deletion   | To delete an Organization, use the [API](https://developers.cloudflare.com/api/resources/organizations/methods/delete). Dashboard support is not yet available.                                         |
| Account removal         | Self-service account removal is not yet available. To remove an account from your Organization, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/). |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/organizations/limitations/#page","headline":"Limitations · Cloudflare Fundamentals docs","description":"Review the current limitations of Cloudflare Organizations during the public beta.","url":"https://developers.cloudflare.com/fundamentals/organizations/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/organizations/limitations/","name":"Limitations"}}]}
```
