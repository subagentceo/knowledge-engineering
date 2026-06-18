---
title: Enable automatic cloudflared authentication
description: Enable automatic cloudflared authentication in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable automatic cloudflared authentication

When users connect to an Access application through `cloudflared`, the browser prompts them to allow access by displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](https://developers.cloudflare.com/_astro/access-screen.BXZJ23p9_Mn6VE.webp) 

Automatic `cloudflared` authentication allows users to skip this login page if they already have an active IdP session.

To enable automatic `cloudflared` authentication:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate your application and select **Configure**.
3. Go to **Authentication**.
4. Turn on **Allow automatic Cloudflared authentication**.
5. Select **Save**.

This option will still prompt a browser window in the background, but authentication will now happen automatically.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/#page","headline":"Enable automatic cloudflared authentication · Cloudflare One docs","description":"Enable automatic cloudflared authentication in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/","name":"Client-side cloudflared"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/","name":"Enable automatic cloudflared authentication"}}]}
```
