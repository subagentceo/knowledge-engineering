---
title: Rotating database credentials
description: Update or rotate database credentials for an existing Hyperdrive configuration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rotating database credentials

You can change the connection information and credentials of your Hyperdrive configuration in one of two ways:

1. Create a new Hyperdrive configuration with the new connection information, and update your Worker to use the new Hyperdrive configuration.
2. Update the existing Hyperdrive configuration with the new connection information and credentials.

## Use a new Hyperdrive configuration

Creating a new Hyperdrive configuration to update your database credentials allows you to keep your existing Hyperdrive configuration unchanged, gradually migrate your Worker to the new Hyperdrive configuration, and easily roll back to the previous configuration if needed.

To create a Hyperdrive configuration that connects to an existing PostgreSQL or MySQL database, use the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive create my-updated-hyperdrive --connection-string="<YOUR_CONNECTION_STRING>"


```

The command above will output the ID of your Hyperdrive. Set this ID in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project:

* [  wrangler.jsonc ](#tab-panel-8664)
* [  wrangler.toml ](#tab-panel-8665)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<your-hyperdrive-id-here>"

    }

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<your-hyperdrive-id-here>"


```

To update your Worker to use the new Hyperdrive configuration, redeploy your Worker or use [gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/).

## Update the existing Hyperdrive configuration

You can update the configuration of an existing Hyperdrive configuration using the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --origin-host <YOUR_ORIGIN_HOST> --origin-password <YOUR_ORIGIN_PASSWORD> --origin-user <YOUR_ORIGIN_USERNAME> --database <YOUR_DATABASE> --origin-port <YOUR_ORIGIN_PORT>


```

Note

Updating the settings of an existing Hyperdrive configuration does not purge Hyperdrive's cache and does not tear down the existing database connection pool. New connections will be established using the new connection information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/#page","headline":"Rotating database credentials · Cloudflare Hyperdrive docs","description":"Update or rotate database credentials for an existing Hyperdrive configuration.","url":"https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/rotate-credentials/","name":"Rotating database credentials"}}]}
```
