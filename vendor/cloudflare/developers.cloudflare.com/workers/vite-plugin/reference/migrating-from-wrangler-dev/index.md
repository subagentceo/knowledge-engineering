---
title: Migrating from wrangler dev
description: Migrating from wrangler dev to the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrating from wrangler dev

In most cases, migrating from [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) is straightforward and you can follow the instructions in [Get started](https://developers.cloudflare.com/workers/vite-plugin/get-started/). There are a few key differences to highlight:

## Input and output Worker config files

With the Cloudflare Vite plugin, your [Worker config file](https://developers.cloudflare.com/workers/wrangler/configuration/) (for example, `wrangler.jsonc`) is the input configuration and a separate output configuration is created as part of the build. This output file is a snapshot of your configuration at the time of the build and is modified to reference your build artifacts. It is the configuration that is used for preview and deployment. Once you have run `vite build`, running `wrangler deploy` or `vite preview` will automatically locate this output configuration file.

## Cloudflare Environments

With the Cloudflare Vite plugin, [Cloudflare Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/) are applied at dev and build time. Running `wrangler deploy --env some-env` is therefore not applicable and the environment to deploy should instead be set by running `CLOUDFLARE_ENV=some-env vite build`.

## Redundant fields in the Wrangler config file

There are various options in the [Worker config file](https://developers.cloudflare.com/workers/wrangler/configuration/) that are ignored when using Vite, as they are either no longer applicable or are replaced by Vite equivalents. If these options are provided, then warnings will be printed to the console with suggestions for how to proceed.

### Not applicable

The following build-related options are handled by Vite and are not applicable when using the Cloudflare Vite plugin:

* `tsconfig`
* `rules`
* `build`
* `no_bundle`
* `find_additional_modules`
* `base_dir`
* `preserve_file_names`

### Not supported

* `site` — Use [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) instead.

### Replaced by Vite equivalents

The following options have Vite equivalents that should be used instead:

| Wrangler option                                      | Vite equivalent                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| define                                               | [define ↗](https://vite.dev/config/shared-options.html#define)               |
| alias                                                | [resolve.alias ↗](https://vite.dev/config/shared-options.html#resolve-alias) |
| minify                                               | [build.minify ↗](https://vite.dev/config/build-options.html#build-minify)    |
| Local dev settings (ip, port, local\_protocol, etc.) | [Server options ↗](https://vite.dev/config/server-options.html)              |

See [Vite Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/) for more information about configuring your Worker environments in Vite.

### Inferred

If [build.sourcemap ↗](https://vite.dev/config/build-options#build-sourcemap) is enabled for a given Worker environment in the Vite config, `"upload_source_maps": true` is automatically added to the output Wrangler configuration file. This means that generated sourcemaps are uploaded by default. To override this setting, you can set the value of `upload_source_maps` explicitly in the input Worker config.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/#page","headline":"Migrating from wrangler dev · Cloudflare Workers docs","description":"Migrating from wrangler dev to the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/migrating-from-wrangler-dev/","name":"Migrating from wrangler dev"}}]}
```
