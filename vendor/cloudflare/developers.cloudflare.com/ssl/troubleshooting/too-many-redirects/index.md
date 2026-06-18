---
title: ERR_TOO_MANY_REDIRECTS
description: Learn how to troubleshoot ERR_TOO_MANY_REDIRECTS when using Cloudflare SSL/TLS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ERR\_TOO\_MANY\_REDIRECTS

After you [add a new domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare, your visitors' browsers might display `ERR_TOO_MANY_REDIRECTS` or `The page isn’t redirecting properly` errors.

This error occurs when visitors get stuck in a redirect loop.

flowchart LR
accTitle: Redirect loops illustration
A[Request for <code>http://</code><code>example.com</code>] --> B[Redirect to <code>https://</code><code>example.com</code>]
B --> C[Redirect to <code>http://</code><code>example.com</code>]
C --> B
subgraph Redirect Loop
B
C
end

  
This error is commonly caused by:

* A misconfiguration of your [SSL/TLS Encryption mode](#encryption-mode-misconfigurations).
* Various settings on the [**Edge Certificates**](#edge-certificate-settings) page.
* A misconfigured [redirect rule](#redirect-rules).

Note

For assistance determining if your origin web server is responding with redirects, contact your hosting provider or site administrator.

---

## Encryption mode misconfigurations

Your domain's [SSL/TLS Encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) controls how Cloudflare connects to your origin server and how SSL certificates presented by your origin will be validated.

This setting can cause redirect loops when the value you set in Cloudflare conflicts with the settings at your origin web server.

### Flexible encryption mode

If your domain's encryption mode is set to [**Flexible**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/), Cloudflare sends unencrypted requests to your origin server over HTTP.

Redirect loops will occur if your origin server automatically redirects all HTTP requests to HTTPS.

flowchart TD
accTitle: Redirect loops illustration for Flexible mode
A[Request for <code>https://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>http://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>https://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end

  
To solve this issue, either remove HTTPS redirects from your origin server or update your SSL/TLS Encryption Mode to be [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or higher (requires an SSL certificate configured at your origin server).

### Full or Full (strict) encryption mode

If your domain's encryption mode is set to [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), Cloudflare sends encrypted requests to your origin server over HTTPS.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP.

flowchart TD
accTitle: Redirect loops illustration for Full or Full (strict) mode
A[Request for <code>http://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>https://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>http://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end

  
To solve this issue, remove HTTP redirects from your origin server.

---

## Edge certificate settings

### Always use HTTPS

If you have [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) enabled for your domain, Cloudflare redirects all `http` requests to `https` for all subdomains and hosts in your application.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP.

flowchart TD
accTitle: Redirect loops illustration for Always Use HTTPS
A[Request for <code>http://</code><code>example.com</code>] --> B[Always Use HTTPS redirects to <code>https://</code><code>example.com</code>]
B --> C[Origin server redirects to <code>http://</code><code>example.com</code>]
C --> B
subgraph Cloudflare
B
end
subgraph Origin server
C
end

  
To solve this issue, remove HTTPS redirects from your origin server or [disable **Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).

### HSTS

If you have [**HTTP Strict Transport Security (HSTS)**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) enabled for your domain, Cloudflare directs compliant web browsers to transform `http` links to `https` links.

Redirect loops will occur if your origin server automatically redirects all HTTPS requests to HTTP or if you have your domain's encryption mode set to [**Off**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/).

flowchart TD
accTitle: Redirect loops illustration for HTTP Strict Transport Security
A[Request for <code>https://</code><code>example.com</code>] --> B[Encryption mode redirects to <code>http://</code><code>example.com</code>]
B --> C[HSTS redirects to <code>https://</code><code>example.com</code>]
C --> B
C --> D[Origin server redirects to <code>http://</code><code>example.com</code>]
D --> C
subgraph Cloudflare
B
C
end
subgraph Origin server
D
end

  
To solve this issue, remove HTTPS redirects from your origin server and make sure your domain's encryption mode is [**Flexible**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/) or higher.

Alternatively, [disable **HTTP Strict Transport Security (HSTS)**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/).

---

## Redirect rules

Redirect loops can also occur if you have conflicting URL redirects.

flowchart TD
accTitle: Redirect loops illustration for redirect rules
A[Request for <code>https://</code><code>a.example.com</code>] --> B[Redirect to <code>http://</code><code>b.example.com</code>]
B --> C[Redirect to <code>https://</code><code>a.example.com</code>]
C --> B
subgraph Cloudflare
B
C
end

  
To solve this issue, review your various [redirect rules](https://developers.cloudflare.com/rules/url-forwarding/) and [Page Rules](https://developers.cloudflare.com/rules/page-rules/) to make sure no rules are not in conflict with each other.

Note

To reduce the potential for redirect loops and [mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/), Cloudflare recommends WordPress users to install the [Cloudflare WordPress plugin ↗](https://wordpress.org/plugins/cloudflare/) at their origin web server and enable the _Automatic HTTPS rewrites_ option within the plugin.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/#page","headline":"ERR_TOO_MANY_REDIRECTS · Cloudflare SSL/TLS docs","description":"Learn how to troubleshoot ERR\\_TOO\\_MANY\\_REDIRECTS when using Cloudflare SSL/TLS.","url":"https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/troubleshooting/too-many-redirects/","name":"ERR_TOO_MANY_REDIRECTS"}}]}
```
