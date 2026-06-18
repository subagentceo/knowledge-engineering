---
title: Google Cloud SQL
description: Connect Hyperdrive to a Google Cloud SQL database instance.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Cloud SQL

**Last reviewed:**  over 2 years ago 

Connect Hyperdrive to a Google Cloud SQL database instance.

This example shows you how to connect Hyperdrive to a Google Cloud SQL MySQL database instance.

## 1\. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access.

Note

To allow Hyperdrive to connect to your database, you must allow Cloudflare IPs to be able to access your database. You can either allow-list all IP address ranges (0.0.0.0 - 255.255.255.255) or restrict your IP access control list to the [IP ranges used by Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/).

Alternatively, you can connect to your databases over in your private network using [Cloudflare Tunnels](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/).

### Cloud Console

When creating the instance or when editing an existing instance in the [Google Cloud Console ↗](https://console.cloud.google.com/sql/instances):

To allow Hyperdrive to reach your instance:

1. In the [Cloud Console ↗](https://console.cloud.google.com/sql/instances), select the instance you want Hyperdrive to connect to.
2. Expand **Connections** \> **Networking** \> ensure **Public IP** is enabled > **Add a Network** and input `0.0.0.0/0`.
3. Select **Done** \> **Save** to persist your changes.
4. Select **Overview** from the sidebar and note down the **Public IP address** of your instance.

To create a user for Hyperdrive to connect as:

1. Select **Users** in the sidebar.
2. Select **Add User Account** \> select **Built-in authentication**.
3. Provide a name (for example, `hyperdrive-user`), then select **Generate** to generate a password.
4. Copy this password to your clipboard before selecting **Add** to create the user.

With the username, password, public IP address and (optional) database name (default: `mysql`), you can now create a Hyperdrive database configuration.

## 2\. Create a database configuration

To configure Hyperdrive, you will need:

* The IP address (or hostname) and port of your database.
* The database username (for example, `hyperdrive-demo`) you configured in a previous step.
* The password associated with that username.
* The name of the database you want Hyperdrive to connect to. For example, `mysql`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```

mysql://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name


```

Most database providers will provide a connection string you can copy-and-paste directly into Hyperdrive.

To create a Hyperdrive configuration with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/), open your terminal and run the following command.

* Replace <NAME\_OF\_HYPERDRIVE\_CONFIG> with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or,
* Replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:

Terminal window

```

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"


```

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

This command outputs a binding for the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-8689)
* [  wrangler.toml ](#tab-panel-8690)

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

## 3\. Use Hyperdrive from your Worker

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

* [  wrangler.jsonc ](#tab-panel-8691)
* [  wrangler.toml ](#tab-panel-8692)

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

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/google-cloud-sql/#page","headline":"Google Cloud SQL · Cloudflare Hyperdrive docs","description":"Connect Hyperdrive to a Google Cloud SQL database instance.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/google-cloud-sql/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/","name":"Connect to MySQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/mysql-database-providers/","name":"Database Providers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-mysql/mysql-database-providers/google-cloud-sql/","name":"Google Cloud SQL"}}]}
```
