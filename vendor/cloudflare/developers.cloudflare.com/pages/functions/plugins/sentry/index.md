---
title: Sentry
description: Capture and log exceptions in Pages Functions using the Sentry Pages Plugin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sentry

Note

Sentry now provides official support for Cloudflare Workers and Pages. Refer to the [Sentry documentation ↗](https://docs.sentry.io/platforms/javascript/guides/cloudflare/) for more details.

The Sentry Pages Plugin captures and logs all exceptions which occur below it in the execution chain of your Pages Functions. It is therefore recommended that you install this Plugin at the root of your application in `functions/_middleware.ts` as the very first Plugin.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-sentry
```

```
yarn add @cloudflare/pages-plugin-sentry
```

```
pnpm add @cloudflare/pages-plugin-sentry
```

```
bun add @cloudflare/pages-plugin-sentry
```

## Usage

TypeScript

```

import sentryPlugin from "@cloudflare/pages-plugin-sentry";


export const onRequest: PagesFunction = sentryPlugin({

  dsn: "https://sentry.io/welcome/xyz",

});


```

The Plugin uses [Toucan ↗](https://github.com/robertcepa/toucan-js). Refer to the Toucan README to [review the options it can take ↗](https://github.com/robertcepa/toucan-js#other-options). `context`, `request`, and `event` are automatically populated and should not be manually configured.

If your [DSN ↗](https://docs.sentry.io/product/sentry-basics/dsn-explainer/) is held as an environment variable or in KV, you can access it like so:

TypeScript

```

import sentryPlugin from "@cloudflare/pages-plugin-sentry";


export const onRequest: PagesFunction<{

  SENTRY_DSN: string;

}> = (context) => {

  return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);

};


```

TypeScript

```

import sentryPlugin from "@cloudflare/pages-plugin-sentry";


export const onRequest: PagesFunction<{

  KV: KVNamespace;

}> = async (context) => {

  return sentryPlugin({ dsn: await context.env.KV.get("SENTRY_DSN") })(context);

};


```

### Additional context

If you need to set additional context for Sentry (for example, user information or additional logs), use the `data.sentry` instance in any Function below the Plugin in the execution chain.

For example, you can access `data.sentry` and set user information like so:

TypeScript

```

import type { PluginData } from "@cloudflare/pages-plugin-sentry";


export const onRequest: PagesFunction<unknown, any, PluginData> = async ({

  data,

  next,

}) => {

  // Authenticate the user from the request and extract user's email address

  const email = await getEmailFromRequest(request);


  data.sentry.setUser({ email });


  return next();

};


```

Again, the full list of features can be found in [Toucan's documentation ↗](https://github.com/robertcepa/toucan-js#features).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/sentry/#page","headline":"Sentry · Cloudflare Pages docs","description":"Capture and log exceptions in Pages Functions using the Sentry Pages Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/sentry/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/sentry/","name":"Sentry"}}]}
```
