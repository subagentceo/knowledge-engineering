---
title: Facebook
description: Facebook in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Facebook

Use these steps to set up Facebook as your identity provider.

1. Go to [developers.facebook.com ↗](https://developers.facebook.com/). Create a Developer account if you do not have one.
2. Select **Create App** at the top-right. The **Create an app** card displays.
3. Enter the **App name** and **App contact email**. Then, select **Next**.
4. In the **Add use cases** page, select **Authenticate and request data from users with Facebook Login**. Select **Next**.
5. Fill in the necessary information and select **Next** until you reach **Overview**. Then, select **Create app**.
6. In the **My Apps** page, go to **App settings** \> **Basic**.
7. Copy the **App ID** and **App Secret**.
8. In the [Cloudflare dashboard ↗](https://developers.cloudflare.com/dash.cloudflare.com), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
9. Under **Your identity providers**, select **Add an identity provider**.
10. Fill in the **App ID** and **App Secret** obtained from Facebook.
11. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
12. Select **Save**.
13. Go back to **My Apps** in [developers.facebook.com ↗](https://developers.facebook.com/), and select your app.
14. Under **App customization and requirements**, select **Customize the Authenticate and request data from users with Facebook Login use case**.
15. Select **Settings**, and ensure that **Use Strict Mode for redirect URIs** slider is set to **Yes**.
16. In the **Valid OAuth Redirect URIs** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
17. Select **Save Changes**.

To test that your connection is working, follow the steps on [SSO Integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one).

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "facebook",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/facebook-login/#page","headline":"Facebook · Cloudflare One docs","description":"Facebook in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/facebook-login/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/facebook-login/","name":"Facebook"}}]}
```
