---
title: Mixed content errors
description: Fix mixed content errors caused by HTTP resources on HTTPS pages.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Mixed content errors

Domains added to Cloudflare receive SSL certificates and can serve traffic over HTTPS. However, after starting to use Cloudflare, some customers notice missing content or page rendering issues when they first serve HTTPS traffic.

Typically, the problem is due to a request for HTTP resources from a web page served over HTTPS. For example, you type `https://example.com` in a browser and the page contains an image reference via HTTP in the HTML to `<img src="http://example.com/resource.jpg">`.

Normally, if your website loads all resources securely over HTTPS, visitors observe a lock icon in the address bar of their browser.

This indicates your site has a working SSL certificate and all resources loaded by the site are loaded over HTTPS. The green lock assures visitors that their connection is safe. One of the [symptoms of mixed content](#symptoms-of-mixed-content-occurrence) is that different icons appear instead of the green lock icon.

---

## Symptoms of mixed content occurrence

Most modern browsers block HTTP requests on secure HTTPS pages. Blocked content can include images, JavaScript, CSS, or other content that affects how the page looks or behaves.

### Browser indications

Each web browser uses different methods to warn visitors about mixed content on a website, potentially including:

* A yellow triangle or information symbol beside the URL bar
* Messages mentioning "secure content"

### **Console logs**

For mixed content warnings, the web browser loads the resources but users do not see the lock icon in the URL. Warning messages appear within the browser’s debug tools:

![Screenshot of mixed content warnings displayed in a browser console.](https://developers.cloudflare.com/_astro/hc-import-mixed_content_warning.WfgcvXqC_Z29obV7.webp) 

For mixed content errors, the browser refuses to load the resources over an insecure connection:

![Screenshot of mixed content errors displayed in a browser console.](https://developers.cloudflare.com/_astro/hc-import-mixed_content_error.C3G5mm9r_129MlR.webp) 

Information on using the browser’s debug tools to locate these issues are found in the documentation for [Chrome ↗](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) and [Firefox ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed%5Fcontent). Alternatively, you can view your page source and find specific references of _http://_ for paths to other resources.

---

## Resolution

### General advice

There are two methods to resolve mixed content errors.

1. Load all resources via your HTML source without specifying the HTTP or HTTPS protocols. For example, using `/domain.com/path/to.file` instead of `http://domain.com/path/to.file`.
2. Depending on your Content Management System, check for plugins that automatically rewrite HTTP resources to HTTPS. Cloudflare provides such a service via [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites).

### WordPress users

Cloudflare recommends WordPress users to install the [Cloudflare WordPress plugin ↗](https://wordpress.org/plugins/cloudflare/) and enable the _Automatic HTTPS rewrites_ option within the plugin.

---

## Related resources

* [Debugging mixed content in Chrome ↗](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
* [Debugging mixed content in Firefox ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed%5Fcontent)
* [Community Tip - Fixing mixed content errors ↗](https://community.cloudflare.com/t/community-tip-fixing-mixed-content-errors/42476)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/#page","headline":"Mixed content errors · Cloudflare SSL/TLS docs","description":"Fix mixed content errors caused by HTTP resources on HTTPS pages.","url":"https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/troubleshooting/mixed-content-errors/","name":"Mixed content errors"}}]}
```
