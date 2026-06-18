---
title: Connect to a PostgreSQL database with Cloudflare Workers
description: This tutorial explains how to connect to a Postgres database with Cloudflare Workers. The Workers application you create in this tutorial will interact with a product database inside of Postgres.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to a PostgreSQL database with Cloudflare Workers

**Last reviewed:**  12 months ago 

In this tutorial, you will learn how to create a Cloudflare Workers application and connect it to a PostgreSQL database using [TCP Sockets](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) and [Hyperdrive](https://developers.cloudflare.com/hyperdrive/). The Workers application you create in this tutorial will interact with a product database inside of PostgreSQL.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [npm ↗](https://docs.npmjs.com/getting-started).
3. Install [Node.js ↗](https://nodejs.org/en/). Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.
4. Make sure you have access to a PostgreSQL database.

## 1\. Create a Worker application

First, use the [create-cloudflare CLI ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker application. To do this, open a terminal window and run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- postgres-tutorial
```

```
yarn create cloudflare postgres-tutorial
```

```
pnpm create cloudflare@latest postgres-tutorial
```

This will prompt you to install the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) package and lead you through a setup wizard.

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed. If you deploy, you can still modify your Worker code and deploy again at the end of this tutorial.

Now, move into the newly created directory:

Terminal window

```

cd postgres-tutorial


```

### Enable Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for database drivers, including Postgres.js, and needs to be configured for your Workers project.

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-12203)
* [  wrangler.toml ](#tab-panel-12204)

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

## 2\. Add the PostgreSQL connection library

To connect to a PostgreSQL database, you will need the `pg` library. In your Worker application directory, run the following command to install the library:

 npm  yarn  pnpm  bun 

```
npm i pg
```

```
yarn add pg
```

```
pnpm add pg
```

```
bun add pg
```

Next, install the TypeScript types for the `pg` library to enable type checking and autocompletion in your TypeScript code:

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

Note

Make sure you are using `pg` (`node-postgres`) version `8.16.3` or higher.

## 3\. Configure the connection to the PostgreSQL database

Choose one of the two methods to connect to your PostgreSQL database:

1. [Use a connection string](#use-a-connection-string).
2. [Set explicit parameters](#set-explicit-parameters).

### Use a connection string

A connection string contains all the information needed to connect to a database. It is a URL that contains the following information:

```

postgresql://username:password@host:port/database


```

Replace `username`, `password`, `host`, `port`, and `database` with the appropriate values for your PostgreSQL database.

Set your connection string as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) so that it is not stored as plain text. Use [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) with the example variable name `DB_URL`:

Terminal window

```

npx wrangler secret put DB_URL


```

```

➜  wrangler secret put DB_URL

-------------------------------------------------------

? Enter a secret value: › ********************

✨ Success! Uploaded secret DB_URL


```

Set your `DB_URL` secret locally in a `.dev.vars` file as documented in [Local Development with Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

.dev.vars

```

DB_URL="<ENTER YOUR POSTGRESQL CONNECTION STRING>"


```

### Set explicit parameters

Configure each database parameter as an [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) via the [Cloudflare dashboard](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard) or in your Wrangler file. Refer to an example of a Wrangler file configuration:

* [  wrangler.jsonc ](#tab-panel-12199)
* [  wrangler.toml ](#tab-panel-12200)

JSONC

```

{

  "vars": {

    "DB_USERNAME": "postgres",

    // Set your password by creating a secret so it is not stored as plain text

    "DB_HOST": "ep-aged-sound-175961.us-east-2.aws.neon.tech",

    "DB_PORT": 5432,

    "DB_NAME": "productsdb"

  }

}


```

TOML

```

[vars]

DB_USERNAME = "postgres"

DB_HOST = "ep-aged-sound-175961.us-east-2.aws.neon.tech"

DB_PORT = 5_432

DB_NAME = "productsdb"


```

To set your password as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) so that it is not stored as plain text, use [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret). `DB_PASSWORD` is an example variable name for this secret to be accessed in your Worker:

Terminal window

```

npx wrangler secret put DB_PASSWORD


```

```

-------------------------------------------------------

? Enter a secret value: › ********************

✨ Success! Uploaded secret DB_PASSWORD


```

## 4\. Connect to the PostgreSQL database in the Worker

Open your Worker's main file (for example, `worker.ts`) and import the `Client` class from the `pg` library:

TypeScript

```

import { Client } from "pg";


```

In the `fetch` event handler, connect to the PostgreSQL database using your chosen method, either the connection string or the explicit parameters.

### Use a connection string

TypeScript

```

// create a new Client instance using the connection string

const sql = new Client({ connectionString: env.DB_URL });

// connect to the PostgreSQL database

await sql.connect();


```

### Set explicit parameters

TypeScript

```

// create a new Client instance using explicit parameters

const sql = new Client({

  username: env.DB_USERNAME,

  password: env.DB_PASSWORD,

  host: env.DB_HOST,

  port: env.DB_PORT,

  database: env.DB_NAME,

  ssl: true, // Enable SSL for secure connections

});

// connect to the PostgreSQL database

await sql.connect();


```

## 5\. Interact with the products database

To demonstrate how to interact with the products database, you will fetch data from the `products` table by querying the table when a request is received.

Note

If you are following along in your own PostgreSQL instance, set up the `products` using the following SQL `CREATE TABLE` statement. This statement defines the columns and their respective data types for the `products` table:

```

CREATE TABLE products (

  id SERIAL PRIMARY KEY,

  name VARCHAR(255) NOT NULL,

  description TEXT,

  price DECIMAL(10, 2) NOT NULL

);


```

Replace the existing code in your `worker.ts` file with the following code:

TypeScript

```

import { Client } from "pg";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new Client instance using the connection string

    // or explicit parameters as shown in the previous steps.

    // Here, we are using the connection string method.

    const sql = new Client({

      connectionString: env.DB_URL,

    });

        // Connect to the PostgreSQL database

        await sql.connect();


        // Query the products table

        const result = await sql.query("SELECT * FROM products");


        // Return the result as JSON

        return new Response(JSON.stringify(result.rows), {

            headers: {

                "Content-Type": "application/json",

            },

        });

  },

} satisfies ExportedHandler<Env>;


```

This code establishes a connection to the PostgreSQL database within your Worker application and queries the `products` table, returning the results as a JSON response.

## 6\. Deploy your Worker

Run the following command to deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

After deploying, you can interact with your PostgreSQL products database using your Cloudflare Worker. Whenever a request is made to your Worker's URL, it will fetch data from the `products` table and return it as a JSON response. You can modify the query as needed to retrieve the desired data from your products database.

## 7\. Insert a new row into the products database

To insert a new row into the `products` table, create a new API endpoint in your Worker that handles a `POST` request. When a `POST` request is received with a JSON payload, the Worker will insert a new row into the `products` table with the provided data.

Assume the `products` table has the following columns: `id`, `name`, `description`, and `price`.

Add the following code snippet inside the `fetch` event handler in your `worker.ts` file, before the existing query code:

TypeScript

```

import { Client } from "pg";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create a new Client instance using the connection string

    // or explicit parameters as shown in the previous steps.

    // Here, we are using the connection string method.

    const sql = new Client({

      connectionString: env.DB_URL,

    });

        // Connect to the PostgreSQL database

        await sql.connect();


        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/products") {

            // Parse the request's JSON payload

            const productData = (await request.json()) as {

                name: string;

                description: string;

                price: number;

            };


            const name = productData.name,

                description = productData.description,

                price = productData.price;


            // Insert the new product into the products table

            const insertResult = await sql.query(

                `INSERT INTO products(name, description, price) VALUES($1, $2, $3)

    RETURNING *`,

                [name, description, price],

            );


            // Return the inserted row as JSON

            return new Response(JSON.stringify(insertResult.rows), {

                headers: { "Content-Type": "application/json" },

            });

        }


        // Query the products table

        const result = await sql.query("SELECT * FROM products");


        // Return the result as JSON

        return new Response(JSON.stringify(result.rows), {

            headers: {

                "Content-Type": "application/json",

            },

        });

  },

} satisfies ExportedHandler<Env>;


