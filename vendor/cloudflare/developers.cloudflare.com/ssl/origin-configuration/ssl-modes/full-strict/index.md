---
title: Full (strict)
description: Similar to Full Mode, but with added validation of the origin server’s certificate, which can be issued by a public CA like Let’s Encrypt or by Cloudflare Origin CA.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Full (strict)

When you set your encryption mode to **Full (strict)**, Cloudflare does everything in [Full mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) but also enforces more stringent requirements for origin certificates.

flowchart LR
    accTitle: Full - Strict SSL/TLS Encryption
    accDescr: With an encryption mode of Full (strict), your application encrypts traffic going to and coming from Cloudflare.
    A[Browser] <--Encrypted--> B((Cloudflare))<--Encrypted--> C[("Origin server (verified) #9989;")]

## Use when

For the best security, choose **Full (strict)** mode whenever possible (unless you are an [Enterprise customer](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/ssl-only-origin-pull/)).

Your origin needs to be able to support an SSL certificate that is:

* Unexpired, meaning the certificate presents `notBeforeDate < now() < notAfterDate`.
* Issued by a [publicly trusted certificate authority ↗](https://github.com/cloudflare/cfssl%5Ftrust) or [Cloudflare’s Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).
* Contains a Common Name (CN) or Subject Alternative Name (SAN) that matches the requested or target hostname.

Note

In addition to **Full (strict)** encryption, you can also set up [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) to ensure all requests to your origin are evaluated before receiving a response.

## Required setup

### Prerequisites

Before enabling **Full (strict)** mode, make sure your origin:

* Allows HTTPS connections on port `443`.
* Presents a certificate matching the requirements above.

Otherwise, your visitors may experience a [526 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-526/).

### Process

* [ Dashboard ](#tab-panel-10658)
* [ API ](#tab-panel-10659)

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

Depending on your origin configuration, you may have to adjust settings to avoid [Mixed Content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) or [redirect loops](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/#page","headline":"Full (strict) - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"Similar to Full Mode, but with added validation of the origin server’s certificate, which can be issued by a public CA like Let’s Encrypt or by Cloudflare Origin CA.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/ssl-modes/","name":"Encryption modes"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/ssl-modes/full-strict/","name":"Full (strict)"}}]}
```
