---
title: Data security
description: R2 encrypts all objects at rest with AES-256 and in transit with TLS.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data security

This page details the data security properties of R2, including encryption-at-rest (EAR), encryption-in-transit (EIT), and Cloudflare's compliance certifications.

## Encryption at Rest

All objects stored in R2, including their metadata, are encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of R2.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Objects are encrypted using [AES-256 ↗](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm. R2 uses GCM (Galois/Counter Mode) as its preferred mode.

## Encryption in Transit

Data transfer between a client and R2 is secured using the same [Transport Layer Security ↗](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL) supported on all Cloudflare domains.

Access over plaintext HTTP (without TLS/SSL) can be disabled by connecting a [custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains) to your R2 bucket and enabling [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).

Note

R2 custom domains use Cloudflare for SaaS certificates and cannot be customized. Even if you have [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), the advanced certificate will not be used due to [certificate prioritization](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, visit the Cloudflare [Trust Hub ↗](https://www.cloudflare.com/trust-hub/compliance-resources/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/reference/data-security/#page","headline":"Data security · Cloudflare R2 docs","description":"R2 encrypts all objects at rest with AES-256 and in transit with TLS.","url":"https://developers.cloudflare.com/r2/reference/data-security/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/reference/data-security/","name":"Data security"}}]}
```
