---
title: Enforce HTTPS connections
description: Force all visitor traffic to use HTTPS connections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enforce HTTPS connections

Even with an active SSL/TLS certificate, visitors can still access resources over unsecured HTTP connections.

It is best to redirect this traffic over HTTPS, as well as ensure other resources (such as images) are also loaded over HTTPS.

## Prerequisites

Before trying to enforce HTTPS connections, make sure that your application has an active [edge certificate](https://developers.cloudflare.com/ssl/get-started/#choose-an-edge-certificate). Otherwise, visitors will not be able to access your application at all.

Also, make sure that your [SSL encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is not set to **Off**. Otherwise, Cloudflare will redirect all visitor connections automatically to HTTP.

## 1\. Evaluate existing redirects

To make sure that your visitors do not get stuck in a [redirect loop](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/), evaluate existing redirects at your origin server and within the Cloudflare dashboard.

You should generally avoid redirects at your origin server. Not only are you likely to forget about them, but they also reduce application performance. It is much faster for Cloudflare to redirect requests before they ever reach your origin.

Make sure that your redirects within Cloudflare are not forwarding traffic to URLs starting with `http`.

## 2\. Rewrite HTTP URLs

If your application contains links or references to HTTP URLs, your visitors might see [mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) when accessing an HTTPS page.

To avoid these issues, enable [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) and pay attention to which HTTP requests are still reaching your origin server.

## 3\. Redirect traffic to HTTPS

If your entire application can support HTTPS traffic, enable [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/#encrypt-all-visitor-traffic).

If only some parts of your application can support HTTPS traffic, do not enable **Always Use HTTPS** and use a [single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) to selectively perform the redirect to HTTPS. Refer to [Redirect admin area requests to HTTPS](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/) for an example.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/#page","headline":"Enforce HTTPS connections · Cloudflare SSL/TLS docs","description":"Force all visitor traffic to use HTTPS connections.","url":"https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/encrypt-visitor-traffic/","name":"Enforce HTTPS connections"}}]}
```
