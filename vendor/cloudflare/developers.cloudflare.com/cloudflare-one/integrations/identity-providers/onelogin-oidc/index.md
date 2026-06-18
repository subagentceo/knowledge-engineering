---
title: OneLogin
description: OneLogin in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OneLogin

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an OIDC identity provider.

## Set up OneLogin as an OIDC provider

### 1\. Create an application in OneLogin

1. Log in to your OneLogin admin portal.
2. Go to **Applications** \> **Applications** and select **Add App**.
3. Search for `OIDC` and select **OpenId Connect (OIDC)** by OneLogin, Inc.
4. In **Display Name**, enter any name for your application. Select **Save**.
5. Next, go to **Configuration**. In the **Redirect URI** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
6. Select **Save**.
7. Go to **Access** and choose the **Roles** that can access this application. Select **Save**.
8. Go to **SSO** and select **Show client secret**.
9. Copy the **Client ID** and **Client Secret**.

### 2\. Add OneLogin to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **OneLogin**.
4. Fill in the following information:  
   * **Name**: Name your identity provider.  
   * **App ID**: Enter your OneLogin client ID.  
   * **Client secret**: Enter your OneLogin client secret.  
   * **OneLogin account URL**: Enter your OneLogin domain, for example `https://<your-domain>.onelogin.com`.
5. (Optional) To enable SCIM, refer to [Synchronize users and groups](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#synchronize-users-and-groups).
6. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to your user's identity.
7. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to OneLogin.

## Example API Config

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>",

    "onelogin_account": "https://mycompany.onelogin.com"

  },

  "type": "onelogin",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/onelogin-oidc/#page","headline":"OneLogin · Cloudflare One docs","description":"OneLogin in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/onelogin-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["OIDC","SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/onelogin-oidc/","name":"OneLogin"}}]}
```
