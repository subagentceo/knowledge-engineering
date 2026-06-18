---
title: Introducing mTLS
description: Implement mutual TLS authentication with Cloudflare.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Introducing mTLS

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) authentication is a common security practice that uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

[TLS (Transport Layer Security) ↗](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) is a widely-used protocol to ensure secure communication over a network. It ensures confidentiality and integrity by encrypting data and validating the server using digital certificates.

Mutual TLS (mTLS) adds an extra layer by authenticating both parties involved in the communication. The client presents a certificate to the server (in this case Cloudflare) and vice versa.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/concepts/#page","headline":"Introducing mTLS · Cloudflare Learning Paths","description":"Implement mutual TLS authentication with Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/mtls/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/mtls/concepts/","name":"Introducing mTLS"}}]}
```
