---
title: Mutual TLS (mTLS)
description: Authenticate requests with mutual TLS certificates.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Mutual TLS (mTLS)

Mutual TLS (mTLS) authentication uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

![mTLS sequence diagram](https://developers.cloudflare.com/_astro/api-shield-call-sequence.DjXyNgan_CJbMD.webp) 

Support includes [gRPC ↗](https://grpc.io/docs/what-is-grpc/introduction/)\-based APIs, which use binary formats such as protocol buffers rather than JSON.

## Creating a mTLS rule

1. In the Cloudflare dashboard, go to **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select **Create a mTLS rule**.
3. In **Custom rules**, several rule parameters have already been filled in. Enter the URI path you want to protect in **Value**.
4. (Optional) Add a `Hostname` field and enter the mTLS-enabled hostnames you wish to protect in **Value**.
5. In **Choose action**, select `Block`.
6. Select **Deploy** to make the rule active.

Once you have deployed your mTLS rule, any requests without a [valid client certificate](https://developers.cloudflare.com/ssl/client-certificates/) will be blocked.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/mtls/#page","headline":"Mutual TLS (mTLS) · Cloudflare Learning Paths","description":"Authenticate requests with mutual TLS certificates.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/mtls/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/default-traffic-security/","name":"Default traffic security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/default-traffic-security/mtls/","name":"Mutual TLS (mTLS)"}}]}
```
