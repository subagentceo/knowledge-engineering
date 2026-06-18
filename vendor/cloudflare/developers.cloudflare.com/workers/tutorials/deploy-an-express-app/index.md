---
title: Deploy an Express.js application on Cloudflare Workers
description: Learn how to deploy an Express.js application on Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy an Express.js application on Cloudflare Workers

**Last reviewed:**  8 months ago 

In this tutorial, you will learn how to deploy an [Express.js ↗](https://expressjs.com/) application on Cloudflare Workers using the [Cloudflare Workers platform](https://developers.cloudflare.com/workers/) and [D1 database](https://developers.cloudflare.com/d1/). You will build a Members Registry API with basic Create, Read, Update, and Delete (CRUD) operations. You will use D1 as the database for storing and retrieving member data.

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Quick start

If you want to skip the steps and get started quickly, select **Deploy to Cloudflare** below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/express-on-workers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers. Use this option if you are familiar with Cloudflare Workers, and wish to skip the step-by-step guidance.

You may wish to manually follow the steps if you are new to Cloudflare Workers.

## 1\. Create a new Cloudflare Workers project

Use [C3 ↗](https://developers.cloudflare.com/learning-paths/workers/get-started/c3-and-wrangler/#c3), the command-line tool for Cloudflare's developer products, to create a new directory and initialize a new Worker project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- express-d1-app
```

```
yarn create cloudflare express-d1-app
```

```
pnpm create cloudflare@latest express-d1-app
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Change into your new project directory:

```

cd express-d1-app


```

## 2\. Install Express and dependencies

In this tutorial, you will use [Express.js ↗](https://expressjs.com/), a popular web framework for Node.js. To use Express in a Cloudflare Workers environment, install Express along with the necessary TypeScript types:

 npm  yarn  pnpm  bun 

```
npm i express @types/express
```

```
yarn add express @types/express
```

```
pnpm add express @types/express
```

```
bun add express @types/express
```

Express.js on Cloudflare Workers requires the `nodejs_compat` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/). This flag enables Node.js APIs and allows Express to run on the Workers runtime. Add the following to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-12181)
* [  wrangler.toml ](#tab-panel-12182)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


```

## 3\. Create a D1 database

You will now create a D1 database to store member information. Use the `wrangler d1 create` command to create a new database:

```

npx wrangler d1 create members-db


```

The command will create a new D1 database and ask you the following questions:

* **Would you like Wrangler to add it on your behalf?**: Type `Y`.
* **What binding name would you like to use?**: Type `DB` and press Enter.
* **For local dev, do you want to connect to the remote resource instead of a local resource?**: Type `N`.

```

 ⛅️ wrangler 4.44.0

───────────────────

✅ Successfully created DB 'members-db' in region WNAM

Created your new D1 database.


To access your new D1 Database in your Worker, add the following snippet to your configuration file:

{

  "d1_databases": [

    {

      "binding": "members_db",

      "database_name": "members-db",

      "database_id": "<unique-ID-for-your-database>"

    }

  ]

}

✔ Would you like Wrangler to add it on your behalf? … yes

✔ What binding name would you like to use? … DB

✔ For local dev, do you want to connect to the remote resource instead of a local resource? … no


```

The binding will be added to your Wrangler configuration file.

* [  wrangler.jsonc ](#tab-panel-12183)
* [  wrangler.toml ](#tab-panel-12184)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "DB",

      "database_name": "members-db",

      "database_id": "<unique-ID-for-your-database>"

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "members-db"

database_id = "<unique-ID-for-your-database>"


```

## 4\. Create database schema

Create a directory called `schemas` in your project root, and inside it, create a file called `schema.sql`:

schemas/schema.sql

```

DROP TABLE IF EXISTS members;

CREATE TABLE IF NOT EXISTS members (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT NOT NULL,

  email TEXT NOT NULL UNIQUE,

  joined_date TEXT NOT NULL

);


-- Insert sample data

INSERT INTO members (name, email, joined_date) VALUES

  ('Alice Johnson', 'alice@example.com', '2024-01-15'),

  ('Bob Smith', 'bob@example.com', '2024-02-20'),

  ('Carol Williams', 'carol@example.com', '2024-03-10');


```

This schema creates a `members` table with an auto-incrementing ID, name, email, and join date fields. It also inserts three sample members.

Execute the schema file against your D1 database:

```

npx wrangler d1 execute members-db --file=./schemas/schema.sql


```

The above command creates the table in your local development database. You will deploy the schema to production later.

## 5\. Initialize Express application

Update your `src/index.ts` file to set up Express with TypeScript. Replace the file content with the following:

src/index.ts

```

import { env } from "cloudflare:workers";

import { httpServerHandler } from "cloudflare:node";

import express from "express";


const app = express();


// Middleware to parse JSON bodies

app.use(express.json());


// Health check endpoint

app.get("/", (req, res) => {

  res.json({ message: "Express.js running on Cloudflare Workers!" });

});


app.listen(3000);

export default httpServerHandler({ port: 3000 });


```

This code initializes Express and creates a basic health check endpoint. The key import `import { env } from "cloudflare:workers"` allows you to access [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) like your D1 database from anywhere in your code. The [httpServerHandler](https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/#httpserverhandler) integrates Express with the Workers runtime, enabling your application to handle HTTP requests on Cloudflare's network.

Next, execute the typegen command to generate type definitions for your Worker environment:

```

npm run cf-typegen


```

## 6\. Implement read operations

Add endpoints to retrieve members from the database. Update your `src/index.ts` file by adding the following routes after the health check endpoint:

src/index.ts

```

// GET all members

app.get('/api/members', async (req, res) => {

  try {

    const { results } = await env.DB.prepare('SELECT * FROM members ORDER BY joined_date DESC').all();


    res.json({ success: true, members: results });

  } catch (error) {

    res.status(500).json({ success: false, error: 'Failed to fetch members' });

  }

});


// GET a single member by ID

app.get('/api/members/:id', async (req, res) => {

  try {

    const { id } = req.params;


    const { results } = await env.DB.prepare('SELECT * FROM members WHERE id = ?').bind(id).all();


    if (results.length === 0) {

      return res.status(404).json({ success: false, error: 'Member not found' });

    }


    res.json({ success: true, member: results[0] });

  } catch (error) {

    res.status(500).json({ success: false, error: 'Failed to fetch member' });

  }

});


```

These routes use the D1 binding (`env.DB`) to prepare SQL statements and execute them. Since you imported `env` from `cloudflare:workers` at the top of the file, it is accessible throughout your application. The `prepare`, `bind`, and `all` methods on the D1 binding allow you to safely query the database. Refer to [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) for all available methods.

## 7\. Implement create operation

Add an endpoint to create new members. Add the following route to your `src/index.ts` file:

src/index.ts

```

// POST - Create a new member

app.post("/api/members", async (req, res) => {

  try {

    const { name, email } = req.body;


    // Validate input

    if (!name || !email) {

      return res.status(400).json({

        success: false,

        error: "Name and email are required",

      });

    }


    // Basic email validation (simplified for tutorial purposes)

    // For production, consider using a validation library or more comprehensive checks

    if (!email.includes("@") || !email.includes(".")) {

      return res.status(400).json({

        success: false,

        error: "Invalid email format",

      });

    }


    const joined_date = new Date().toISOString().split("T")[0];


    const result = await env.DB.prepare(

      "INSERT INTO members (name, email, joined_date) VALUES (?, ?, ?)"

    )

      .bind(name, email, joined_date)

      .run();


    if (result.success) {

      res.status(201).json({

        success: true,

        message: "Member created successfully",

        id: result.meta.last_row_id,

      });

    } else {

      res

        .status(500)

        .json({ success: false, error: "Failed to create member" });

    }

  } catch (error: any) {

    // Handle unique constraint violation

    if (error.message?.includes("UNIQUE constraint failed")) {

      return res.status(409).json({

        success: false,

        error: "Email already exists",

      });

    }

    res.status(500).json({ success: false, error: "Failed to create member" });

  }

});


```

This endpoint validates the input, checks the email format, and inserts a new member into the database. It also handles duplicate email addresses by checking for unique constraint violations.

## 8\. Implement update operation

Add an endpoint to update existing members. Add the following route to your `src/index.ts` file:

src/index.ts

```

app.put("/api/members/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email } = req.body;


    // Validate input

    if (!name && !email) {

      return res.status(400).json({

        success: false,

        error: "At least one field (name or email) is required",

      });

    }


    // Basic email validation if provided (simplified for tutorial purposes)

    // For production, consider using a validation library or more comprehensive checks

    if (email && (!email.includes("@") || !email.includes("."))) {

      return res.status(400).json({

        success: false,

        error: "Invalid email format",

      });

    }


    // Build dynamic update query

    const updates: string[] = [];

    const values: any[] = [];


    if (name) {

      updates.push("name = ?");

      values.push(name);

    }

    if (email) {

      updates.push("email = ?");

      values.push(email);

    }


    values.push(id);


    const result = await env.DB.prepare(

      `UPDATE members SET ${updates.join(", ")} WHERE id = ?`

    )

      .bind(...values)

      .run();


    if (result.meta.changes === 0) {

      return res

        .status(404)

        .json({ success: false, error: "Member not found" });

    }


    res.json({ success: true, message: "Member updated successfully" });

  } catch (error: any) {

    if (error.message?.includes("UNIQUE constraint failed")) {

      return res.status(409).json({

        success: false,

        error: "Email already exists",

      });

    }

    res.status(500).json({ success: false, error: "Failed to update member" });

  }

});


```

This endpoint allows updating either the name, email, or both fields of an existing member. It builds a dynamic SQL query based on the provided fields.

## 9\. Implement delete operation

Add an endpoint to delete members. Add the following route to your `src/index.ts` file:

src/index.ts

```

// DELETE - Delete a member

app.delete("/api/members/:id", async (req, res) => {

  try {

    const { id } = req.params;


    const result = await env.DB.prepare("DELETE FROM members WHERE id = ?")

      .bind(id)

      .run();


    if (result.meta.changes === 0) {

      return res

        .status(404)

        .json({ success: false, error: "Member not found" });

    }


    res.json({ success: true, message: "Member deleted successfully" });

  } catch (error) {

    res.status(500).json({ success: false, error: "Failed to delete member" });

  }

});


```

This endpoint deletes a member by their ID and returns an error if the member does not exist.

## 10\. Test locally

Start the development server to test your API locally:

```

npm run dev


```

The development server will start, and you can access your API at `http://localhost:8787`.

Open a new terminal window and test the endpoints using `curl`:

Get all members

```

curl http://localhost:8787/api/members


```

```

{

  "success": true,

  "members": [

    {

      "id": 1,

      "name": "Alice Johnson",

      "email": "alice@example.com",

      "joined_date": "2024-01-15"

    },

    {

      "id": 2,

      "name": "Bob Smith",

      "email": "bob@example.com",

      "joined_date": "2024-02-20"

    },

    {

      "id": 3,

      "name": "Carol Williams",

      "email": "carol@example.com",

      "joined_date": "2024-03-10"

    }

  ]

}


```

Test creating a new member:

Create a member

```

curl -X POST http://localhost:8787/api/members \

  -H "Content-Type: application/json" \

  -d '{"name": "David Brown", "email": "david@example.com"}'


```

```

{

  "success": true,

  "message": "Member created successfully",

  "id": 4

}


```

Test getting a single member:

Get a member by ID

```

curl http://localhost:8787/api/members/1


```

Test updating a member:

Update a member

```

curl -X PUT http://localhost:8787/api/members/1 \

  -H "Content-Type: application/json" \

  -d '{"name": "Alice Cooper"}'


```

Test deleting a member:

Delete a member

```

curl -X DELETE http://localhost:8787/api/members/4


```

## 11\. Deploy to Cloudflare Workers

Before deploying to production, execute the schema file against your remote (production) database:

```

npx wrangler d1 execute members-db --remote --file=./schemas/schema.sql


```

Now deploy your application to the Cloudflare network:

```

npm run deploy


```

```

⛅️ wrangler 4.44.0

───────────────────

Total Upload: 1743.64 KiB / gzip: 498.65 KiB

Worker Startup Time: 48 ms

Your Worker has access to the following bindings:

Binding                  Resource

env.DB (members-db)      D1 Database


Uploaded express-d1-app (2.99 sec)

Deployed express-d1-app triggers (5.26 sec)

  https://<your-subdomain>.workers.dev

Current Version ID: <version-id>


```

After successful deployment, Wrangler will output your Worker's URL.

## 12\. Test production deployment

Test your deployed API using the provided URL. Replace `<your-worker-url>` with your actual Worker URL:

Test production API

```

curl https://<your-worker-url>/api/members


```

You should see the same member data you created in the production database.

Create a new member in production:

Create a member in production

```

curl -X POST https://<your-worker-url>/api/members \

  -H "Content-Type: application/json" \

  -d '{"name": "Eva Martinez", "email": "eva@example.com"}'


```

Your Express.js application with D1 database is now running on Cloudflare Workers.

## Conclusion

In this tutorial, you built a Members Registry API using Express.js and D1 database, then deployed it to Cloudflare Workers. You implemented full CRUD operations (Create, Read, Update, Delete) and learned how to:

* Set up an Express.js application for Cloudflare Workers
* Create and configure a D1 database with bindings
* Implement database operations using D1's prepared statements
* Test your API locally and in production

## Next steps

* Learn more about [D1 database features](https://developers.cloudflare.com/d1/)
* Explore [Workers routing and middleware](https://developers.cloudflare.com/workers/runtime-apis/)
* Add authentication to your API using [Workers authentication](https://developers.cloudflare.com/workers/runtime-apis/handlers/)
* Implement pagination for large datasets using [D1 query optimization](https://developers.cloudflare.com/d1/worker-api/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/#page","headline":"Deploy an Express.js application on Cloudflare Workers · Cloudflare Workers docs","description":"Learn how to deploy an Express.js application on Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/deploy-an-express-app/","name":"Deploy an Express.js application on Cloudflare Workers"}}]}
```
