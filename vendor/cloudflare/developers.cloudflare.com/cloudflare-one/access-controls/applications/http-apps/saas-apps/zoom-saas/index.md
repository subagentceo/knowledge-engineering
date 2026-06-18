---
title: Zoom
description: Integrate Zoom with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zoom

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Zoom ↗](https://support.zoom.com/hc/en/article?id=zm%5Fkb&sysparm%5Farticle=KB0060673) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Zoom Business, Education, or Enterprise account
* An [associated domain ↗](https://support.zoom.com/hc/en/article?id=zm%5Fkb&sysparm%5Farticle=KB0066259) configured in your Zoom account
* A [vanity URL ↗](https://support.zoom.com/hc/en/article?id=zm%5Fkb&sysparm%5Farticle=KB0061540) configured in your Zoom account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Zoom_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: ` https://<your-vanity-url>.zoom.us`  
   * **Assertion Consumer Service URL**: `https://<your-vanity-url>.zoom.us/saml/SSO`  
   * **Name ID format**: _Email_
7. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider in Zoom

1. In Zoom, go to **Advanced** \> **Single Sign-On**.
2. For **Vanity URL**, select the vanity URL you want to configure SSO for.
3. Fill out the following fields:  
   * **Sign in page URL**: SSO endpoint from application configuration in Cloudflare One  
   * **Identity Provider Certificate**: Public key from application configuration in Cloudflare One  
   * **Service Provider (SP) Entity ID**: `yourvanityurl.zoom.us` (no `https://`)  
   * **Issuer (DP Entity ID)**: Access Entity ID or Issuer from application configuration in Cloudflare One
4. For **Binding**, select _http-redirect_.
5. For **Signature Hash Algorithm**, ensure **SHA-256** is selected.
6. Under **Security**, turn off **Sign SAML request** and **Sign SAML logout request**.
7. Select **Save Changes**.
8. Go to **Advanced** \> **Security**.
9. Under **Sign-in Methods**, ensure **Allow users to sign in with Single Sign-On (SSO)** is turned on.

## 3\. Test the integration

Open an incognito browser window, go to your Zoom vanity URL, and select **Sign in**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

Once this is successful, you can require SSO for users in your associated domain(s) by completing the following steps:

1. In Zoom, go to **Advanced** \> **Security**.
2. Under **Sign-in Methods**, turn on **Require users to sign in with SSO if their e-mail address belongs to one of the domains below**.
3. Under **Select Domains**, turn on the domains that you want to require SSO for.
4. (Optional) Under **Specify users who can bypass SSO sign-in**, add your desired users.
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/zoom-saas/#page","headline":"Zoom · Cloudflare One docs","description":"Integrate Zoom with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/zoom-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/zoom-saas/","name":"Zoom"}}]}
```
