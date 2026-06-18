---
title: Off (no encryption)
description: No encryption is used for traffic between browsers and Cloudflare or between Cloudflare and origins. Everything is cleartext HTTP.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Off (no encryption)

Setting your encryption mode to **Off (not recommended)** redirects any HTTPS request to plaintext HTTP.

    flowchart LR
        accTitle: No SSL/TLS Encryption
        accDescr: With an encryption mode of Off, your application does not encrypt traffic between the visitor and Cloudflare or between Cloudflare and your server.
        A[Browser] <--Unencrypted--> B((Cloudflare))<--Unencrypted--> C[(Origin server)]

## Use when

Cloudflare does not recommend setting your encryption mode to **Off**.

## Required setup

* [ Dashboard ](#tab-panel-10660)
* [ API ](#tab-panel-10661)

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

When you set your encryption mode to **Off**, your application:

* Leaves your visitors and your application [vulnerable to attacks ↗](https://www.cloudflare.com/learning/ssl/why-use-https/).
* Will be marked as "not secure" by Chrome and other browsers, reducing visitor trust.
* Will be penalized in [SEO rankings ↗](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

### Incompatible settings

When you set your SSL/TLS encryption mode to **Off**, you will not see the options for [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) or [**Onion Routing**](https://developers.cloudflare.com/network/onion-routing/).

[Authenticated Origin Pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) does not work when your [**SSL/TLS encryption mode**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.

  

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/#page","headline":"Off - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"No encryption is used for traffic between browsers and Cloudflare or between Cloudflare and origins. Everything is cleartext HTTP.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/ssl-modes/","name":"Encryption modes"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/ssl-modes/off/","name":"Off (no encryption)"}}]}
```
