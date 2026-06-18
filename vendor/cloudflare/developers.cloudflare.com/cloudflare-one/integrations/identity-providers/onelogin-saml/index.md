---
title: OneLogin (SAML)
description: Integrate OneLogin as a SAML identity provider for Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OneLogin (SAML)

OneLogin provides SSO identity management. Cloudflare Access supports OneLogin as an SAML identity provider.

## Set up OneLogin as a SAML provider

## 1\. Create an application in OneLogin

1. Log in to your OneLogin admin portal.
2. Select **Apps** \> **Add Apps**.
3. Under **Find Applications**, search for **Cloudflare Access**.
4. Select the result sponsored by **Cloudflare, Inc**. You can customize the name or logo.
5. Select **Save**. You can change this information at any time.
6. Select the **Configuration** tab.
7. In the **Cloudflare Access Authorization Domain** field, paste your team domain:  
```  
https://<your-team-name>.cloudflareaccess.com  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
8. Select the **Parameters** tab, select **Add Parameter** and enter your values for **Cloudflare Access Field**.
9. Select the **Access** tab
10. In Roles, use the mapping to programmatically and automatically assign users that can access the application.  
![OneLogin SAML Application Access interface with available Roles listed](https://developers.cloudflare.com/_astro/onelogin-saml-6.72q8OCR8_oAFmA.webp)
11. Select the **SSO** tab.
12. Copy the OneLogin **SAML 2.0 Endpoint (HTTP)** to the Cloudflare Single Sign On URL.
13. Copy the OneLogin **Issuer URL** to the Cloudflare **IdP Entity ID**.
14. Copy the **X.509 Certificate** to the Cloudflare **Signing Certificate**.  
![OneLogin SAML Application SSO interface with SAML2.0 sign on method, Issuer URL, and X.509 Certificate](https://developers.cloudflare.com/_astro/onelogin-saml-7.DF0eCD1C_216XQ8.webp)

### 2\. Add OneLogin to Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **SAML**.
4. Input the details from your OneLogin account in the fields.
5. (Optional) To enable SCIM, refer to [Synchronize users and groups](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#synchronize-users-and-groups).
6. (Optional) Under **Optional configurations**, configure [additional SAML options](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#optional-configurations). If you added other SAML headers and attribute names to OneLogin, be sure to add them to Cloudflare.
7. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to the login method you want to test.

## Download SP metadata (optional)

OneLogin SAML allows administrators to upload metadata files from the service provider.

To add a metadata file to your OneLogin SAML configuration:

1. Download your unique SAML metadata file at the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata  
```
2. Save the file as an XML document.
3. Upload the XML document to **OneLogin**.

## Example API configuration

```

{

  "config": {

    "issuer_url": "https://app.onelogin.com/saml/metadata/1b84ee45-d4fa-4373-8853-abz438942123",

    "sso_target_url": "https://sandbox.onelogin.com/trust/saml2/http-post/sso/123456",

    "attributes": ["email"],

    "email_attribute_name": "",

    "sign_request": false,

    "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"

  },

  "type": "saml",

  "name": "onelogin saml example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/onelogin-saml/#page","headline":"OneLogin (SAML) · Cloudflare One docs","description":"Integrate OneLogin as a SAML identity provider for Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/onelogin-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/onelogin-saml/","name":"OneLogin (SAML)"}}]}
```
