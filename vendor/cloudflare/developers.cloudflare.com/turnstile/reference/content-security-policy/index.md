---
title: Content Security Policy
description: Content Security Policy directives required for Turnstile widgets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Content Security Policy

If your website uses a [Content Security Policy (CSP) ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header, you must configure it to allow Turnstile's scripts and iframes. Without the correct CSP directives, Turnstile may fail to load.

Cloudflare recommends using the nonce-based approach documented with [CSP3 ↗](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Include your nonce in the `api.js` script tag and Turnstile will propagate it to dynamically loaded resources. Turnstile works with [strict-dynamic ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#strict-dynamic).

Alternatively, add the following values to your CSP header:

* **script-src**: `https://challenges.cloudflare.com`
* **frame-src**: `https://challenges.cloudflare.com`

We recommend validating your CSP with [Google's CSP Evaluator ↗](https://csp-evaluator.withgoogle.com/).

Note

You cannot set your own CSP and/or Referer-Policy via meta tags or [Transform rules](https://developers.cloudflare.com/rules/transform/) in challenge pages.

## Pre-clearance support

If you are using [Turnstile in pre-clearance mode](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#pre-clearance-support-in-turnstile), Turnstile sets the `cf_clearance` cookie by doing a fetch request to a special endpoint in [/cdn-cgi/](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/) of your domain.

For this request to succeed, your `connect-src` directive must include `'self'`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/reference/content-security-policy/#page","headline":"Content Security Policy · Cloudflare Turnstile docs","description":"Content Security Policy directives required for Turnstile widgets.","url":"https://developers.cloudflare.com/turnstile/reference/content-security-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CSP","Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/reference/content-security-policy/","name":"Content Security Policy"}}]}
```
