---
title: Okta (SAML)
description: Integrate Okta as a SAML identity provider with Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Okta (SAML)

Cloudflare One can integrate SAML with Okta as an identity provider.

## Set up Okta as a SAML provider

To set up SAML with Okta as your identity provider:

1. On your Okta admin dashboard, go to **Applications** \> **Applications**.
2. Select **Create App Integration**.
3. In the pop-up dialog, select **SAML 2.0** and then elect **Next**.
4. Enter an app name and select **Next**.  
![Entering your Cloudflare One callback URL into Okta](https://developers.cloudflare.com/_astro/okta-saml-1.BO9WudzS_Z2kyEVM.webp)
5. In the **Single sign on URL** and the **Audience URI (SP Entity ID)** fields, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
6. In the **Attribute Statements** section, enter the following information:  
   * **Name**: Enter `email`.  
   * **Value**: Enter `user.email`.
7. (Optional) If you are using Okta groups, create a **Group Attribute Statement** with the following information:  
   * **Name**: Enter `groups`.  
   * **Filter**: Select _Matches regex_ and enter `.*`.
![Configuring attribute statements in Okta](https://developers.cloudflare.com/_astro/okta-saml-2.BkDiypq5_1d8kYQ.webp) 
1. Select **Next**.
2. Select **I'm an Okta customer adding an internal app** and check **This is an internal app that we have created**.
![Configuring feedback options in Okta](https://developers.cloudflare.com/_astro/okta-saml-3.-GrxFq28_tccsu.webp) 
1. Select **Finish**.
2. In the **Assignments** tab, select **Assign** and assign individuals or groups you want to grant access to.
3. Select **Done**. The assigned individuals and groups will display in the **Assignments** tab.
![Assigning individuals and groups to Okta application](https://developers.cloudflare.com/_astro/okta-saml-4.CrMrhldk_17Ee6y.webp) 
1. To retrieve the SAML provider information, go to the **Sign On** tab and select **View Setup Instructions**. A new page will open showing the **Identity Provider Single Sign-on URL**, **Identity Provider Issuer**, and **X.509 Certificate**. Save this information for configuring your Cloudflare One settings.
![Retrieving SAML provider information in Okta](https://developers.cloudflare.com/_astro/okta-saml-5.CWJU56SQ_1In0gM.webp) 
1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity provider**.
2. Under **Your identity providers**, select **Add new identity provider**, and select _SAML_.
3. Fill in the following information:  
   * **Name**: Name your identity provider.  
   * **Single Sign On URL**: Enter the Identity Provider Single-Sign-On URL from Okta.  
   * **Issuer ID**: Enter the Identity Provider Issuer from Okta, for example `http://www.okta.com/<your-okta-entity-id>`.  
   * **Signing Certificate**: Copy-paste the X.509 Certificate from Okta.
4. (Recommended) Enable **Sign SAML authentication request**.
5. (Recommended) Under **SAML attributes**, add the `email` and `groups` attributes. The `groups` attribute is required if you want to create policies based on [Okta groups](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#okta-saml).
![Adding optional SAML attributes in Cloudflare One](https://developers.cloudflare.com/_astro/okta-saml-6.4pq9o6NF_xya5c.webp) 
1. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to Okta. A success response should return the configured SAML attributes.

Warning

SAML attributes are only refreshed during authentications with the Okta identity provider. This means the Okta group membership is not updated unless a user logs in and out of the Cloudflare One Client, or logs in to an Access application.

## Example API configuration

```

{

  "config": {

    "issuer_url": "http://www.okta.com/exkbhqj29iGxT7GwT0h7",

    "sso_target_url": "https://dev-abc123.oktapreview.com/app/myapp/exkbhqj29iGxT7GwT0h7/sso/saml",

    "attributes": ["email", "group"],

    "email_attribute_name": "",

    "sign_request": false,

    "idp_public_certs": [

      "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"

    ]

  },

  "type": "saml",

  "name": "okta saml example"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta-saml/#page","headline":"Okta (SAML) · Cloudflare One docs","description":"Integrate Okta as a SAML identity provider with Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Okta","SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/okta-saml/","name":"Okta (SAML)"}}]}
```
