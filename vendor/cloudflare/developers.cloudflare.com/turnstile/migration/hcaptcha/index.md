---
title: Migrate from hCaptcha
description: Migrate from hCaptcha to Cloudflare Turnstile.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate from hCaptcha

If you are using hCaptcha today, you can switch seamlessly to Cloudflare Turnstile by following the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](https://developers.cloudflare.com/turnstile/get-started/widget-management/).

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element:  
Turnstile script snippet  
```  
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>  
```
2. Locate the `hcaptcha.render()` calls and replace the sitekey with your Turnstile sitekey and the API.  
Render  
```  
  // before  
  hcaptcha.render(element, {  
      sitekey: "00000000-0000-0000-0000-000000000000"  
  })  
  // after  
  turnstile.render(element, {  
      sitekey: "1x00000000000000000000AA"  
  })  
```

Note

Turnstile supports:

* the `render()` call
* hCaptcha invisible mode with the `execute()` call

## Server-side integration

1. Update the server-side integration by replacing the Siteverify URL.  
Replace: `https://hcaptcha.com/siteverify` with the following:  
```  
https://challenges.cloudflare.com/turnstile/v0/siteverify  
```
2. Replace the `h-captcha-response` input name with the following:  
```  
cf-turnstile-response  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/migration/hcaptcha/#page","headline":"Migrate from hCaptcha · Cloudflare Turnstile docs","description":"Migrate from hCaptcha to Cloudflare Turnstile.","url":"https://developers.cloudflare.com/turnstile/migration/hcaptcha/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/migration/","name":"Migration"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/migration/hcaptcha/","name":"Migrate from hCaptcha"}}]}
```
