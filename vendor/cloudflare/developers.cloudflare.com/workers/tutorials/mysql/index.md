---
title: Connect to a MySQL database with Cloudflare Workers
description: This tutorial explains how to connect to a Cloudflare database using TCP Sockets and Hyperdrive. The Workers application you create in this tutorial will interact with a product database inside of MySQL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to a MySQL database with Cloudflare Workers

**Last reviewed:**  about 1 year ago 

In this tutorial, you will learn how to create a Cloudflare Workers application and connect it to a MySQL database using [TCP Sockets](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) and [Hyperdrive](https://developers.cloudflare.com/hyperdrive/). The Workers application you create in this tutorial will interact with a product database inside of MySQL.

Note

We recommend using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) to connect to your MySQL database. Hyperdrive provides optimal performance and will ensure secure connectivity between your Worker and your MySQL database.

When connecting directly to your MySQL database (without Hyperdrive), the MySQL drivers rely on unsupported Node.js APIs to create secure connections, which prevents connections.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [npm ↗](https://docs.npmjs.com/getting-started).
3. Install [Node.js ↗](https://nodejs.org/en/). Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.
4. Make sure you have access to a MySQL database.

## 1\. Create a Worker application

First, use the [create-cloudflare CLI ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker application. To do this, open a terminal window and run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- mysql-tutorial
```

```
yarn create cloudflare mysql-tutorial
```

```
pnpm create cloudflare@latest mysql-tutorial
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

cd mysql-tutorial


```

## 2\. Enable Node.js compatibility

[Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is required for database drivers, including mysql2, and needs to be configured for your Workers project.

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-12195)
* [  wrangler.toml ](#tab-panel-12196)

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

## 3\. Create a Hyperdrive configuration

Create a Hyperdrive configuration using the connection string for your MySQL database.

Terminal window

```

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"


```

This command outputs the Hyperdrive configuration `id` that will be used for your Hyperdrive [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Set up your binding by specifying the `id` in the Wrangler file.

* [  wrangler.jsonc ](#tab-panel-12193)
* [  wrangler.toml ](#tab-panel-12194)

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

## 4\. Query your database from your Worker

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

* [  wrangler.jsonc ](#tab-panel-12197)
* [  wrangler.toml ](#tab-panel-12198)

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

## 5\. Deploy your Worker

Run the following command to deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

## Next steps

To build more with databases and Workers, refer to [Tutorials](https://developers.cloudflare.com/workers/tutorials) and explore the [Databases documentation](https://developers.cloudflare.com/workers/databases).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord ↗](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/mysql/#page","headline":"Connect to a MySQL database with Cloudflare Workers · Cloudflare Workers docs","description":"This tutorial explains how to connect to a Cloudflare database using TCP Sockets and Hyperdrive. The Workers application you create in this tutorial will interact with a product database inside of MySQL.","url":"https://developers.cloudflare.com/workers/tutorials/mysql/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MySQL","TypeScript","SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/mysql/","name":"Connect to a MySQL database with Cloudflare Workers"}}]}
```
