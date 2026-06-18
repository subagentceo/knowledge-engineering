---
title: Google Workspace
description: Google Workspace in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Workspace

Note

The Google Workspace IdP integration [is not supported](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/#google-workspace-redirect-loop) if your Google Workspace account is protected by Access.

You can integrate a Google Workspace (formerly G Suite) account with Cloudflare Access. Unlike the instructions for [generic Google authentication](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/), the steps below will allow you to pull group membership information from your Google Workspace account.

Once integrated, users will log in with their Google Workspace credentials to reach resources protected by Cloudflare Access or to enroll their device into Cloudflare Gateway.

You do not need to be a Google Cloud Platform user to integrate Google Workspace as an identity provider with Cloudflare One. You will only need to open the Google Cloud Platform to configure IdP integration settings.

## Set up Google Workspace as an identity provider

### 1\. Configure Google Workspace

1. Log in to the Google Cloud Platform [console ↗](https://console.cloud.google.com/). This is separate from your Google Workspace console.
2. A Google Cloud project is required to enable Google Workspace APIs. If you do not already have a Google Cloud project, go to **IAM & Admin** \> **Create Project**. Name the project and select **Create**.
3. Go to **APIs & Services** and select **Enable APIs and Services**. The API Library will load.
4. In the API Library, search for `admin` and select **Admin SDK API**.
5. **Enable** the Admin SDK API.
6. Return to the **APIs & Services** page and go to **Credentials**.
7. Select **Configure Consent Screen**.  
![Location to configure a Consent Screen in the Google Cloud Platform console.](https://developers.cloudflare.com/_astro/configure-consent-screen.ChcdZJTT_19gGur.webp)
8. To configure the consent screen:  
   1. Select **Get Started**.  
   2. Enter an **App name** and a **User support email**.  
   3. Choose **Internal** as the Audience Type. This Audience Type limits authorization requests to users in your Google Workspace and blocks users who have regular Gmail addresses.  
   4. Enter your **Contact Information**. Google Cloud Platform requires an email in your account.  
   5. Agree to Google's user data policy and select **Continue**.  
   6. Select **Create**.
9. The OAuth overview page will load. Select **Create OAuth Client**.  
![Location to create an OAuth client in the Google Cloud Platform console.](https://developers.cloudflare.com/_astro/create-oauth-client.BkzE5MZU_Z1EL96B.webp)
10. Choose _Web application_ as the **Application type** and give your OAuth Client ID a name.
11. Under **Authorized JavaScript origins**, in the **URIs** field, enter your team domain:  
```  
https://<your-team-name>.cloudflareaccess.com  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
12. Under **Authorized redirect URIs**, in the **URIs** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```
13. After creating the OAuth client, select the OAuth client that you just created. Google will present the **OAuth Client ID** value and **Client secret** value. The client secret field functions like a password and should not be shared. Copy both the **OAuth Client ID** value and **Client secret** value.
14. On your [Google Admin console ↗](https://admin.google.com), go to **Security** \> **Access and data control** \> **API controls**.
15. In **API Controls**, select **Settings**.
16. Select **Internal apps** and check the box next to **Trust internal apps** to enable this option. The **Trust internal apps** setting is disabled by default and must be enabled for Cloudflare Access to work correctly.  
![Location to trust internal apps in the Google Cloud Platform console.](https://developers.cloudflare.com/_astro/trust-internal-apps.BFE-UHaC_Z1HT8xz.webp)

### 2\. Add Google Workspace to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Select **Add new identity provider** and select **Google Workspace**.
3. Input the Client ID (**App ID** in the Cloudflare dashboard) and Client Secret fields generated previously. Additionally, enter the domain of your Google Workspace account.
4. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
5. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to your user's identity.
6. Select **Save**. To complete setup, you must visit the generated link. If you are not the Google Workspace administrator, share the link with the administrator.
7. The generated link will prompt you to log in to your Google admin account and to authorize Cloudflare Access to view group information. After allowing permissions, you will see a success page from Cloudflare Access.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to Google Workspace. Your user identity and group membership should return.

SCIM Provisioning (Beta)

The SCIM provisioning integration with Google Workspace is not currently supported.

`Failed to fetch group information from the identity provider` error

To test successfully, you must [finish setup ↗](https://community.cloudflare.com/t/google-workspace-failed-to-fetch-group-information-from-the-identity-provider/313361/2). Testing before finishing setup will result in a [Failed to fetch user/group information from the identity provider error](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/#identity-provider-usergroup-info-error).

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>",

    "apps_domain": "mycompany.com"

  },

  "type": "google-apps",

  "name": "my example idp"

}


```

## Troubleshooting

### `Error 401: deleted_client`

If you deleted the OAuth client (or the OAuth client expired) in Google, you will receive a `Error 401: deleted_client` authorization error.

To fix this issue, complete steps 6 through 12 in the [Google](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/#set-up-google-as-an-identity-provider) guide and steps 9 through 15 in the [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/#set-up-google-as-an-identity-provider) guide.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace/#page","headline":"Google Workspace · Cloudflare One docs","description":"Google Workspace in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/google-workspace/","name":"Google Workspace"}}]}
```
