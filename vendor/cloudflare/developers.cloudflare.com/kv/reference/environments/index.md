---
title: Environments
description: Bind different Workers KV namespaces to the same Worker across staging and production environments.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environments

KV namespaces can be used with [environments](https://developers.cloudflare.com/workers/wrangler/environments/). This is useful when you have code in your Worker that refers to a KV binding like `MY_KV`, and you want to have these bindings point to different KV namespaces (for example, one for staging and one for production).

The following code in the Wrangler file shows you how to have two environments that have two different KV namespaces but the same binding name:

* [  wrangler.jsonc ](#tab-panel-8984)
* [  wrangler.toml ](#tab-panel-8985)

JSONC

```

{

  "env": {

    "staging": {

      "kv_namespaces": [

        {

          "binding": "MY_KV",

          "id": "e29b263ab50e42ce9b637fa8370175e8"

        }

      ]

    },

    "production": {

      "kv_namespaces": [

        {

          "binding": "MY_KV",

          "id": "a825455ce00f4f7282403da85269f8ea"

        }

      ]

    }

  }

}


```

TOML

```

[[env.staging.kv_namespaces]]

binding = "MY_KV"

id = "e29b263ab50e42ce9b637fa8370175e8"


[[env.production.kv_namespaces]]

binding = "MY_KV"

id = "a825455ce00f4f7282403da85269f8ea"


```

Using the same binding name for two different KV namespaces keeps your Worker code more readable.

In the `staging` environment, `MY_KV.get("KEY")` will read from the namespace ID `e29b263ab50e42ce9b637fa8370175e8`. In the `production` environment, `MY_KV.get("KEY")` will read from the namespace ID `a825455ce00f4f7282403da85269f8ea`.

To insert a value into a `staging` KV namespace, run:

Terminal window

```

wrangler kv key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"


```

Since `--namespace-id` is always unique (unlike binding names), you do not need to specify an `--env` argument:

Terminal window

```

wrangler kv key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"


```

Warning

Since version 3.60.0, Wrangler KV commands support the `kv ...` syntax. If you are using versions of Wrangler below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/) for KV page.

Most `kv` subcommands also allow you to specify an environment with the optional `--env` flag.

Specifying an environment with the optional `--env` flag allows you to publish Workers running the same code but with different KV namespaces.

For example, you could use separate staging and production KV namespaces for KV data in your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8986)
* [  wrangler.toml ](#tab-panel-8987)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "type": "webpack",

  "name": "my-worker",

  "account_id": "<account id here>",

  "route": "staging.example.com/*",

  "workers_dev": false,

  "kv_namespaces": [

    {

      "binding": "MY_KV",

      "id": "06779da6940b431db6e566b4846d64db"

    }

  ],

  "env": {

    "production": {

      "route": "example.com/*",

      "kv_namespaces": [

        {

          "binding": "MY_KV",

          "id": "07bc1f3d1f2a4fd8a45a7e026e2681c6"

        }

      ]

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

type = "webpack"

name = "my-worker"

account_id = "<account id here>"

route = "staging.example.com/*"

workers_dev = false


[[kv_namespaces]]

binding = "MY_KV"

id = "06779da6940b431db6e566b4846d64db"


[env.production]

route = "example.com/*"


  [[env.production.kv_namespaces]]

  binding = "MY_KV"

  id = "07bc1f3d1f2a4fd8a45a7e026e2681c6"


```

With the Wrangler file above, you can specify `--env production` when you want to perform a KV action on the KV namespace `MY_KV` under `env.production`.

For example, with the Wrangler file above, you can get a value out of a production KV instance with:

Terminal window

```

wrangler kv key get --binding "MY_KV" --env=production "<KEY>"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/environments/#page","headline":"Environments · Cloudflare Workers KV docs","description":"Bind different Workers KV namespaces to the same Worker across staging and production environments.","url":"https://developers.cloudflare.com/kv/reference/environments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/reference/environments/","name":"Environments"}}]}
```
