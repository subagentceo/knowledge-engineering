---
title: Salesforce (SAML)
description: Learn to configure Salesforce as a SAML app in Cloudflare One. Follow step-by-step instructions for adding SaaS apps and enabling SSO.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Salesforce (SAML)

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Salesforce ↗](https://help.salesforce.com/s/articleView?id=sf.sso%5Fsaml.htm&type=5) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Salesforce account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Salesforce_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://<your-domain>.my.salesforce.com` or `https://<your-domain>.my.salesforce.com?so=<your-salesforce-org-id>`, if your account was created before summer 2019 or does not have a My Domain subdomain.  
   * **Assertion Consumer Service URL**: `https://<your-domain>.my.salesforce.com` or `https://<your-domain>.my.salesforce.com?so=<your-salesforce-org-id>`, if your account was created before summer 2019 or does not have a My Domain subdomain.  
   * **Name ID format**: _Email_

Note

If you are unsure of which URL to use in the **Entity ID** and **Assertion Consumer Service URL** fields, you can check your Salesforce account's metadata. In Salesforce, go to the **Single Sign-On Settings** page and select **Download Metadata**. In this file, you will find the correct URLs to use.

1. Copy the **SSO endpoint**, **Public key**, and **Access Entity ID or Issuer**.
2. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
3. Save the application.

## 2\. Create a certificate file

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
3. Set the file extension as `.crt` and save.

## 3\. Add a SAML SSO provider to Salesforce

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.
3. In **SAML Single Sign-On Settings**, select **New**.
4. Fill in the following fields:  
   * **Name:** Name of the SSO provider (for example, `Cloudflare Access`). Users will select this name when signing in to Salesforce.  
   * **API name:** (this will pre-populate)  
   * **Issuer:** Paste the Access Entity ID or Issuer from application configuration in Cloudflare One.  
   * **Identity Provider Certificate**: Upload the `.crt` certificate file from [2\. Create a certificate file](#2-create-a-certificate-file).  
   * **Entity ID**: `https://<your-domain>.my.salesforce.com`  
   * **SAML Identity type:** If the user's Salesforce username is their email address, select _Assertion contains the User's Salesforce username_. Otherwise, select _Assertion contains the Federation ID from the User object_ and make sure the user's Federation ID matches their email address.  
Configure Federation IDs  
   1. In the **Quick Find** box, enter `users` and select **Users**. 2\. Select the user. 3\. Verify that the user's **Federation ID** matches the email address used to authenticate to Cloudflare Access.  
   * **Identity Provider Login URL**: SSO endpoint provided in Cloudflare One for this application.
5. Select **Save**.

## 4\. Enable Single Sign-On in Salesforce

1. Configure Single Sign-On settings:  
   1. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.  
   2. (Optional) To require users to login with Cloudflare Access, turn on **Disable login with Salesforce credentials**.  
   3. Turn on **SAML Enabled**.  
   4. Turn on **Make federation ID case-insensitive**.
2. Enable Cloudflare Access as an identity provider on your Salesforce domain:  
   1. In the **Quick Find** box, enter `domain` and select **My Domain**.  
   2. In **Authentication Configuration**, select **Edit**.  
   3. In **Authentication Service**, turn on the Cloudflare Access provider.

To test, open an incognito browser window and go to your Salesforce domain (`https://<your-domain>.my.salesforce.com`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-saml/#page","headline":"Salesforce (SAML) · Cloudflare One docs","description":"Learn to configure Salesforce as a SAML app in Cloudflare One. Follow step-by-step instructions for adding SaaS apps and enabling SSO.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","Salesforce"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/salesforce-saas-saml/","name":"Salesforce (SAML)"}}]}
```
