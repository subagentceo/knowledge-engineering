---
title: LinkedIn
description: LinkedIn in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# LinkedIn

Cloudflare Access allows your users to use LinkedIn as their identity provider (IdP).

## Prerequisites

Sign in to your LinkedIn account before continuing. Configuring LinkedIn as a Cloudflare Access IdP requires a LinkedIn account.

## Set up LinkedIn as an IdP

To configure LinkedIn as an IdP:

1. Go to the [LinkedIn Developer Portal ↗](https://www.linkedin.com/developers).
2. Select **Create App**.
3. On the **Create an app** page, enter an **App name** for your application.
4. Select a **LinkedIn Page** for your application or select **Create a new LinkedIn page** if you do not have a LinkedIn page.
5. Select **Upload a logo** and upload your company logo image file.
6. Select **API Terms of Use** to read the terms of use, and agree to the terms.
7. Select **Create app**.
8. In the **Products** tab of your LinkedIn application, select **Request Access** next to the **Sign In with LinkedIn using OpenID Connect** option.
9. In the **Auth** tab of your LinkedIn application, find the **Client ID** and **Client Secret**.  
![LinkedIn account settings where you will copy the Client ID and Client Secret](https://developers.cloudflare.com/_astro/lin5.ovn9KSN7_Z1EBFwv.webp)
10. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
11. Under **Your identity providers**, select **Add new identity provider**.
12. Select **LinkedIn** as your IdP.
13. In the **App ID** field, copy and paste the **Client ID** from step 9\. In the **Client secret** field, copy and paste the **Client secret** from step 9.
14. Select **Save**.
15. In the **Auth** tab of your LinkedIn application, go to **OAuth 2.0 settings** and select the pencil icon next to **Authorized redirect URLs for your app**.
16. Enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.

To test that your connection is working, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) \> **Zero Trust** \> **Integrations** \> **Identity providers** and select **Test** next to your LinkedIn login method.

## Example API configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "linkedin",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/linkedin/#page","headline":"LinkedIn · Cloudflare One docs","description":"LinkedIn in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/linkedin/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["OIDC","SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/linkedin/","name":"LinkedIn"}}]}
```
