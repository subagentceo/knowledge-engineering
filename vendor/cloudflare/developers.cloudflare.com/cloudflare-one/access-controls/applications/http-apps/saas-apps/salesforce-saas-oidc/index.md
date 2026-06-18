---
title: Salesforce (OIDC)
description: Integrate Salesforce (OIDC) with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Salesforce (OIDC)

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Salesforce ↗](https://help.salesforce.com/s/articleView?id=sf.sso%5Fprovider%5Fopenid%5Fconnect.htm&type=5) as an OpenID Connect (OIDC) application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Salesforce account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Salesforce_.
4. For the authentication protocol, select **OIDC**.
5. Select **Add application**.
6. In **Scopes**, select the attributes that you want Access to send in the ID token.
7. In **Redirect URLs**, enter the callback URL obtained from Salesforce (`https://<your-domain>.my.salesforce.com/services/authcallback/<URL Suffix>`). Refer to [Add a SSO provider to Salesforce](#2-add-a-sso-provider-to-salesforce) for instructions on obtaining this value.
8. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
9. Copy the following values:  
   * **Client ID**  
   * **Client Secret**  
   * **Authorization endpoint**  
   * **Token endpoint**  
   * **User info endpoint**
10. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
11. (Optional) In **Experience settings**, configure [App Launcher settings](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) by turning on **Enable App in App Launcher** and, in **App Launcher URL**, entering `https://<your-domain>.my.salesforce.com`.
12. Save the application.

## 2\. Add a SSO provider to Salesforce

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, enter `auth` and select **Auth providers**.
3. Select **New**.
4. For the provider type, select **OpenID Connect**.
5. Enter a name for the SSO provider (for example, `Cloudflare Access`).
6. Fill in the following fields with values obtained from Cloudflare Access:  
   * **Consumer Key**: Client ID  
   * **Consumer Secret**: Client Secret  
   * **Authorize Endpoint URL**: Authorization endpoint  
   * **Token endpoint URL**: Token endpoint  
   * **User Info Endpoint URL**: User info endpoint  
   * **Token Issuer**: Issuer
7. (Optional) Enable **Use Proof Key for Code Exchange** if you enabled it in Access.
8. In **Default Scopes**, enter a space-separated list of the scopes you configured in Access (for example, `openid email profile groups`).
9. Select **Save**.
10. Copy the **Callback URL**:  
```  
https://<your-domain>.my.salesforce.com/services/authcallback/<URL Suffix>  
```
11. In Cloudflare One, paste the Callback URL into the **Redirect URL** field.

To test the integration, open an incognito browser window and go to the **Test-Only Initialization URL** ( `https://<your-domain>.my.salesforce.com/services/auth/test/<URL Suffix>`)

## 3\. Enable Single Sign-On in Salesforce

1. Enable Cloudflare Access as an identity provider on your Salesforce domain:  
   1. In the **Quick Find** box, enter `domain` and select **My Domain**.  
   2. In **Authentication Configuration**, select **Edit**.  
   3. In **Authentication Service**, turn on the Cloudflare Access provider.
2. (Optional) To require users to login with Cloudflare Access:  
   1. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.  
   2. Turn on **Disable login with Salesforce credentials**.

To test, open an incognito browser window and go to your Salesforce domain (`https://<your-domain>.my.salesforce.com`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-oidc/#page","headline":"Salesforce (OIDC) · Cloudflare One docs","description":"Integrate Salesforce (OIDC) with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-oidc/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Salesforce"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-oidc/","name":"Salesforce (OIDC)"}}]}
```
