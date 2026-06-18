---
title: Neon
description: Connect Workers to a Neon Postgres database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Neon

[Neon ↗](https://neon.tech/) is a fully managed serverless PostgreSQL. It separates storage and compute to offer modern developer features, such as serverless, branching, and bottomless storage.

Note

You can connect to Neon using [Hyperdrive](https://developers.cloudflare.com/hyperdrive) (recommended), or using the Neon serverless driver, `@neondatabase/serverless`. Both provide connection pooling and reduce the amount of round trips required to create a secure connection from Workers to your database.

Hyperdrive can provide the lowest possible latencies because it performs the database connection setup and connection pooling across Cloudflare's network. Hyperdrive supports native database drivers, libraries, and ORMs, and is included in all [Workers plans](https://developers.cloudflare.com/hyperdrive/platform/pricing/). Learn more about Hyperdrive in [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).

* [ Hyperdrive (recommended) ](#tab-panel-11521)
* [ Neon serverless driver ](#tab-panel-11522)

To connect to Neon using [Hyperdrive](https://developers.cloudflare.com/hyperdrive), follow these steps:

## 1\. Allow Hyperdrive access

You can connect Hyperdrive to any existing Neon database by creating a new user and fetching your database connection string.

### Neon Dashboard

1. Go to the [**Neon dashboard** ↗](https://console.neon.tech/app/projects) and select the project (database) you wish to connect to.
2. Select **Roles** from the sidebar and select **New Role**. Enter `hyperdrive-user` as the name (or your preferred name) and **copy the password**. Note that the password will not be displayed again: you will have to reset it if you do not save it somewhere.
3. Select **Dashboard** from the sidebar > go to the **Connection Details** pane > ensure you have selected the **branch**, **database** and **role** (for example,`hyperdrive-user`) that Hyperdrive will connect through.
4. Select the `psql` and **uncheck the connection pooling** checkbox. Note down the connection string (starting with `postgres://hyperdrive-user@...`) from the text box.

With both the connection string and the password, you can now create a Hyperdrive database configuration.

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

* [ Dashboard ](#tab-panel-11517)
* [ Wrangler CLI ](#tab-panel-11518)

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
   * [  wrangler.jsonc ](#tab-panel-11515)  
   * [  wrangler.toml ](#tab-panel-11516)  
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

* [  wrangler.jsonc ](#tab-panel-11519)
* [  wrangler.toml ](#tab-panel-11520)

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

When connecting to a Neon database with Hyperdrive, you should use a driver like [node-postgres (pg)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/) or [Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/) to connect directly to the underlying database instead of the [Neon serverless driver ↗](https://neon.tech/docs/serverless/serverless-driver). Hyperdrive is optimized for database access for Workers and will perform global connection pooling and fast query routing by connecting directly to your database.

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

To connect to Neon using `@neondatabase/serverless`, follow these steps:

1. You need to have an existing Neon database to connect to. [Create a Neon database ↗](https://neon.tech/docs/postgres/tutorial-createdb#create-a-table) or [load data from an existing database to Neon ↗](https://neon.tech/docs/import/import-from-postgres).
2. Create an `elements` table using the Neon SQL editor. The SQL Editor allows you to query your databases directly from the Neon Console.  
```  
CREATE TABLE elements (  
  id INTEGER NOT NULL,  
  elementName TEXT NOT NULL,  
  atomicNumber INTEGER NOT NULL,  
  symbol TEXT NOT NULL  
);  
```
3. Insert some data into your newly created table.  
```  
INSERT INTO elements (id, elementName, atomicNumber, symbol)  
VALUES  
  (1, 'Hydrogen', 1, 'H'),  
  (2, 'Helium', 2, 'He'),  
  (3, 'Lithium', 3, 'Li'),  
  (4, 'Beryllium', 4, 'Be'),  
  (5, 'Boron', 5, 'B'),  
  (6, 'Carbon', 6, 'C'),  
  (7, 'Nitrogen', 7, 'N'),  
  (8, 'Oxygen', 8, 'O'),  
  (9, 'Fluorine', 9, 'F'),  
  (10, 'Neon', 10, 'Ne');  
```
4. Configure the Neon database credentials in your Worker:  
You need to add your Neon database connection string as a secret to your Worker. Get your connection string from the [Neon Console ↗](https://console.neon.tech) under **Connection Details**, then add it as a secret using Wrangler:  
Terminal window  
```  
# Add the database connection string as a secret  
npx wrangler secret put DATABASE_URL  
# When prompted, paste your Neon database connection string  
```
5. In your Worker, install the `@neondatabase/serverless` driver to connect to your database and start manipulating data:  
 npm  yarn  pnpm  bun  
```  
npm i @neondatabase/serverless  
```  
```  
yarn add @neondatabase/serverless  
```  
```  
pnpm add @neondatabase/serverless  
```  
```  
bun add @neondatabase/serverless  
```
6. The following example shows how to make a query to your Neon database in a Worker. The credentials needed to connect to Neon have been added as secrets to your Worker.  
JavaScript  
```  
import { Client } from "@neondatabase/serverless";  
export default {  
  async fetch(request, env, ctx) {  
    const client = new Client(env.DATABASE_URL);  
    await client.connect();  
    const { rows } = await client.query("SELECT * FROM elements");  
    return new Response(JSON.stringify(rows));  
  },  
};  
```

To learn more about Neon, refer to [Neon's official documentation ↗](https://neon.tech/docs/introduction).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/databases/third-party-integrations/neon/#page","headline":"Neon · Cloudflare Workers docs","description":"Connect Workers to a Neon Postgres database.","url":"https://developers.cloudflare.com/workers/databases/third-party-integrations/neon/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/databases/","name":"Databases"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/databases/third-party-integrations/","name":"3rd Party Integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/databases/third-party-integrations/neon/","name":"Neon"}}]}
```
