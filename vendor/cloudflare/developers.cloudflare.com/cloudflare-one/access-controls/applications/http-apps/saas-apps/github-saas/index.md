---
title: GitHub Enterprise Cloud
description: Integrate GitHub Enterprise Cloud with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub Enterprise Cloud

**Last reviewed:**  almost 2 years ago 

This guide covers how to configure [GitHub Enterprise Cloud ↗](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/using-saml-for-enterprise-iam/configuring-saml-single-sign-on-for-your-enterprise) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* A GitHub Enterprise Cloud subscription
* Access to a GitHub account as an organization owner

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _GitHub_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: `https://github.com/orgs/<your-organization>`  
   * **Assertion Consumer Service URL**: `https://github.com/orgs/<your-organization>/saml/consume`  
   * **Name ID format**: _Email_
7. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Create an X.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3\. Configure an identity provider and SAML SSO in GitHub Enterprise Cloud

1. In your GitHub organization page, go to **Settings** \> **Authentication security**.
2. Under **SAML single sign-on**, turn on **Enable SAML authentication**.
3. Fill in the following fields:  
   * **Sign on URL**: SSO endpoint from application configuration in Cloudflare One.  
   * **Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare One.  
   * **Public certificate**: Paste the entire x.509 certificate from step [2\. Create a x.509 certificate](#2-create-a-x509-certificate).

## 4\. Test the integration

Select **Test SAML configuration**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. When this is successful, select **Save**.

You can also turn on **Require SAML SSO authentication for all members of your organization** if you want to enforce SSO login with Cloudflare Access.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/github-saas/#page","headline":"GitHub Enterprise Cloud · Cloudflare One docs","description":"Integrate GitHub Enterprise Cloud with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/github-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/github-saas/","name":"GitHub Enterprise Cloud"}}]}
```
