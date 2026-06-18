---
title: Citrix ADC (SAML)
description: Citrix ADC (SAML) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Citrix ADC (SAML)

Cloudflare One can integrate with Citrix ADC (formerly Citrix NetScaler ADC) as a SAML IdP. Documentation from Citrix shows you [how to configure Citrix ADC as a SAML IdP ↗](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/saml-authentication/citrix-adc-saml-idp.html). These steps are specific to Cloudflare One.

## Set up Citrix ADC (SAML)

To set up Citrix ADC (SAML) as your identity provider:

1. First, you'll need to configure 2 SAML certificates:  
   * A certificate to **terminate TLS at the vServer**. Ensure that the certificate is issued by a publicly trusted CA.  
   * A certificate for **signing SAML assertions**.  
If you do not already have a certificate for signing SAML assertions, you can use a self-signed certificate generated on Citrix ADC by following these steps:  
   1. Go to **Traffic Management** \> **SSL**.  
   2. Select **Create and Install a Server Test Certificate**.
2. Select **Configuration** and enter a **Certificate File Name**, **Fully Qualified Domain Name**, and a select a **Country**.  
![Citrix AD Create and Install Test Certificate interface with file name, domain name, and country](https://developers.cloudflare.com/_astro/citrixadc-saml-2.D4502Bei_8Aa5v.webp)
3. Create a publicly accessible authentication vServer and configure the user identity source (like, local users, LDAP) by following this [Citrix documentation ↗](https://docs.citrix.com/en-us/citrix-adc/12-1/aaa-tm/authentication-virtual-server/ns-aaa-setup-auth-vserver-tsk.html).  
For the rest of this example, the user refers to the IdP address `idp.yourdomain.com`.

## Add a new profile

1. Go to **Security** \> **AAA - Application Traffic** \> **Policies** \> **Authentication** \> **Advanced Policies** \> **SAML IDP** to add a new profile.  
Include the following required configuration details:  
| Field                              | Description                                                                            |  
| ---------------------------------- | -------------------------------------------------------------------------------------- |  
| **Name**                           | The certificate name you defined while [configuring SAML](#set-up-citrix-adc-saml)     |  
| **Assertion Consumer Service URL** | https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback                  |  
| **IdP Certificate Name**           | The IdP certificate name you defined while [configuring SAML](#set-up-citrix-adc-saml) |  
| **Issuer Name**                    | https://idp.<yourdomain>.com/saml/login                                                |  
| **Service Provider ID**            | https://idp.<yourdomain>.com/saml/login                                                |  
| **Name ID Format**                 | EmailAddress                                                                           |  
| **Attribute 1**                    | email = AAA.USER.ATTRIBUTE("email")                                                    |  
Cloudflare Access currently sends the IdP address in place of the _Service Provider ID_ for the AuthN request.
2. Create an Authentication Policy that refers to the Profile just created, and bind it to the authentication vServer mentioned above.  
![Citrix AD Configure Authentication SAML IDP Policy](https://developers.cloudflare.com/_astro/citrixadc-saml-4.Ci1ulauO_1NAuTh.webp)  
To configure all of the above using just the CLI, run the following:  
```  
add authentication samlIdPProfile samlProf_CloudflareAccess \  
    -samlIdPCertName SAML_Signing \  
    -assertionConsumerServiceURL "https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback" \  
    -samlIssuerName "https://idp.yourdomain.com/saml/login" \  
    -rejectUnsignedRequests OFF \  
    -NameIDFormat emailAddress \  
    -Attribute1 email \  
    -Attribute1Expr "AAA.USER.ATTRIBUTE(\"email\")" \  
    -Attribute1Format Basic \  
    -serviceProviderID "https://idp.yourdomain.com/saml/login"  
add authentication samlIdPPolicy samlPol_CloudflareAccess -rule true -action samlProf_CloudflareAccess  
bind authentication vserver nsidp -policy samlPol_CloudflareAccess  
```
3. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
4. Under **Your identity providers**, select **Add new identity provider**.
5. Configure the fields as follows:  
| Field                        | Description                                      |  
| ---------------------------- | ------------------------------------------------ |  
| **Name**                     | Your chosen name                                 |  
| **Single Sign On URL**       | The FQDN of the IdP, with the path /saml/login   |  
| **IdP Entity ID/Issuer URL** | As above                                         |  
| **Signing Certificate**      | The public certificate from the NetScaler        |  
| **Email attribute name**     | This is listed under **Optional configurations** |
6. Select **Save**.

To test that your connection is working, go to **Integrations** \> **Identity providers** and select **Test** next to the identity provider you want to test.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/citrixadc-saml/#page","headline":"Citrix ADC (SAML) · Cloudflare One docs","description":"Citrix ADC (SAML) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/citrixadc-saml/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/citrixadc-saml/","name":"Citrix ADC (SAML)"}}]}
```
