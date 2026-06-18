---
title: Cloudflare SSL/TLS
description: Manage SSL/TLS certificates for encrypted connections between visitors, Cloudflare, and your origin server.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare SSL/TLS

Encrypt your web traffic to prevent data theft and other tampering.

 Available on all plans 

SSL/TLS certificates encrypt traffic between visitors and your website, preventing eavesdropping and data tampering. Because Cloudflare sits between your visitors and your origin server, two certificates can be involved in a single request: an [edge certificate](https://developers.cloudflare.com/ssl/concepts/#edge-certificate) (visitor to Cloudflare) and an [origin certificate](https://developers.cloudflare.com/ssl/concepts/#origin-certificate) (Cloudflare to your server).

Cloudflare automatically issues free certificates through [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) and offers additional options for custom certificate management. Refer to [Get started](https://developers.cloudflare.com/ssl/get-started/) to set up SSL/TLS for your domain.

---

## Features

###  Total TLS 

Universal SSL covers your apex domain and first-level subdomains. Total TLS extends that coverage by automatically issuing certificates for proxied hostnames at any subdomain level.

[ Use Total TLS ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) 

###  Delegated DCV 

Before issuing a certificate, a certificate authority (CA) must verify you control the domain. If you manage DNS outside of Cloudflare, you can delegate this verification to Cloudflare so certificate renewals happen automatically.

[ Use Delegated DCV ](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) 

###  Custom TLS settings 

Specify the minimum TLS version that visitors must use to connect to your website or application, and [restrict cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/)to meet compliance or security requirements.

[ Use Custom TLS settings ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) 

  
For a complete list of SSL/TLS features and their availability by plan, refer to [features and availability](https://developers.cloudflare.com/ssl/reference/all-features/).

---

## Related products

**[Cloudflare DNS](https://developers.cloudflare.com/dns/)** 

When you use Cloudflare DNS, all DNS queries for your domain are answered by Cloudflare's global anycast network. This network delivers performance and global availability.

**[Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)** 

Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare's network to your customers via their own custom or vanity domains.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ssl/#page","headline":"Overview · Cloudflare SSL/TLS docs","description":"Manage SSL/TLS certificates for encrypted connections between visitors, Cloudflare, and your origin server.","url":"https://developers.cloudflare.com/ssl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}}]}
```
