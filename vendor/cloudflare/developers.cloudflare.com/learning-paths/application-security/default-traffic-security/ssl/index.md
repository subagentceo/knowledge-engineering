---
title: SSL / TLS
description: Configure SSL/TLS encryption options for domains.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SSL / TLS

Cloudflare offers a range of SSL/TLS options. By default, Cloudflare offers Universal SSL to all domains, but there are many other options available. Cloudflare offers SSL/TLS for free because we believe it is the [right thing to do ↗](https://blog.cloudflare.com/introducing-universal-ssl). Encryption is foundational to the Internet because it prevents data from being manipulated.

1. [**Universal SSL**](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/): This option covers basic encryption requirements and certificate management needs.
2. [**Total TLS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/): Automatically issues certificates for all subdomain levels, extending the protection offered by Universal SSL.
3. [**Advanced Certificates**](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/): Offers customizable certificate issuance and management, including options like choosing the certificate authority, certificate validity period, and removing Cloudflare branding from certificates.
4. [**Custom Certificates**](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/): For eligible plans, customers can upload their own certificates, with the user managing issuance and renewal.
5. [**mTLS Client Certificates**](https://developers.cloudflare.com/ssl/client-certificates/): Cloudflare offers a PKI system, used to create client certificates, which can enforce mutual Transport Layer Security (mTLS) encryption.
6. [**Cloudflare for SaaS Custom Hostnames**](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/): This feature enables SaaS providers to offer their clients the ability to use their own domains while benefiting from Cloudflare's network.
7. [**Keyless SSL Certificates**](https://developers.cloudflare.com/ssl/keyless-ssl/): Keyless SSL allows security-conscious clients to upload their own custom certificates and benefit from Cloudflare, but without exposing their TLS private keys.
8. [**Origin Certificates**](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/): Origin CA certificates from Cloudflare are used to encrypt traffic between Cloudflare and your origin web server. These certificates are created through the Cloudflare dashboard and can be configured with a choice of RSA or ECC private keys and support for various server types.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ssl/#page","headline":"SSL / TLS · Cloudflare Learning Paths","description":"Configure SSL/TLS encryption options for domains.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ssl/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/default-traffic-security/","name":"Default traffic security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/default-traffic-security/ssl/","name":"SSL / TLS"}}]}
```
