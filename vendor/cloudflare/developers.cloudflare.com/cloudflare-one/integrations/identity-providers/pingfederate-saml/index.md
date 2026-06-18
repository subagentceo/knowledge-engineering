---
title: PingFederate
description: PingFederate in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PingFederate

The PingFederate offering from PingIdentity provides SSO identity management. Cloudflare Access supports PingFederate as a SAML identity provider.

## Set up PingFederate as an identity provider

1. Log in to your **Ping** dashboard and go to **Applications**.
2. Select **Add Application**.
3. Select **New SAML Application**.
4. Complete the fields for name, description, and category.

These can be any value. A prompt displays to select a signing certificate to use.

1. In the **SAML attribute configuration** dialog select **Email attribute** \> **urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress**.
2. Go to **SP Connections** \> **SP Connection** \> **Credentials**.
3. Add the matching certificate that you upload into the Cloudflare SAML configuration for Ping. Select **Include the certificate in the signature `<KEYINFO>` element**.

Note

There is an additional setting for PingFederate prior to 9.0.

1. In the **Signature Policy** tab, disable the option to **Always Sign Assertion**.
2. Leave the option enabled for **Sign Response As Required**.

This ensures that SAML destination headers are sent during the integration.

In versions 9.0 above, you can leave both of these options enabled.

1. A prompt displays to download the SAML metadata from Ping.

This file shares several fields with Cloudflare Access so you do not have to input this data.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select SAML.
4. In the **IdP Entity ID** field, enter the following URL:

```

https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback


```

You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.

1. Fill the other fields with values from your Ping dashboard.
2. Select **Save**.

To test that your connection is working, go to **Authentication** \> **Login methods** and select **Test** next to the login method you want to test.

## Example API configuration

```

{

  "config": {

    "issuer_url": "https://example.cloudflareaccess.com/cdn-cgi/access/callback",

    "sso_target_url": "https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid=aebe6668-32fe-4a87-8c2b-avcd3599a123",

    "attributes": ["PingOne.AuthenticatingAuthority", "PingOne.idpid"],

    "email_attribute_name": "",

    "sign_request": false,

    "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"

  },

  "type": "saml",

  "name": "ping saml example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingfederate-saml/#page","headline":"PingFederate · Cloudflare One docs","description":"PingFederate in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/pingfederate-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/pingfederate-saml/","name":"PingFederate"}}]}
```
