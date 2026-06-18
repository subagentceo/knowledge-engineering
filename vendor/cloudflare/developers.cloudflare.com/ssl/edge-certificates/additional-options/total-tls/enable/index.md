---
title: Enable
description: Enable Total TLS to issue certificates for all subdomains.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable

To enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) \- which issues individual certificates for your proxied hostnames - follow these instructions:

* [ Dashboard ](#tab-panel-10598)
* [ API ](#tab-panel-10599)

To enable Total TLS in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Total TLS**, switch the toggle to **On** and - if desired - choose an issuing **Certificate Authority**.

To enable Total TLS with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/acm/subresources/total%5Ftls/methods/create/) request with the `enabled` parameter set to your desired setting (`true` or `false`).

You can also specify a desired certificate authority by adding a value to the `certificate_authority` parameter.

## Aspects to consider

* Total TLS certificates follow the Common Name (CN) restriction of 64 characters ([RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280.html)). If you have a hostname that exceeds this length, you can create an [Advanced Certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) via API to cover it.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/#page","headline":"Enable Total TLS · Cloudflare SSL/TLS docs","description":"Enable Total TLS to issue certificates for all subdomains.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/total-tls/","name":"Total TLS"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/total-tls/enable/","name":"Enable"}}]}
```
