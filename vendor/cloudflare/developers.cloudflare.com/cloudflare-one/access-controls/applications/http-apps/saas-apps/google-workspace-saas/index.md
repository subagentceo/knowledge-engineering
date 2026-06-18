---
title: Google Workspace
description: Integrate Google Workspace with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Workspace

**Last reviewed:**  about 2 years ago 

This guide covers how to configure [Google Workspace ↗](https://support.google.com/a/topic/7579248?ref%5Ftopic=7556686&sjid=14539485562330725560-NA) as a SAML application in Cloudflare One.

Note

The integration of Access as a single sign-on provider for your Google Workspace account does not work for Google super admins. It will work for other users.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a Google Workspace account

## 1\. Create an application in Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **SaaS application**.
4. Fill in the following information:  
   * **Application**: _Google_.  
   * **Entity ID**: Use the value provided to you by Google when [configuring your SAML SSO provider ↗](https://saml-doc.okta.com/SAML%5FDocs/How-to-Enable-SAML-2.0-in-Google-Apps.html).  
   * **Assertion Consumer Service URL**: `https://www.google.com/a/<your_domain.com>/acs`, where `<your_domain.com>` is your Google Workspace domain.  
   * **Name ID Format**: _Email_.

Warning

When you put your Google Workspace behind Access, users will not be able to log in using [Google](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/) or [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google-workspace/) as an identity provider. To secure Google Workspace behind Access and avoid an [authentication loop](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/#google-workspace-redirect-loop), you must configure a different identity provider (not Google or Google Workspace) for authentication.

1. [Create an Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for your application. For example, you could allow users with an `@your_domain.com` email address.
2. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**. These values will be used to configure Google Workspace.
3. Save the application.

## 2\. Create a certificate from your public key

1. Copy and then paste your **Public key** into a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`. For example,  
```  
-----BEGIN CERTIFICATE-----  
<PUBLIC_KEY>  
-----END CERTIFICATE-----  
```
3. Set the file extension as `.crt` and save.

## 3\. Create an SSO provider in Google Workspace

1. Log in to your [Google Admin console ↗](https://admin.google.com/).
2. Go to **Security** \> **Authentication** \> **SSO with third party IdP**.
3. Select **Third-party SSO profile for your organization**.
4. Enable **Set up SSO with third-party identity provider**.
5. Fill in the following information:  
   * **Sign-in page URL**: Copy and then paste your **SSO endpoint** from Cloudflare One.  
   * **Sign-out page URL**: `https://<team-name>.cloudflareaccess.com/cdn-cgi/access/logout`, where `<team-name>` is your Cloudflare One team name.  
   * **Verification certificate**: Upload the certificate file containing your public key.
6. (Optional) Enable **Use a domain specific issuer**. If you select this option, Google will send an issuer specific to your Google Workspace domain (`google.com/a/<your_domain.com>` instead of the standard `google.com`).

## 4\. Test the integration

1. In your [Google Admin console ↗](https://admin.google.com/), go to **Apps** \> **Google Workspace** \> **Gmail** \> **Setup**.
2. Copy your Gmail **Web address**.
3. Open an incognito browser window and go to your Gmail web address (for example, `https://mail.google.com/a/<your_domain.com>`).

An Access login screen should appear.

## Troubleshooting

`Error: "G Suite - This account cannot be accessed because the login credentials could not be verified."`

If you see this error, it is likely that the public key and private key do not match. Confirm that your certificate file includes the correct public key.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/google-workspace-saas/#page","headline":"Google Workspace · Cloudflare One docs","description":"Integrate Google Workspace with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/google-workspace-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/google-workspace-saas/","name":"Google Workspace"}}]}
```
