---
title: AWS IAM (SAML)
description: AWS IAM (SAML) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AWS IAM (SAML)

AWS IAM Identity Center provides SSO identity management for users who interact with AWS resources (such as EC2 instances or S3 buckets). You can integrate AWS IAM with Cloudflare Zero Trust as a SAML identity provider, which allows users to authenticate to Zero Trust using their AWS credentials.

## Prerequisites

* Admin access to an IAM Identity Center [organization instance ↗](https://docs.aws.amazon.com/singlesignon/latest/userguide/identity-center-instances.html)

## Set up AWS IAM as a SAML provider

To set up SAML with AWS IAM as your identity provider:

1. Open your [IAM Identity Center console ↗](https://console.aws.amazon.com/singlesignon) and go to **Applications**.
2. Select the **Customer managed** tab.
3. Select **Add application**.
4. Select **I have an application I want to set up**.
5. For **Application type**, select **SAML 2.0**.
6. Select **Next**.
7. Enter a **Display name** for the application (for example, `Cloudflare One`).
8. Download the **IAM Identity Center SAML metadata file**. You will need this file later when configuring the identity provider in Cloudflare One.
9. Under **Application metadata**, select **Manually type your metadata values**.
10. In **Application ACS URL** and **Application SAML audience**, enter the following URL:

```

https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback


```

You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.

1. Select **Submit**.
2. Next, select the **Actions** dropdown menu and select _Edit attribute mappings_.
3. For the `Subject` user attribute, enter `${user:email}`.
4. (Recommended) Add user name attributes:

| User attribute | String value       |
| -------------- | ------------------ |
| name           | ${user:name}       |
| surName        | ${user:familyName} |

| `givenName` | `${user:givenName}` |

![Configuring attribute statements in IAM Identity Center](https://developers.cloudflare.com/_astro/aws-saml-attributes.DuPGeU5b_1ShHlb.webp) 
1. Select **Save changes**.
2. Under **Assign users and groups**, add individuals and/or groups that should be allowed to login to Cloudflare One.
3. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
4. Under **Your identity providers**, select **Add new identity provider**.
5. Select **SAML**.
6. Enter a **Name** for the IdP integration (for example, `AWS`).
7. Upload the **IAM Identity Center SAML metadata file** that you downloaded in Step 8.
8. (Recommended) Enable [**Sign SAML authentication request**](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#sign-saml-authentication-request).
9. Select **Save**.

To [test](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) that your connection is working, select **Test**.

## Example API configuration

```

{

  "config": {

    "issuer_url": "https://portal.sso.eu-central-1.amazonaws.com/saml/assertion/b2yJrC4kjy3ZAS0a2SeDJj74ebEAxozPfiURId0aQsal3",

    "sso_target_url": "https://portal.sso.eu-central-1.amazonaws.com/saml/assertion/b2yJrC4kjy3ZAS0a2SeDJj74ebEAxozPfiURId0aQsal3",

    "attributes": ["email"],

    "email_attribute_name": "email",

    "sign_request": true,

    "idp_public_certs": [

      "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"

    ]

  },

  "type": "saml",

  "name": "AWS IAM SAML example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/aws-saml/#page","headline":"AWS IAM (SAML) · Cloudflare One docs","description":"AWS IAM (SAML) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/aws-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","AWS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/aws-saml/","name":"AWS IAM (SAML)"}}]}
```
