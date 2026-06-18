---
title: Keycloak (SAML)
description: Keycloak (SAML) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Keycloak (SAML)

Keycloak is an open source identity and access management solution built by JBoss. If you need a Keycloak lab environment for testing, refer to [this example ↗](https://github.com/mw866/tunnel-keycloak).

## Set up Keycloak (SAML)

To set up Keycloak (SAML) as your identity provider:

1. In Keycloak, select **Clients** in the navigation bar and create a new client.
2. Under **Client ID**, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.  
![SAML Client interface with team domain and callback in Client ID](https://developers.cloudflare.com/_astro/configure-client.gStYVFuK_uWpjQ.webp)
3. Change the `Name ID Format` to `email`
4. Next, set the valid redirect URI to the Keycloak domain that you are using. For example, `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.
5. Set the Master SAML Processing URL using the same Keycloak domain: `https://<keycloak_domain>/auth/realms/master/protocol/saml`.
6. If you wish to enable client signatures, enable `Client Signature Required` and select **save**.  
   1. You will need to [follow the steps here to get the certificate and enable it in the Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/signed%5Fauthn/).  
   2. Import the Access certificate you downloaded into the `SAML Keys` tab. Use `Certificate PEM` as the format.
7. Set the built-in protocol mapper for the `email` property.  
![Protocol Mapper with email property set](https://developers.cloudflare.com/_astro/protocol-mapper.CZf2t0Ex_o71H2.webp)  
Next, you will need to integrate with Cloudflare Access.
8. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
9. Under **Your identity providers**, select **Add new identity provider**.
10. Choose **SAML** on the next page.  
You will need to input the Keycloak details manually. The examples below should be replaced with the specific domains in use with Keycloak and Cloudflare Access.  
| Field                       | Example                                                           |  
| --------------------------- | ----------------------------------------------------------------- |  
| Single Sign-On URL          | https://<keycloak\_domain>/auth/realms/master/protocol/saml       |  
| IdP Entity ID or Issuer URL | https://<unique\_id>.cloudflareaccess.com/cdn-cgi/access/callback |  
| Signing certificate         | Use the X509 Certificate in the Realm Settings from Keycloak      |
11. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to the login method you want to test.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/keycloak/#page","headline":"Keycloak (SAML) · Cloudflare One docs","description":"Keycloak (SAML) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/keycloak/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/keycloak/","name":"Keycloak (SAML)"}}]}
```
