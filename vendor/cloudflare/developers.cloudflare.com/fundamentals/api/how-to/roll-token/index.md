---
title: Roll tokens
description: Regenerate Cloudflare API token secrets to rotate credentials and maintain account security.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Roll tokens

If your token is lost or compromised, you can either create a new token or roll your token to generate a new secret. Rolling your API token into a new one will invalidate the previous token, but the access and permissions will be the same as the previous API token. The new token uses the [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

To roll your API token:

1. Go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Next to the API token you want to roll, select the **three dot icon** \> **Roll**.
3. Select **Confirm** to generate a new API token.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/how-to/roll-token/#page","headline":"Roll tokens · Cloudflare Fundamentals docs","description":"Regenerate Cloudflare API token secrets to rotate credentials and maintain account security.","url":"https://developers.cloudflare.com/fundamentals/api/how-to/roll-token/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/how-to/roll-token/","name":"Roll tokens"}}]}
```
