---
title: Opportunistic Encryption
description: Serve HTTP sites over an encrypted TLS channel.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Opportunistic Encryption

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2\. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Enable Opportunistic Encryption

You do not need to configure your origin web server to support Opportunistic Encryption. All it requires is updating your settings in the Cloudflare dashboard.

* [ Dashboard ](#tab-panel-10594)
* [ API ](#tab-panel-10595)

To enable Opportunistic Encryption in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Opportunistic Encryption**, switch the toggle to **On**.

To adjust your Opportunistic Encryption settings with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `opportunistic_encryption` as the setting name in the URI path, and specify the `value` parameter with your desired setting (`"on"` or `"off"`).

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/#page","headline":"Opportunistic Encryption · Cloudflare SSL/TLS docs","description":"Serve HTTP sites over an encrypted TLS channel.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/opportunistic-encryption/","name":"Opportunistic Encryption"}}]}
```
