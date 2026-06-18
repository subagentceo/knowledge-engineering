---
title: Customize cipher suites via dashboard
description: Select allowed cipher suites for your zone in the dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize cipher suites via dashboard

Cipher suites are a combination of ciphers used to negotiate security settings during the [SSL/TLS handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) (and therefore separate from the [SSL/TLS protocol](https://developers.cloudflare.com/ssl/reference/protocols/)).

## Prerequisites

Cipher suite customization requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription.

If you are a SaaS provider looking to restrict cipher suites for connections to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/), this can be configured with a [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) subscription. Refer to [TLS management](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites) instead.

## Selection modes

When configuring cipher suites via dashboard, you can use three different selection modes:

* **By security level**: allows you to select between the predefined [Cloudflare recommendations](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) (Modern[1](#user-content-fn-1), Compatible, or Legacy).
* **By compliance standard**: allows you to select cipher suites grouped according to [industry standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/) (PCI DSS or FIPS-140-3).
* **Custom**: allows you to individually select the cipher suites you would like to support.

For any of the modes, you should keep in mind the following configuration conditions. If using the **security level** or the **compliance standard** mode, some actions may be blocked and explained referencing these conditions.

Configuration conditions

* Cipher suites are used in combination with other [SSL/TLS settings](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#related-ssltls-settings).
* You cannot set specific TLS 1.3 ciphers. Instead, you can [enable TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use all applicable [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/).
* Each cipher suite also supports a specific algorithm (RSA or ECDSA), so you should consider the algorithms in use by your edge certificates when making your ciphers selection. You can find this information under each certificate listed on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)page. \* It is not possible to configure minimum TLS version nor cipher suites for [Cloudflare Pages](https://developers.cloudflare.com/pages/) hostnames.

## Steps

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For the **Cipher suites** setting select **Configure**.
3. Choose a mode to select your cipher suites and select **Next**.
4. Select a predefined set of cipher suites or, if you opted for **Custom**, specify which cipher suites you want to allow. Make sure you are aware of how your selection will interact with Minimum TLS version, TLS 1.3, and the certificate algorithm (ECDSA or RSA).
5. Select **Save** to confirm.

Modern or PCI DSS

When used with [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#tls-13), Modern is the same as PCI DSS.

## Footnotes

1. When used with TLS 1.3, Modern is the same as PCI DSS. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/dashboard/#page","headline":"Customize cipher suites via dashboard · Cloudflare SSL/TLS docs","description":"Select allowed cipher suites for your zone in the dashboard.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/","name":"Cipher suites"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/","name":"Customize cipher suites"}},{"@type":"ListItem","position":7,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/dashboard/","name":"Customize cipher suites via dashboard"}}]}
```
