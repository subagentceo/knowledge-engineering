---
title: Prisma ORM
description: Use Prisma ORM with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prisma ORM

**Last reviewed:**  10 months ago 

[Prisma ORM ↗](https://www.prisma.io/docs) is a Node.js and TypeScript ORM with a focus on type safety and developer experience. This example demonstrates how to use Prisma ORM with PostgreSQL via Cloudflare Hyperdrive in a Workers application.

## Prerequisites

* A Cloudflare account with Workers access
* A PostgreSQL database (such as [Prisma Postgres ↗](https://www.prisma.io/postgres))
* A [Hyperdrive configuration to your PostgreSQL database](https://developers.cloudflare.com/hyperdrive/get-started/#3-connect-hyperdrive-to-a-database)
* An existing [Worker project](https://developers.cloudflare.com/workers/get-started/guide/)

## 1\. Install Prisma ORM

Install Prisma CLI as a dev dependency:

 npm  yarn  pnpm  bun 

```
npm i -D prisma
```

```
yarn add -D prisma
```

```
pnpm add -D prisma
```

```
bun add -d prisma
```

Install the `pg` driver and Prisma driver adapter for use with Hyperdrive:

 npm  yarn  pnpm  bun 

```
npm i pg@>8.13.0 @prisma/adapter-pg
```

```
yarn add pg@>8.13.0 @prisma/adapter-pg
```

```
pnpm add pg@>8.13.0 @prisma/adapter-pg
```

```
bun add pg@>8.13.0 @prisma/adapter-pg
```

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

Add the required Node.js compatibility flags and Hyperdrive binding to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-8809)
* [  wrangler.toml ](#tab-panel-8810)

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

## 2\. Configure Prisma ORM

### 2.1\. Initialize Prisma

Initialize Prisma in your application:

Terminal window

```

npx prisma init


```

This creates a `prisma` folder with a `schema.prisma` file and an `.env` file.

### 2.2\. Define a schema

Define your database schema in the `prisma/schema.prisma` file:

prisma/schema.prisma

```

generator client {

  provider        = "prisma-client-js"

  previewFeatures = ["driverAdapters"]

}


datasource db {

  provider = "postgresql"

  url      = env("DATABASE_URL")

}


model User {

  id        Int      @id @default(autoincrement())

  name      String

  email     String   @unique

  createdAt DateTime @default(now())

}


```

### 2.3\. Set up environment variables

Add your database connection string to the `.env` file created by Prisma:

.env

```

DATABASE_URL="postgres://user:password@host:port/database"


```

Add helper scripts to your `package.json`:

package.json

```

"scripts": {

  "migrate": "npx prisma migrate dev",

  "generate": "npx prisma generate --no-engine",

  "studio": "npx prisma studio"

}


```

### 2.4\. Generate Prisma Client

Generate the Prisma client with driver adapter support:

Terminal window

```

npm run generate


```

### 2.5\. Run migrations

Generate and apply the database schema:

Terminal window

```

npm run migrate


```

When prompted, provide a name for the migration (for example, `init`).

## 3\. Connect Prisma ORM to Hyperdrive

Use your Hyperdrive configuration when using Prisma ORM. Update your `src/index.ts` file:

src/index.ts

```

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@prisma/client";


export interface Env {

  HYPERDRIVE: Hyperdrive;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create Prisma client using driver adapter with Hyperdrive connection string

    const adapter = new PrismaPg({ connectionString: env.HYPERDRIVE.connectionString });

    const prisma = new PrismaClient({ adapter });


    // Sample query to create and fetch users

    const user = await prisma.user.create({

      data: {

        name: "John Doe",

        email: `john.doe.${Date.now()}@example.com`,

      },

    });


    const allUsers = await prisma.user.findMany();


    return Response.json({

      newUser: user,

      allUsers: allUsers,

    });

  },

} satisfies ExportedHandler<Env>;


```

Note

When using Prisma ORM with Hyperdrive, you must use driver adapters to properly utilize the Hyperdrive connection string. The `@prisma/adapter-pg` driver adapter allows Prisma ORM to work with the `pg` driver and Hyperdrive's connection pooling. This approach provides connection pooling at the network level through Hyperdrive, so you don't need Prisma-specific connection pooling extensions like Prisma Accelerate.

## 4\. Deploy your Worker

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

## Next steps

* Learn more about [How Hyperdrive Works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Refer to the [troubleshooting guide](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
* Understand more about other [storage options](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/#page","headline":"Prisma ORM · Cloudflare Hyperdrive docs","description":"Use Prisma ORM with Hyperdrive to query PostgreSQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/","name":"Connect to PostgreSQL"}},{"@type":"ListItem","position":5,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/","name":"Libraries and Drivers"}},{"@type":"ListItem","position":6,"item":{"@id":"/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/prisma-orm/","name":"Prisma ORM"}}]}
```
