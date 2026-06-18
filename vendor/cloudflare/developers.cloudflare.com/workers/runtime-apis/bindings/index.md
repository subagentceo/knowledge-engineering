---
title: Bindings (env)
description: Worker Bindings that allow for interaction with other Cloudflare Resources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bindings (env)

Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform. Bindings provide better performance and less restrictions when accessing resources from Workers than the [REST APIs](https://developers.cloudflare.com/api/) which are intended for non-Workers applications.

The following bindings are available today:

* [ AI ](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai)
* [ Analytics Engine ](https://developers.cloudflare.com/analytics/analytics-engine)
* [ Assets ](https://developers.cloudflare.com/workers/static-assets/binding/)
* [ Browser Run ](https://developers.cloudflare.com/browser-run/)
* [ D1 ](https://developers.cloudflare.com/d1/worker-api/)
* [ Dispatcher (Workers for Platforms) ](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/)
* [ Durable Objects ](https://developers.cloudflare.com/durable-objects/api/)
* [ Dynamic Worker Loaders ](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)
* [ Environment Variables ](https://developers.cloudflare.com/workers/configuration/environment-variables/)
* [ Hyperdrive ](https://developers.cloudflare.com/hyperdrive)
* [ Images ](https://developers.cloudflare.com/images/optimization/binding/)
* [ KV ](https://developers.cloudflare.com/kv/api/)
* [ Media Transformations ](https://developers.cloudflare.com/stream/transform-videos/bindings/)
* [ mTLS ](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/)
* [ Queues ](https://developers.cloudflare.com/queues/configuration/javascript-apis/)
* [ R2 ](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
* [ Rate Limiting ](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
* [ Secrets ](https://developers.cloudflare.com/workers/configuration/secrets/)
* [ Secrets Store ](https://developers.cloudflare.com/secrets-store/integrations/workers/)
* [ Service bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/)
* [ Stream ](https://developers.cloudflare.com/stream/manage-video-library/bindings/)
* [ Vectorize ](https://developers.cloudflare.com/vectorize/reference/client-api/)
* [ Version metadata ](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/)
* [ Workflows ](https://developers.cloudflare.com/workflows/)

## What is a binding?

When you declare a binding on your Worker, you grant it a specific capability, such as being able to read and write files to an [R2](https://developers.cloudflare.com/r2/) bucket. For example:

* [  wrangler.jsonc ](#tab-panel-11924)
* [  wrangler.toml ](#tab-panel-11925)

JSONC

```

{

  "main": "./src/index.js",

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "<MY_BUCKET_NAME>"

    }

  ]

}


```

TOML

```

main = "./src/index.js"


[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "<MY_BUCKET_NAME>"


```

* [  JavaScript ](#tab-panel-11910)
* [  Python ](#tab-panel-11911)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    await env.MY_BUCKET.put(key, request.body);

    return new Response(`Put ${key} successfully!`);

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response

from urllib.parse import urlparse


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    url = urlparse(request.url)

    key = url.path.slice(1)

    await self.env.MY_BUCKET.put(key, request.body)

    return Response(f"Put {key} successfully!")


```

You can think of a binding as a permission and an API in one piece. With bindings, you never have to add secret keys or tokens to your Worker in order to access resources on your Cloudflare account — the permission is embedded within the API itself. The underlying secret is never exposed to your Worker's code, and therefore can't be accidentally leaked.

## Making changes to bindings

When you deploy a change to your Worker, and only change its bindings (i.e. you don't change the Worker's code), Cloudflare may reuse existing isolates that are already running your Worker. This improves performance — you can change an environment variable or other binding without unnecessarily reloading your code.

As a result, you must be careful when "polluting" global scope with derivatives of your bindings. Anything you create there might continue to exist despite making changes to any underlying bindings. Consider an external client instance which uses a secret API key accessed from `env`: if you put this client instance in global scope and then make changes to the secret, a client instance using the original value might continue to exist. The correct approach would be to create a new client instance for each request.

The following is a good approach:

TypeScript

```

export default {

  fetch(request, env) {

    let client = new Client(env.MY_SECRET); // `client` is guaranteed to be up-to-date with the latest value of `env.MY_SECRET` since a new instance is constructed with every incoming request


    // ... do things with `client`

  },

};


```

Compared to this alternative, which might have surprising and unwanted behavior:

TypeScript

```

let client = undefined;


export default {

  fetch(request, env) {

    client ??= new Client(env.MY_SECRET); // `client` here might not be updated when `env.MY_SECRET` changes, since it may already exist in global scope


    // ... do things with `client`

  },

};


```

If you have more advanced needs, explore the [AsyncLocalStorage API](https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/), which provides a mechanism for exposing values down to child execution handlers.

## How to access `env`

Bindings are located on the `env` object, which can be accessed in several ways:

* It is an argument to entrypoint handlers such as [fetch](https://developers.cloudflare.com/workers/runtime-apis/fetch/):  
JavaScript  
```  
export default {  
  async fetch(request, env) {  
    return new Response(`Hi, ${env.NAME}`);  
  },  
};  
```
* It is as class property on [WorkerEntrypoint](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/#bindings-env),[DurableObject](https://developers.cloudflare.com/durable-objects/), and [Workflow](https://developers.cloudflare.com/workflows/):  
   * [  JavaScript ](#tab-panel-11912)  
   * [  Python ](#tab-panel-11913)  
JavaScript  
```  
export class MyDurableObject extends DurableObject {  
  async sayHello() {  
    return `Hi, ${this.env.NAME}!`;  
  }  
}  
```  
Python  
```  
from workers import WorkerEntrypoint, Response  
class Default(WorkerEntrypoint):  
  async def fetch(self, request):  
    return Response(f"Hi {self.env.NAME}")  
```
* It can be imported from `cloudflare:workers`:  
   * [  JavaScript ](#tab-panel-11914)  
   * [  Python ](#tab-panel-11915)  
JavaScript  
```  
import { env } from "cloudflare:workers";  
console.log(`Hi, ${env.Name}`);  
```  
Python  
```  
from workers import import_from_javascript  
env = import_from_javascript("cloudflare:workers").env  
print(f"Hi, {env.NAME}")  
```

### Importing `env` as a global

Importing `env` from `cloudflare:workers` is useful when you need to access a binding such as [secrets](https://developers.cloudflare.com/workers/configuration/secrets/) or [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/)in top-level global scope. For example, to initialize an API client:

* [  JavaScript ](#tab-panel-11916)
* [  Python ](#tab-panel-11917)

JavaScript

```

import { env } from "cloudflare:workers";

import ApiClient from "example-api-client";


// API_KEY and LOG_LEVEL now usable in top-level scope

let apiClient = ApiClient.new({ apiKey: env.API_KEY });

const LOG_LEVEL = env.LOG_LEVEL || "info";


export default {

  fetch(req) {

    // you can use apiClient or LOG_LEVEL, configured before any request is handled

  },

};


```

Python

```

from workers import WorkerEntrypoint, env

from example_api_client import ApiClient


api_client = ApiClient(api_key=env.API_KEY)

LOG_LEVEL = getattr(env, "LOG_LEVEL", "info")


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    # ...


```

Workers do not allow I/O from outside a request context. This means that even though `env` is accessible from the top-level scope, you will not be able to access every binding's methods.

For instance, environment variables and secrets are accessible, and you are able to call `env.NAMESPACE.get` to get a [Durable Object stub](https://developers.cloudflare.com/durable-objects/api/stub/) in the top-level context. However, calling methods on the Durable Object stub, making [calls to a KV store](https://developers.cloudflare.com/kv/api/), and [calling to other Workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings) will not work.

* [  JavaScript ](#tab-panel-11918)
* [  Python ](#tab-panel-11919)

JavaScript

```

import { env } from "cloudflare:workers";


// This would error!

// env.KV.get('my-key')


export default {

  async fetch(req) {

    // This works

    let myVal = await env.KV.get("my-key");

    Response.new(myVal);

  },

};


```

Python

```

from workers import Response, WorkerEntrypoint, env


# This would fail!

# env.KV.get('my-key')


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    # This works

    mv_val = await env.KV.get("my-key")

    return Response(my_val)


```

Additionally, importing `env` from `cloudflare:workers` lets you avoid passing `env`as an argument through many function calls if you need to access a binding from a deeply-nested function. This can be helpful in a complex codebase.

* [  JavaScript ](#tab-panel-11920)
* [  Python ](#tab-panel-11921)

JavaScript

```

import { env } from "cloudflare:workers";


export default {

  fetch(req) {

    Response.new(sayHello());

  },

};


// env is not an argument to sayHello...

function sayHello() {

  let myName = getName();

  return `Hello, ${myName}`;

}


// ...nor is it an argument to getName

function getName() {

  return env.MY_NAME;

}


```

Python

```

from workers import Response, WorkerEntrypoint, env


class Default(WorkerEntrypoint):

  def fetch(req):

    return Response(say_hello())


# env is not an argument to say_hello...

def say_hello():

  my_name = get_name()

  return f"Hello, {myName}"


# ...nor is it an argument to getName

def get_name():

  return env.MY_NAME


```

Note

While using `env` from `cloudflare:workers` may be simpler to write than passing it through a series of function calls, passing `env` as an argument is a helpful pattern for dependency injection and testing.

### Overriding `env` values

The `withEnv` function provides a mechanism for overriding values of `env`.

Imagine a user has defined the [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/)"NAME" to be "Alice" in their Wrangler configuration file and deployed a Worker. By default, logging`env.NAME` would print "Alice". Using the `withEnv` function, you can override the value of "NAME".

* [  JavaScript ](#tab-panel-11922)
* [  Python ](#tab-panel-11923)

JavaScript

```

import { env, withEnv } from "cloudflare:workers";


function logName() {

  console.log(env.NAME);

}


export default {

  fetch(req) {

    // this will log "Alice"

    logName();


    withEnv({ NAME: "Bob" }, () => {

      // this will log "Bob"

      logName();

    });


    // ...etc...

  },

};


```

Python

```

from workers import Response, WorkerEntrypoint, env, patch_env


def log_name():

  print(env.NAME)


class Default(WorkerEntrypoint):

  async def fetch(req):

    # this will log "Alice"

    log_name()


    with patch_env(NAME="Bob"):

      # this will log "Bob"

      log_name()


    # ...etc...


```

This can be useful when testing code that relies on an imported `env` object.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/#page","headline":"Bindings (env) · Cloudflare Workers docs","description":"Worker Bindings that allow for interaction with other Cloudflare Resources.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/bindings/","name":"Bindings (env)"}}]}
```
