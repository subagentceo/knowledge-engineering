---
title: Data security
description: Workers KV encryption at rest, encryption in transit, and Cloudflare compliance certifications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data security

This page details the data security properties of KV, including:

* Encryption-at-rest (EAR).
* Encryption-in-transit (EIT).
* Cloudflare's compliance certifications.

## Encryption at Rest

All values stored in KV are encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of KV.

Values are only decrypted by the process executing your Worker code or responding to your API requests.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Objects are encrypted using [AES-256 ↗](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm. KV uses GCM (Galois/Counter Mode) as its preferred mode.

## Encryption in Transit

Data transfer between a Cloudflare Worker, and/or between nodes within the Cloudflare network and KV is secured using the same [Transport Layer Security ↗](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL).

API access via the HTTP API or using the [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) command-line interface is also over TLS/SSL (HTTPS).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, refer to Cloudflare's [Trust Hub ↗](https://www.cloudflare.com/trust-hub/compliance-resources/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/data-security/#page","headline":"Data security · Cloudflare Workers KV docs","description":"Workers KV encryption at rest, encryption in transit, and Cloudflare compliance certifications.","url":"https://developers.cloudflare.com/kv/reference/data-security/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/reference/data-security/","name":"Data security"}}]}
```
