---
title: Cipher suites
description: Review the TLS cipher suites supported by `cloudflared` for secure connections between your origin and Cloudflare's network.

image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cipher suites

Cloudflare Tunnel connections use the cipher suites supported by `cloudflared`, which relies on the Go TLS library for its TLS implementation. These cipher suites apply to both the TLS connection between Cloudflare's network and `cloudflared`, and the HTTPS connection between `cloudflared` and your origin. In both cases, `cloudflared` negotiates the most secure cipher suite supported by both sides. All tunnel connections use TLS 1.3 and post-quantum encryption by default.

The following table lists the cipher suites supported by `cloudflared`:

| Protocol support            | Cipher suites                                                                                                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLS 1.3 only                | TLS\_AES\_128\_GCM\_SHA256TLS\_AES\_256\_GCM\_SHA384TLS\_CHACHA20\_POLY1305\_SHA256                                                                                                                                                                                                      |
| TLS 1.2 only                | TLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_GCM\_SHA256TLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_GCM\_SHA384TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384TLS\_ECDHE\_RSA\_WITH\_CHACHA20\_POLY1305\_SHA256TLS\_ECDHE\_ECDSA\_WITH\_CHACHA20\_POLY1305\_SHA256 |
| Up to and including TLS 1.2 | TLS\_ECDHE\_RSA\_WITH\_AES\_256\_CBC\_SHATLS\_ECDHE\_RSA\_WITH\_AES\_128\_CBC\_SHATLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_CBC\_SHATLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_CBC\_SHA                                                                                                                 |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/#page","headline":"Cipher suites · Cloudflare One docs","description":"Review the TLS cipher suites supported by cloudflared for secure connections between your origin and Cloudflare's network.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/","name":"Configure a tunnel"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/","name":"Cipher suites"}}]}
```
