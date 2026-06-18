---
title: Disable Universal SSL certificates
description: Turn off Universal SSL certificates for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Disable Universal SSL certificates

Some customers may need to manage their own SSL certificates or rely on specific Certificate Authorities.

If you disable your domain's Universal SSL certificate, Cloudflare removes that certificate from our network and will not order or renew any additional Universal SSL certificates.

Disabling Universal SSL will not cause any interruption to ongoing TLS connections to your domain on Cloudflare's network, they will continue to be served according the the Universal SSL certificate used when they were first established. Eventually these connections will naturally end.

New TLS connections are expected to succeed as long as you have another valid certificate active, such as a [custom](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)) or [advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) certificate. New TLS connections will receive the highest priority certificate from our edge as per our [certificate and hostname priority](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/). If a valid certificate is not active before disabling, TLS connections will fail. For more information, refer to [Potential errors](#potential-errors) below.

## Potential errors

To avoid errors with your domain, either [upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) or purchase [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) before disabling Universal SSL.

If you disable Universal SSL, you may experience errors with the following scenarios:

* **Enabled features**:  
   * [HTTP Strict Transport Security (HSTS)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/)  
   * [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)  
   * [Opportunistic Encryption](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption/)
* **Other setups**:  
   * [Page Rules](https://developers.cloudflare.com/rules/page-rules/) that redirect traffic to HTTPS  
   * HTTP to HTTPS redirects at your origin web server

## Disable Universal SSL certificate

Before you disable Universal SSL/TLS, make sure you have [uploaded a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) or purchased [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) to protect your domain.

* [ Dashboard ](#tab-panel-10616)
* [ API ](#tab-panel-10617)

To disable Universal SSL in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Disable Universal SSL**, select **Disable Universal SSL**.
3. Read the warnings in the **Acknowledgement**.
4. Select **I Understand** and select **Confirm**.

To disable Universal SSL with the Cloudflare API, send a [PATCH](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/edit/) request and include the `"enabled": false` parameter.

## Re-enable Universal SSL

* [ Dashboard ](#tab-panel-10618)
* [ API ](#tab-panel-10619)

To re-enable Universal SSL in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Disable Universal SSL**, select **Enable Universal SSL**.

To re-enable Universal SSL with the Cloudflare API, send a [PATCH](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/edit/) request and include the `"enabled": true` parameter.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/disable-universal-ssl/#page","headline":"Disable Universal SSL certificates · Cloudflare SSL/TLS docs","description":"Turn off Universal SSL certificates for your domain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/disable-universal-ssl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/universal-ssl/","name":"Universal SSL"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/universal-ssl/disable-universal-ssl/","name":"Disable Universal SSL certificates"}}]}
```
