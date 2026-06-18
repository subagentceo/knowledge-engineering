---
title: RPC (WorkerEntrypoint)
description: Facilitate Worker-to-Worker communication via RPC.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RPC (WorkerEntrypoint)

[Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings) allow one Worker to call into another, without going through a publicly-accessible URL.

You can use Service bindings to create your own internal APIs that your Worker makes available to other Workers. This can be done by extending the built-in `WorkerEntrypoint` class, and adding your own public methods. These public methods can then be directly called by other Workers on your Cloudflare account that declare a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) to this Worker.

The [RPC system in Workers](https://developers.cloudflare.com/workers/runtime-apis/rpc) is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

Note

You can also use RPC to communicate between Workers and [Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#invoke-rpc-methods).

## Example

For example, the following Worker implements the public method `add(a, b)`:

For example, if Worker B implements the public method `add(a, b)`:

* [  wrangler.jsonc ](#tab-panel-11968)
* [  wrangler.toml ](#tab-panel-11969)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_b",

  "main": "./src/workerB.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_b"

main = "./src/workerB.js"


```

* [  JavaScript ](#tab-panel-11975)
* [  TypeScript ](#tab-panel-11976)
* [  Python ](#tab-panel-11977)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from Worker B");

  }


  add(a, b) {

    return a + b;

  }

}


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from Worker B");

  }


  add(a: number, b: number) {

    return a + b;

  }

}


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello from Worker B")


    def add(self, a: int, b: int) -> int:

        return a + b


```

Worker A can declare a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) to Worker B:

* [  wrangler.jsonc ](#tab-panel-11970)
* [  wrangler.toml ](#tab-panel-11971)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_a",

  "main": "./src/workerA.js",

  "services": [

    {

      "binding": "WORKER_B",

      "service": "worker_b"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_a"

main = "./src/workerA.js"


[[services]]

binding = "WORKER_B"

service = "worker_b"


```

Making it possible for Worker A to call the `add()` method from Worker B:

* [  JavaScript ](#tab-panel-11972)
* [  TypeScript ](#tab-panel-11973)
* [  Python ](#tab-panel-11974)

JavaScript

```

export default {

  async fetch(request, env) {

    const result = await env.WORKER_B.add(1, 2);

    return new Response(result);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const result = await env.WORKER_B.add(1, 2);

    return new Response(result);

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        result = await self.env.WORKER_B.add(1, 2)

    return Response(f"Result: {result}")


```

You do not need to learn, implement, or think about special protocols to use the RPC system. The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with standard JavaScript classes.

## The `WorkerEntrypoint` Class

To provide RPC methods from your Worker, you must extend the `WorkerEntrypoint` class, as shown in the example below:

* [  JavaScript ](#tab-panel-11948)
* [  Python ](#tab-panel-11949)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async add(a, b) { return a + b; }

}


```

Python

```

from workers import WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def add(self, a, b):

        return a + b


```

A new instance of the class is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless — the class instance only lasts for the duration of the invocation. If you need to persist or coordinate state in Workers, you should use [Durable Objects](https://developers.cloudflare.com/durable-objects).

### Bindings (`env`)

The [env](https://developers.cloudflare.com/workers/runtime-apis/bindings) object is exposed as a class property of the `WorkerEntrypoint` class.

For example, a Worker that declares a binding to the [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) `GREETING`:

* [  wrangler.jsonc ](#tab-panel-11958)
* [  wrangler.toml ](#tab-panel-11959)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "vars": {

    "GREETING": "Hello"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"


[vars]

GREETING = "Hello"


```

Can access it by calling `this.env.GREETING`:

* [  JavaScript ](#tab-panel-11950)
* [  Python ](#tab-panel-11951)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  fetch() { return new Response("Hello from my-worker"); }


  async greet(name) {

    return this.env.GREETING + name;

  }

}


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello from my-worker")


    async def greet(self, name):

        return self.env.GREETING + name


```

You can use any type of [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) this way.

### Lifecycle methods (`ctx`)

The [ctx](https://developers.cloudflare.com/workers/runtime-apis/context) object is exposed as a class property of the `WorkerEntrypoint` class.

For example, you can extend the lifetime of the invocation context by calling the `waitUntil()` method:

* [  JavaScript ](#tab-panel-11952)
* [  Python ](#tab-panel-11953)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  fetch() { return new Response("Hello from my-worker"); }


  async signup(email, name) {

    // sendEvent() will continue running, even after this method returns a value to the caller

    this.ctx.waitUntil(this.#sendEvent("signup", email))

    // Perform any other work

    return "Success";

  }


  async #sendEvent(eventName, email) {

    //...

  }

}


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello from my-worker")


    async def signup(self, email, name):

        # _send_event() will continue running, even after this method returns a value to the caller

        self.ctx.waitUntil(self._send_event("signup", email))

        # Perform any other work

        return "Success"


    async def _send_event(self, event_name, email):

        # ...

        pass


```

### Fetching static assets

If your Worker has a [static assets binding](https://developers.cloudflare.com/workers/static-assets/binding/), you can call `this.env.ASSETS.fetch()` from within an RPC method. Since RPC methods do not receive a `request` parameter, construct a `Request` or URL with any hostname — the hostname is ignored by the assets binding, only the pathname matters:

* [  JavaScript ](#tab-panel-11966)
* [  TypeScript ](#tab-panel-11967)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class ImageWorker extends WorkerEntrypoint {

  async getImage(path) {

    return this.env.ASSETS.fetch(new Request(`https://assets.local${path}`));

  }

}


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class ImageWorker extends WorkerEntrypoint {

  async getImage(path: string): Promise<Response> {

    return this.env.ASSETS.fetch(

      new Request(`https://assets.local${path}`)

    );

  }

}


```

The caller can then invoke this method via RPC:

* [  JavaScript ](#tab-panel-11962)
* [  TypeScript ](#tab-panel-11963)

JavaScript

```

const response = await env.IMAGE_SERVICE.getImage("/images/logo.png");


```

TypeScript

```

const response = await env.IMAGE_SERVICE.getImage("/images/logo.png");


```

Note

When fetching assets via the binding, the hostname (for example, `assets.local`) is not meaningful — any valid hostname will work. Only the URL pathname is used to match assets. The convention `assets.local` is used for clarity.

## Named entrypoints

You can also export any number of named `WorkerEntrypoint` classes from within a single Worker, in addition to the default export. You can then declare a Service binding to a specific named entrypoint.

You can use this to group multiple pieces of compute together. For example, you might create a distinct `WorkerEntrypoint` for each permission role in your application, and use these to provide role-specific RPC methods:

* [  wrangler.jsonc ](#tab-panel-11960)
* [  wrangler.toml ](#tab-panel-11961)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "todo-app",

  "d1_databases": [

    {

      "binding": "D1",

      "database_name": "todo-app-db",

      "database_id": "<unique-ID-for-your-database>"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "todo-app"


[[d1_databases]]

binding = "D1"

database_name = "todo-app-db"

database_id = "<unique-ID-for-your-database>"


```

* [  JavaScript ](#tab-panel-11954)
* [  Python ](#tab-panel-11955)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class AdminEntrypoint extends WorkerEntrypoint {

  async createUser(username) {

    await this.env.D1.prepare("INSERT INTO users (username) VALUES (?)")

      .bind(username)

      .run();

  }


  async deleteUser(username) {

    await this.env.D1.prepare("DELETE FROM users WHERE username = ?")

      .bind(username)

      .run();

  }

}


export class UserEntrypoint extends WorkerEntrypoint {

  async getTasks(userId) {

    return await this.env.D1.prepare(

      "SELECT title FROM tasks WHERE user_id = ?"

    )

      .bind(userId)

      .run();

  }


  async createTask(userId, title) {

    await this.env.D1.prepare(

      "INSERT INTO tasks (user_id, title) VALUES (?, ?)"

    )

      .bind(userId, title)

      .run();

  }

}


export default class extends WorkerEntrypoint {

  async fetch(request, env) {

    return new Response("Hello from my to do app");

  }

}


```

Python

```

from workers import WorkerEntrypoint, Response


class AdminEntrypoint(WorkerEntrypoint):

    async def create_user(self, username):

        await self.env.D1.prepare("INSERT INTO users (username) VALUES (?)").bind(username).run()


    async def delete_user(self, username):

        await self.env.D1.prepare("DELETE FROM users WHERE username = ?").bind(username).run()


class UserEntrypoint(WorkerEntrypoint):

    async def get_tasks(self, user_id):

        return await self.env.D1.prepare("SELECT title FROM tasks WHERE user_id = ?").bind(user_id).run()


    async def create_task(self, user_id, title):

        await self.env.D1.prepare("INSERT INTO tasks (user_id, title) VALUES (?, ?)").bind(user_id, title).run()


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello from my to do app")


```

You can then declare a Service binding directly to `AdminEntrypoint` in another Worker:

* [  wrangler.jsonc ](#tab-panel-11964)
* [  wrangler.toml ](#tab-panel-11965)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "admin-app",

  "services": [

    {

      "binding": "ADMIN",

      "service": "todo-app",

      "entrypoint": "AdminEntrypoint"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "admin-app"


[[services]]

binding = "ADMIN"

service = "todo-app"

entrypoint = "AdminEntrypoint"


```

* [  JavaScript ](#tab-panel-11956)
* [  Python ](#tab-panel-11957)

JavaScript

```

export default {

  async fetch(request, env) {

    await env.ADMIN.createUser("aNewUser");

    return new Response("Hello from admin app");

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        await self.env.ADMIN.create_user("aNewUser")

        return Response("Hello from admin app")


```

You can learn more about how to configure D1 in the [D1 documentation](https://developers.cloudflare.com/d1/get-started/#3-bind-your-worker-to-your-d1-database).

You can try out a complete example of this to do app, as well as a Discord bot built with named entrypoints, by cloning the [cloudflare/js-rpc-and-entrypoints-demo repository ↗](https://github.com/cloudflare/js-rpc-and-entrypoints-demo) from GitHub.

## Further reading

* [ Lifecycle ](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/)
* [ Reserved Methods ](https://developers.cloudflare.com/workers/runtime-apis/rpc/reserved-methods/)
* [ Visibility and Security Model ](https://developers.cloudflare.com/workers/runtime-apis/rpc/visibility/)
* [ TypeScript ](https://developers.cloudflare.com/workers/runtime-apis/rpc/typescript/)
* [ Error handling ](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/#page","headline":"Service bindings - RPC (WorkerEntrypoint) · Cloudflare Workers docs","description":"Facilitate Worker-to-Worker communication via RPC.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["RPC"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/bindings/","name":"Bindings (env)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/bindings/service-bindings/","name":"Service bindings"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/runtime-apis/bindings/service-bindings/rpc/","name":"RPC (WorkerEntrypoint)"}}]}
```
