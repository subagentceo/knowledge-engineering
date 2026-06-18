---
title: Pingboard
description: Integrate Pingboard with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pingboard

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Pingboard ↗](https://support.pingboard.com/hc/en-us/articles/360046585994-Set-Up-a-Custom-SSO-Solution) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Pingboard account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `Pingboard` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `http://app.pingboard.com/sp`  
   * **Assertion Consumer Service URL**: `https://sso-demo.pingboard.com/auth/saml/consume`  
   * **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add a SAML SSO provider to Pingboard

1. In Pingboard, go to **Account** \> **Add-Ons**.
2. Under **Third-Party Integrations**, select **Custom SSO**.
3. In a web browser, paste the SAML Metadata endpoint you copied from the application configuration in Cloudflare One. Next, copy the contents of the displayed page.
4. In Pingboard, under **IdP Metadata**, paste the contents from the SAML Metadata endpoint.
5. (Optional) Under **Sign in with**, enter a name (for example, `Cloudflare Access`). Your users will select this name when signing in.

## 3\. Test the integration

Open an incognito browser window and go to your Pingboard URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pingboard-saas/#page","headline":"Pingboard · Cloudflare One docs","description":"Integrate Pingboard with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pingboard-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/pingboard-saas/","name":"Pingboard"}}]}
```
