---
title: Migrate from reCAPTCHA
description: Migrate from Google reCAPTCHA to Cloudflare Turnstile.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate from reCAPTCHA

If you are using reCAPTCHA today, you can switch seamlessly to Cloudflare Turnstile by following the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](https://developers.cloudflare.com/turnstile/get-started/widget-management/).

Note

Turnstile migration is currently compatible up to reCAPTCHA v2.

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element.  
Turnstile script snippet  
```  
<script  
  src="https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha"  
  async  
  defer  
></script>  
```  
Note  
Adding `?compat=recaptcha` runs Turnstile in compatibility mode, which enables the following features:  
   * implicit rendering for reCAPTCHA  
   * `g-recaptcha-response` input name for forms  
   * register the Turnstile API as `grecaptcha`
2. Locate the `grecaptcha.render()` calls and replace the sitekey with your Turnstile sitekey.  
Note  
Turnstile supports:  
   * the `render()` call  
   * reCAPTCHA v2 invisible mode with the `execute()` call

## Server-side integration

Update the server-side integration by replacing the Siteverify URL.

Replace `https://www.google.com/recaptcha/api/siteverify` with the following:

```

https://challenges.cloudflare.com/turnstile/v0/siteverify


```

Differences to reCAPTCHA's Siteverify

reCAPTCHA supports `GET` requests using query parameters, such as `GET /siteverify?response=<response>&secret=<secret>`.

Turnstile's Siteverify endpoint does _not_ support this and only accepts `POST` requests with a FormData or JSON body.

Refer to [server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/migration/recaptcha/#page","headline":"Migrate from reCAPTCHA · Cloudflare Turnstile docs","description":"Migrate from Google reCAPTCHA to Cloudflare Turnstile.","url":"https://developers.cloudflare.com/turnstile/migration/recaptcha/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/migration/","name":"Migration"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/migration/recaptcha/","name":"Migrate from reCAPTCHA"}}]}
```
