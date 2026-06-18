---
title: Environments
description: Configure separate D1 databases for staging and production Wrangler environments.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environments

[Environments](https://developers.cloudflare.com/workers/wrangler/environments/) are different contexts that your code runs in. Cloudflare Developer Platform allows you to create and manage different environments. Through environments, you can deploy the same project to multiple places under multiple names.

To specify different D1 databases for different environments, use the following syntax in your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-7880)
* [  wrangler.toml ](#tab-panel-7881)

JSONC

```

{

  "env": {

    // This is a staging environment

    "staging": {

      "d1_databases": [

        {

          "binding": "<BINDING_NAME_1>",

          "database_name": "<DATABASE_NAME_1>",

          "database_id": "<UUID1>"

        }

      ]

    },

    // This is a production environment

    "production": {

      "d1_databases": [

        {

          "binding": "<BINDING_NAME_2>",

          "database_name": "<DATABASE_NAME_2>",

          "database_id": "<UUID2>"

        }

      ]

    }

  }

}


```

TOML

```

[[env.staging.d1_databases]]

binding = "<BINDING_NAME_1>"

database_name = "<DATABASE_NAME_1>"

database_id = "<UUID1>"


[[env.production.d1_databases]]

binding = "<BINDING_NAME_2>"

database_name = "<DATABASE_NAME_2>"

database_id = "<UUID2>"


```

In the code above, the `staging` environment is using a different database (`DATABASE_NAME_1`) than the `production` environment (`DATABASE_NAME_2`).

## Anatomy of Wrangler file

If you need to specify different D1 databases for different environments, your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) may contain bindings that resemble the following:

* [  wrangler.jsonc ](#tab-panel-7878)
* [  wrangler.toml ](#tab-panel-7879)

JSONC

```

{

  "production": {

    "d1_databases": [

      {

        "binding": "DB",

        "database_name": "DATABASE_NAME",

        "database_id": "DATABASE_ID"

      }

    ]

  }

}


```

TOML

```

[[production.d1_databases]]

binding = "DB"

database_name = "DATABASE_NAME"

database_id = "DATABASE_ID"


```

In the above configuration:

* `[[production.d1_databases]]` creates an object `production` with a property `d1_databases`, where `d1_databases` is an array of objects, since you can create multiple D1 bindings in case you have more than one database.
* Any property below the line in the form `<key> = <value>` is a property of an object within the `d1_databases` array.

Therefore, the above binding is equivalent to:

```

{

  "production": {

    "d1_databases": [

      {

        "binding": "DB",

        "database_name": "DATABASE_NAME",

        "database_id": "DATABASE_ID"

      }

    ]

  }

}


```

### Example

* [  wrangler.jsonc ](#tab-panel-7882)
* [  wrangler.toml ](#tab-panel-7883)

JSONC

```

{

  "env": {

    "staging": {

      "d1_databases": [

        {

          "binding": "BINDING_NAME_1",

          "database_name": "DATABASE_NAME_1",

          "database_id": "UUID_1"

        }

      ]

    },

    "production": {

      "d1_databases": [

        {

          "binding": "BINDING_NAME_2",

          "database_name": "DATABASE_NAME_2",

          "database_id": "UUID_2"

        }

      ]

    }

  }

}


```

TOML

```

[[env.staging.d1_databases]]

binding = "BINDING_NAME_1"

database_name = "DATABASE_NAME_1"

database_id = "UUID_1"


[[env.production.d1_databases]]

binding = "BINDING_NAME_2"

database_name = "DATABASE_NAME_2"

database_id = "UUID_2"


```

The above is equivalent to the following structure in JSON:

```

{

  "env": {

    "production": {

      "d1_databases": [

        {

          "binding": "BINDING_NAME_2",

          "database_id": "UUID_2",

          "database_name": "DATABASE_NAME_2"

        }

      ]

    },

    "staging": {

      "d1_databases": [

        {

          "binding": "BINDING_NAME_1",

          "database_id": "UUID_1",

          "database_name": "DATABASE_NAME_1"

        }

      ]

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/configuration/environments/#page","headline":"Environments · Cloudflare D1 docs","description":"Configure separate D1 databases for staging and production Wrangler environments.","url":"https://developers.cloudflare.com/d1/configuration/environments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/configuration/environments/","name":"Environments"}}]}
```
