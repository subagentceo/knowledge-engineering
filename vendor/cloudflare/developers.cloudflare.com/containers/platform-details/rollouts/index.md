---
title: Rollouts
description: Configure rolling deployments for Containers, including step percentages and grace periods for active instances.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rollouts

## How rollouts work

When you run `wrangler deploy`, the Worker code is updated immediately and Container instances are updated using a rolling deploy strategy. The default rollout configuration is two steps, where the first step updates 10% of the instances, and the second step updates the remaining 90%. This can be configured in your Wrangler config file using the [rollout\_step\_percentage](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) property.

When deploying a change, you can also configure a [rollout\_active\_grace\_period](https://developers.cloudflare.com/workers/wrangler/configuration/#containers), which is the minimum number of seconds to wait before an active container instance becomes eligible for updating during a rollout. At that point, the container will be sent a `SIGTERM` signal and still has 15 minutes to shut down gracefully. If the instance does not stop within 15 minutes, it is forcefully stopped with a `SIGKILL` signal. If you have cleanup that must occur before a Container instance is stopped, you should do it during this 15 minute period.

Once stopped, the instance is replaced with a new instance running the updated code. Requests may hang while the container is starting up again.

Because Worker code updates immediately while container instances roll out gradually, keep changes backwards compatible across both versions until the rollout completes.

Here is an example configuration that sets a 5 minute grace period and a two step rollout where the first step updates 10% of instances and the second step updates 100% of instances:

* [  wrangler.jsonc ](#tab-panel-7858)
* [  wrangler.toml ](#tab-panel-7859)

JSONC

```

{

  "containers": [

    {

      "max_instances": 10,

      "class_name": "MyContainer",

      "image": "./Dockerfile",

      "rollout_active_grace_period": 300,

      "rollout_step_percentage": [10, 100],

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

rollout_active_grace_period = 300

rollout_step_percentage = [ 10, 100 ]


[[durable_objects.bindings]]

name = "MY_CONTAINER"

class_name = "MyContainer"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyContainer" ]


```

## Immediate rollouts

If you need to do a one-off deployment that rolls out to 100% of container instances in one step, you can deploy with:

 npm  yarn  pnpm 

```
npx wrangler deploy --containers-rollout=immediate
```

```
yarn wrangler deploy --containers-rollout=immediate
```

```
pnpm wrangler deploy --containers-rollout=immediate
```

Note that `rollout_active_grace_period`, if configured, will still apply.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/rollouts/#page","headline":"Rollouts · Cloudflare Containers docs","description":"Configure rolling deployments for Containers, including step percentages and grace periods for active instances.","url":"https://developers.cloudflare.com/containers/platform-details/rollouts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/rollouts/","name":"Rollouts"}}]}
```
