---
title: Quickstart guide
description: Create your first Realtime SFU app and get your App ID and secret.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Quickstart guide

Before you get started:

You must first [create a Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).

## Create your first app

Every Realtime App is a separate environment, so you can make one for development, staging and production versions for your product. Either using [Dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/sfu), or the [API](https://developers.cloudflare.com/api/resources/calls/subresources/sfu/methods/create/) create a Realtime App. When you create a Realtime App, you will get:

* App ID
* App Secret

These two combined will allow you to make API Realtime from your backend server to Realtime.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/get-started/#page","headline":"Quickstart guide · Cloudflare Realtime docs","description":"Create your first Realtime SFU app and get your App ID and secret.","url":"https://developers.cloudflare.com/realtime/sfu/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/get-started/","name":"Quickstart guide"}}]}
```
