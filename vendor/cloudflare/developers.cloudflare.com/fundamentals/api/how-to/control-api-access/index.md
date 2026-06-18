---
title: Control API Access
description: Restrict Cloudflare API access at the account or member level using Enterprise account controls.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Control API Access

Super administrators of an Enterprise account are capable of selectively scoping the API access. API access can be restricted for the entire account or only for specified account members.

Note that the feature does not disable API calls not related to the Enterprise account.

## Account-level access control

To restrict the API access for the entire account:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Locate the **Enable API Access** section and then update the setting.

## Member-level access control

Note

Member-level settings will override the account-level setting. If a specific member has API access enabled whereas the account has the access disabled, that member can still call APIs related to the Enterprise account.

To restrict the API access for a specific member:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Click on the member to expand and choose the intended **API Access**. If `Account Default`, then it follows the account level setting.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/#page","headline":"Control API Access · Cloudflare Fundamentals docs","description":"Restrict Cloudflare API access at the account or member level using Enterprise account controls.","url":"https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/how-to/control-api-access/","name":"Control API Access"}}]}
```
