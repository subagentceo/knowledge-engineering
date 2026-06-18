---
title: Containers
description: Run serverless containers alongside Workers to handle resource-intensive workloads, custom runtimes, and existing container images on Cloudflare.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Containers

Enhance your Workers with serverless containers

 Available on Workers Paid plan 

Run code written in any programming language, built for any runtime, as part of apps built on [Workers](https://developers.cloudflare.com/workers).

Deploy your container image to `Region:Earth` without worrying about managing infrastructure - just define your Worker and [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

With Containers you can run:

* Resource-intensive applications that require CPU cores running in parallel, large amounts of memory or disk space
* Applications and libraries that require a full filesystem, specific runtime, or Linux-like environment
* Existing applications and tools that have been distributed as container images

Container instances are spun up on-demand and controlled by code you write in your [Worker](https://developers.cloudflare.com/workers). Instead of chaining together API calls or writing Kubernetes operators, you just write JavaScript:

* [ Worker Code ](#tab-panel-7790)
* [ Worker Config ](#tab-panel-7791)

JavaScript

```

import { Container, getContainer } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 4000; // Port the container is listening on

  sleepAfter = "10m"; // Stop the instance if requests not sent for 10 minutes

}


export default {

  async fetch(request, env) {

    const { "session-id": sessionId } = await request.json();

    // Get the container instance for the given session ID

    const containerInstance = getContainer(env.MY_CONTAINER, sessionId);

    // Pass the request to the container instance on its default port

    return containerInstance.fetch(request);

  },

};


```

* [  wrangler.jsonc ](#tab-panel-7788)
* [  wrangler.toml ](#tab-panel-7789)

JSONC

```

{

  "name": "container-starter",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "containers": [

    {

      "class_name": "MyContainer",

      "image": "./Dockerfile",

      "max_instances": 5

    }

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "MyContainer",

        "name": "MY_CONTAINER"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": ["MyContainer"],

      "tag": "v1"

    }

  ]

}


```

TOML

```

name = "container-starter"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"


[[containers]]

class_name = "MyContainer"

image = "./Dockerfile"

max_instances = 5


[[durable_objects.bindings]]

class_name = "MyContainer"

name = "MY_CONTAINER"


[[migrations]]

new_sqlite_classes = [ "MyContainer" ]

tag = "v1"


```

[ Get started ](https://developers.cloudflare.com/containers/get-started/) [ Containers dashboard ](https://dash.cloudflare.com/?to=/:account/workers/containers) 

---

## Next Steps

###  Deploy your first Container 

Build and push an image, call a Container from a Worker, and understand scaling and routing.

[ Deploy a Container ](https://developers.cloudflare.com/containers/get-started/) 

###  Container Examples 

See examples of how to use a Container with a Worker, including stateless and stateful routing, regional placement, Workflow and Queue integrations, AI-generated code execution, and short-lived workloads.

[ See Examples ](https://developers.cloudflare.com/containers/examples/) 

---

## More resources

[Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/containers/#containers) 

Learn more about the commands to develop, build and push images, and deploy containers with Wrangler.

[Limits](https://developers.cloudflare.com/containers/platform-details/limits/) 

Learn about what limits Containers have and how to work within them.

[Durable Object Container API](https://developers.cloudflare.com/durable-objects/api/container/) 

Low-level runtime API for starting, stopping, and communicating with the container process directly from a Durable Object.

[SSH](https://developers.cloudflare.com/containers/ssh/) 

Connect to running Container instances with SSH through Wrangler.

[Containers Discord](https://discord.cloudflare.com) 

Connect with other users of Containers on Discord. Ask questions, show what you are building, and discuss the platform with other developers.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/containers/#page","headline":"Overview · Cloudflare Containers docs","description":"Run serverless containers alongside Workers to handle resource-intensive workloads, custom runtimes, and existing container images on Cloudflare.","url":"https://developers.cloudflare.com/containers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}}]}
```
