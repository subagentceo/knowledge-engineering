---
title: Getting started
description: Deploy your first Container on Cloudflare by building an image, configuring a Worker, and routing requests to container instances.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

In this guide, you will deploy a Worker that can make requests to one or more Containers in response to end-user requests. In this example, each container runs a small webserver written in Go.

This example Worker should give you a sense for simple Container use, and provide a starting point for more complex use cases.

## Prerequisites

### Ensure Docker is running locally

In this guide, we will build and push a container image alongside your Worker code. By default, this process uses[Docker ↗](https://www.docker.com/) to do so.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗](https://docs.docker.com/desktop/). Other tools like [Colima ↗](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Deploy your first Container

Run the following command to create and deploy a new Worker with a container, from the starter template:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- --template=cloudflare/templates/containers-template
```

```
yarn create cloudflare --template=cloudflare/templates/containers-template
```

```
pnpm create cloudflare@latest --template=cloudflare/templates/containers-template
```

When you want to deploy a code change to either the Worker or Container code, you can run the following command using [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):

 npm  yarn  pnpm 

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

When you run `wrangler deploy`, the following things happen:

* Wrangler builds your container image using Docker.
* Wrangler pushes your image to a [Container Image Registry](https://developers.cloudflare.com/containers/platform-details/image-management/) that is automatically integrated with your Cloudflare account.
* Wrangler deploys your Worker, and configures Cloudflare's network to be ready to spawn instances of your container

The build and push usually take the longest on the first deploy. Subsequent deploys are faster, because they [reuse cached image layers ↗](https://docs.docker.com/build/cache/).

Note

After you deploy your Worker for the first time, you will need to wait several minutes until it is ready to receive requests. Unlike Workers, Containers take a few minutes to be provisioned. During this time, requests are sent to the Worker, but calls to the Container will error.

### Check deployment status

After deploying, run the following command to show a list of containers in your Cloudflare account, and their deployment status:

 npm  yarn  pnpm 

```
npx wrangler containers list
```

```
yarn wrangler containers list
```

```
pnpm wrangler containers list
```

And see images deployed to the Cloudflare Registry with the following command:

 npm  yarn  pnpm 

```
npx wrangler containers images list
```

```
yarn wrangler containers images list
```

```
pnpm wrangler containers images list
```

### Make requests to Containers

Now, open the URL for your Worker. It should look something like `https://hello-containers.<YOUR_WORKERS_SUBDOMAIN>.workers.dev`.

If you make requests to the paths `/container/1` or `/container/2`, your Worker routes requests to specific containers. Each different path after "/container/" routes to a unique container.

If you make requests to `/lb`, you will load balance requests to one of 3 containers chosen at random.

You can confirm this behavior by reading the output of each request.

## Understanding the Code

Now that you've deployed your first container, let's explain what is happening in your Worker's code, in your configuration file, in your container's code, and how requests are routed.

### Configuration

Your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) defines the configuration for both your Worker and your container:

