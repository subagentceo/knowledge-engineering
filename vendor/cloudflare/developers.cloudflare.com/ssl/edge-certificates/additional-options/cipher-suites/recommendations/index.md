---
title: Security levels
description: Recommended cipher suite security levels for different use cases.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Security levels

Refer to the sections below for three different security levels and how Cloudflare recommends that you set them up if you need to restrict the [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) used between Cloudflare and clients that access your website or application.

Refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) to learn how to specify cipher suites at zone level or per hostname.

Warning

Before opting for [compatible](#compatible) or [modern](#modern), review the [related SSL/TLS settings](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#related-ssltls-settings)[1](#user-content-fn-4).

## Modern

Offers the best security and performance, limiting your range of clients to modern devices and browsers. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret and support authenticated encryption (AEAD).

Cipher suites list

`AEAD-AES128-GCM-SHA256`[2](#user-content-fn-1), `AEAD-AES256-GCM-SHA384`[3](#user-content-fn-2), `AEAD-CHACHA20-POLY1305-SHA256`[4](#user-content-fn-3),`ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-CHACHA20-POLY1305`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`

If you are customizing cipher suites via API, refer to [Steps and API examples](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/#steps-and-api-examples) for a snippet you can copy with the formatted array.

## Compatible

Provides broader compatibility with somewhat weaker security. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret.

Cipher suites list

`AEAD-AES128-GCM-SHA256`[2](#user-content-fn-1), `AEAD-AES256-GCM-SHA384`[3](#user-content-fn-2), `AEAD-CHACHA20-POLY1305-SHA256`[4](#user-content-fn-3), `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-CHACHA20-POLY1305`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-AES128-SHA256`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-ECDSA-AES256-SHA384`, `ECDHE-RSA-AES256-SHA384`

If you are customizing cipher suites via API, refer to [Steps and API examples](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/#steps-and-api-examples) for a snippet you can copy with the formatted array.

## Legacy (default)

Includes all cipher suites that Cloudflare supports today. Broadest compatibility with the weakest security. Supports TLS 1.0-1.3 cipher suites.

Cipher suites list

`AEAD-AES128-GCM-SHA256`[2](#user-content-fn-1), `AEAD-AES256-GCM-SHA384`[3](#user-content-fn-2), `AEAD-CHACHA20-POLY1305-SHA256`[4](#user-content-fn-3), `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-CHACHA20-POLY1305`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-AES128-SHA256`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-ECDSA-AES256-SHA384`, `ECDHE-RSA-AES256-SHA384`, `ECDHE-ECDSA-AES128-SHA`, `ECDHE-RSA-AES128-SHA`, `AES128-GCM-SHA256`, `AES128-SHA256`, `AES128-SHA`, `ECDHE-RSA-AES256-SHA`, `AES256-GCM-SHA384`, `AES256-SHA256`, `AES256-SHA`, `DES-CBC3-SHA`

To reset your option to the default, [use an empty array](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/#reset-to-default-values).

## Footnotes

1. Although configured independently, cipher suites interact with **Minimum TLS version** and **TLS 1.3**. [↩](#user-content-fnref-4)
2. Same as `TLS_AES_128_GCM_SHA256`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3)
3. Same as `TLS_AES_256_GCM_SHA384`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-2) [↩2](#user-content-fnref-2-2) [↩3](#user-content-fnref-2-3)
4. Same as `TLS_CHACHA20_POLY1305_SHA256`. Refer to [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13) for details. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2) [↩3](#user-content-fnref-3-3)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/#page","headline":"Cipher suite recommendations · Cloudflare SSL/TLS docs","description":"Recommended cipher suite security levels for different use cases.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/","name":"Cipher suites"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/recommendations/","name":"Security levels"}}]}
```
