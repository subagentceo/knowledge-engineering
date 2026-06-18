---
title: Hyperdrive
description: Accelerate access to your existing databases from Cloudflare Workers with Hyperdrive's global connection pooling and query caching.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hyperdrive

Turn your existing regional database into a globally distributed database.

 Available on Free and Paid plans 

Hyperdrive is a service that accelerates queries you make to existing databases, making it faster to access your data from across the globe from [Cloudflare Workers](https://developers.cloudflare.com/workers/), irrespective of your users' location.

Hyperdrive supports any Postgres or MySQL database, including those hosted on AWS, Google Cloud, Azure, Neon and PlanetScale. Hyperdrive also supports Postgres-compatible databases like CockroachDB and Timescale. You do not need to write new code or replace your favorite tools: Hyperdrive works with your existing code and tools you use.

Use Hyperdrive's connection details from your Cloudflare Workers application with your existing database drivers and object-relational mapping (ORM) libraries.

## Examples

### PostgreSQL

* [ index.ts ](#tab-panel-8620)
* [ wrangler.jsonc ](#tab-panel-8621)

TypeScript

```

import { Client } from "pg";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new client instance for each request. Hyperdrive maintains the

    // underlying database connection pool, so creating a new client is fast.

    const client = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });


    try {

      // Connect to the database

      await client.connect();

      // Sample SQL query

      const result = await client.query("SELECT * FROM pg_tables");


      return Response.json(result.rows);

    } catch (e) {

      return Response.json({ error: e instanceof Error ? e.message : e }, { status: 500 });

    }

  },

} satisfies ExportedHandler<{ HYPERDRIVE: Hyperdrive }>;


```

```

  {

    "$schema": "node_modules/wrangler/config-schema.json",

    "name": "WORKER-NAME",

    "main": "src/index.ts",

    "compatibility_date": "2025-02-04",

    "compatibility_flags": [

      "nodejs_compat"

    ],

    "observability": {

      "enabled": true

    },

    "hyperdrive": [

      {

        "binding": "HYPERDRIVE",

        "id": "<YOUR_HYPERDRIVE_ID>",

        "localConnectionString": "<ENTER_LOCAL_CONNECTION_STRING_FOR_LOCAL_DEVELOPMENT_HERE>"

      }

    ]

  }


```

### MySQL

* [ index.ts ](#tab-panel-8622)
* [ wrangler.jsonc ](#tab-panel-8623)

TypeScript

```

import { createConnection } from 'mysql2/promise';


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new connection on each request. Hyperdrive maintains the

    // underlying database connection pool, so creating a new client is fast.

    const connection = await createConnection({

     host: env.HYPERDRIVE.host,

     user: env.HYPERDRIVE.user,

     password: env.HYPERDRIVE.password,

     database: env.HYPERDRIVE.database,

     port: env.HYPERDRIVE.port,


     // This is needed to use mysql2 with Workers

     // This configures mysql2 to use static parsing instead of eval() parsing (not available on Workers)

     disableEval: true

  });


  const [results, fields] = await connection.query('SHOW tables;');


  return new Response(JSON.stringify({ results, fields }), {

    headers: {

      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '\*',

    },

  });

}} satisfies ExportedHandler<{ HYPERDRIVE: Hyperdrive }>;


```

```

  {

    "$schema": "node_modules/wrangler/config-schema.json",

    "name": "WORKER-NAME",

    "main": "src/index.ts",

    "compatibility_date": "2025-02-04",

    "compatibility_flags": [

      "nodejs_compat"

    ],

    "observability": {

      "enabled": true

    },

    "hyperdrive": [

      {

        "binding": "HYPERDRIVE",

        "id": "<YOUR_HYPERDRIVE_ID>",

        "localConnectionString": "<ENTER_LOCAL_CONNECTION_STRING_FOR_LOCAL_DEVELOPMENT_HERE>"

      }

    ]

  }


```

[ Get started ](https://developers.cloudflare.com/hyperdrive/get-started/) 

---

## Features

###  Connect your database 

Connect Hyperdrive to your existing database and deploy a [Worker](https://developers.cloudflare.com/workers/) that queries it.

[ Connect Hyperdrive to your database ](https://developers.cloudflare.com/hyperdrive/get-started/) 

###  PostgreSQL support 

Hyperdrive allows you to connect to any PostgreSQL or PostgreSQL-compatible database.

[ Connect Hyperdrive to your PostgreSQL database ](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/) 

###  MySQL support 

Hyperdrive allows you to connect to any MySQL database.

[ Connect Hyperdrive to your MySQL database ](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/) 

###  Query Caching 

Default-on caching for your most popular queries executed against your database.

[ Learn about Query Caching ](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/) 

---

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

**[Pages](https://developers.cloudflare.com/pages/)** 

Deploy dynamic front-end applications in record time.

---

## More resources

[Pricing](https://developers.cloudflare.com/hyperdrive/platform/pricing/) 

Learn about Hyperdrive's pricing.

[Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) 

Learn about Hyperdrive limits.

[Storage options](https://developers.cloudflare.com/workers/platform/storage-options/) 

Learn more about the storage and database options you can build on with Workers.

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/hyperdrive/#page","headline":"Overview · Cloudflare Hyperdrive docs","description":"Accelerate access to your existing databases from Cloudflare Workers with Hyperdrive's global connection pooling and query caching.","url":"https://developers.cloudflare.com/hyperdrive/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}}]}
```