* [  wrangler.jsonc ](#tab-panel-7842)
* [  wrangler.toml ](#tab-panel-7843)

JSONC

```

{

  "containers": [

    {

      "max_instances": 10,

      "class_name": "MyContainer",

      "image": "./Dockerfile",

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_CONTAINER",

        "class_name": "MyContainer",

      },

    ],

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["MyContainer"],

    },

  ],

}


```

TOML

```

[[containers]]

max_instances = 10

class_name = "MyContainer"

image = "./Dockerfile"


[[durable_objects.bindings]]

name = "MY_CONTAINER"

class_name = "MyContainer"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyContainer" ]


```

Important points about this config:

* `image` points to a Dockerfile, to a directory containing a Dockerfile, or to a fully qualified image reference such as `registry.cloudflare.com/<YOUR_ACCOUNT_ID>/<IMAGE>:<TAG>`.
* `class_name` must be a [Durable Object class name](https://developers.cloudflare.com/durable-objects/api/base/).
* `max_instances` declares the maximum number of simultaneously running container instances that will run.
* The Durable Object must use [new\_sqlite\_classes](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) not `new_classes`.

### The Container Image

Your container image must be able to run on the `linux/amd64` architecture, but aside from that, has few limitations.

In the example you just deployed, it is a simple Golang server that responds to requests on port 8080 using the `MESSAGE` environment variable that will be set in the Worker and an [auto-generated environment variable](https://developers.cloudflare.com/containers/platform-details/#environment-variables) `CLOUDFLARE_DEPLOYMENT_ID.`

```

func handler(w http.ResponseWriter, r *http.Request) {

  message := os.Getenv("MESSAGE")

  instanceId := os.Getenv("CLOUDFLARE_DEPLOYMENT_ID")


  fmt.Fprintf(w, "Hi, I'm a container and this is my message: %s, and my instance ID is: %s", message, instanceId)

}


```

Note

After deploying the example code, to deploy a different image, you can replace the provided image with one of your own.

### Worker code

#### Container Configuration

First note `MyContainer` which extends the [Container ↗](https://github.com/cloudflare/containers) class:

JavaScript

```

export class MyContainer extends Container {

  defaultPort = 8080;

  sleepAfter = '10s';

  envVars = {

    MESSAGE: 'I was passed in via the container class!',

  };


  override onStart() {

    console.log('Container successfully started');

  }


  override onStop() {

    console.log('Container successfully shut down');

  }


  override onError(error: unknown) {

    console.log('Container error:', error);

  }

}


```

This defines basic configuration for the container:

* `defaultPort` sets the port that the `fetch` and `containerFetch` methods will use to communicate with the container. It also blocks requests until the container is listening on this port.
* `sleepAfter` sets the timeout for the container to sleep after it has been idle for a certain amount of time.
* `envVars` sets environment variables that will be passed to the container when it starts.
* `onStart`, `onStop`, and `onError` are hooks that run when the container starts, stops, or errors, respectively.

The `Container` class itself extends [DurableObject](https://developers.cloudflare.com/durable-objects/), so your subclass has access to the full Durable Object API. The Durable Object handles routing, lifecycle, and persistent state, while the container process runs your image inside a Linux VM. This means you can use [this.ctx.storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) to persist data that survives container restarts and resides close to the container itself.

Refer to the [Container class reference](https://developers.cloudflare.com/containers/container-class/) and the [low-level Durable Object container API](https://developers.cloudflare.com/durable-objects/api/container/) for more details.

#### Routing to Containers

When a request enters Cloudflare, your Worker's [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) is invoked. This is the code that handles the incoming request. The fetch handler in the example code, launches containers in two ways, on different routes:

* Making requests to `/container/` passes requests to a new container for each path. This is done by spinning up a new Container instance. You may note that the first request to a new path takes longer than subsequent requests, this is because a new container is booting.  
JavaScript  
```  
if (pathname.startsWith("/container")) {  
  const container = env.MY_CONTAINER.getByName(pathname);  
  return await container.fetch(request);  
}  
```
* Making requests to `/lb` will load balance requests across several containers. This uses a simple `getRandom` helper method, which picks an ID at random from a set number (in this case 3), then routes to that Container instance. You can replace this with any routing or load balancing logic you choose to implement:  
JavaScript  
```  
if (pathname.startsWith("/lb")) {  
  const container = await getRandom(env.MY_CONTAINER, 3);  
  return await container.fetch(request);  
}  
```

This allows for multiple ways of using Containers:

* If you simply want to send requests to many stateless and interchangeable containers, you should load balance.
* If you have stateful services or need individually addressable containers, you should request specific Container instances.
* If you are running short-lived jobs, want fine-grained control over the container lifecycle, want to parameterize container entrypoint or env vars, or want to chain together multiple container calls, you should request specific Container instances.

Note

Today, routing requests to one of many interchangeable Container instances uses the`getRandom` helper.

It randomly selects one of a fixed number of instances for each request.

## View Containers in your Dashboard

The [Containers Dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/containers) shows you helpful information about your Containers, including:

* Status and Health
* Metrics
* Logs

After launching your Worker, go to the Containers Dashboard by selecting**Workers & Pages** \> **Containers** in the dashboard sidebar.

## Next Steps

To do more:

* Modify the image by changing the Dockerfile and calling `wrangler deploy`
* Review our [examples](https://developers.cloudflare.com/containers/examples/) for more inspiration
* Review the [Frequently Asked Questions](https://developers.cloudflare.com/containers/faq/) for current platform behavior and limitations

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/get-started/#page","headline":"Getting started · Cloudflare Containers docs","description":"Deploy your first Container on Cloudflare by building an image, configuring a Worker, and routing requests to container instances.","url":"https://developers.cloudflare.com/containers/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/get-started/","name":"Getting started"}}]}
```
