---
title: AWS
description: Integrate AWS with Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AWS

**Last reviewed:**  about 2 years ago 

This guide covers how to configure [AWS ↗](https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html) as a SAML application in Cloudflare One.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to an AWS account

## 1\. Get AWS URLs

1. In the AWS admin panel, search for `IAM Identity Center`.
2. Go to **IAM Identity Center** \> **Settings**.
3. In the **Identity source** tab, select the **Actions** dropdown and select _Change identity source_.
4. Change the identity source to **External identity provider**.
5. Copy the values shown in **Service provider metadata**. You will need these values when configuring the SaaS application in Cloudflare One.

Next, we will obtain **Identity provider metadata** from Cloudflare One.

## 2\. Add a SaaS application to Cloudflare One

1. In a separate tab or window, open the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application** \> **SaaS application**.
3. For **Application**, select _Amazon AWS_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:  
   * **Entity ID**: IAM Identity Center issuer URL  
   * **Assertion Consumer Service URL**: IAM Identity Center Assertion Consumer Service (ACS) URL  
   * **Name ID format**: _Email_
7. (Optional) Additional SAML attribute statements can be passed from your IdP to AWS SSO. To learn more about AWS Attribute mapping, refer to [Attribute mappings - AWS Single Sign-On ↗](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#supportedidpattributes).
8. AWS supports uploading a metadata XML file. To download your SAML metadata from Access:  
   1. Copy the **SAML Metadata endpoint**.  
   2. In a separate browser window, go to the SAML Metadata endpoint (`https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/xxx/saml-metadata`).  
   3. Save the page as `access_saml_metadata.xml`.
9. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for the application.
10. Save the application.

## 3\. Complete AWS configuration

1. Return to the **IAM Identity Center** \> **Settings** \> **Change identity source** tab.
2. Under **IdP SAML metadata**, upload your `access_saml_metadata.xml` file.
3. Select **Next** to review settings, type **ACCEPT** and select **Change identity source** to confirm changes.
4. Confirm that **Provisioning** is set to _Manual_.

Important

Access for SaaS does not currently support [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/). Make sure that:

1. Users are created in both your identity provider and AWS.
2. Users have matching usernames in your identity provider and AWS.
3. Usernames are email addresses. This is the only format AWS supports with third-party SSO providers.

## 4\. Test the integration

To test the connection, go to your **AWS access portal URL**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/aws-sso-saas/#page","headline":"AWS · Cloudflare One docs","description":"Integrate AWS with Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/aws-sso-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/aws-sso-saas/","name":"AWS"}}]}
```
