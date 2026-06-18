---
title: Wrangler
description: Use Wrangler, a command-line tool, to deploy projects using Cloudflare's Workers Browser Run API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

Use Wrangler to deploy projects that use the Workers Browser Run API.

## Install

To install Wrangler, refer to [Install and Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Bindings

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. A browser binding will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

To deploy a Browser Run Worker, you must declare a [browser binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your Worker's Wrangler configuration file.

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

* [  wrangler.jsonc ](#tab-panel-6927)
* [  wrangler.toml ](#tab-panel-6928)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Top-level configuration

  "name": "browser-rendering",

  "main": "src/index.ts",

  "workers_dev": true,

  "compatibility_flags": ["nodejs_compat_v2"],

  "browser": {

    "binding": "MYBROWSER",

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "browser-rendering"

main = "src/index.ts"

workers_dev = true

compatibility_flags = [ "nodejs_compat_v2" ]


[browser]

binding = "MYBROWSER"


```

After the binding is declared, access the DevTools endpoint using `env.MYBROWSER` in your Worker code:

JavaScript

```

const browser = await puppeteer.launch(env.MYBROWSER);


```

Quick Actions compatibility

The browser binding's `.quickAction()` method requires a compatibility date of `2026-03-24` or later. Ensure your `wrangler.json` includes:

JSONC

```

{

  "compatibility_date": "2026-03-24"

}


```

Quick Actions require remote mode for local development

The `.quickAction()` method is not yet supported in local development mode. When using `wrangler dev`, you must run with `--remote` or set `"remote": true` in your browser binding configuration:

JSONC

```

{

  "browser": {

    "binding": "MYBROWSER",

    "remote": true

  }

}


```

Without remote mode, calls to `.quickAction()` will fail with: `The RPC receiver does not implement the method "quickAction"`.

For Puppeteer, Playwright, or CDP-based Workers, run `npx wrangler dev` to test locally. For Quick Actions via `.quickAction()`, use `npx wrangler dev --remote` as noted above.

### Headful mode (experimental)

By default, local development runs Chrome in headless mode. To launch Chrome in visible (headful) mode for debugging, set the `X_BROWSER_HEADFUL` environment variable:

Terminal window

```

X_BROWSER_HEADFUL=true npx wrangler dev


```

This opens a browser window on screen so you can watch navigations, interactions, and rendering in real time. Headful mode is for local development only and does not affect deployed Workers. This feature is experimental and may change without notice.

Note

When using [@cloudflare/playwright](https://developers.cloudflare.com/browser-run/playwright/), two Chrome windows may appear. This is expected behavior due to how Playwright handles browser contexts via CDP.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/wrangler/#page","headline":"Wrangler · Cloudflare Browser Run docs","description":"Use Wrangler, a command-line tool, to deploy projects using Cloudflare's Workers Browser Run API.","url":"https://developers.cloudflare.com/browser-run/reference/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/wrangler/","name":"Wrangler"}}]}
```
