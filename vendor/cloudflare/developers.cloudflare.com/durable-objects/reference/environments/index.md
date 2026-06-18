---
title: Environments
description: Configure Durable Object bindings across Wrangler environments for staging, production, and custom deployments.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environments

Environments provide isolated spaces where your code runs with specific dependencies and configurations. This can be useful for a number of reasons, such as compatibility testing or version management. Using different environments can help with code consistency, testing, and production segregation, which reduces the risk of errors when deploying code.

## Wrangler environments

[Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) allows you to deploy the same Worker application with different configuration for each [environment](https://developers.cloudflare.com/workers/wrangler/environments/).

If you are using Wrangler environments, you must specify any [Durable Object bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) you wish to use on a per-environment basis.

Durable Object bindings are not inherited. For example, you can define an environment named `staging` as below:

* [  wrangler.jsonc ](#tab-panel-8405)
* [  wrangler.toml ](#tab-panel-8406)

JSONC

```

{

  "env": {

    "staging": {

      "durable_objects": {

        "bindings": [

          {

            "name": "EXAMPLE_CLASS",

            "class_name": "DurableObjectExample"

          }

        ]

      }

    }

  }

}


```

TOML

```

[[env.staging.durable_objects.bindings]]

name = "EXAMPLE_CLASS"

class_name = "DurableObjectExample"


```

Because Wrangler appends the [environment name](https://developers.cloudflare.com/workers/wrangler/environments/) to the top-level name when publishing, for a Worker named `worker-name` the above example is equivalent to:

* [  wrangler.jsonc ](#tab-panel-8407)
* [  wrangler.toml ](#tab-panel-8408)

JSONC

```

{

  "env": {

    "staging": {

      "durable_objects": {

        "bindings": [

          {

            "name": "EXAMPLE_CLASS",

            "class_name": "DurableObjectExample",

            "script_name": "worker-name-staging"

          }

        ]

      }

    }

  }

}


```

TOML

```

[[env.staging.durable_objects.bindings]]

name = "EXAMPLE_CLASS"

class_name = "DurableObjectExample"

script_name = "worker-name-staging"


```

`"EXAMPLE_CLASS"` in the staging environment is bound to a different Worker code name compared to the top-level `"EXAMPLE_CLASS"` binding, and will therefore access different Durable Objects with different persistent storage.

If you want an environment-specific binding that accesses the same Objects as the top-level binding, specify the top-level Worker code name explicitly using `script_name`:

* [  wrangler.jsonc ](#tab-panel-8409)
* [  wrangler.toml ](#tab-panel-8410)

JSONC

```

{

  "env": {

    "another": {

      "durable_objects": {

        "bindings": [

          {

            "name": "EXAMPLE_CLASS",

            "class_name": "DurableObjectExample",

            "script_name": "worker-name"

          }

        ]

      }

    }

  }

}


```

TOML

```

[[env.another.durable_objects.bindings]]

name = "EXAMPLE_CLASS"

class_name = "DurableObjectExample"

script_name = "worker-name"


```

### Migration environments

You can define a Durable Object migration for each environment, as well as at the top level. Migrations at at the environment-level override migrations at the top level.

For more information, refer to [Migration Wrangler Configuration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#migration-wrangler-configuration).

## Local development

Local development sessions create a standalone, local-only environment that mirrors the production environment, so that you can test your Worker and Durable Objects before you deploy to production.

An existing Durable Object binding of `DB` would be available to your Worker when running locally.

Refer to Workers [Local development](https://developers.cloudflare.com/workers/development-testing/bindings-per-env/).

## Remote development

KV-backed Durable Objects support remote development using the dashboard playground. The dashboard playground uses a browser version of Visual Studio Code, allowing you to rapidly iterate on your Worker entirely in your browser.

To start remote development:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select an existing Worker.
3. Select the **Edit code** icon located on the upper-right of the screen.

Warning

Remote development is only available for KV-backed Durable Objects. SQLite-backed Durable Objects do not support remote development.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/reference/environments/#page","headline":"Environments · Cloudflare Durable Objects docs","description":"Configure Durable Object bindings across Wrangler environments for staging, production, and custom deployments.","url":"https://developers.cloudflare.com/durable-objects/reference/environments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/reference/environments/","name":"Environments"}}]}
```
