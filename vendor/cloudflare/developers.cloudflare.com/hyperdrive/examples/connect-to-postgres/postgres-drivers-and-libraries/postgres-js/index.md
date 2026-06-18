---
title: Postgres.js
description: Use Postgres.js with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Postgres.js

**Last reviewed:**  about 1 year ago 

[Postgres.js ↗](https://github.com/porsager/postgres) is a modern, fully-featured PostgreSQL driver for Node.js. This example demonstrates how to use Postgres.js with Cloudflare Hyperdrive in a Workers application.

Recommended driver

[Node-postgres ↗](https://node-postgres.com/) (`pg`) is the recommended driver for connecting to your Postgres database from JavaScript or TypeScript Workers. It has the best compatibility with Hyperdrive's caching and is commonly available with popular ORM libraries. [Postgres.js ↗](https://github.com/porsager/postgres) is also supported.

Install [Postgres.js ↗](https://github.com/porsager/postgres):

 npm  yarn  pnpm  bun 

```
npm i postgres@>3.4.5
```

```
yarn add postgres@>3.4.5
```

```
pnpm add postgres@>3.4.5
```

```
bun add postgres@>3.4.5
```

Note

The minimum version of `postgres-js` required for Hyperdrive is `3.4.5`.

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

* [  wrangler.jsonc ](#tab-panel-8807)
* [  wrangler.toml ](#tab-panel-8808)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<your-hyperdrive-id-here>"

    }

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<your-hyperdrive-id-here>"


```

Create a Worker that connects to your PostgreSQL database via Hyperdrive:

TypeScript

```

// filepath: src/index.ts

import postgres from "postgres";


export default {

  async fetch(

    request: Request,

    env: Env,

    ctx: ExecutionContext,

  ): Promise<Response> {

    // Create a database client that connects to your database via Hyperdrive.

    // Hyperdrive maintains the underlying database connection pool,

    // so creating a new client on each request is fast and recommended.

    const sql = postgres(env.HYPERDRIVE.connectionString, {

      // Limit the connections for the Worker request to 5 due to Workers' limits on concurrent external connections

      max: 5,

      // If you are not using array types in your Postgres schema, disable `fetch_types` to avoid an additional round-trip (unnecessary latency)

      fetch_types: false,


      // This is set to true by default, but certain query generators such as Kysely or queries using sql.unsafe() will set this to false. Hyperdrive will not cache prepared statements when this option is set to false and will require additional round-trips.

      prepare: true,

    });


    try {

      // A very simple test query

      const result = await sql`select * from pg_tables`;


      // Return result rows as JSON

      return Response.json({ success: true, result: result });

    } catch (e: any) {

      console.error("Database error:", e.message);


      return Response.error();

    }

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/#page","headline":"Postgres.js · Cloudflare Hyperdrive docs","description":"Use Postgres.js with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/","name":"Libraries and Drivers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/","name":"Postgres.js"}}]}
```
