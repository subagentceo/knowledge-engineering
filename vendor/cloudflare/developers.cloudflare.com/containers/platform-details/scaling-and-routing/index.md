---
title: Scaling and Routing
description: Scale Container instances using explicit IDs or the getRandom helper for stateless load balancing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scaling and Routing

## Scale container instances with explicit IDs

Note

This section uses helpers from the [Container class](https://developers.cloudflare.com/containers/container-class/).

Today, Containers are scaled manually by getting containers with a unique ID, then starting the container. Note that getting a container does not automatically start it.

TypeScript

```

// get and start two container instances

const containerOne = getContainer(

  env.MY_CONTAINER,

  idOne,

).startAndWaitForPorts();


const containerTwo = getContainer(

  env.MY_CONTAINER,

  idTwo,

).startAndWaitForPorts();


```

Each instance will run until its `sleepAfter` time has elapsed, or until it is manually stopped.

This behavior is very useful when you want explicit control over the lifecycle of container instances. For instance, you may want to spin up a container backend instance for a specific user, or you may briefly run a code sandbox to isolate AI-generated code, or you may want to run a short-lived batch job.

### Use the `getRandom` helper function

If you want to run multiple instances of a container and route requests between them, use the`getRandom` helper function:

JavaScript

```

import { Container, getRandom } from "@cloudflare/containers";


const INSTANCE_COUNT = 3;


class Backend extends Container {

  defaultPort = 8080;

  sleepAfter = "2h";

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const containerInstance = await getRandom(env.BACKEND, INSTANCE_COUNT);

    return containerInstance.fetch(request);

  },

};


```

Use `getRandom` to route to multiple stateless container instances. It randomly selects one of N instances for each request, which means:

* It requires that the user set a fixed number of instances to route to.
* It will randomly select each instance, regardless of location.

We plan to fix these issues with built-in autoscaling and routing features in the near future.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/scaling-and-routing/#page","headline":"Scaling and Routing · Cloudflare Containers docs","description":"Scale Container instances using explicit IDs or the getRandom helper for stateless load balancing.","url":"https://developers.cloudflare.com/containers/platform-details/scaling-and-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/scaling-and-routing/","name":"Scaling and Routing"}}]}
```
