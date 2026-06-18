---
title: Area 1
description: Integrate Area 1 with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Area 1

**Last reviewed:**  almost 2 years ago 

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

[Cloudflare Area 1 ↗](https://www.cloudflare.com/products/zero-trust/email-security/) is an email security platform that protects your organization's inbox from phishing, spam, and other malicious messages. This guide covers how to configure Area 1 as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to your Area 1 account
* Your user's email in Area 1 matches their email in Cloudflare One

## 1\. Add Area 1 to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **SaaS application**.
4. In the **Application** field, enter `Area 1` and select **Area 1**. (Area 1 is not currently listed in the default drop-down menu.)
5. Enter the following values for your application configuration:  
| **Entity ID**                      | https://horizon.area1security.com                |  
| ---------------------------------- | ------------------------------------------------ |  
| **Assertion Consumer Service URL** | https://horizon.area1security.com/api/users/saml |  
| **Name ID Format**                 | _Email_                                          |
6. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
7. Save the application.

## 2\. Configure SSO for Area 1

Finally, you will need to configure Area 1 to allow users to log in through Cloudflare Access.

1. In your [Area 1 portal ↗](https://horizon.area1security.com/), go to **Settings** \> **SSO**.
2. Turn on **Single Sign On**.
3. (Optional) To require users to sign in through Access, set **SSO Enforcement** to _All_. When SSO is enforced, users will no longer be able to sign in with their Area 1 credentials.
4. In **SAML SSO Domain**, enter `<your-team-name>.cloudflareaccess.com`.
5. Get your Metadata XML file:  
   1. In Cloudflare One, copy the **SSO Endpoint** for your application.  
   ![Copy SSO settings for a SaaS application from Cloudflare One](https://developers.cloudflare.com/_astro/saas-sso-endpoint.ubdoNRaM_1plwk8.webp)  
   2. In a new browser tab, paste the **SSO Endpoint** and append `/saml-metadata` to the end of the URL. For example, `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/<app-id>/saml-metadata`.  
   3. Copy the resulting metadata.
6. Return to the Area 1 portal and paste the metadata into **Metadata XML**.  
![Configure SSO in the Area 1 portal](https://developers.cloudflare.com/_astro/area1-sso-config.DWq80iDZ_Z1BhExl.webp)
7. Select **Update Settings**.

If you added the application to your App Launcher, you can test the integration by going to `<your-team-name>.cloudflareaccess.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/area-1/#page","headline":"Area 1 · Cloudflare One docs","description":"Integrate Area 1 with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/area-1/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/area-1/","name":"Area 1"}}]}
```
