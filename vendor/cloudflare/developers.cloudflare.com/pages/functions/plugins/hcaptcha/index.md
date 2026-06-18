---
title: hCaptcha
description: Validate hCaptcha tokens in Pages Functions using the hCaptcha Pages Plugin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# hCaptcha

The hCaptcha Pages Plugin validates hCaptcha tokens.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-hcaptcha
```

```
yarn add @cloudflare/pages-plugin-hcaptcha
```

```
pnpm add @cloudflare/pages-plugin-hcaptcha
```

```
bun add @cloudflare/pages-plugin-hcaptcha
```

## Usage

TypeScript

```

import hCaptchaPlugin from "@cloudflare/pages-plugin-hcaptcha";


export const onRequestPost: PagesFunction[] = [

  hCaptchaPlugin({

    secret: "0x0000000000000000000000000000000000000000",

    sitekey: "10000000-ffff-ffff-ffff-000000000001",

  }),

  async (context) => {

    // Request has been validated as coming from a human


    const formData = await context.request.formData();


    // Store user credentials


    return new Response("Successfully registered!");

  },

];


```

This Plugin only exposes a single route. It will be available wherever it is mounted. In the above example, because it is mounted in `functions/register.ts`, it will validate requests to `/register`. The Plugin is mounted with a single object parameter with the following properties.

[secret ↗](https://dashboard.hcaptcha.com/settings) (mandatory) and [sitekey ↗](https://dashboard.hcaptcha.com/sites) (optional) can both be found in your hCaptcha dashboard.

`response` and `remoteip` are optional strings. `response` the hCaptcha token to verify (defaults to extracting `h-captcha-response` from a `multipart/form-data` request). `remoteip` should be requester's IP address (defaults to the `CF-Connecting-IP` header of the request).

`onError` is an optional function which takes the Pages Function context object and returns a `Promise` of a `Response`. By default, it will return a human-readable error `Response`.

`data.hCaptcha` will be populated in subsequent Pages Functions (including for the `onError` function) with [the hCaptcha response object ↗](https://docs.hcaptcha.com/#verify-the-user-response-server-side).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/hcaptcha/#page","headline":"hCaptcha · Cloudflare Pages docs","description":"Validate hCaptcha tokens in Pages Functions using the hCaptcha Pages Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/hcaptcha/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/hcaptcha/","name":"hCaptcha"}}]}
```
