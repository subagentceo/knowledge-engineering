---
title: Query D1 from Hono
description: Query D1 from the Hono web framework
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query D1 from Hono

**Last reviewed:**  almost 3 years ago 

Query D1 from the Hono web framework

Hono is a fast web framework for building API-first applications, and it includes first-class support for both [Workers](https://developers.cloudflare.com/workers/) and [Pages](https://developers.cloudflare.com/pages/).

When using Workers:

* Ensure you have configured your [Wrangler configuration file](https://developers.cloudflare.com/d1/get-started/#3-bind-your-worker-to-your-d1-database) to bind your D1 database to your Worker.
* You can access your D1 databases via Hono's [Context ↗](https://hono.dev/api/context) parameter: [bindings ↗](https://hono.dev/getting-started/cloudflare-workers#bindings) are exposed on `context.env`. If you configured a [binding](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases) named `DB`, then you would access [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/prepared-statements/) methods via `c.env.DB`.
* Refer to the Hono documentation for [Cloudflare Workers ↗](https://hono.dev/getting-started/cloudflare-workers).

If you are using [Pages Functions](https://developers.cloudflare.com/pages/functions/):

1. Bind a D1 database to your [Pages Function](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases).
2. Pass the `--d1 BINDING_NAME=DATABASE_ID` flag to `wrangler dev` when developing locally. `BINDING_NAME` should match what call in your code, and `DATABASE_ID` should match the `database_id` defined in your Wrangler configuration file: for example, `--d1 DB=xxxx-xxxx-xxxx-xxxx-xxxx`.
3. Refer to the Hono guide for [Cloudflare Pages ↗](https://hono.dev/getting-started/cloudflare-pages).

The following examples show how to access a D1 database bound to `DB` from both a Workers script and a Pages Function:

* [ workers ](#tab-panel-7884)
* [ pages ](#tab-panel-7885)

TypeScript

```

import { Hono } from "hono";


// This ensures c.env.DB is correctly typed

type Bindings = {

  DB: D1Database;

};


const app = new Hono<{ Bindings: Bindings }>();


// Accessing D1 is via the c.env.YOUR_BINDING property

app.get("/query/users/:id", async (c) => {

  const userId = c.req.param("id");

  try {

    let { results } = await c.env.DB.prepare(

      "SELECT * FROM users WHERE user_id = ?",

    )

      .bind(userId)

      .run();

    return c.json(results);

  } catch (e) {

    return c.json({ err: "Failed to query user" }, 500);

  }

});


// Export our Hono app: Hono automatically exports a

// Workers 'fetch' handler for you

export default app;


```

TypeScript

```

import { Hono } from "hono";

import { handle } from "hono/cloudflare-pages";


// This ensures c.env.DB is correctly typed

type Bindings = {

  DB: D1Database;

};


const app = new Hono<{ Bindings: Bindings }>().basePath("/api");


// Accessing D1 is via the c.env.YOUR_BINDING property

app.get("/query/users/:id", async (c) => {

  const userId = c.req.param("id");

  try {

    let { results } = await c.env.DB.prepare(

      "SELECT * FROM users WHERE user_id = ?",

    )

      .bind(userId)

      .run();

    return c.json(results);

  } catch (e) {

    return c.json({ err: "Failed to query user" }, 500);

  }

});


// Export the Hono instance as a Pages onRequest function

export const onRequest = handle(app);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/examples/d1-and-hono/#page","headline":"Query D1 from Hono · Cloudflare D1 docs","description":"Query D1 from the Hono web framework","url":"https://developers.cloudflare.com/d1/examples/d1-and-hono/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Hono"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/examples/d1-and-hono/","name":"Query D1 from Hono"}}]}
```
