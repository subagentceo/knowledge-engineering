---
title: Full
description: Cloudflare matches the browser request protocol when connecting to the origin. If the browser uses HTTP, Cloudflare connects to the origin via HTTP; if HTTPS, Cloudflare uses HTTPS without validating the origin’s certificate. This mode is common for origins that use self-signed or otherwise invalid certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Full

When you set your encryption mode to **Full**, Cloudflare allows HTTPS connections between your visitor and Cloudflare and makes connections to the origin using the scheme requested by the visitor. If your visitor uses `http`, then Cloudflare connects to the origin using plaintext HTTP and vice versa.

## Use when

Choose **Full** mode when your origin can support an SSL certification, but — for various reasons — it cannot support a valid, publicly trusted certificate.

Note

In addition to **Full** encryption, you can also set up [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) to ensure all requests to your origin are evaluated before receiving a response.

## Required setup

### Prerequisites

Before enabling **Full** mode, make sure your origin allows HTTPS connections on port 443 and presents a certificate (self-signed, [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/), or purchased from a Certificate Authority). Otherwise, your visitors may experience a [525 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/).

Depending on your origin configuration, you may have to adjust settings to avoid [Mixed Content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) or [redirect loops](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

### Process

* [ Dashboard ](#tab-panel-10656)
* [ API ](#tab-panel-10657)

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

The certificate presented by the origin will **not be validated in any way**. It can be expired, self-signed, or not even have a matching CN/SAN entry for the hostname requested.

Without using [**Full (strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), a malicious party could technically hijack the connection and present their own certificate.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/#page","headline":"Full - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"Cloudflare matches the browser request protocol when connecting to the origin. If the browser uses HTTP, Cloudflare connects to the origin via HTTP; if HTTPS, Cloudflare uses HTTPS without validating the origin’s certificate. This mode is common for origins that use self-signed or otherwise invalid certificates.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/ssl-modes/","name":"Encryption modes"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/ssl-modes/full/","name":"Full"}}]}
```
