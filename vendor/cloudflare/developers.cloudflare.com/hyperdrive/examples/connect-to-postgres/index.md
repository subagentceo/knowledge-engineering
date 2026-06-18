---
title: Connect to PostgreSQL
description: Use Hyperdrive to connect to PostgreSQL and PostgreSQL-compatible databases from Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to PostgreSQL

Hyperdrive supports PostgreSQL and PostgreSQL-compatible databases, [popular drivers](#supported-drivers) and Object Relational Mapper (ORM) libraries that use those drivers.

## Create a Hyperdrive

Note

New to Hyperdrive? Refer to the [Get started guide](https://developers.cloudflare.com/hyperdrive/get-started/) to learn how to set up your first Hyperdrive.

To create a Hyperdrive that connects to an existing PostgreSQL database, use the [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).

When using wrangler, replace the placeholder value provided to `--connection-string` with the connection string for your database:

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive create my-first-hyperdrive --connection-string="postgres://user:password@database.host.example.com:5432/databasenamehere"


```

The command above will output the ID of your Hyperdrive, which you will need to set in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project:

* [  wrangler.jsonc ](#tab-panel-8705)
* [  wrangler.toml ](#tab-panel-8706)

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

This will allow Hyperdrive to generate a dynamic connection string within your Worker that you can pass to your existing database driver. Refer to [Driver examples](#driver-examples) to learn how to set up a database driver with Hyperdrive.

Refer to the [Examples documentation](https://developers.cloudflare.com/hyperdrive/examples/) for step-by-step guides on how to set up Hyperdrive with several popular database providers.

## Supported drivers

Hyperdrive uses Workers [TCP socket support](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#connect) to support TCP connections to databases. The following table lists the supported database drivers and the minimum version that works with Hyperdrive:

| Driver                                                       | Documentation                                                              | Minimum Version Required | Notes                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node-postgres - pg (recommended)                             | [node-postgres - pg documentation ↗](https://node-postgres.com/)           | pg@8.13.0                | 8.11.4 introduced a bug with URL parsing and will not work. 8.11.5 fixes this. Requires compatibility\_flags = \["nodejs\_compat"\] and compatibility\_date = "2024-09-23" \- refer to [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs). Requires wrangler 3.78.7 or later. |
| Postgres.js                                                  | [Postgres.js documentation ↗](https://github.com/porsager/postgres)        | postgres@3.4.4           | Supported in both Workers & Pages.                                                                                                                                                                                                                                                                                |
| Drizzle                                                      | [Drizzle documentation ↗](https://orm.drizzle.team/)                       | 0.26.2^                  |                                                                                                                                                                                                                                                                                                                   |
| Kysely                                                       | [Kysely documentation ↗](https://kysely.dev/)                              | 0.26.3^                  |                                                                                                                                                                                                                                                                                                                   |
| [rust-postgres ↗](https://github.com/sfackler/rust-postgres) | [rust-postgres documentation ↗](https://docs.rs/postgres/latest/postgres/) | v0.19.8                  | Use the [query\_typed ↗](https://docs.rs/postgres/latest/postgres/struct.Client.html#method.query%5Ftyped) method for best performance.                                                                                                                                                                           |

^ _The marked libraries use `node-postgres` as a dependency._

Other drivers and ORMs not listed may also be supported: this list is not exhaustive.

Recommended driver

[Node-postgres ↗](https://node-postgres.com/) (`pg`) is the recommended driver for connecting to your Postgres database from JavaScript or TypeScript Workers. It has the best compatibility with Hyperdrive's caching and is commonly available with popular ORM libraries. [Postgres.js ↗](https://github.com/porsager/postgres) is also supported.

### Database drivers and Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for database drivers, including Postgres.js, and needs to be configured for your Workers project.

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-8703)
* [  wrangler.toml ](#tab-panel-8704)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


```

## Driver examples

The following examples show you how to:

1. Create a database client with a database driver.
2. Pass the Hyperdrive connection string and connect to the database.
3. Query your database via Hyperdrive.

### node-postgres / pg

Install the `node-postgres` driver:

 npm  yarn  pnpm  bun 

```
npm i pg@>8.16.3
```

```
yarn add pg@>8.16.3
```

```
pnpm add pg@>8.16.3
```

```
bun add pg@>8.16.3
```

Note

The minimum version of `node-postgres` required for Hyperdrive is `8.16.3`.

If using TypeScript, install the types package:

 npm  yarn  pnpm  bun 

```
npm i -D @types/pg
```

```
yarn add -D @types/pg
```

```
pnpm add -D @types/pg
```

```
bun add -d @types/pg
```

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

* [  wrangler.jsonc ](#tab-panel-8707)
* [  wrangler.toml ](#tab-panel-8708)

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

Create a new `Client` instance and pass the Hyperdrive `connectionString`:

TypeScript

```

// filepath: src/index.ts

import { Client } from "pg";


export default {

  async fetch(

    request: Request,

    env: Env,

    ctx: ExecutionContext,

  ): Promise<Response> {

    // Create a new client instance for each request. Hyperdrive maintains the

    // underlying database connection pool, so creating a new client is fast.

    const client = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });


    try {

      // Connect to the database

      await client.connect();


      // Perform a simple query

      const result = await client.query("SELECT * FROM pg_tables");


      return Response.json({

        success: true,

        result: result.rows,

      });

    } catch (error: any) {

      console.error("Database error:", error.message);


      return new Response("Internal error occurred", { status: 500 });

    }

  },

};


```

### Postgres.js

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

* [  wrangler.jsonc ](#tab-panel-8709)
* [  wrangler.toml ](#tab-panel-8710)

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

## Identify connections from Hyperdrive

To identify active connections to your Postgres database server from Hyperdrive:

* Hyperdrive's connections to your database will show up with `Cloudflare Hyperdrive` as the `application_name` in the `pg_stat_activity` table.
* Run `SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive'` to show whether Hyperdrive is currently holding a connection (or connections) open to your database.

## Next steps

* Refer to the list of [supported database integrations](https://developers.cloudflare.com/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
* Learn more about how to use the [Socket API](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets) in a Worker.
* Understand the [protocols supported by Workers](https://developers.cloudflare.com/workers/reference/protocols/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/#page","headline":"Connect to PostgreSQL · Cloudflare Hyperdrive docs","description":"Use Hyperdrive to connect to PostgreSQL and PostgreSQL-compatible databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}}]}
```
