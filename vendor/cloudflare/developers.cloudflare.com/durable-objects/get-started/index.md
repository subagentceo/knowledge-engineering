---
title: Getting started
description: Create and deploy your first Durable Object with SQLite storage and a companion Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

This guide will instruct you through:

* Writing a JavaScript class that defines a Durable Object.
* Using Durable Objects SQL API to query a Durable Object's private, embedded SQLite database.
* Instantiating and communicating with a Durable Object from another Worker.
* Deploying a Durable Object and a Worker that communicates with a Durable Object.

If you wish to learn more about Durable Objects, refer to [What are Durable Objects?](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/).

## Quick start

If you want to skip the steps and get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/hello-world-do-template)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers. Use this option if you are familiar with Cloudflare Workers, and wish to skip the step-by-step guidance.

You may wish to manually follow the steps if you are new to Cloudflare Workers.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

You will access your Durable Object from a [Worker](https://developers.cloudflare.com/workers/). Your Worker application is an interface to interact with your Durable Object.

To create a Worker project, run:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- durable-object-starter
```

```
yarn create cloudflare durable-object-starter
```

```
pnpm create cloudflare@latest durable-object-starter
```

Running `create cloudflare@latest` will install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the Workers CLI. You will use Wrangler to test and deploy your project.

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker + Durable Objects`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new directory, which will include either a `src/index.js` or `src/index.ts` file to write your code and a [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file.

Move into your new directory:

Terminal window

```

cd durable-object-starter


```

Adding a Durable Object to an existing Worker

To add a Durable Object to an existing Worker, you need to:

* Modify the code of the existing Worker to include the following:  
TypeScript  
```  
export class MyDurableObject extends DurableObject<Env> {  
  constructor(ctx: DurableObjectState, env: Env) {  
    // Required, as we're extending the base class.  
    super(ctx, env)  
  }  
  {/* Define your Durable Object methods here */}  
}  
export default {  
  async fetch(request, env, ctx): Promise<Response> {  
    const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);  
    {/* Access your Durable Object methods here */}  
  },  
} satisfies ExportedHandler<Env>;  
```
* Update the Wrangler configuration file of your existing Worker to bind the Durable Object to the Worker.

## 2\. Write a Durable Object class using SQL API

Before you create and access a Durable Object, its behavior must be defined by an ordinary exported JavaScript class.

Note

If you do not use JavaScript or TypeScript, you will need a [shim ↗](https://developer.mozilla.org/en-US/docs/Glossary/Shim) to translate your class definition to a JavaScript class.

Your `MyDurableObject` class will have a constructor with two parameters. The first parameter, `ctx`, passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter, `env`, contains any bindings you have associated with the Worker when you uploaded it.

* [  JavaScript ](#tab-panel-8371)
* [  TypeScript ](#tab-panel-8372)
* [  Python ](#tab-panel-8373)

JavaScript

```

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    // Required, as we're extending the base class.

    super(ctx, env);

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  constructor(ctx: DurableObjectState, env: Env) {

    // Required, as we're extending the base class.

    super(ctx, env)

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    def __init__(self, ctx, env):

        super().__init__(ctx, env)


```

Workers communicate with a Durable Object using [remote-procedure call](https://developers.cloudflare.com/workers/runtime-apis/rpc/#%5Ftop). Public methods on a Durable Object class are exposed as [RPC methods](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) to be called by another Worker.

Your file should now look like:

* [  JavaScript ](#tab-panel-8377)
* [  TypeScript ](#tab-panel-8378)
* [  Python ](#tab-panel-8379)

JavaScript

```

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    // Required, as we're extending the base class.

    super(ctx, env);

  }


  async sayHello() {

    let result = this.ctx.storage.sql

      .exec("SELECT 'Hello, World!' as greeting")

      .one();

    return result.greeting;

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  constructor(ctx: DurableObjectState, env: Env) {

    // Required, as we're extending the base class.

    super(ctx, env)

  }


    async sayHello(): Promise<string> {

      let result = this.ctx.storage.sql

        .exec("SELECT 'Hello, World!' as greeting")

        .one();

      return result.greeting;

    }


}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    async def say_hello(self):

        result = self.ctx.storage.sql.exec(

            "SELECT 'Hello, World!' as greeting"

        ).one()


        return result.greeting


```

In the code above, you have:

1. Defined a RPC method, `sayHello()`, that can be called by a Worker to communicate with a Durable Object.
2. Accessed a Durable Object's attached storage, which is a private SQLite database only accessible to the object, using [SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#exec) methods (`sql.exec()`) available on `ctx.storage` .
3. Returned an object representing the single row query result using `one()`, which checks that the query result has exactly one row.
4. Return the `greeting` column from the row object result.

## 3\. Instantiate and communicate with a Durable Object

Note

Durable Objects do not receive requests directly from the Internet. Durable Objects receive requests from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you would like it to be able to talk to. These bindings must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Objects.

A Worker is used to [access Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/).

To communicate with a Durable Object, the Worker's fetch handler should look like the following:

* [  JavaScript ](#tab-panel-8374)
* [  TypeScript ](#tab-panel-8375)
* [  Python ](#tab-panel-8376)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);


    const greeting = await stub.sayHello();


    return new Response(greeting);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

      const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);


      const greeting = await stub.sayHello();


      return new Response(greeting);

    },


} satisfies ExportedHandler<Env>;


```

Python

```

from workers import handler, Response, WorkerEntrypoint

from urllib.parse import urlparse


class Default(WorkerEntrypoint):

    async def fetch(request):

        url = urlparse(request.url)

        stub = self.env.MY_DURABLE_OBJECT.getByName(url.path)

        greeting = await stub.say_hello()

        return Response(greeting)


```

In the code above, you have:

1. Exported your Worker's main event handlers, such as the `fetch()` handler for receiving HTTP requests.
2. Passed `env` into the `fetch()` handler. Bindings are delivered as a property of the environment object passed as the second parameter when an event handler or class constructor is invoked.
3. Constructed a stub for a Durable Object instance based on the provided name. A stub is a client object used to send messages to the Durable Object.
4. Called a Durable Object by invoking a RPC method, `sayHello()`, on the Durable Object, which returns a `Hello, World!` string greeting.
5. Received an HTTP response back to the client by constructing a HTTP Response with `return new Response()`.

Refer to [Access a Durable Object from a Worker](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) to learn more about communicating with a Durable Object.

## 4\. Configure Durable Object bindings

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. The Durable Object bindings in your Worker project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) will include a binding name (for this guide, use `MY_DURABLE_OBJECT`) and the class name (`MyDurableObject`).

* [  wrangler.jsonc ](#tab-panel-8367)
* [  wrangler.toml ](#tab-panel-8368)

JSONC

```

{

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_DURABLE_OBJECT",

        "class_name": "MyDurableObject"

      }

    ]

  }

}


```

TOML

```

[[durable_objects.bindings]]

name = "MY_DURABLE_OBJECT"

class_name = "MyDurableObject"


```

The `bindings` section contains the following fields:

* `name` \- Required. The binding name to use within your Worker.
* `class_name` \- Required. The class name you wish to bind to.
* `script_name` \- Optional. Defaults to the current [environment's](https://developers.cloudflare.com/durable-objects/reference/environments/) Worker code.

## 5\. Configure Durable Object class with SQLite storage backend

A migration is a mapping process from a class name to a runtime state. You perform a migration when creating a new Durable Object class, or when renaming, deleting or transferring an existing Durable Object class.

Migrations are performed through the `[[migrations]]` configurations key in your Wrangler file.

The Durable Object migration to create a new Durable Object class with SQLite storage backend will look like the following in your Worker's Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8369)
* [  wrangler.toml ](#tab-panel-8370)

JSONC

```

{

  "migrations": [

    {

      "tag": "v1", // Should be unique for each entry

      "new_sqlite_classes": [ // Array of new classes

        "MyDurableObject"

      ]

    }

  ]

}


```

TOML

```

[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyDurableObject" ]


```

Refer to [Durable Objects migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) to learn more about the migration process.

## 6\. Develop a Durable Object Worker locally

To test your Durable Object locally, run [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev):

Terminal window

```

npx wrangler dev


```

In your console, you should see a`Hello world` string returned by the Durable Object.

## 7\. Deploy your Durable Object Worker

To deploy your Durable Object Worker:

Terminal window

```

npx wrangler deploy


```

Once deployed, you should be able to see your newly created Durable Object Worker on the Cloudflare dashboard.

[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages) 

Preview your Durable Object Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

## Summary and final code

Your final code should look like this:

* [  JavaScript ](#tab-panel-8380)
* [  TypeScript ](#tab-panel-8381)
* [  Python ](#tab-panel-8382)

JavaScript

```

import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    // Required, as we are extending the base class.

    super(ctx, env);

  }


  async sayHello() {

    let result = this.ctx.storage.sql

      .exec("SELECT 'Hello, World!' as greeting")

      .one();

    return result.greeting;

  }

}

export default {

  async fetch(request, env, ctx) {

    const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);


    const greeting = await stub.sayHello();


    return new Response(greeting);

  },

};


```

TypeScript

```

import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject<Env> {

  constructor(ctx: DurableObjectState, env: Env) {

    // Required, as we are extending the base class.

    super(ctx, env)

  }


    async sayHello():Promise<string> {

      let result = this.ctx.storage.sql

        .exec("SELECT 'Hello, World!' as greeting")

        .one();

      return result.greeting;

    }


}

export default {

async fetch(request, env, ctx): Promise<Response> {

const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);


      const greeting = await stub.sayHello();


      return new Response(greeting);

    },


} satisfies ExportedHandler<Env>;


```

Python

```

from workers import DurableObject, handler, Response

from urllib.parse import urlparse


class MyDurableObject(DurableObject):

    async def say_hello(self):

        result = self.ctx.storage.sql.exec(

            "SELECT 'Hello, World!' as greeting"

        ).one()


        return result.greeting


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        url = urlparse(request.url)

        stub = self.env.MY_DURABLE_OBJECT.getByName(url.path)

        greeting = await stub.say_hello()

        return Response(greeting)


```

By finishing this tutorial, you have:

* Successfully created a Durable Object
* Called the Durable Object by invoking a [RPC method](https://developers.cloudflare.com/workers/runtime-apis/rpc/)
* Deployed the Durable Object globally

## Related resources

* [Create Durable Object stubs](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/)
* [Access Durable Objects Storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/)
* [Miniflare ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare) \- Helpful tools for mocking and testing your Durable Objects.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/get-started/#page","headline":"Getting started · Cloudflare Durable Objects docs","description":"Create and deploy your first Durable Object with SQLite storage and a companion Worker.","url":"https://developers.cloudflare.com/durable-objects/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/get-started/","name":"Getting started"}}]}
```
