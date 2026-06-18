---
title: Cipher suites
description: Review a list of cipher suites that Cloudflare presents to origins during an SSL/TLS handshake.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cipher suites

Refer to the following list to know what cipher suites Cloudflare presents to origin servers during an SSL/TLS handshake.

Note

Refer to [cipher suites supported at Cloudflare's global network](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/) to know what cipher suites Cloudflare presents to browsers and other user agents.

The list order is based on how the cipher suites appear in the [ClientHello ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/#:~:text=client%20hello), communicating Cloudflare's preference.

## Supported cipher suites by protocol

| Cipher name                                           | TLS 1.0 | TLS 1.1 | TLS 1.2 | TLS 1.3 |
| ----------------------------------------------------- | ------- | ------- | ------- | ------- |
| AEAD-AES128-GCM-SHA256 [1](#user-content-fn-1)        | ❌       | ❌       | ❌       | ✅       |
| AEAD-AES256-GCM-SHA384 [1](#user-content-fn-1)        | ❌       | ❌       | ❌       | ✅       |
| AEAD-CHACHA20-POLY1305-SHA256 [1](#user-content-fn-1) | ❌       | ❌       | ❌       | ✅       |
| ECDHE-ECDSA-AES128-GCM-SHA256                         | ❌       | ❌       | ✅       | ❌       |
| ECDHE-RSA-AES128-GCM-SHA256                           | ❌       | ❌       | ✅       | ❌       |
| ECDHE-RSA-AES128-SHA                                  | ✅       | ✅       | ✅       | ❌       |
| AES128-GCM-SHA256                                     | ❌       | ❌       | ✅       | ❌       |
| AES128-SHA                                            | ✅       | ✅       | ✅       | ❌       |
| ECDHE-ECDSA-AES256-GCM-SHA384                         | ❌       | ❌       | ✅       | ❌       |
| ECDHE-RSA-AES256-GCM-SHA384                           | ❌       | ❌       | ✅       | ❌       |
| ECDHE-RSA-AES256-SHA384                               | ❌       | ❌       | ✅       | ❌       |
| AES256-SHA                                            | ✅       | ✅       | ✅       | ❌       |
| DES-CBC3-SHA                                          | ✅       | ❌       | ❌       | ❌       |

### TLS 1.3 cipher suites

Although TLS 1.3 uses the same cipher suite space as previous versions of TLS, TLS 1.3 cipher suites are defined differently, only specifying the symmetric ciphers, and cannot be used for TLS 1.2 ([RFC 8446 ↗](https://www.rfc-editor.org/rfc/rfc8446.html)).

Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3\. BoringSSL also hard-codes cipher preferences in the order above for TLS 1.3.

Based on BoringSSL, Cloudflare system will return the names listed above. However, the corresponding names defined in [RFC 8446 ↗](https://www.rfc-editor.org/rfc/rfc8446.html) are the following:

* `TLS_AES_128_GCM_SHA256`
* `TLS_AES_256_GCM_SHA384`
* `TLS_CHACHA20_POLY1305_SHA256`

## Match on origin

Cloudflare will present the cipher suites to your origin and your server will select whichever cipher suite it prefers.

However, if you want to ensure that your origin server supports the same cipher suites that Cloudflare supports at our global network and you use [NGINX ↗](https://en.wikipedia.org/wiki/Nginx) for TLS termination on your origin, you can apply the following configuration:

```

ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;

ssl_ecdh_curve X25519:P-256:P-384;

ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:ECDHE+AES128:RSA+AES128:ECDHE+AES256:RSA+AES256:ECDHE+3DES:RSA+3DES;

ssl_prefer_server_ciphers on;


```

## Footnotes

1. Refer to [TLS 1.3 cipher suites](#tls-13-cipher-suites) for details. [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/#page","headline":"Cipher suites — Origin · Cloudflare SSL/TLS docs","description":"Review a list of cipher suites that Cloudflare presents to origins during an SSL/TLS handshake.","url":"https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/cipher-suites/","name":"Cipher suites"}}]}
```
