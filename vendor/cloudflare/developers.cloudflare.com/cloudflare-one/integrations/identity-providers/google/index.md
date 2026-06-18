---
title: Google
description: Google in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google

You can integrate Google authentication with Cloudflare Access without a Google Workspace account. The integration allows any user with a Google account to log in (if the [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) allows them to reach the resource). Unlike the instructions for [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace/), the steps below will not allow you to pull group membership information from a Google Workspace account.

You do not need to be a Google Cloud Platform user to integrate Google as an identity provider with Cloudflare One. You will only need to open the Google Cloud Platform to configure IdP integration settings.

## Set up Google as an identity provider

1. Log in to the Google Cloud Platform [console ↗](https://console.cloud.google.com/). Create a new project, name the project, and select **Create**.
2. On the project home page, go to **APIs & Services** and on the sidebar select **Credentials**.
3. Select **Configure Consent Screen**.  
![Location to configure a Consent Screen in the Google Cloud Platform console.](https://developers.cloudflare.com/_astro/configure-consent-screen.ChcdZJTT_19gGur.webp)
4. To configure the consent screen:  
   1. Select **Get started**.  
   2. Enter an **App name** and a **User support email**.  
   3. Choose **External** as the Audience Type. Since this application is not being created in a Google Workspace account, any user with a Gmail address can log in.  
   4. Enter your **Contact Information**. Google Cloud Platform requires an email in your account.  
   5. Agree to Google's user data policy and select **Continue**.  
   6. Select **Create**.
5. The OAuth overview page will load. On the OAuth overview screen, select **Create OAuth client**.  
![Location to create an OAuth client in the Google Cloud Platform console.](https://developers.cloudflare.com/_astro/create-oauth-client.BkzE5MZU_Z1EL96B.webp)
6. Choose _Web application_ as the **Application type** and give your OAuth Client ID a name.
7. Under **Authorized JavaScript origins**, in the **URIs** field, enter your team domain:  
```  
https://<your-team-name>.cloudflareaccess.com  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
8. Under **Authorized redirect URIs**, in the **URIs** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```
9. After creating the OAuth client, select the OAuth client that you just created. Google will present the **OAuth Client ID** value and **Client secret** value. The client secret field functions like a password and should not be shared. Copy both the **OAuth Client ID** value and **Client secret** value.
10. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
11. Under **Your identity providers**, select **Add new identity provider**. Choose **Google** on the next page.
12. Input the Client ID (**App ID** in the Cloudflare dashboard) and Client Secret fields generated previously.
13. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
14. Select **Save**.

## Test your connection

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to Google.

## Example API Config

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "google",

  "name": "my example idp"

}


```

## Troubleshooting

### `Error 401: deleted_client`

If you deleted the OAuth client (or the OAuth client expired) in Google, you will receive a `Error 401: deleted_client` authorization error.

To fix this issue, complete steps 6 through 12 in the [Google](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/#set-up-google-as-an-identity-provider) guide and steps 9 through 15 in the [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/#set-up-google-as-an-identity-provider) guide.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/#page","headline":"Google · Cloudflare One docs","description":"Google in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/google/","name":"Google"}}]}
```
