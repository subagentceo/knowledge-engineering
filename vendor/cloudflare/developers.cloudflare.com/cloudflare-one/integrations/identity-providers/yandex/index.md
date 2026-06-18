---
title: Yandex
description: Yandex in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Yandex

Yandex is a web search engine that also offers identity provider (IdP) services.

## Set up Yandex

To set up Yandex for Cloudflare Access:

1. Log in to your Yandex account.
2. Select **Open a new OAuth Application**.
3. Select **New client**.
4. Complete the required fields.
5. Choose **Yandex.Passport API** to set the basic scopes.
6. Select the **Access to email address**, **Access to user avatar,** and **Access to username, first name and surname, gender** options.
7. Select **Platform** and select **Web Services.**
8. In the **Callback URL #1** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
![Yandex Platform interface with Web services checked and callback URI in open form field](https://developers.cloudflare.com/_astro/yandex-3.DteBNxdB_1qShkV.webp)
9. Select **Add**.
10. Scroll to the **Platforms** card, and select **Submit**.  
**Yandex OAuth** card titled **Cloudflare Access App** displays.
11. Copy the **ID** and **Password**.
12. In Cloudflare One, go to **Integrations** \> **Identity providers**.
13. Under **Your identity providers**, select **Add new identity provider**.
14. Select Yandex.
15. Paste the ID and password in the appropriate fields.
16. Select **Save**.

## Example API Config

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "yandex",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/yandex/#page","headline":"Yandex · Cloudflare One docs","description":"Yandex in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/yandex/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/yandex/","name":"Yandex"}}]}
```
