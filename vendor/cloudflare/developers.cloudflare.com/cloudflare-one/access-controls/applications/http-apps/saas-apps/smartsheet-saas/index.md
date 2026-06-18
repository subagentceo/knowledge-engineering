---
title: Smartsheet
description: Integrate Smartsheet with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Smartsheet

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [Smartsheet ↗](https://help.smartsheet.com/articles/2483123-domain-level-saml-configuration) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Smartsheet Enterprise account
* A [domain ↗](https://help.smartsheet.com/articles/2483051-domain-management) verified in Smartsheet

Note

In Smartsheet, SSO is configured for a domain. If you have multiple plans using the same domain, the SSO configuration will apply to all Smartsheet users in that domain, regardless of their plan type.

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `Smartsheet` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `urn:amazon:cognito:sp:us-east-1_xww1cbP43`  
   * **Assertion Consumer Service URL**: `https://saml.authn.smartsheet.com/saml2/idpresponse`  
   * **Name ID format**: _Unique ID_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Create and test a SAML SSO provider in Smartsheet

1. In your Smartsheet Admin Center, go to **Settings** \> **Authentication** \> **Add a SAML IdP**.
2. In **Other IdP (Customize)**, select **Configure**.
3. Select **Next**.
4. Under **XML URL**, paste the SAML Metadata endpoint from application configuration in Cloudflare One.
5. Under **Name SAML IdP**, enter a name (for example, `Cloudflare Access`).
6. Select **Save & Next**.
7. Select **Verify connection** and sign in via Access. If validation is successful, you will see a **SAML IdP Successfully Connected!** message. Close the configuration verification page.
8. Turn on **I have successfully verified the connection**.
9. Select **Save & Next**.
10. Under **Assign domains to SAML IdP**, select your desired domain.
11. Select **Save and Next** and then **Finish**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/smartsheet-saas/#page","headline":"Smartsheet · Cloudflare One docs","description":"Integrate Smartsheet with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/smartsheet-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/smartsheet-saas/","name":"Smartsheet"}}]}
```
