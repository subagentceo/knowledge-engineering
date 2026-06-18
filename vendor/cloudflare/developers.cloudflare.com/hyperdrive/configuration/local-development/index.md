---
title: Local development
description: Develop and test Hyperdrive-connected Workers locally using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Local development

Hyperdrive can be used when developing and testing your Workers locally. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers, provides two options for local development:

* **`wrangler dev`** (default): Runs your Worker code locally on your machine. You configure a `localConnectionString` to connect directly to a database (either local or remote). Hyperdrive query caching does not take effect in this mode.
* **`wrangler dev --remote`**: Runs your Worker on Cloudflare's using your deployed Hyperdrive configuration. This is useful for testing with Hyperdrive's connection pooling and query caching enabled.

## Use `wrangler dev`

By default, `wrangler dev` runs your Worker code locally on your machine. To connect to a database during local development, configure a `localConnectionString` that points directly to your database.

The `localConnectionString` works with both local and remote databases:

* **Local databases**: Connect to a database instance running on your machine (for example, `postgres://user:password@localhost:5432/database`)
* **Remote databases**: Connect directly to remote databases over TLS (for example, `postgres://user:password@remote-host.example.com:5432/database?sslmode=require` or `mysql://user:password@remote-host.example.com:3306/database?sslMode=required`). You must specify the SSL/TLS mode if required.

Note

When using `localConnectionString`, Hyperdrive's connection pooling and query caching do not take effect. Your Worker connects directly to the database without going through Hyperdrive.

### Configure with environment variable

The recommended approach is to use an environment variable to avoid committing credentials to source control:

Terminal window

```

# Your configured Hyperdrive binding is "HYPERDRIVE"

export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@your-database-host:5432/database"

npx wrangler dev


```

The environment variable format is `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`, where `<BINDING_NAME>` is the name of the binding assigned to your Hyperdrive in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

To unset an environment variable: `unset CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`

For example, to set the connection string for a local database:

Terminal window

```

export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@localhost:5432/databasename"

npx wrangler dev


```

### Configure in Wrangler configuration file

Alternatively, you can set `localConnectionString` in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-8660)
* [  wrangler.toml ](#tab-panel-8661)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "c020574a-5623-407b-be0c-cd192bab9545",

      "localConnectionString": "postgres://user:password@localhost:5432/databasename"

    }

  ]

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "c020574a-5623-407b-be0c-cd192bab9545"

localConnectionString = "postgres://user:password@localhost:5432/databasename"


```

If both an environment variable and `localConnectionString` in the Wrangler configuration file are set, the environment variable takes precedence.

## Use `wrangler dev --remote`

When you run `wrangler dev --remote`, your Worker runs in Cloudflare's network and uses your deployed Hyperdrive configuration. This means:

* Your Worker code executes in Cloudflare's production environment, not locally
* Hyperdrive's connection pooling and query caching are active
* You connect to the database configured in your Hyperdrive configuration (created with `wrangler hyperdrive create`)
* Changes made during the session interact with remote resources

This mode is useful for testing how your Worker behaves with Hyperdrive's features enabled before deploying.

Configure your Hyperdrive binding in `wrangler.jsonc`:

* [  wrangler.jsonc ](#tab-panel-8662)
* [  wrangler.toml ](#tab-panel-8663)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "your-hyperdrive-id",

    },

  ],

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "your-hyperdrive-id"


```

To start a remote development session:

Terminal window

```

npx wrangler dev --remote


```

Note

The `localConnectionString` field is not used with `wrangler dev --remote`. Instead, your Worker connects to the database configured in your deployed Hyperdrive configuration.

Warning

Use `wrangler dev --remote` with caution. Since your Worker runs in Cloudflare's production environment, any database writes or side effects will affect your production data.

Refer to the [wrangler dev documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to learn more about how to configure a local development session.

## Related resources

* Use [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to run your Worker and Hyperdrive locally and debug issues before deploying.
* Learn [how Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Understand how to [configure query caching in Hyperdrive](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/local-development/#page","headline":"Local development · Cloudflare Hyperdrive docs","description":"Develop and test Hyperdrive-connected Workers locally using Wrangler.","url":"https://developers.cloudflare.com/hyperdrive/configuration/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/local-development/","name":"Local development"}}]}
```
