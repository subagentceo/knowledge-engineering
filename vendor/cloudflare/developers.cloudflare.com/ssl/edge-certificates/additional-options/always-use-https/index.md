---
title: Always Use HTTPS
description: Redirect all HTTP requests to HTTPS for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Always Use HTTPS

Always Use HTTPS redirects all your visitor requests from `http` to `https`, for all subdomains and hosts in your application.

Note

This process does not impact certificate validation. If you use [HTTP DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/), you can still enable Always Use HTTPS.

Cloudflare recommends not performing redirects at your origin web server, as this can cause [redirect loop errors](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Encrypt all visitor traffic

To redirect traffic for all subdomains and hosts in your application, you can enable **Always Use HTTPS**.

Note

If only some parts of your application can support HTTPS traffic, do not enable **Always Use HTTPS** and use a [single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) to selectively perform the redirect to HTTPS. Refer to [Redirect admin area requests to HTTPS](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/) for an example.

* [ Dashboard ](#tab-panel-10580)
* [ API ](#tab-panel-10581)

To enable **Always Use HTTPS** in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/) is not set to **Off**. When you set your encryption mode to **Off**, the **Always Use HTTPS** option will not be visible in your Cloudflare dashboard.
3. Go to the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page.
4. Turn on **Always Use HTTPS**.

To enable or disable **Always Use HTTPS** with the API:

1. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/) **is not** set to **Off**.
2. Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `always_use_https` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

## Limitations

Forcing HTTPS does not resolve issues with [mixed content](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/), as browsers check the protocol of included resources before making a request. You will need to use only relative links or HTTPS links on pages that you force to HTTPS. Cloudflare can automatically resolve some mixed-content links using our [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) functionality.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/#page","headline":"Always Use HTTPS · Cloudflare SSL/TLS docs","description":"Redirect all HTTP requests to HTTPS for your domain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/always-use-https/","name":"Always Use HTTPS"}}]}
```
