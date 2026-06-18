---
title: Rotate secret key
description: Rotate your Turnstile secret key for security or key compromise.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rotate secret key

You can rotate the secret key using the following steps:

1. In the Cloudflare dashboard, go to the **Turnstile** page.  
[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. [Create a new Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/).
3. In the widget overview, select **Settings** \> **Rotate Secret Key**.
4. Configure your website to use the new secret key.

The rotation occurs over the course of two hours. During this time, both the old secret key and the new secret key are valid. This allows you to swap the secret key while avoiding any issues with your website.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/#page","headline":"Rotate secret key · Cloudflare Turnstile docs","description":"Rotate your Turnstile secret key for security or key compromise.","url":"https://developers.cloudflare.com/turnstile/troubleshooting/rotate-secret-key/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/troubleshooting/rotate-secret-key/","name":"Rotate secret key"}}]}
```
