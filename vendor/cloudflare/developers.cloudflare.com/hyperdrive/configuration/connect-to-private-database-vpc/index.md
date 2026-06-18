---
title: Connect to a private database using Workers VPC (Recommended)
description: Workers VPC provides a way to connect Hyperdrive to a private database without configuring Cloudflare Access applications or service tokens. Instead, you create a TCP VPC Service that points to your database and pass its service ID to Hyperdrive.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to a private database using Workers VPC (Recommended)

[Workers VPC](https://developers.cloudflare.com/workers-vpc/) provides a way to connect Hyperdrive to a private database without configuring Cloudflare Access applications or service tokens. Instead, you create a TCP [VPC Service](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) that points to your database and pass its service ID to Hyperdrive.

For the Tunnel and Access approach, refer to [Connect to a private database using Tunnel](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/).

## How it works

When your database is isolated within a private network (such as a [virtual private cloud ↗](https://www.cloudflare.com/learning/cloud/what-is-a-virtual-private-cloud) or an on-premise network), you must enable a secure connection from your network to Cloudflare.

* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is used to establish a secure outbound connection from your private network to Cloudflare.
* A [VPC Service](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) is used to route traffic from your Worker through the tunnel to your database, without requiring Cloudflare Access applications or service tokens.

A request from the Cloudflare Worker to the origin database goes through Hyperdrive, the VPC Service, and the Cloudflare Tunnel established by `cloudflared`. `cloudflared` must be running in the private network in which your database is accessible.

flowchart LR
    A[Cloudflare Worker] --> B[Hyperdrive] --> C[VPC Service] --> D[Cloudflare Tunnel] --> E[Private Database]

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Prerequisites

* A database in your private network, [configured to use TLS/SSL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/#supported-tls-ssl-modes).
* A [Cloudflare Tunnel](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/) running in a network that can reach your database.
* The **Connectivity Directory Admin** role on your Cloudflare account to create VPC Services.

## 1\. Set up a Cloudflare Tunnel

If you do not already have a tunnel running in the same network as your database, create one.

1. Go to the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc/tunnels) and select the **Tunnels** tab.
2. Select **Create** to create a tunnel.
3. Enter a name for your tunnel and select **Save tunnel**.
4. Choose your operating system and architecture. The dashboard will provide installation instructions.
5. Follow the provided commands to download, install, and run `cloudflared` with your unique token.

The tunnel must be able to reach your database host and port from within the private network.

For full tunnel documentation, refer to [Cloudflare Tunnel for Workers VPC](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/).

## 2\. Create a TCP VPC Service

Create a VPC Service of type `tcp` that points to your database. Set the `--app-protocol` flag to `postgresql` or `mysql` so that Hyperdrive can optimize connections.

* [ PostgreSQL ](#tab-panel-8646)
* [ MySQL ](#tab-panel-8647)

Terminal window

```

npx wrangler vpc service create my-postgres-db \

  --type tcp \

  --tcp-port 5432 \

  --app-protocol postgresql \

  --tunnel-id <YOUR_TUNNEL_ID> \

  --ipv4 <YOUR_DATABASE_IP>


```

Terminal window

```

npx wrangler vpc service create my-mysql-db \

  --type tcp \

  --tcp-port 3306 \

  --app-protocol mysql \

  --tunnel-id <YOUR_TUNNEL_ID> \

  --ipv4 <YOUR_DATABASE_IP>


```

Replace:

* `<YOUR_TUNNEL_ID>` with the tunnel ID from step 1.
* `<YOUR_DATABASE_IP>` with the private IP address of your database (for example, `10.0.0.5`). You can also use `--hostname` with a DNS name instead of `--ipv4`.

The command will return a service ID. Save this value for the next step.

You can also create a TCP VPC Service from the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc). Refer to [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) for all configuration options.

### TLS certificate verification

Unlike Hyperdrive, which does not verify the origin server certificate by default, Workers VPC defaults to `verify_full` — it verifies both the certificate chain and the hostname. If your database uses a self-signed certificate or a certificate from a private certificate authority (CA), the TLS handshake will fail unless you adjust the verification mode.

For databases with self-signed certificates, add `--cert-verification-mode` when creating the VPC Service:

* `verify_ca` — Verifies the certificate chain but skips hostname verification. Use this when your database has a certificate signed by a CA you control but the hostname does not match the certificate.
* `disabled` — Skips certificate verification entirely. Use this only for development or testing.

For example, to create a VPC Service for a PostgreSQL database with a self-signed certificate:

Terminal window

```

npx wrangler vpc service create my-postgres-db \

  --type tcp \

  --tcp-port 5432 \

  --app-protocol postgresql \

  --tunnel-id <YOUR_TUNNEL_ID> \

  --ipv4 <YOUR_DATABASE_IP> \

  --cert-verification-mode verify_ca


```

To update an existing VPC Service, use `wrangler vpc service update` with the same flag.

Note

Workers VPC trusts publicly trusted certificates and [Cloudflare Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/). Uploading a custom CA certificate to Workers VPC is not supported yet. If your database uses a certificate signed by a private CA, set `--cert-verification-mode` to `verify_ca` or `disabled` until custom CA support is available.

For the full list of verification modes, refer to [TLS certificate verification mode](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#tls-certificate-verification-mode).

## 3\. Create a Hyperdrive configuration

Use the `--service-id` flag to point Hyperdrive at the VPC Service you created. When you use `--service-id`, you do not provide `--origin-host`, `--origin-port`, or `--connection-string`. Hyperdrive routes traffic through the VPC Service instead.

* [ PostgreSQL ](#tab-panel-8648)
* [ MySQL ](#tab-panel-8649)

Terminal window

```

npx wrangler hyperdrive create <YOUR_CONFIG_NAME> \

  --service-id <YOUR_VPC_SERVICE_ID> \

  --database <DATABASE_NAME> \

  --user <DATABASE_USER> \

  --password <DATABASE_PASSWORD> \

  --scheme postgresql


```

Terminal window

```

npx wrangler hyperdrive create <YOUR_CONFIG_NAME> \

  --service-id <YOUR_VPC_SERVICE_ID> \

  --database <DATABASE_NAME> \

  --user <DATABASE_USER> \

  --password <DATABASE_PASSWORD> \

  --scheme mysql


```

Replace:

* `<YOUR_VPC_SERVICE_ID>` with the service ID from step 2.
* `<DATABASE_NAME>` with the name of your database.
* `<DATABASE_USER>` and `<DATABASE_PASSWORD>` with your database credentials.

If successful, the command will output a Hyperdrive configuration with an `id` field. Copy this ID for the next step.

Note

The `--service-id` flag conflicts with `--origin-host`, `--origin-port`, `--connection-string`, `--access-client-id`, and `--access-client-secret`. You cannot combine these options. To update an existing Hyperdrive configuration to use a VPC Service, run `wrangler hyperdrive update` with the `--service-id` flag.

## 4\. Bind Hyperdrive to a Worker

You must create a binding in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Worker to connect to your Hyperdrive configuration. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like Hyperdrive, on the Cloudflare developer platform.

To bind your Hyperdrive configuration to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8650)
* [  wrangler.toml ](#tab-panel-8651)

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

* [  wrangler.jsonc ](#tab-panel-8652)
* [  wrangler.toml ](#tab-panel-8653)

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

## 5\. Query the database

* [ PostgreSQL ](#tab-panel-8658)
* [ MySQL ](#tab-panel-8659)

Use [node-postgres ↗](https://node-postgres.com/) (`pg`) to send a test query.

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

* [  wrangler.jsonc ](#tab-panel-8654)
* [  wrangler.toml ](#tab-panel-8655)

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

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

If you receive a list of `pg_tables` from your database when you access your deployed Worker, Hyperdrive is connected to your private database through Workers VPC.

Use [mysql2 ↗](https://github.com/sidorares/node-mysql2) to send a test query.

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

* [  wrangler.jsonc ](#tab-panel-8656)
* [  wrangler.toml ](#tab-panel-8657)

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

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

If you receive a list of tables from your database when you access your deployed Worker, Hyperdrive is connected to your private database through Workers VPC.

## Next steps

* Learn more about [how Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Configure [query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/) for Hyperdrive.
* Review [VPC Service configuration options](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) including TLS certificate verification.
* Set up [high availability tunnels](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/) for production workloads.
* [Troubleshoot common issues](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) when connecting a database to Hyperdrive.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/#page","headline":"Connect to a private database using Workers VPC (Recommended) · Cloudflare Hyperdrive docs","description":"Workers VPC provides a way to connect Hyperdrive to a private database without configuring Cloudflare Access applications or service tokens. Instead, you create a TCP VPC Service that points to your database and pass its service ID to Hyperdrive.","url":"https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/connect-to-private-database-vpc/","name":"Connect to a private database using Workers VPC (Recommended)"}}]}
```
