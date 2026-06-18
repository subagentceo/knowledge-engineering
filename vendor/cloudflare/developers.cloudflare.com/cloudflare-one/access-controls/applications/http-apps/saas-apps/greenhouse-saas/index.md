---
title: Greenhouse Recruiting
description: Integrate Greenhouse Recruiting with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Greenhouse Recruiting

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Greenhouse Recruiting ↗](https://support.greenhouse.io/hc/en-us/articles/360040753811-Configure-single-sign-on-SSO-for-Greenhouse-Recruiting) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to an Advanced or Expert Greenhouse Recruiting site

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `Greenhouse` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Copy the **SAML Metadata endpoint**.
7. Keep this window open. You will finish this configuration in step [4\. Finish adding a SaaS application to Cloudflare One](#4-finish-adding-a-saas-application-to-cloudflare-one).

## 2\. Download the metadata file

1. Paste the SAML Metadata endpoint from application configuration in Cloudflare One in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3\. Add a SAML SSO provider to Greenhouse

1. In Greenhouse Recruiting, go to the **Configure** icon > **Dev Center** \> **Single sign-on**.
2. Copy the **SSO Assertion Consumer URL**.
3. Under **Upload XML file**, select **Choose a file**, and upload the `.xml` file created in step [2\. Download the metadata file](#2-download-the-metadata-file).
4. Change the **Entity ID** to `greenhouse.io`.
5. Keep this window open without selecting **Begin testing**. You will finish this configuration in step [5\. Test the integration and finalize configuration](#5-test-the-integration-and-finalize-configuration).

## 4\. Finish adding a SaaS application to Cloudflare One

1. In your open Cloudflare One window, fill in the following fields:  
   * **Entity ID**: `greenhouse.io`  
   * **Assertion Consumer Service URL**: SSO Assertion Consumer URL from SSO configuration in Greenhouse Recruiting.  
   * **Name ID format**: _Email_
2. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
3. Save the application.

## 5\. Test the integration and finalize configuration

1. In your open Greenhouse Recruiting window, select **Begin Testing** \> **Proceed**.
2. Open an incognito browser window and go to your Greenhouse Recruiting URL. Choose the SSO login option. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
3. Once SSO sign in is successful, go to the **Configure** icon > **Dev Center** \> **Single sign-on**.
4. Select **Finalize Configuration**.
5. In the text field, enter `CONFIGURE`.
6. Select **Finalize**. Now, users will only be able to sign in with SSO.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/greenhouse-saas/#page","headline":"Greenhouse Recruiting · Cloudflare One docs","description":"Integrate Greenhouse Recruiting with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/greenhouse-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/greenhouse-saas/","name":"Greenhouse Recruiting"}}]}
```
