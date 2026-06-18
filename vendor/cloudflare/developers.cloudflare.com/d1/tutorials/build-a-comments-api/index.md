---
title: Build a Comments API
description: Use D1 to add comments to a static blog site. Create a D1 database and build a JSON API with Hono that allows the creation and retrieval of comments.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a Comments API

**Last reviewed:**  3 months ago 

In this tutorial, you will use D1 and [Hono ↗](https://hono.dev/) to build a JSON API that stores and retrieves comments for a blog. You will create a D1 database, define a schema, and wire up `GET` and `POST` endpoints that read from and write to the database.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a new Worker project

1. Create a new project named `d1-comments-api` by running:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- d1-comments-api  
```  
```  
yarn create cloudflare d1-comments-api  
```  
```  
pnpm create cloudflare@latest d1-comments-api  
```  
For setup, select the following options:  
   * For _What would you like to start with?_, choose `Hello World example`.  
   * For _Which template would you like to use?_, choose `Worker only`.  
   * For _Which language do you want to use?_, choose `TypeScript`.  
   * For _Do you want to use git for version control?_, choose `Yes`.  
   * For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).
2. Move into the project directory:  
Terminal window  
```  
cd d1-comments-api  
```

## 2\. Install Hono

Install [Hono ↗](https://hono.dev/), a lightweight web framework for building APIs on Workers:

 npm  yarn  pnpm  bun 

```
npm i hono
```

```
yarn add hono
```

```
pnpm add hono
```

```
bun add hono
```

## 3\. Create a database

1. Create a new D1 database with Wrangler:  
Terminal window  
```  
npx wrangler@latest d1 create d1-comments-api  
```
2. When prompted `Would you like Wrangler to add it on your behalf?`, select `Yes`. This automatically adds the `DB` binding to your Wrangler configuration file.  
Confirm that your Wrangler configuration file contains the `d1_databases` binding and the full project configuration:  
   * [  wrangler.jsonc ](#tab-panel-7915)  
   * [  wrangler.toml ](#tab-panel-7916)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "d1-comments-api",  
  "main": "src/index.ts",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "d1_databases": [  
    {  
      "binding": "DB",  
      "database_name": "d1-comments-api",  
      "database_id": "<YOUR_DATABASE_ID>"  
    }  
  ]  
}  
```  
TOML  
```  
name = "d1-comments-api"  
main = "src/index.ts"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
[[d1_databases]]  
binding = "DB" # available in your Worker on env.DB  
database_name = "d1-comments-api"  
database_id = "<YOUR_DATABASE_ID>"  
```  
Replace `<YOUR_DATABASE_ID>` with the ID output by the `wrangler d1 create` command.

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like D1 databases, KV namespaces, and R2 buckets, using a variable name in code. Your D1 database is accessible in your Worker on `env.DB`.

## 4\. Create a schema and seed the database

1. Create a `schemas/schema.sql` file with the following contents:  
```  
DROP TABLE IF EXISTS comments;  
CREATE TABLE IF NOT EXISTS comments (  
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
  author TEXT NOT NULL,  
  body TEXT NOT NULL,  
  post_slug TEXT NOT NULL  
);  
CREATE INDEX idx_comments_post_slug ON comments (post_slug);  
-- Optionally, uncomment the below query to insert seed data  
-- INSERT INTO comments (author, body, post_slug) VALUES ('Kristian', 'Great post!', 'hello-world');  
```
2. Run the schema against your local database first:  
Terminal window  
```  
npx wrangler d1 execute d1-comments-api --local --file schemas/schema.sql  
```
3. Verify the table was created locally:  
Terminal window  
```  
npx wrangler d1 execute d1-comments-api --local --command "SELECT name FROM sqlite_schema WHERE type = 'table'"  
```  
```  
┌──────────┐  
│ name     │  
├──────────┤  
│ comments │  
└──────────┘  
```
4. Once you are satisfied with the schema, apply it to your remote (production) database:  
Terminal window  
```  
npx wrangler d1 execute d1-comments-api --remote --file schemas/schema.sql  
```

## 5\. Initialize the Hono application

Replace the contents of `src/index.ts` with the following code. This sets up a Hono application with a typed `Bindings` interface so that `env.DB` is correctly typed as a `D1Database`:

* [  JavaScript ](#tab-panel-7921)
* [  TypeScript ](#tab-panel-7922)

JavaScript

```

import { Hono } from "hono";


const app = new Hono();


app.get("/api/posts/:slug/comments", async (c) => {

  // Do something and return an HTTP response

  // Optionally, do something with c.req.param("slug")

});


app.post("/api/posts/:slug/comments", async (c) => {

  // Do something and return an HTTP response

  // Optionally, do something with c.req.param("slug")

});


export default app;


```

TypeScript

```

import { Hono } from "hono";


type Bindings = {

  DB: D1Database;

};


const app = new Hono<{ Bindings: Bindings }>();


app.get("/api/posts/:slug/comments", async (c) => {

  // Do something and return an HTTP response

  // Optionally, do something with c.req.param("slug")

});


app.post("/api/posts/:slug/comments", async (c) => {

  // Do something and return an HTTP response

  // Optionally, do something with c.req.param("slug")

});


export default app;


```

## 6\. Query comments

Add the logic for the `GET` endpoint to retrieve comments for a given post. This uses the D1 [Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) to prepare and execute a parameterized query:

* [  JavaScript ](#tab-panel-7917)
* [  TypeScript ](#tab-panel-7918)

JavaScript

```

app.get("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { results } = await c.env.DB.prepare(

    "SELECT * FROM comments WHERE post_slug = ?",

  )

    .bind(slug)

    .run();

  return c.json(results);

});


```

TypeScript

```

app.get("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { results } = await c.env.DB.prepare(

    "SELECT * FROM comments WHERE post_slug = ?",

  )

    .bind(slug)

    .run();

  return c.json(results);

});


```

The code uses [prepare](https://developers.cloudflare.com/d1/worker-api/d1-database/#prepare) to create a parameterized statement, [bind](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#bind) to safely pass the slug value (preventing SQL injection), and [run](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#run) to execute the query.

## 7\. Insert comments

Add the `POST` endpoint to create new comments. This validates the request body before inserting a row:

* [  JavaScript ](#tab-panel-7923)
* [  TypeScript ](#tab-panel-7924)

JavaScript

```

app.post("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { author, body } = await c.req.json();


  if (!author) return c.text("Missing author value for new comment", 400);

  if (!body) return c.text("Missing body value for new comment", 400);


  const { success } = await c.env.DB.prepare(

    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)",

  )

    .bind(author, body, slug)

    .run();


  if (success) {

    c.status(201);

    return c.text("Created");

  } else {

    c.status(500);

    return c.text("Something went wrong");

  }

});


```

TypeScript

```

app.post("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { author, body } = await c.req.json<{

    author: string;

    body: string;

  }>();


  if (!author) return c.text("Missing author value for new comment", 400);

  if (!body) return c.text("Missing body value for new comment", 400);


  const { success } = await c.env.DB.prepare(

    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)",

  )

    .bind(author, body, slug)

    .run();


  if (success) {

    c.status(201);

    return c.text("Created");

  } else {

    c.status(500);

    return c.text("Something went wrong");

  }

});


```

## 8\. (Optional) Add CORS support

If you plan to call this API from a front-end application on a different origin, add CORS middleware. Import the `cors` module from Hono and add it before your routes:

* [  JavaScript ](#tab-panel-7919)
* [  TypeScript ](#tab-panel-7920)

JavaScript

```

import { Hono } from "hono";

import { cors } from "hono/cors";


const app = new Hono();

app.use("/api/*", cors());


```

TypeScript

```

import { Hono } from "hono";

import { cors } from "hono/cors";


type Bindings = {

  DB: D1Database;

};


const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());


```

When you make requests to `/api/*`, Hono will automatically generate and add CORS headers to responses from your API.

## 9\. Deploy your application

1. Log in to your Cloudflare account (if you have not already):  
Terminal window  
```  
npx wrangler whoami  
```  
If you are not logged in, Wrangler will prompt you to log in.
2. Deploy your Worker:  
Terminal window  
```  
npx wrangler deploy  
```
3. Test the API by inserting and then retrieving a comment:  
Terminal window  
```  
# Replace <YOUR_SUBDOMAIN> with your workers.dev subdomain  
curl -X POST https://d1-comments-api.<YOUR_SUBDOMAIN>.workers.dev/api/posts/hello-world/comments \  
  -H "Content-Type: application/json" \  
  -d '{"author": "Kristian", "body": "Great post!"}'  
```  
```  
Created  
```  
Terminal window  
```  
curl https://d1-comments-api.<YOUR_SUBDOMAIN>.workers.dev/api/posts/hello-world/comments  
```  
```  
[  
  {  
    "id": 1,  
    "author": "Kristian",  
    "body": "Great post!",  
    "post_slug": "hello-world"  
  }  
]  
```

## Full example

The complete `src/index.ts` with all routes and CORS support:

* [  JavaScript ](#tab-panel-7925)
* [  TypeScript ](#tab-panel-7926)

JavaScript

```

import { Hono } from "hono";

import { cors } from "hono/cors";


const app = new Hono();

app.use("/api/*", cors());


app.get("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { results } = await c.env.DB.prepare(

    "SELECT * FROM comments WHERE post_slug = ?",

  )

    .bind(slug)

    .run();

  return c.json(results);

});


app.post("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { author, body } = await c.req.json();


  if (!author) return c.text("Missing author value for new comment", 400);

  if (!body) return c.text("Missing body value for new comment", 400);


  const { success } = await c.env.DB.prepare(

    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)",

  )

    .bind(author, body, slug)

    .run();


  if (success) {

    c.status(201);

    return c.text("Created");

  } else {

    c.status(500);

    return c.text("Something went wrong");

  }

});


export default app;


```

TypeScript

```

import { Hono } from "hono";

import { cors } from "hono/cors";


type Bindings = {

  DB: D1Database;

};


const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());


app.get("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { results } = await c.env.DB.prepare(

    "SELECT * FROM comments WHERE post_slug = ?",

  )

    .bind(slug)

    .run();

  return c.json(results);

});


app.post("/api/posts/:slug/comments", async (c) => {

  const { slug } = c.req.param();

  const { author, body } = await c.req.json<{

    author: string;

    body: string;

  }>();


  if (!author) return c.text("Missing author value for new comment", 400);

  if (!body) return c.text("Missing body value for new comment", 400);


  const { success } = await c.env.DB.prepare(

    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)",

  )

    .bind(author, body, slug)

    .run();


  if (success) {

    c.status(201);

    return c.text("Created");

  } else {

    c.status(500);

    return c.text("Something went wrong");

  }

});


export default app;


```

## Next steps

* Refer to the [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) for a full list of available methods.
* Learn about [D1 local development](https://developers.cloudflare.com/d1/best-practices/local-development/) for testing your database without deploying.
* Explore [community projects built on D1](https://developers.cloudflare.com/d1/reference/community-projects/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/#page","headline":"Build a Comments API · Cloudflare D1 docs","description":"Use D1 to add comments to a static blog site. Create a D1 database and build a JSON API with Hono that allows the creation and retrieval of comments.","url":"https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Hono","TypeScript","SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/tutorials/build-a-comments-api/","name":"Build a Comments API"}}]}
```
