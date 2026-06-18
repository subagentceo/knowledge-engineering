---
title: Supabase
description: Connect Hyperdrive to a Supabase Postgres database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supabase

**Last reviewed:**  over 2 years ago 

Connect Hyperdrive to a Supabase Postgres database.

This example shows you how to connect Hyperdrive to a [Supabase ↗](https://supabase.com/) Postgres database.

## 1\. Allow Hyperdrive access

You can connect Hyperdrive to any existing Supabase database as the Postgres user which is set up during project creation. Alternatively, to create a new user for Hyperdrive, run these commands in the [SQL Editor ↗](https://supabase.com/dashboard/project/%5F/sql/new).

```

CREATE ROLE hyperdrive_user LOGIN PASSWORD 'sufficientlyRandomPassword';


-- Here, you are granting it the postgres role. In practice, you want to create a role with lesser privileges.

GRANT postgres to hyperdrive_user;


```

The database endpoint can be found in the [database settings page ↗](https://supabase.com/dashboard/project/%5F/settings/database).

With a database user, password, database endpoint (hostname and port) and database name (default: postgres), you can now set up Hyperdrive.

Note

When connecting to Supabase from Hyperdrive, you should use the **Direct connection** connection string rather than the pooled connection strings. Hyperdrive will perform pooling of connections to ensure optimal access from Workers.

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

* [ Dashboard ](#tab-panel-8787)
* [ Wrangler CLI ](#tab-panel-8788)

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
   * [  wrangler.jsonc ](#tab-panel-8785)  
   * [  wrangler.toml ](#tab-panel-8786)  
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

* [  wrangler.jsonc ](#tab-panel-8789)
* [  wrangler.toml ](#tab-panel-8790)

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

Note

When connecting to a Supabase database with Hyperdrive, you should use a driver like [node-postgres (pg)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/) or [Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/) to connect directly to the underlying database instead of the [Supabase JavaScript client ↗](https://github.com/supabase/supabase-js). Hyperdrive is optimized for database access for Workers and will perform global connection pooling and fast query routing by connecting directly to your database.

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/supabase/#page","headline":"Supabase · Cloudflare Hyperdrive docs","description":"Connect Hyperdrive to a Supabase Postgres database.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/supabase/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/","name":"Database Providers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-database-providers/supabase/","name":"Supabase"}}]}
```
