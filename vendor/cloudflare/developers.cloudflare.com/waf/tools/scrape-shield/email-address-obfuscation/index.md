---
title: Email Address Obfuscation
description: Hide email addresses from bots while keeping them visible to visitors.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email Address Obfuscation

By enabling Cloudflare Email Address Obfuscation, email addresses on your web page will be hidden from bots, while keeping them visible to humans. In fact, there are no visible changes to your website for visitors.

## Background

Email harvesters and other bots roam the Internet looking for email addresses to add to lists that target recipients for spam. This trend results in an increasing amount of unwanted email.

Web administrators have come up with clever ways to protect against this by writing out email addresses, such as `help [at] cloudflare [dot] com` or by using embedded images of the email address. However, you lose the convenience of clicking on the email address to automatically send an email. By enabling Cloudflare Email Address Obfuscation, email addresses on your web page will be obfuscated (hidden) from bots, while keeping them visible to humans. In fact, there are no visible changes to your website for visitors.

## How it works

When Email Address Obfuscation is enabled, Cloudflare replaces visible email addresses in your HTML with links like `[email protected]`. If a visitor sees this obfuscated format, they can click the link to reveal the actual email address. This approach prevents bots from scraping email addresses while keeping them accessible to real users.

Cloudflare injects a small decode script (`email-decode.min.js`) into the page using the `defer` attribute. This means the script does not block page rendering. It downloads in parallel with HTML parsing and executes after the document is fully parsed. If you have custom JavaScript that interacts with obfuscated email elements, note that the decode script runs before the `DOMContentLoaded` event.

## Change Email Address Obfuscation setting

Cloudflare enables email address obfuscation automatically when you sign up.

* [  New dashboard ](#tab-panel-11269)
* [ Old dashboard ](#tab-panel-11270)
* [ API ](#tab-panel-11271)

To disable **Email Address Obfuscation** in the dashboard:

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. For **Email Address Obfuscation**, switch the toggle to **Off**.

To disable **Email Address Obfuscation** in the dashboard:

1. In the Cloudflare dashboard, go to the **Scrape Shield** page.  
[ Go to **Scrape Shield** ](https://dash.cloudflare.com/?to=/:account/:zone/content-protection)
2. For **Email Address Obfuscation**, switch the toggle to **Off**.

To disable **Email Address Obfuscation** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `email_obfuscation` as the setting name in the URI path, and the `value` parameter set to `"off"`.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

## Prevent Cloudflare from obfuscating email

To prevent Cloudflare from obfuscating specific email addresses, you can:

* Add the following comment in the page HTML code:  
```  
<!--email_off-->contact@example.com<!--/email_off-->  
```
* Return email addresses in JSON format for AJAX calls, making sure your web server returns a content type of `application/json`.
* Disable the Email Obfuscation feature by creating a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) to be applied on a specific endpoint.

---

## Troubleshoot email obfuscation

To prevent unexpected website behavior, email addresses are not obfuscated when they appear in:

* Any HTML tag attribute, except for the `href` attribute of the `a` tag.
* Other HTML tags:  
   * `<script></script>`  
   * `<noscript></noscript>`  
   * `<textarea></textarea>`  
   * `<xmp></xmp>`  
   * `<head></head>`
* Any page that does not have a MIME type of `text/html` or `application/xhtml+xml`.

Notes

* Email Obfuscation will not apply in the following cases:  
   * You are using the `Cache-Control: no-transform` header.  
   * The HTML/JavaScript code is specifically added by a [Worker](https://developers.cloudflare.com/workers/).
* Email Obfuscation might not work as expected when the HTML page includes `<template></template>` tags.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/#page","headline":"Email Address Obfuscation · Cloudflare Web Application Firewall (WAF) docs","description":"Hide email addresses from bots while keeping them visible to visitors.","url":"https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/scrape-shield/","name":"Scrape Shield"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/scrape-shield/email-address-obfuscation/","name":"Email Address Obfuscation"}}]}
```
