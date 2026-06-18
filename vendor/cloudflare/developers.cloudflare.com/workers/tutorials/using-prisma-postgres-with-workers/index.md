---
title: Set up and use a Prisma Postgres database
description: This tutorial shows you how to set up a Cloudflare Workers project with Prisma ORM.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up and use a Prisma Postgres database

**Last reviewed:**  over 1 year ago 

[Prisma Postgres ↗](https://www.prisma.io/postgres) is a managed, serverless PostgreSQL database. It supports features like connection pooling, caching, real-time subscriptions, and query optimization recommendations.

In this tutorial, you will learn how to:

* Set up a Cloudflare Workers project with [Prisma ORM ↗](https://www.prisma.io/docs).
* Create a Prisma Postgres instance from the Prisma CLI.
* Model data and run migrations with Prisma Postgres.
* Query the database from Workers.
* Deploy the Worker to Cloudflare.

## Prerequisites

To follow this guide, ensure you have the following:

* Node.js `v18.18` or higher installed.
* An active [Cloudflare account ↗](https://dash.cloudflare.com/).
* A basic familiarity with installing and using command-line interface (CLI) applications.

## 1\. Create a new Worker project

Begin by using [C3](https://developers.cloudflare.com/pages/get-started/c3/) to create a Worker project in the command line:

Terminal window

```

npm create cloudflare@latest prisma-postgres-worker -- --type=hello-world --ts=true --git=true --deploy=false


```

Then navigate into your project:

Terminal window

```

cd ./prisma-postgres-worker


```

Your initial `src/index.ts` file currently contains a simple request handler:

src/index.ts

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    return new Response("Hello World!");

  },

} satisfies ExportedHandler<Env>;


```

## 2\. Setup Prisma in your project

In this step, you will set up Prisma ORM with a Prisma Postgres database using the CLI. Then you will create and execute helper scripts to create tables in the database and generate a Prisma client to query it.

### 2.1\. Install required dependencies

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

Install the [Prisma Accelerate client extension ↗](https://www.npmjs.com/package/@prisma/extension-accelerate) as it is required for Prisma Postgres:

 npm  yarn  pnpm  bun 

```
npm i @prisma/extension-accelerate
```

```
yarn add @prisma/extension-accelerate
```

```
pnpm add @prisma/extension-accelerate
```

```
bun add @prisma/extension-accelerate
```

Install the [dotenv-cli package ↗](https://www.npmjs.com/package/dotenv-cli) to load environment variables from `.dev.vars`:

 npm  yarn  pnpm  bun 

```
npm i -D dotenv-cli
```

```
yarn add -D dotenv-cli
```

```
pnpm add -D dotenv-cli
```

```
bun add -d dotenv-cli
```

### 2.2\. Create a Prisma Postgres database and initialize Prisma

Initialize Prisma in your application:

 npm  yarn  pnpm 

```
npx prisma@latest init --db
```

```
yarn dlx prisma@latest init --db
```

```
pnpx prisma@latest init --db
```

If you do not have a [Prisma Data Platform ↗](https://console.prisma.io/) account yet, or if you are not logged in, the command will prompt you to log in using one of the available authentication providers. A browser window will open so you can log in or create an account. Return to the CLI after you have completed this step.

Once logged in (or if you were already logged in), the CLI will prompt you to select a project name and a database region.

Once the command has terminated, it will have created:

* A project in your [Platform Console ↗](https://console.prisma.io/) containing a Prisma Postgres database instance.
* A `prisma` folder containing `schema.prisma`, where you will define your database schema.
* An `.env` file in the project root, which will contain the Prisma Postgres database url `DATABASE_URL=<your-prisma-postgres-database-url>`.

Note that Cloudflare Workers do not support `.env` files. You will use a file called `.dev.vars` instead of the `.env` file that was just created.

### 2.3\. Prepare environment variables

Rename the `.env` file in the root of your application to `.dev.vars` file:

Terminal window

```

mv .env .dev.vars


```

### 2.4\. Apply database schema changes

Open the `schema.prisma` file in the `prisma` folder and add the following `User` model to your database:

prisma/schema.prisma

```

generator client {

  provider = "prisma-client-js"

}


datasource db {

  provider = "postgresql"

  url      = env("DATABASE_URL")

}


model User {

  id  Int @id @default(autoincrement())

  email String

  name   String

}


```

Next, add the following helper scripts to the `scripts` section of your `package.json`:

package.json

```

"scripts": {

  "migrate": "dotenv -e .dev.vars -- npx prisma migrate dev",

  "generate": "dotenv -e .dev.vars -- npx prisma generate --no-engine",

  "studio": "dotenv -e .dev.vars -- npx prisma studio",

  // Additional worker scripts...

}


```

Run the migration script to apply changes to the database:

Terminal window

```

npm run migrate


```

When prompted, provide a name for the migration (for example, `init`).

After these steps are complete, Prisma ORM is fully set up and connected to your Prisma Postgres database.

## 3\. Develop the application

Modify the `src/index.ts` file and replace its contents with the following code:

src/index.ts

```

import { PrismaClient } from "@prisma/client/edge";

import { withAccelerate } from "@prisma/extension-accelerate";


export interface Env {

  DATABASE_URL: string;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    const path = new URL(request.url).pathname;

    if (path === "/favicon.ico")

      return new Response("Resource not found", {

        status: 404,

        headers: {

          "Content-Type": "text/plain",

        },

      });


    const prisma = new PrismaClient({

      datasourceUrl: env.DATABASE_URL,

    }).$extends(withAccelerate());


    const user = await prisma.user.create({

      data: {

        email: `Jon${Math.ceil(Math.random() * 1000)}@gmail.com`,

        name: "Jon Doe",

      },

    });


    const userCount = await prisma.user.count();


    return new Response(`\

Created new user: ${user.name} (${user.email}).

Number of users in the database: ${userCount}.

    `);

  },

} satisfies ExportedHandler<Env>;


```

Run the development server:

Terminal window

```

npm run dev


```

Visit [https://localhost:8787 ↗](https://localhost:8787) to see your app display the following output:

Terminal window

```

Number of users in the database: 1


```

Every time you refresh the page, a new user is created. The number displayed will increment by `1` with each refresh as it returns the total number of users in your database.

## 4\. Deploy the application to Cloudflare

When the application is deployed to Cloudflare, it needs access to the `DATABASE_URL` environment variable that is defined locally in `.dev.vars`. You can use the [npx wrangler secret put](https://developers.cloudflare.com/workers/configuration/secrets/#adding-secrets-to-your-project) command to upload the `DATABASE_URL` to the deployment environment:

Terminal window

```

npx wrangler secret put DATABASE_URL


```

When prompted, paste the `DATABASE_URL` value (from `.dev.vars`). If you are logged in via the Wrangler CLI, you will see a prompt asking if you'd like to create a new Worker. Confirm by choosing "yes":

Terminal window

```

✔ There doesn't seem to be a Worker called "prisma-postgres-worker". Do you want to create a new Worker with that name and add secrets to it? … yes


```

Then execute the following command to deploy your project to Cloudflare Workers:

Terminal window

```

npm run deploy


```

The `wrangler` CLI will bundle and upload your application.

If you are not already logged in, the `wrangler` CLI will open a browser window prompting you to log in to the Cloudflare dashboard.

Note

If you belong to multiple accounts, select the account where you want to deploy the project.

Once the deployment completes, verify the deployment by visiting the live URL provided in the deployment output, such as `https://{PROJECT_NAME}.workers.dev`. If you encounter any issues, ensure the secrets were added correctly and check the deployment logs for errors.

## Next steps

Congratulations on building and deploying a simple application with Prisma Postgres and Cloudflare Workers!

To enhance your application further:

* Add [caching ↗](https://www.prisma.io/docs/postgres/caching) to your queries.
* Explore the [Prisma Postgres documentation ↗](https://www.prisma.io/docs/postgres/getting-started).

To see how to build a real-time application with Cloudflare Workers and Prisma Postgres, read [this ↗](https://www.prisma.io/docs/guides/prisma-postgres-realtime-on-cloudflare) guide.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/using-prisma-postgres-with-workers/#page","headline":"Set up and use a Prisma Postgres database · Cloudflare Workers docs","description":"This tutorial shows you how to set up a Cloudflare Workers project with Prisma ORM.","url":"https://developers.cloudflare.com/workers/tutorials/using-prisma-postgres-with-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript","SQL","Prisma ORM","PostgreSQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/using-prisma-postgres-with-workers/","name":"Set up and use a Prisma Postgres database"}}]}
```
