---
title: Getting started
description: Create your first Hyperdrive configuration and connect a Cloudflare Worker to your database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

Hyperdrive accelerates access to your existing databases from Cloudflare Workers, making even single-region databases feel globally distributed.

By maintaining a connection pool to your database within Cloudflare's network, Hyperdrive reduces seven round-trips to your database before you can even send a query: the TCP handshake (1x), TLS negotiation (3x), and database authentication (3x).

Hyperdrive understands the difference between read and write queries to your database, and caches the most common read queries, improving performance and reducing load on your origin database.

This guide will instruct you through:

* Creating your first Hyperdrive configuration.
* Creating a [Cloudflare Worker](https://developers.cloudflare.com/workers/) and binding it to your Hyperdrive configuration.
* Establishing a database connection from your Worker to a public database.

Note

Hyperdrive currently works with PostgreSQL, MySQL and many compatible databases. This includes CockroachDB and Materialize (which are PostgreSQL-compatible), and PlanetScale.

Learn more about the [databases that Hyperdrive supports](https://developers.cloudflare.com/hyperdrive/reference/supported-databases-and-features).

## Prerequisites

Before you begin, ensure you have completed the following:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Use a Node version manager like [nvm ↗](https://github.com/nvm-sh/nvm) or [Volta ↗](https://volta.sh/) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.
3. Have a publicly accessible PostgreSQL or MySQL (or compatible) database. _If your database is in a private network_, refer to [Connect to a private database using Workers VPC](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/).

## 1\. Log in

Before creating your Hyperdrive binding, log in with your Cloudflare account by running:

Terminal window

```

npx wrangler login


```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 2\. Create a Worker

New to Workers?

Refer to [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) to set up your first Worker.

Create a new project named `hyperdrive-tutorial` by running:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- hyperdrive-tutorial
```

```
yarn create cloudflare hyperdrive-tutorial
```

```
pnpm create cloudflare@latest hyperdrive-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new `hyperdrive-tutorial` directory. Your new `hyperdrive-tutorial` directory will include:

* A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file. `wrangler.jsonc` is how your `hyperdrive-tutorial` Worker will connect to Hyperdrive.

### Enable Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for database drivers, and needs to be configured for your Workers project.

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-8817)
* [  wrangler.toml ](#tab-panel-8818)

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

## 3\. Connect Hyperdrive to a database

Hyperdrive works by connecting to your database, pooling database connections globally, and speeding up your database access through Cloudflare's network.

It will provide a secure connection string that is only accessible from your Worker which you can use to connect to your database through Hyperdrive. This means that you can use the Hyperdrive connection string with your existing drivers or ORM libraries without needing significant changes to your code.

To create your first Hyperdrive database configuration, change into the directory you just created for your Workers project:

Terminal window

```

cd hyperdrive-tutorial


```

To create your first Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`).
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `postgres` or `mysql`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

* [ PostgreSQL ](#tab-panel-8811)
* [ MySQL ](#tab-panel-8812)

```

postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Most database providers will provide a connection string you can copy-and-paste directly into Hyperdrive.

To create a Hyperdrive connection, run the `wrangler` command, replacing the placeholder values passed to the `--connection-string` flag with the values of your existing database:

Terminal window

```

npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"


```

```

mysql://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Most database providers will provide a connection string you can copy-and-paste directly into Hyperdrive.

To create a Hyperdrive connection, run the `wrangler` command, replacing the placeholder values passed to the `--connection-string` flag with the values of your existing database:

Terminal window

```

npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"


```

Manage caching

By default, Hyperdrive will cache query results. If you wish to disable caching, pass the flag `--caching-disabled`.

Alternatively, you can use the `--max-age` flag to specify the maximum duration (in seconds) for which items should persist in the cache, before they are evicted. Default value is 60 seconds.

Refer to [Hyperdrive Wrangler commands](https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/) for more information.

If successful, the command will output your new Hyperdrive configuration:

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<example id: 57b7076f58be42419276f058a8968187>"

    }

  ]

}


```

Copy the `id` field: you will use this in the next step to make Hyperdrive accessible from your Worker script.

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

## 4\. Bind your Worker to Hyperdrive

You must create a binding in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Worker to connect to your Hyperdrive configuration. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like Hyperdrive, on the Cloudflare developer platform.

To bind your Hyperdrive configuration to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8819)
* [  wrangler.toml ](#tab-panel-8820)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<YOUR_DATABASE_ID>" // the ID associated with the Hyperdrive you just created

    }

  ]

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<YOUR_DATABASE_ID>"


```

Specifically:

* The value (string) you set for the `binding` (binding name) will be used to reference this database in your Worker. In this tutorial, name your binding `HYPERDRIVE`.
* The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "hyperdrive"` or `binding = "productionDB"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>`.

If you wish to use a local database during development, you can add a `localConnectionString` to your Hyperdrive configuration with the connection string of your database:

* [  wrangler.jsonc ](#tab-panel-8821)
* [  wrangler.toml ](#tab-panel-8822)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<YOUR_DATABASE_ID>", // the ID associated with the Hyperdrive you just created

      "localConnectionString": "<LOCAL_DATABASE_CONNECTION_URI>"

    }

  ]

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<YOUR_DATABASE_ID>"

localConnectionString = "<LOCAL_DATABASE_CONNECTION_URI>"


```

Note

Learn more about setting up [Hyperdrive for local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/).

## 5\. Run a query against your database

Once you have created a Hyperdrive configuration and bound it to your Worker, you can run a query against your database.

### Install a database driver

* [ PostgreSQL ](#tab-panel-8815)
* [ MySQL ](#tab-panel-8816)

To connect to your database, you will need a database driver which allows you to authenticate and query your database. For this tutorial, you will use [node-postgres (pg) ↗](https://node-postgres.com/), one of the most widely used PostgreSQL drivers.

To install `pg`, ensure you are in the `hyperdrive-tutorial` directory. Open your terminal and run the following command:

 npm  yarn  pnpm  bun 

```
# This should install v8.13.0 or later
npm i pg
```

```
# This should install v8.13.0 or later
yarn add pg
```

```
# This should install v8.13.0 or later
pnpm add pg
```

```
# This should install v8.13.0 or later
bun add pg
```

If you are using TypeScript, you should also install the type definitions for `pg`:

 npm  yarn  pnpm  bun 

```
# This should install v8.13.0 or later
npm i -D @types/pg
```

```
# This should install v8.13.0 or later
yarn add -D @types/pg
```

```
# This should install v8.13.0 or later
pnpm add -D @types/pg
```

```
# This should install v8.13.0 or later
bun add -d @types/pg
```

With the driver installed, you can now create a Worker script that queries your database.

To connect to your database, you will need a database driver which allows you to authenticate and query your database. For this tutorial, you will use [mysql2 ↗](https://github.com/sidorares/node-mysql2), one of the most widely used MySQL drivers.

To install `mysql2`, ensure you are in the `hyperdrive-tutorial` directory. Open your terminal and run the following command:

 npm  yarn  pnpm  bun 

```
# This should install v3.13.0 or later
npm i mysql2
```

```
# This should install v3.13.0 or later
yarn add mysql2
```

```
# This should install v3.13.0 or later
pnpm add mysql2
```

```
# This should install v3.13.0 or later
bun add mysql2
```

With the driver installed, you can now create a Worker script that queries your database.

### Write a Worker

* [ PostgreSQL ](#tab-panel-8813)
* [ MySQL ](#tab-panel-8814)

After you have set up your database, you will run a SQL query from within your Worker.

Go to your `hyperdrive-tutorial` Worker and open the `index.ts` file.

The `index.ts` file is where you configure your Worker's interactions with Hyperdrive.

Populate your `index.ts` file with the following code:

TypeScript

```

// pg 8.13.0 or later is recommended

import { Client } from "pg";


export interface Env {

  // If you set another name in the Wrangler config file as the value for 'binding',

  // replace "HYPERDRIVE" with the variable name you defined.

  HYPERDRIVE: Hyperdrive;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new client on each request. Hyperdrive maintains the underlying

    // database connection pool, so creating a new client is fast.

    const sql = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });


    try {

      // Connect to the database

      await sql.connect();


      // Sample query

      const results = await sql.query(`SELECT * FROM pg_tables`);


      // Return result rows as JSON

      return Response.json(results.rows);

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

Upon receiving a request, the code above does the following:

1. Creates a new database client configured to connect to your database via Hyperdrive, using the Hyperdrive connection string.
2. Initiates a query via `await sql.query()` that outputs all tables (user and system created) in the database (as an example query).
3. Returns the response as JSON to the client. Hyperdrive automatically cleans up the client connection when the request ends, and keeps the underlying database connection open in its pool for reuse.

After you have set up your database, you will run a SQL query from within your Worker.

Go to your `hyperdrive-tutorial` Worker and open the `index.ts` file.

The `index.ts` file is where you configure your Worker's interactions with Hyperdrive.

Populate your `index.ts` file with the following code:

TypeScript

```

// mysql2 v3.13.0 or later is required

import { createConnection } from "mysql2/promise";


export interface Env {

  // If you set another name in the Wrangler config file as the value for 'binding',

  // replace "HYPERDRIVE" with the variable name you defined.

  HYPERDRIVE: Hyperdrive;

}


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


      // The following line is needed for mysql2 compatibility with Workers

      // mysql2 uses eval() to optimize result parsing for rows with > 100 columns

      // Configure mysql2 to use static parsing instead of eval() parsing with disableEval

      disableEval: true,

    });


    try {

      // Sample query

      const [results, fields] = await connection.query("SHOW tables;");


      // Return result rows as JSON

      return new Response(JSON.stringify({ results, fields }), {

        headers: {

          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "*",

        },

      });

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

Upon receiving a request, the code above does the following:

1. Creates a new database client configured to connect to your database via Hyperdrive, using the Hyperdrive connection string.
2. Initiates a query via `await connection.query` that outputs all tables (user and system created) in the database (as an example query).
3. Returns the response as JSON to the client. Hyperdrive automatically cleans up the client connection when the request ends, and keeps the underlying database connection open in its pool for reuse.

### Run in development mode (optional)

You can test your Worker locally before deploying by running `wrangler dev`. This runs your Worker code on your machine while connecting to your database.

The `localConnectionString` field works with both local and remote databases and allows you to connect directly to your database from your Worker project running locally. You must specify the SSL/TLS mode if required (`sslmode=require` for Postgres, `sslMode=REQUIRED` for MySQL).

To connect to a database during local development, configure `localConnectionString` in your `wrangler.jsonc`:

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "your-hyperdrive-id",

      "localConnectionString": "postgres://user:password@your-database-host:5432/database",

    },

  ],

}


```

Or set an environment variable:

Terminal window

```

export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@your-database-host:5432/database"


```

Then start local development:

Terminal window

```

npx wrangler dev


```

Note

When using `wrangler dev` with `localConnectionString` or `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE`, Hyperdrive caching does not take effect locally.

Alternatively, you can run `wrangler dev --remote` to test against your deployed Hyperdrive configuration with caching enabled, but this runs your entire Worker in Cloudflare's network instead of locally.

Learn more about [local development with Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/local-development/).

## 6\. Deploy your Worker

You can now deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

Terminal window

```

npx wrangler deploy

# Outputs: https://hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev


```

You can now visit the URL for your newly created project to query your live database.

For example, if the URL of your new Worker is `hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev`, accessing `https://hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev/` will send a request to your Worker that queries your database directly.

By finishing this tutorial, you have created a Hyperdrive configuration, a Worker to access that database and deployed your project globally.

Reduce latency with Placement

If your Worker makes **multiple sequential queries** per request, use [Placement](https://developers.cloudflare.com/workers/configuration/placement/) to run your Worker close to your database. Each query adds round-trip latency: 20-30ms from a distant region, or 1-3ms when placed nearby. Multiple queries compound this difference.

If your Worker makes only one query per request, placement does not improve end-to-end latency. The total round-trip time is the same whether it happens near the user or near the database.

wrangler.jsonc

```

{

  "placement": {

    "region": "aws:us-east-1", // Match your database region, for example "gcp:us-east4" or "azure:eastus"

  },

}


```

## Next steps

* Learn more about [how Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* How to [configure query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/).
* [Troubleshooting common issues](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) when connecting a database to Hyperdrive.

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord ↗](https://discord.cloudflare.com).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/get-started/#page","headline":"Getting started · Cloudflare Hyperdrive docs","description":"Create your first Hyperdrive configuration and connect a Cloudflare Worker to your database.","url":"https://developers.cloudflare.com/hyperdrive/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/get-started/","name":"Getting started"}}]}
```
