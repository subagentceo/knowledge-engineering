---
title: Asana
description: Asana in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Asana

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Asana ↗](https://help.asana.com/hc/en-us/articles/14075208738587-Authentication-and-access-management-options-for-paid-plans#gl-saml) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Super admin access to an Asana Enterprise, Enterprise+, or Legacy Enterprise account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Asana_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://app.asana.com/`  
   * **Assertion Consumer Service URL**: `https://app.asana.com/-/saml/consume`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider to Asana

1. In Asana, select your profile picture > **Admin console** \> **Security** \> **SAML authentication**.
2. Under **SAML options**, select _Optional_.
3. Fill in the following fields:  
   * Sign-in page URL: SSO endpoint from application configuration in Cloudflare One.  
   * X.509 certificate: Public key from application configuration in Cloudflare One. Wrap the public key in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
4. Select **Save changes**.

## 3\. Test the integration and require SSO

1. Open an incognito browser window and go to your Asana URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
2. After this is successful, you may want to require users to log in via SSO. In Asana, select your profile picture > **Admin console** \> **Security** \> **SAML authentication**. Under **SAML options**, select **Required for all members, except guest accounts**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/asana-saas/#page","headline":"Asana · Cloudflare One docs","description":"Asana in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/asana-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/asana-saas/","name":"Asana"}}]}
```
