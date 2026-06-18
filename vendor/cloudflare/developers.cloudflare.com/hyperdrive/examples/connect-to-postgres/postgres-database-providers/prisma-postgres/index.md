---
title: Prisma Postgres
description: Connect Hyperdrive to a Prisma Postgres database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prisma Postgres

**Last reviewed:**  10 months ago 

Connect Hyperdrive to a Prisma Postgres database.

This example shows you how to connect Hyperdrive to a [Prisma Postgres ↗](https://www.prisma.io/postgres) database.

## 1\. Allow Hyperdrive access

You can connect Hyperdrive to any existing Prisma Postgres database by using your existing database connection string.

### Prisma Data Platform

1. Go to the [**Prisma Data Platform Console** ↗](https://console.prisma.io/) and select the project (database) you wish to connect to.
2. Select **Connect to your database** \> **Any client**.
3. Select **Generate database credentials**. Copy the connection string for your Prisma Postgres database.
4. Edit the connection string to make it compatible with Hyperdrive.
* Add the database name after the port. You may remove any query parameters, such as `?sslmode=require`.
* The final string will look like:

```

postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Note

An alternative to the Prisma Data Platform is to use the [create-db ↗](https://www.npmjs.com/package/create-db) package. This package will generate a quick temporary Prisma Postgres database for you to use.

Terminal window

```

npx create-db@latest


```

With this connection string, you can now create a Hyperdrive database configuration.

## 2\. Create a database configuration

To configure Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`) you configured in a previous step.
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `postgres`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```

postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Most database providers will provide a connection string you can directly copy-and-paste directly into Hyperdrive.

* [ Dashboard ](#tab-panel-8781)
* [ Wrangler CLI ](#tab-panel-8782)

To create a Hyperdrive configuration with the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.  
[ Go to **Hyperdrive** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select **Create Configuration**.
3. Fill out the form, including the connection string.
4. Select **Create**.

To create a Hyperdrive configuration with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):

1. Open your terminal and run the following command. Replace `<NAME_OF_HYPERDRIVE_CONFIG>` with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:  
Terminal window  
```  
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"  
```
2. This command outputs a binding for the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):  
   * [  wrangler.jsonc ](#tab-panel-8779)  
   * [  wrangler.toml ](#tab-panel-8780)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "hyperdrive-example",  
  "main": "src/index.ts",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "compatibility_flags": [  
    "nodejs_compat"  
  ],  
  // Pasted from the output of `wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string=[...]` above.  
  "hyperdrive": [  
    {  
      "binding": "HYPERDRIVE",  
      "id": "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"  
    }  
  ]  
}  
```  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "hyperdrive-example"  
main = "src/index.ts"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
compatibility_flags = [ "nodejs_compat" ]  
[[hyperdrive]]  
binding = "HYPERDRIVE"  
id = "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"  
```

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

## 3\. Use Hyperdrive from your Worker

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

* [  wrangler.jsonc ](#tab-panel-8783)
* [  wrangler.toml ](#tab-panel-8784)

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

## 4\. Configure Hyperdrive maximum connections

Prisma Postgres has limits on the number of direct connections that can be made to the database using Hyperdrive. Refer to [Prisma Postgres limits ↗](https://www.prisma.io/docs/postgres/database/direct-connections?utm%5Fsource=website&utm%5Fmedium=postgres-page#connection-limit).

Note

There are two limits to consider here.

* Origin database's connection limit, set by the origin database provider. This is the maximum number of direct database connections that can be made to the origin database.
* Hyperdrive's origin connection limit, set by Hyperdrive. This is the maximum number of database connections that Hyperdrive can make to your origin database (in this case, Prisma Postgres).

Hyperdrive's origin connection limit should be lower than the Prisma Postgres connection limit, since Hyperdrive's origin connection limit is a soft limit, and Hyperdrive may create more connections if there are network disruptions that prevent existing connections from being used.

* [ Dashboard ](#tab-panel-8777)
* [ Wrangler CLI ](#tab-panel-8778)

1. From the [Cloudflare Hyperdrive dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive), select your newly created Hyperdrive configuration.
2. Go to **Settings**.
3. In **Origin connection limit**, select **Edit Settings**, and set your maximum connections to a number that is lower than your Prisma connection limit.

1. Edit your existing Hyperdrive configuration with the `--origin-connection-limit` parameter:  
Terminal window  
```  
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=10  
```  
Replace `<HYPERDRIVE_ID>` with your Hyperdrive configuration ID and set the connection limit to a number that is less than your Prisma connection limit.
2. Verify the configuration change:  
Terminal window  
```  
npx wrangler hyperdrive get <HYPERDRIVE_ID>  
```

Note

When connecting to a Prisma Postgres database with Hyperdrive, you should use a driver like [node-postgres (pg)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/) or [Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/) to connect directly to the underlying PostgreSQL database, instead of the Prisma Accelerate extension. Hyperdrive is optimized for database access for Workers, and connects directly to your database to perform global connection pooling and fast query routing.

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/#page","headline":"Prisma Postgres · Cloudflare Hyperdrive docs","description":"Connect Hyperdrive to a Prisma Postgres database.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/","name":"Database Providers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/prisma-postgres/","name":"Prisma Postgres"}}]}
```
