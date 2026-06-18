---
title: Atlassian Cloud
description: Integrate Atlassian Cloud with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Atlassian Cloud

**Last reviewed:**  about 2 years ago 

This guide covers how to configure [Atlassian Cloud ↗](https://support.atlassian.com/security-and-access-policies/docs/configure-saml-single-sign-on-with-an-identity-provider/) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to an Atlassian Cloud account
* Atlassian Guard Standard subscription
* A [domain ↗](https://support.atlassian.com/user-management/docs/verify-a-domain-to-manage-accounts/) verified in Atlassian Cloud

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Atlassian_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
7. Keep this window open. You will finish this configuration in step [4\. Finish adding a SaaS application to Cloudflare One](#4-finish-adding-a-saas-application-to-cloudflare-one).

## 2\. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3\. Configure an identity provider and SAML SSO in Atlassian Cloud

1. In Atlassian Cloud, go to **Security** \> **Identity providers**.
2. Select **Other provider** \> **Choose**.
3. For **Directory name**, enter your desired name. For example, you could enter `Cloudflare Access`.
4. Select **Add** \> **Set up SAML single sign-on** \> **Next**.  
Note  
This screen will advise you to create an authentication policy before proceeding. You will do this in step [5\. Create an application policy to test integration](#5-create-an-authentication-policy-to-test-integration).
5. Fill in the following fields:  
   * **Identity provider Entity ID**: Access Entity ID or Issuer from application configuration in Cloudflare One.  
   * **Identity provider SSO URL**: SSO endpoint from application configuration in Cloudflare One.  
   * **Public x509 certificate**: Paste the entire x.509 certificate from step [2\. Create a x.509 certificate](#2-create-a-x509-certificate).
6. Select **Next**.
7. Copy the **Service provider entity URL** and **Service provider assertion consumer service URL**.
8. Select **Next**.
9. Under **Link domain**, select the domain you want to use with SAML SSO.
10. Select **Next** \> **Stop and save SAML**.

## 4\. Finish adding a SaaS application to Cloudflare One

1. In your open Cloudflare One window, fill in the following fields:  
   * **Entity ID**: Service provider entity URL from Atlassian Cloud SAML SSO set-up.  
   * **Assertion Consumer Service URL**: Service provider assertion consumer service URL from Atlassian Cloud SAML SSO set-up.  
   * **Name ID format**: _Email_
2. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
3. Save the application.

## 5\. Create an authentication policy to test integration

To enable SSO for users in Atlassian Cloud, create an [Atlassian authentication policy ↗](https://support.atlassian.com/security-and-access-policies/docs/configure-authentication-policies-for-your-organization/):

1. In Atlassian Cloud, go to **Security** \> **Authentication policies**.
2. Select **Add policy**.
3. Under **Directory**, select the identity provider you used to configure SAML SSO.
4. For **Policy name**, enter your desired name.
5. Select **Add**.
6. In **Settings**, turn on **Enforce single sign-on**.
7. In **Members**, select **Add members**.
8. In **Individual Users**, select your desired test user(s) in the dropdown, and select **Add members**.
9. In **Settings**, select **Update** \> **Update**.

## 6\. Test the integration

Open an incognito browser window and log in with the credentials of the test user you added to the test authentication policy. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. When this is successful, turn on **Enforce single sign-on** in your desired authentication policy, or add the desired users to the application policy created in step [5\. Create an Application Policy to test Integration](#5-create-an-authentication-policy-to-test-integration).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/atlassian-saas/#page","headline":"Atlassian Cloud · Cloudflare One docs","description":"Integrate Atlassian Cloud with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/atlassian-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/atlassian-saas/","name":"Atlassian Cloud"}}]}
```
