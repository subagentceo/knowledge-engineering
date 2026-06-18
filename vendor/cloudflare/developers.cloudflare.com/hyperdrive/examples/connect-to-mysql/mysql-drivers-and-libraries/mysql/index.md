---
title: mysql
description: Use the mysql driver with Hyperdrive to query MySQL databases from Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# mysql

**Last reviewed:**  about 1 year ago 

The [mysql ↗](https://github.com/mysqljs/mysql) package is a MySQL driver for Node.js. This example demonstrates how to use it with Cloudflare Workers and Hyperdrive.

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

* [  wrangler.jsonc ](#tab-panel-8699)
* [  wrangler.toml ](#tab-panel-8700)

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/#page","headline":"mysql · Cloudflare Hyperdrive docs","description":"Use the mysql driver with Hyperdrive to query MySQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/","name":"Connect to MySQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/","name":"Libraries and Drivers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/","name":"mysql"}}]}
```
