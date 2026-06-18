---
title: Centrify
description: Centrify in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Centrify

Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the number one cause of breaches: privileged access abuse.

## Set up Centrify as an OIDC provider

### 1\. Create an application in Centrify

1. Log in to the Centrify administrator panel.
2. Select **Apps**.
3. Select **Add Web Apps**.
4. Select the **Custom** tab, then select **Add OpenID Connect**.
5. On the **Add Web App** screen, select **Yes** to create an OpenID Connect application.
6. Enter an **Application ID**.  
![Centrify Settings with Application ID added](https://developers.cloudflare.com/_astro/centrify-4.C0i78_vc_ZkDtB8.webp)
7. Select **Save**.
8. Select **Trust** in the **Settings** menu.
9. Enter a strong application secret on the **Trust** section.
10. Under **Service Provider Configuration** enter your application's authentication domain as the resource application URL.
11. Under **Authorized Redirect URIs**, select **Add**.
12. Under **Authorized Redirect URIs**, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
![Centrify Trust Identity Provider Configuration with team domain and callback](https://developers.cloudflare.com/_astro/centrify-6.ChCQ_t69_ZFR8qj.webp)
13. Select **Save**.
14. Copy the following values:
* **Client ID**
* **Client Secret**
* **OpenID Connect Issuer URL**
* **Application ID** from the **Settings** tab
1. Go to the **User Access** tab.
2. Select the roles to grant access to your application.

### 2\. Add Centrify to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Paste in the **Client ID**, **Client Secret**, **Centrify account URL** and **Application ID**.
4. (Optional) To enable SCIM, refer to [Synchronize users and groups](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#synchronize-users-and-groups).
5. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to your users' identity.
6. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to the identity provider you want to test.

## Example API Config

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>",

    "centrify_account": "https://abc123.my.centrify.com/",

    "centrify_app_id": "exampleapp"

  },

  "type": "centrify",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/centrify/#page","headline":"Centrify · Cloudflare One docs","description":"Centrify in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/centrify/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["OIDC","SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/centrify/","name":"Centrify"}}]}
```
