---
title: Renewal and expiration
description: Learn how renewal and expiration work when using Cloudflare Custom SSL certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Renewal and expiration

## Renew custom certificates

Since Cloudflare cannot renew uploaded certificates, you should ensure that you replace or [update](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#update-an-existing-custom-certificate) an expiring custom certificate before it expires, otherwise your visitors may not be able to connect.

Cloudflare automatically sends email notifications 30 and 14 days before your custom certificate expires. The email is sent to users who have the SSL/TLS, Administrator, or Super Administrator [roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

Note

When renewing a custom certificate, you can reuse a [previously generated CSR](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-signing-requests/).

If you are on an Enterprise plan and want to renew a custom (modern) certificate, consider requesting access to [Staging environment (Beta)](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/).

## Expired certificates

If a valid replacement - covering some or all of the SANs in the expiring custom certificate - is already available, Cloudflare will remove the expiring custom certificate in the 24 hours before expiration. There is no expected downtime due to certificate transition.

If no valid replacement is available, Cloudflare will remove the custom certificate after it expires.

Affected domains and subdomains will fall back to any other active certificate covering the hostnames on the expiring certificate.

Warning

All certificates in a [certificate pack](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/#certificate-packs) are treated as one object. The expiration date of a certificate pack is equivalent to the soonest `Not After` date among the certificates in the pack.

For example if you have a custom certificate made of an ECSDA and a RSA certificate, if one of them expires the whole pack will be removed.

## Migrate to other certificate types

If you no longer want to use your custom certificate but still want your website or application to be covered with SSL/TLS, you can do the following:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Make sure there is already an active [universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) certificate covering the same hostnames.
3. Delete your custom certificate.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/#page","headline":"Renewal and expiration · Cloudflare SSL/TLS docs","description":"Learn how renewal and expiration work when using Cloudflare Custom SSL certificates.","url":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/custom-certificates/","name":"Custom certificates"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/custom-certificates/renewing/","name":"Renewal and expiration"}}]}
```
