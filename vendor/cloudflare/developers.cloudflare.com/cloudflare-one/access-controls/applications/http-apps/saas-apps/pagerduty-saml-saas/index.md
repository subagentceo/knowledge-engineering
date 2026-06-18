---
title: PagerDuty
description: Integrate PagerDuty with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PagerDuty

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [PagerDuty ↗](https://support.pagerduty.com/docs/sso) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a PagerDuty site

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _PagerDuty_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://<your-subdomain>.pagerduty.com`  
   * **Assertion Consumer Service URL**: ` https://<your-subdomain>.pagerduty.com/sso/saml/consume`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Amend the public key so each row is a maximum of 64 characters long. Originally, each full row of the public key is 65 characters long.
3. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3\. Add a SAML SSO provider to PagerDuty

1. In PagerDuty, select your profile picture and go to **Account Settings** \> **Single Sign-on**.
2. Turn on **SAML**.
3. In **X.509 Certificate**, paste the entire x.509 certificate from step [2\. Create a x.509 certificate](#2-create-a-x509-certificate).
4. In **Login URL**, paste the SSO endpoint from application configuration in Cloudflare One.
5. Select **Save Changes**.

## 4\. Test the integration and finalize SSO configuration

1. Open an incognito window and paste your PagerDuty URL into the address bar. Select **Sign In With Single Sign-On**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
2. In an incognito window, paste your PagerDuty URL and select **Sign In With Single Sign-On**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
3. Once SSO sign in is successful, select your profile picture and go to **Account Settings** \> **Single Sign-on**.
4. Turn off **Allow username/password login** and select **Save Changes**. Now, users will only be able to sign in with SSO.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pagerduty-saml-saas/#page","headline":"PagerDuty · Cloudflare One docs","description":"Integrate PagerDuty with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/pagerduty-saml-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/pagerduty-saml-saas/","name":"PagerDuty"}}]}
```
