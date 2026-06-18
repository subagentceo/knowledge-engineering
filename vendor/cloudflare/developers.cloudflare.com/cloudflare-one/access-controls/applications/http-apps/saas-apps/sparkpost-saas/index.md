---
title: SparkPost
description: SparkPost in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SparkPost

**Last reviewed:**  over 2 years ago 

This guide covers how to configure [SparkPost or SparkPost EU ↗](https://support.sparkpost.com/docs/my-account-and-profile/sso) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to a SparkPost or SparkPost EU account

## 1\. Add a SaaS application to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, enter `SparkPost` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**:  
         * `https://api.sparkpost.com` for SparkPost accounts  
         * `https://api.eu.sparkpost.com` for SparkPost EU accounts  
         * `https://<api-host>` for SparkPost accounts with dedicated tenants  
   * **Assertion Consumer Service URL**:  
         * `https://api.sparkpost.com/api/v1/users/saml/consume` for SparkPost accounts  
         * `https://api.eu.sparkpost.com/api/v1/users/saml/consume` for SparkPost EU accounts  
         * `https://<api-host>/api/v1/users/saml/consume` for SparkPost accounts with dedicated tenants  
   * **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
9. Save the application.

## 2\. Download the metadata file

1. Paste the SAML metadata endpoint from application configuration in Cloudflare One in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3\. Add a SAML SSO provider to SparkPost

1. In SparkPost, select your profile picture > **Account Settings**.
2. Under **Single Sign-On**, select **Provision SSO**.
3. Under **Upload your Security Assertion Markup Language (SAML)**, select **select a file** and upload the `.xml` file you created in step [2\. Download the metadata file](#2-download-the-metadata-file).
4. Select **Provision SSO**.
5. Select **Enable SSO**.

## 4\. Add a test user and test the integration

1. In SparkPost, current users must be deleted and re-invited to use SSO. To create a test user, select your profile picture > **Users** \> name of the user > **Delete User**. Then, select **Invite User** and fill in the necessary information. Alternatively, invite a new user. An invitation email will be sent.
2. Go to the link sent in the invitation email. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
3. Once SSO is successful, you can turn on SSO for the rest of your current users by deleting and then re-inviting them.

Note

The SparkPost SSO login link is `https://app.sparkpost.com/auth/sso`. Alternatively, you can go to the usual sign in page and select **Log in with Single Sign-On**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/sparkpost-saas/#page","headline":"SparkPost · Cloudflare One docs","description":"SparkPost in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/sparkpost-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/sparkpost-saas/","name":"SparkPost"}}]}
```