```

This code snippet does the following:

1. Checks if the request is a `POST` request and the URL path is `/products`.
2. Parses the JSON payload from the request.
3. Constructs an `INSERT` SQL query using the provided product data.
4. Executes the query, inserting the new row into the `products` table.
5. Returns the inserted row as a JSON response.

Now, when you send a `POST` request to your Worker's URL with the `/products` path and a JSON payload, the Worker will insert a new row into the `products` table with the provided data. When a request to `/` is made, the Worker will return all products in the database.

After making these changes, deploy the Worker again by running:

Terminal window

```

npx wrangler deploy


```

You can now use your Cloudflare Worker to insert new rows into the `products` table. To test this functionality, send a `POST` request to your Worker's URL with the `/products` path, along with a JSON payload containing the new product data:

```

{

  "name": "Sample Product",

  "description": "This is a sample product",

  "price": 19.99

}


```

You have successfully created a Cloudflare Worker that connects to a PostgreSQL database and handles fetching data and inserting new rows into a products table.

## 8\. Use Hyperdrive to accelerate queries

Create a Hyperdrive configuration using the connection string for your PostgreSQL database.

Terminal window

```

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --caching-disabled


```

This command outputs the Hyperdrive configuration `id` that will be used for your Hyperdrive [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Set up your binding by specifying the `id` in the Wrangler file.

* [  wrangler.jsonc ](#tab-panel-12201)
* [  wrangler.toml ](#tab-panel-12202)

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

Create the types for your Hyperdrive binding using the following command:

Terminal window

```

npx wrangler types


```

Replace your existing connection string in your Worker code with the Hyperdrive connection string.

JavaScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const sql = new Client({connectionString: env.HYPERDRIVE.connectionString})


    const url = new URL(request.url);


    //rest of the routes and database queries

  },

} satisfies ExportedHandler<Env>;


```

## 9\. Redeploy your Worker

Run the following command to deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Your Worker application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`, using Hyperdrive. Hyperdrive accelerates database queries by pooling your connections and caching your requests across the globe.

## Next steps

To build more with databases and Workers, refer to [Tutorials](https://developers.cloudflare.com/workers/tutorials) and explore the [Databases documentation](https://developers.cloudflare.com/workers/databases).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord ↗](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/postgres/#page","headline":"Connect to a PostgreSQL database with Cloudflare Workers · Cloudflare Workers docs","description":"This tutorial explains how to connect to a Postgres database with Cloudflare Workers. The Workers application you create in this tutorial will interact with a product database inside of Postgres.","url":"https://developers.cloudflare.com/workers/tutorials/postgres/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["PostgreSQL","TypeScript","SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/postgres/","name":"Connect to a PostgreSQL database with Cloudflare Workers"}}]}
```
