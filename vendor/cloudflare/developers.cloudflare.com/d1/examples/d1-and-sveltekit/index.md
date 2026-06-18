---
title: Query D1 from SvelteKit
description: Query a D1 database from a SvelteKit application.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query D1 from SvelteKit

**Last reviewed:**  almost 3 years ago 

Query a D1 database from a SvelteKit application.

[SvelteKit ↗](https://kit.svelte.dev/) is a full-stack framework that combines the Svelte front-end framework with Vite for server-side capabilities and rendering. You can query D1 from SvelteKit by configuring a [server endpoint ↗](https://kit.svelte.dev/docs/routing#server) with a binding to your D1 database(s).

To set up a new SvelteKit site on Cloudflare Pages that can query D1:

1. **Refer to [the SvelteKit guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/) and Svelte's [Cloudflare adapter ↗](https://kit.svelte.dev/docs/adapter-cloudflare)**.
2. Install the Cloudflare adapter within your SvelteKit project: `npm i -D @sveltejs/adapter-cloudflare`.
3. Bind a D1 database [to your Pages Function](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases).
4. Pass the `--d1 BINDING_NAME=DATABASE_ID` flag to `wrangler dev` when developing locally. `BINDING_NAME` should match what call in your code, and `DATABASE_ID` should match the `database_id` defined in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/): for example, `--d1 DB=xxxx-xxxx-xxxx-xxxx-xxxx`.

The following example shows you how to create a server endpoint configured to query D1.

* Bindings are available on the `platform` parameter passed to each endpoint, via `platform.env.BINDING_NAME`.
* With SvelteKit's [file-based routing ↗](https://kit.svelte.dev/docs/routing), the server endpoint defined in `src/routes/api/users/+server.ts` is available at `/api/users` within your SvelteKit app.

The example also shows you how to configure both your app-wide types within `src/app.d.ts` to recognize your `D1Database` binding, import the `@sveltejs/adapter-cloudflare` adapter into `svelte.config.js`, and configure it to apply to all of your routes.

* [  TypeScript ](#tab-panel-7887)

TypeScript

```

import type { RequestHandler } from "@sveltejs/kit";


export async function GET({ request, platform }) {

  try {

    let result = await platform.env.DB.prepare(

      "SELECT * FROM users LIMIT 5",

    ).run();

    return new Response(JSON.stringify(result), {

      headers: { "Content-Type": "application/json" },

    });

  } catch (error) {

    return Response.json({ error: "Failed to fetch users" }, {

      status: 500

    });

  }

}


```

TypeScript

```

// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces

declare global {

  namespace App {

    // interface Error {}

    // interface Locals {}

    // interface PageData {}

    interface Platform {

      env: {

        DB: D1Database;

      };

      context: {

        waitUntil(promise: Promise<any>): void;

      };

      caches: CacheStorage & { default: Cache };

    }

  }

}


export {};


```

JavaScript

```

import adapter from "@sveltejs/adapter-cloudflare";


export default {

  kit: {

    adapter: adapter({

      // See below for an explanation of these options

      routes: {

        include: ["/*"],

        exclude: ["<all>"],

      },

    }),

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/examples/d1-and-sveltekit/#page","headline":"Query D1 from SvelteKit · Cloudflare D1 docs","description":"Query a D1 database from a SvelteKit application.","url":"https://developers.cloudflare.com/d1/examples/d1-and-sveltekit/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SvelteKit","Svelte"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/examples/d1-and-sveltekit/","name":"Query D1 from SvelteKit"}}]}
```
