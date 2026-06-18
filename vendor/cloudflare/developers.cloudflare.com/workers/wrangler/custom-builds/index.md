---
title: Custom builds
description: Customize how your code is compiled, before being processed by Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom builds

Custom builds are a way for you to customize how your code is compiled, before being processed by Wrangler.

Note

Wrangler runs [esbuild ↗](https://esbuild.github.io/) by default as part of the `dev` and `deploy` commands, and bundles your Worker project into a single Worker script. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/).

## Configure custom builds

Custom builds are configured by adding a `[build]` section in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and using the following options for configuring your custom build.

* `command` ` string ` optional  
   * The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. This command will be run as part of `wrangler dev` and `npx wrangler deploy`.
* `cwd` ` string ` optional  
   * The directory in which the command is executed.
* `watch_dir` ` string | string\[] ` optional  
   * The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

Example:

* [  wrangler.jsonc ](#tab-panel-12929)
* [  wrangler.toml ](#tab-panel-12930)

JSONC

```

{

  "build": {

    "command": "npm run build",

    "cwd": "build_cwd",

    "watch_dir": "build_watch_dir"

  }

}


```

TOML

```

[build]

command = "npm run build"

cwd = "build_cwd"

watch_dir = "build_watch_dir"


```

## `WRANGLER_COMMAND` environment variable

When Wrangler runs your custom build command, it sets the `WRANGLER_COMMAND` environment variable so your build script can detect which Wrangler command triggered the build. This allows you to customize the build process based on the deployment context.

The possible values are:

| Value           | Wrangler command triggered |
| --------------- | -------------------------- |
| dev             | wrangler dev               |
| deploy          | wrangler deploy            |
| versions upload | wrangler versions upload   |
| types           | wrangler types             |

For example, you can use this to apply different build settings for development and production:

```

#!/bin/bash

if [ "$WRANGLER_COMMAND" = "dev" ]; then

  echo "Building for development..."

  # run a development build

else

  echo "Building for production..."

  # run a production build

fi


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/custom-builds/#page","headline":"Custom builds · Cloudflare Workers docs","description":"Customize how your code is compiled, before being processed by Wrangler.","url":"https://developers.cloudflare.com/workers/wrangler/custom-builds/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/custom-builds/","name":"Custom builds"}}]}
```
