---
title: ServiceNow (SAML)
description: Integrate ServiceNow (SAML) with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ServiceNow (SAML)

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [ServiceNow ↗](https://docs.servicenow.com/bundle/washingtondc-platform-security/page/integrate/single-sign-on/task/t%5FCreateASAML2Upd1SSOConfigMultiSSO.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a ServiceNow account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `ServiceNow` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://<INSTANCE-NAME>.service-now.com`  
   * **Assertion Consumer Service URL**: `https://<INSTANCE-NAME>.service-now.com/navpage.do`  
   * **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Add the Multiple Provider Single Sign-On Installer Plugin to ServiceNow

1. In ServiceNow, select **All**.
2. In the search bar, enter `System Applications`, and under **All Available Applications**, select **All**.
3. In the search bar, enter `Integration - Multiple Provider Single Sign-On Installer`.
4. Select **Install**.
5. Ensure that **Install now** is selected, and select **Install**.

## 3\. Add and Test a SAML SSO provider in ServiceNow

1. Select **All**.
2. In the search bar enter `Multi-Provider SSO`, and select **Identity Providers**.
3. Select **New** \> **SAML**.
4. In the pop-up, ensure that **URL** is selected.
5. Paste the **SAML Metadata endpoint** from application configuration in Cloudflare One in the empty field.
6. Select **Import**.
7. (Optional) Change the **Name** field to a more recognizable name.
8. Turn off **Sign AuthnRequest**.
9. Select **Update**.
10. In the pop-up, select **Cancel** and then **\>**.
11. Select the **Name** of the configuration you just completed.
12. Select **Test Connection**.
13. If the test succeeds, select **Activate**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/#page","headline":"ServiceNow (SAML) · Cloudflare One docs","description":"Integrate ServiceNow (SAML) with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","ServiceNow"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/servicenow-saas-saml/","name":"ServiceNow (SAML)"}}]}
```
