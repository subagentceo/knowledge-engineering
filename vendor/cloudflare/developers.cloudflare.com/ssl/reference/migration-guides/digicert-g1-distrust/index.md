---
title: DigiCert Legacy Root (G1) distrust by major browsers
description: Learn how the DigiCert G1 root distrust may affect your Cloudflare configuration.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DigiCert Legacy Root (G1) distrust by major browsers

Browsers and operating systems are completing the removal of DigiCert's legacy G1 root certificates from their trust stores, effective **April 15, 2026**.

DigiCert announced this planned deprecation in 2023 and has been issuing certificates from their newer G2 roots since 2020.

Since DigiCert is not within the [certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) used by Cloudflare, this change may only affect customers who upload [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) issued from DigiCert G1 roots.

## The change

The primary root being distrusted is **DigiCert Global Root CA**. The distrust also affects other legacy G1 intermediates cross-signed from this root.

DigiCert Global Root G2 and G3 remain fully trusted. Certificates that chain to G2 are unaffected.

Refer to [DigiCert's root and intermediate CA certificate updates ↗](https://knowledge.digicert.com/general-information/digicert-root-and-intermediate-ca-certificate-updates-2023) for the full list of affected roots.

## DigiCert's recommendation

DigiCert recommends reissuing any affected certificates from a G2 intermediate. This is a standard reissuance — you do not need to generate a new key in most cases.

## Cloudflare-managed certificates

Since Cloudflare does not use DigiCert roots, you can avoid this dependency entirely by switching to Cloudflare-managed certificates:

* Use [Advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) for more control and flexibility with automatic renewals.
* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) to automatically issue certificates for your [proxied hostnames](https://developers.cloudflare.com/dns/proxy-status/).
* Use [Delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) to reduce manual intervention when renewing certificates for [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) zones.

## More resources

* [DigiCert root and intermediate CA certificate updates ↗](https://knowledge.digicert.com/general-information/digicert-root-and-intermediate-ca-certificate-updates-2023)
* [Custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)
* [Certificate bundling methodologies](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/migration-guides/digicert-g1-distrust/#page","headline":"DigiCert Legacy Root (G1) distrust by major browsers · Cloudflare SSL/TLS docs","description":"Learn how the DigiCert G1 root distrust may affect your Cloudflare configuration.","url":"https://developers.cloudflare.com/ssl/reference/migration-guides/digicert-g1-distrust/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/reference/migration-guides/digicert-g1-distrust/","name":"DigiCert Legacy Root (G1) distrust by major browsers"}}]}
```
