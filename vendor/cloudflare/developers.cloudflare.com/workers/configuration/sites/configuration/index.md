---
title: Workers Sites configuration
description: Configure Workers Sites settings for static asset hosting in your Wrangler configuration file.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Sites configuration

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

Workers Sites require the latest version of [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).

## Wrangler configuration file

There are a few specific configuration settings for Workers Sites in your Wrangler file:

* `bucket` required  
   * The directory containing your static assets, path relative to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). Example: `bucket = "./public"`.
* `include` optional  
   * A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload. Example: `include = ["upload_dir"]`.
* `exclude` optional  
   * A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. Example: `exclude = ["ignore_dir"]`.

To learn more about the optional `include` and `exclude` fields, refer to [Ignoring subsets of static assets](#ignoring-subsets-of-static-assets).

Note

If your project uses [environments](https://developers.cloudflare.com/workers/wrangler/environments/), make sure to place `site` above any environment-specific configuration blocks.

Example of a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11497)
* [  wrangler.toml ](#tab-panel-11498)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "docs-site-blah",

  "site": {

    "bucket": "./public"

  },

  "env": {

    "production": {

      "name": "docs-site",

      "route": "https://example.com/docs*"

    },

    "staging": {

      "name": "docs-site-staging",

      "route": "https://staging.example.com/docs*"

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "docs-site-blah"


[site]

bucket = "./public"


[env.production]

name = "docs-site"

route = "https://example.com/docs*"


[env.staging]

name = "docs-site-staging"

route = "https://staging.example.com/docs*"


```

## Storage limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 25 MiB limit per page or file.

## Ignoring subsets of static assets

Workers Sites require [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) \- make sure to use the [latest version](https://developers.cloudflare.com/workers/wrangler/install-and-update/#update-wrangler).

There are cases where users may not want to upload certain static assets to their Workers Sites. In this case, Workers Sites can also be configured to ignore certain files or directories using logic similar to [Cargo's optional include and exclude fields ↗](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).

This means that you should use gitignore semantics when declaring which directory entries to include or ignore in uploads.

### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your `[site]` section of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11493)
* [  wrangler.toml ](#tab-panel-11494)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "include": [ // must be an array.

      "included_dir"

    ]

  }

}


```

TOML

```

[site]

bucket = "./public"

include = [ "included_dir" ]


```

Wrangler will only upload files or directories matching the patterns in the `include` array.

### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your `[site]` section of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11495)
* [  wrangler.toml ](#tab-panel-11496)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "exclude": [ // must be an array.

      "excluded_dir"

    ]

  }

}


```

TOML

```

[site]

bucket = "./public"

exclude = [ "excluded_dir" ]


```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

### Include > exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

### Default ignored entries

Wrangler will always ignore:

* `node_modules`
* Hidden files and directories
* Symlinks

#### More about include/exclude patterns

Learn more about the standard patterns used for include and exclude in the [gitignore documentation ↗](https://git-scm.com/docs/gitignore).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/#page","headline":"Workers Sites configuration · Cloudflare Workers docs","description":"Configure Workers Sites settings for static asset hosting in your Wrangler configuration file.","url":"https://developers.cloudflare.com/workers/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/sites/","name":"Workers Sites"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/sites/configuration/","name":"Workers Sites configuration"}}]}
```
