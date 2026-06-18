---
title: Amazon Cognito
description: Amazon Cognito in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Amazon Cognito

Amazon Cognito provides SSO identity management for end users of web and mobile apps. You can integrate Amazon Cognito as an OIDC identity provider for Cloudflare One.

## Prerequisites

* An Amazon Cognito [user pool ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html)

## Set up Amazon Cognito (OIDC)

### 1\. Obtain Amazon Cognito settings

The following Amazon Cognito values are required to set up the integration:

* App (client) ID
* Client secret
* Auth URL
* Token URL
* Certificate (key) URL

To retrieve those values:

1. Log in to your Amazon Cognito admin portal.
2. Go to **User pools** and select your user pool.
3. Select the **App integration** tab.
4. Under **Domain**, copy your user pool domain or [configure a new domain ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-assign-domain.html).
5. Make note of the following [Amazon Cognito OIDC endpoints ↗](https://docs.aws.amazon.com/cognito/latest/developerguide/federation-endpoints.html):  
   * **Auth URL**: `https://<your user pool domain>/oauth2/authorize`  
   * **Token URL**: `https://<your user pool domain>/oauth2/token`  
   * **Certificate (key) URL**: `https://cognito-idp.<region>.amazonaws.com/<your user pool ID>/.well-known/jwks.json` (This is the **Token signing key URL** shown in **User pool overview**.)
6. Under **App client list**, select **Create app client**.
7. For **App type**, select **Confidential client**.
8. Enter an **App client name** for your application.
9. Ensure that **Generate a client secret** is selected.
10. Configure the following **Hosted UI settings**:  
   1. In **Allowed callback URLs**, add the following URL:  
   ```  
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
   ```  
   You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
   2. Select **Identity providers** to use with this app client. At minimum, enable **Cognito user pool** as a provider.  
   3. For **OAuth 2.0 grant types**, select **Authorization code grant**.  
   4. For **OpenID Connect scopes**, select **OpenID**, **Email**, and **Profile**.
11. Select **Create app client**.
12. Next, select the app client you just created.
13. Copy its **Client ID** and **Client secret**.

### 2\. Add Amazon Cognito as an identity provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **OpenID Connect**.
4. Name your identity provider and fill in the required fields with the information obtained from Amazon Cognito.
5. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
6. (Optional) Under **Optional configurations**, enter [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that you wish to add to users' identity.
7. Select **Save**.

To [test](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) that your connection is working, select **Test**.

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>",

    "auth_url": "https://<your user pool domain>/oauth2/authorize",

    "token_url": "https://<your user pool domain>/oauth2/token",

    "certs_url": "https://cognito-idp.<region>.amazonaws.com/<your user pool ID>/.well-known/jwks.json",

    "scopes": ["openid", "email", "profile"],

    "claims": ["sub", "cognito:username", "name", "cognito:groups"]

  },

  "type": "oidc",

  "name": "Amazon Cognito example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/awscognito-oidc/#page","headline":"Amazon Cognito · Cloudflare One docs","description":"Amazon Cognito in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/awscognito-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/awscognito-oidc/","name":"Amazon Cognito"}}]}
```
