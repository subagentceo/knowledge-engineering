---
title: Data security
description: Durable Objects data security properties including encryption at rest, encryption in transit, and compliance certifications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data security

This page details the data security properties of Durable Objects, including:

* Encryption-at-rest (EAR).
* Encryption-in-transit (EIT).
* Cloudflare's compliance certifications.

## Encryption at Rest

All Durable Object data, including metadata, is encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of Durable Objects.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Encryption at rest is implemented using the Linux Unified Key Setup (LUKS) disk encryption specification and [AES-256 ↗](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm.

## Encryption in Transit

Data transfer between a Cloudflare Worker, and/or between nodes within the Cloudflare network and Durable Objects is secured using the same [Transport Layer Security ↗](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL).

API access via the HTTP API or using the [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) command-line interface is also over TLS/SSL (HTTPS).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, visit the Cloudflare [Trust Hub ↗](https://www.cloudflare.com/trust-hub/compliance-resources/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/reference/data-security/#page","headline":"Data security · Cloudflare Durable Objects docs","description":"Durable Objects data security properties including encryption at rest, encryption in transit, and compliance certifications.","url":"https://developers.cloudflare.com/durable-objects/reference/data-security/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/reference/data-security/","name":"Data security"}}]}
```
