---
title: Connect to MySQL
description: Use Hyperdrive to connect to MySQL and MySQL-compatible databases from Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to MySQL

**Last reviewed:**  about 1 year ago 

Hyperdrive supports MySQL and MySQL-compatible databases, [popular drivers](#supported-drivers), and Object Relational Mapper (ORM) libraries that use those drivers.

## Create a Hyperdrive

Note

New to Hyperdrive? Refer to the [Get started guide](https://developers.cloudflare.com/hyperdrive/get-started/) to learn how to set up your first Hyperdrive.

To create a Hyperdrive that connects to an existing MySQL database, use the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).

When using Wrangler, replace the placeholder value provided to `--connection-string` with the connection string for your database:

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive create my-first-hyperdrive --connection-string="mysql://user:password@database.host.example.com:3306/databasenamehere"


```

The command above will output the ID of your Hyperdrive, which you will need to set in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project:

* [  wrangler.jsonc ](#tab-panel-8673)
* [  wrangler.toml ](#tab-panel-8674)

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

| Driver                   | Documentation                                                      | Minimum Version Required | Notes                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mysql2 (**recommended**) | [mysql2 documentation ↗](https://github.com/sidorares/node-mysql2) | mysql2@3.13.0            | Supported in both Workers & Pages. Using the Promise API is recommended.                                                                                                                                                           |
| mysql                    | [mysql documentation ↗](https://github.com/mysqljs/mysql)          | mysql@2.18.0             | Requires compatibility\_flags = \["nodejs\_compat"\] and compatibility\_date = "2024-09-23" \- refer to [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs). Requires wrangler 3.78.7 or later. |
| Drizzle                  | [Drizzle documentation ↗](https://orm.drizzle.team/)               | Requires mysql2@3.13.0   |                                                                                                                                                                                                                                    |
| Kysely                   | [Kysely documentation ↗](https://kysely.dev/)                      | Requires mysql2@3.13.0   |                                                                                                                                                                                                                                    |

^ _The marked libraries can use either mysql or mysql2 as a dependency._

Other drivers and ORMs not listed may also be supported: this list is not exhaustive.

### Database drivers and Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for database drivers, including mysql and mysql2, and needs to be configured for your Workers project.

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-8675)
* [  wrangler.toml ](#tab-panel-8676)

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

## Supported TLS (SSL) modes

Hyperdrive supports the following MySQL TLS/SSL connection modes when connecting to your origin database:

| Mode             | Supported         | Details                                                                                                                                                       |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DISABLED         | No                | Hyperdrive does not support insecure plain text connections.                                                                                                  |
| PREFERRED        | No (use REQUIRED) | Hyperdrive will always use TLS.                                                                                                                               |
| REQUIRED         | Yes (default)     | TLS is required, and server certificates are validated (based on WebPKI).                                                                                     |
| VERIFY\_CA       | Yes               | Verifies the server's TLS certificate is signed by a root CA on the client.                                                                                   |
| VERIFY\_IDENTITY | Yes               | In addition to VERIFY\_CA checks, Hyperdrive requires the database hostname to match a Subject Alternative Name (SAN) or Common Name (CN) on the certificate. |

Refer to [SSL/TLS certificates](https://developers.cloudflare.com/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/) documentation for details on how to configure `VERIFY_CA` or `VERIFY_IDENTITY` TLS (SSL) modes for Hyperdrive.

## Driver examples

The following examples show you how to:

1. Create a database client with a database driver.
2. Pass the Hyperdrive connection string and connect to the database.
3. Query your database via Hyperdrive.

### `mysql2`

The following Workers code shows you how to use [mysql2 ↗](https://github.com/sidorares/node-mysql2) with Hyperdrive using the Promise API.

Install the [mysql2 ↗](https://github.com/sidorares/node-mysql2) driver:

 npm  yarn  pnpm  bun 

```
npm i mysql2@>3.13.0
```

```
yarn add mysql2@>3.13.0
```

```
pnpm add mysql2@>3.13.0
```

```
bun add mysql2@>3.13.0
```

Note

`mysql2` v3.13.0 or later is required

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

* [  wrangler.jsonc ](#tab-panel-8677)
* [  wrangler.toml ](#tab-panel-8678)

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

Create a new `connection` instance and pass the Hyperdrive parameters:

TypeScript

```

// mysql2 v3.13.0 or later is required

import { createConnection } from "mysql2/promise";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new connection on each request. Hyperdrive maintains the underlying

    // database connection pool, so creating a new connection is fast.

    const connection = await createConnection({

      host: env.HYPERDRIVE.host,

      user: env.HYPERDRIVE.user,

      password: env.HYPERDRIVE.password,

      database: env.HYPERDRIVE.database,

      port: env.HYPERDRIVE.port,


      // Required to enable mysql2 compatibility for Workers

      disableEval: true,

    });


    try {

      // Sample query

      const [results, fields] = await connection.query("SHOW tables;");


      // Return result rows as JSON

      return Response.json({ results, fields });

    } catch (e) {

      console.error(e);

      return Response.json(

        { error: e instanceof Error ? e.message : e },

        { status: 500 },

      );

    }

  },

} satisfies ExportedHandler<Env>;


```

Note

The minimum version of `mysql2` required for Hyperdrive is `3.13.0`.

### `mysql`

The following Workers code shows you how to use [mysql ↗](https://github.com/mysqljs/mysql) with Hyperdrive.

Install the [mysql ↗](https://github.com/mysqljs/mysql) driver:

 npm  yarn  pnpm  bun 

```
npm i mysql
```

```
yarn add mysql
```

```
pnpm add mysql
```

```
bun add mysql
```

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

* [  wrangler.jsonc ](#tab-panel-8679)
* [  wrangler.toml ](#tab-panel-8680)

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

Create a new connection and pass the Hyperdrive parameters:

TypeScript

```

import { createConnection } from "mysql";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    const result = await new Promise<any>((resolve) => {

      // Create a connection using the mysql driver with the Hyperdrive credentials (only accessible from your Worker).

      const connection = createConnection({

        host: env.HYPERDRIVE.host,

        user: env.HYPERDRIVE.user,

        password: env.HYPERDRIVE.password,

        database: env.HYPERDRIVE.database,

        port: env.HYPERDRIVE.port,

      });


      connection.connect((error: { message: string }) => {

        if (error) {

          throw new Error(error.message);

        }


        // Sample query

        connection.query("SHOW tables;", [], (error, rows, fields) => {

          resolve({ fields, rows });

        });

      });

    });


    // Return result  as JSON

    return new Response(JSON.stringify(result), {

      headers: {

        "Content-Type": "application/json",

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

## Identify connections from Hyperdrive

To identify active connections to your MySQL database server from Hyperdrive:

* Hyperdrive's connections to your database will show up with `Cloudflare Hyperdrive` in the `PROGRAM_NAME` column in the `performance_schema.threads` table.
* Run `SELECT DISTINCT USER, HOST, PROGRAM_NAME FROM performance_schema.threads WHERE PROGRAM_NAME = 'Cloudflare Hyperdrive'` to show whether Hyperdrive is currently holding a connection (or connections) open to your database.

## Next steps

* Refer to the list of [supported database integrations](https://developers.cloudflare.com/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
* Learn more about how to use the [Socket API](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets) in a Worker.
* Understand the [protocols supported by Workers](https://developers.cloudflare.com/workers/reference/protocols/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/#page","headline":"Connect to MySQL · Cloudflare Hyperdrive docs","description":"Use Hyperdrive to connect to MySQL and MySQL-compatible databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/","name":"Connect to MySQL"}}]}
```
