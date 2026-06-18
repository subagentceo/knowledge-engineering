---
title: Migrate from Wrangler v3 to v4
description: Upgrade Wrangler from v3 to v4, including breaking changes, updated Node.js requirements, and new defaults.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate from Wrangler v3 to v4

Wrangler v4 is a major release focused on updates to underlying systems and dependencies, along with improvements to keep Wrangler commands consistent and clear. Unlike previous major versions of Wrangler, which were [foundational rewrites ↗](https://blog.cloudflare.com/wrangler-v2-beta/) and [rearchitectures ↗](https://blog.cloudflare.com/wrangler3/) — Version 4 of Wrangler includes a much smaller set of changes. If you use Wrangler today, your workflow is very unlikely to change.

While many users should expect a no-op upgrade, the following sections outline the more significant changes and steps for migrating where necessary.

## Upgrade to Wrangler v4

To upgrade to the latest version of Wrangler v4 within your Worker project, run:

 npm  yarn  pnpm  bun 

```
npm i -D wrangler@4
```

```
yarn add -D wrangler@4
```

```
pnpm add -D wrangler@4
```

```
bun add -d wrangler@4
```

After upgrading, you can verify the installation:

 npm  yarn  pnpm 

```
npx wrangler --version
```

```
yarn wrangler --version
```

```
pnpm wrangler --version
```

### Summary of changes

* **Updated Node.js support policy:**Node.js v16, which reached End-of-Life in 2022, is no longer supported in Wrangler v4\. Wrangler now follows Node.js's [official support lifecycle ↗](https://nodejs.org/en/about/previous-releases).
* **Upgraded esbuild version**: Wrangler uses [esbuild ↗](https://esbuild.github.io/) to bundle Worker code before deploying it, and was previously pinned to esbuild v0.17.19\. Wrangler v4 uses esbuild v0.24, which could impact dynamic wildcard imports. Going forward, Wrangler will be periodically updating the `esbuild` version included with Wrangler, and since `esbuild` is a pre-1.0.0 tool, this may sometimes include breaking changes to how bundling works. In particular, we may bump the `esbuild` version in a Wrangler minor version.
* **Commands default to local mode**: All commands that can run in either local or remote mode now default to local, requiring a `--remote` flag for API queries.
* **Deprecated commands and configurations removed:** Legacy commands, flags, and configurations are removed.

## Detailed Changes

### Updated Node.js support policy

Wrangler now supports only Node.js versions that align with [Node.js's official lifecycle ↗](https://nodejs.org/en/about/previous-releases):

* **Supported**: Current, Active LTS, Maintenance LTS
* **No longer supported:** Node.js v16 (EOL in 2022)

Wrangler tests no longer run on v16, and users still on this version may encounter unsupported behavior. Users still using Node.js v16 must upgrade to a supported version to continue receiving support and compatibility with Wrangler.

Am I affected?

Run the following command to check your Node.js version:

Terminal window

```

node --version


```

**You need to take action if** your version starts with `v16` or `v18` (for example, `v16.20.0` or `v18.20.0`).

**To upgrade Node.js**, refer to the [Wrangler system requirements](https://developers.cloudflare.com/workers/wrangler/install-and-update/). Cloudflare recommends using the latest LTS version of Node.js.

### Upgraded esbuild version

Wrangler v4 upgrades esbuild from **v0.17.19** to **v0.24**, bringing improvements (such as the ability to use the `using` keyword with RPC) and changes to bundling behavior:

* **Dynamic imports:** Wildcard imports (for example, `import('./data/' + kind + '.json')`) now automatically include all matching files in the bundle.

Users relying on wildcard dynamic imports may see unwanted files bundled. Prior to esbuild v0.19, `import` statements with dynamic paths (like `import('./data/' + kind + '.json')`) did not bundle all files matching the glob pattern (`*.json`). Only files explicitly referenced or included using `find_additional_modules` were bundled. With esbuild v0.19, wildcard imports now automatically bundle all files matching the glob pattern. This could result in unwanted files being bundled, so users might want to avoid wildcard dynamic imports and use explicit imports instead.

### Commands default to local mode

All commands now run in **local mode by default.** Wrangler has many commands for accessing resources like KV and R2, but the commands were previously inconsistent in whether they ran in a local or remote environment. For example, D1 defaulted to querying a local datastore, and required the `--remote` flag to query via the API. KV, on the other hand, previously defaulted to querying via the API (implicitly using the `--remote` flag) and required a `--local` flag to query a local datastore. In order to make the behavior consistent across Wrangler, each command now uses the `--local` flag by default, and requires an explicit `--remote` flag to query via the API.

For example:

* **Previous Behavior (Wrangler v3):** `wrangler kv key get` queried remotely by default.
* **New Behavior (Wrangler v4):** `wrangler kv key get` queries locally unless `--remote` is specified.

Those using `wrangler kv key` and/or `wrangler r2 object` commands to query or write to their data store will need to add the `--remote` flag in order to replicate previous behavior.

Am I affected?

Check if you use any of these commands in scripts, CI/CD pipelines, or manual workflows:

**KV commands:**

* `wrangler kv key get`
* `wrangler kv key put`
* `wrangler kv key delete`
* `wrangler kv key list`
* `wrangler kv bulk put`
* `wrangler kv bulk delete`

**R2 commands:**

* `wrangler r2 object get`
* `wrangler r2 object put`
* `wrangler r2 object delete`

**You need to take action if:**

* You run these commands expecting them to interact with your remote/production data.
* You have scripts or CI/CD pipelines that use these commands without the `--local` or `--remote` flag.

Search your codebase and CI/CD configs:

Terminal window

```

grep -rE "wrangler (kv|r2)" --include="*.sh" --include="*.yml" --include="*.yaml" --include="Makefile" --include="package.json" .


```

**What to do:**

Add `--remote` to commands that should interact with your Cloudflare account:

Terminal window

```

# Before (Wrangler v3 - queried remote by default)

wrangler kv key get --binding MY_KV "my-key"


# After (Wrangler v4 - must specify --remote)

wrangler kv key get --binding MY_KV "my-key" --remote


```

### Deprecated commands and configurations removed

All previously deprecated features in [Wrangler v2](https://developers.cloudflare.com/workers/wrangler/deprecations/#wrangler-v2) and in [Wrangler v3](https://developers.cloudflare.com/workers/wrangler/deprecations/#wrangler-v3) are now removed. Additionally, the following features that were deprecated during the Wrangler v3 release are also now removed:

* Legacy Assets (using `wrangler dev/deploy --legacy-assets` or the `legacy_assets` config file property). Instead, we recommend you [migrate to Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
* Legacy Node.js compatibility (using `wrangler dev/deploy --node-compat` or the `node_compat` config file property). Instead, use the [nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/). This includes the functionality from legacy `node_compat` polyfills and natively implemented Node.js APIs.
* `wrangler version`. Instead, use `wrangler --version` to check the current version of Wrangler.
* `getBindingsProxy()` (via `import { getBindingsProxy } from "wrangler"`). Instead, use the [getPlatformProxy() API](https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy), which takes exactly the same arguments.
* `usage_model`. This no longer has any effect, after the [rollout of Workers Standard Pricing ↗](https://blog.cloudflare.com/workers-pricing-scale-to-zero/).

Am I affected?

**Check your Wrangler configuration file** (`wrangler.toml`, `wrangler.json`, or `wrangler.jsonc`) for deprecated settings:

Terminal window

```

# For TOML files

grep -E "(legacy_assets|node_compat|usage_model)\s*=" wrangler.toml


# For JSON files

grep -E "\"(legacy_assets|node_compat|usage_model)\"" wrangler.json wrangler.jsonc


```

**Check your commands and scripts** for deprecated flags:

Terminal window

```

grep -rE "wrangler.*(--legacy-assets|--node-compat)" --include="*.sh" --include="*.yml" --include="*.yaml" --include="Makefile" --include="package.json" .


```

**Check for deprecated API usage** in your code:

Terminal window

```

grep -rE "getBindingsProxy" --include="*.js" --include="*.ts" --include="*.mjs" .


```

**You need to take action if you find any of the following:**

| Deprecated                                     | Replacement                                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| legacy\_assets config or \--legacy-assets flag | [Migrate to Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)                        |
| node\_compat config or \--node-compat flag     | Use the [nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)         |
| usage\_model config                            | Remove it (no longer has any effect)                                                                                |
| wrangler version command                       | Use wrangler --version                                                                                              |
| getBindingsProxy() import                      | Use [getPlatformProxy()](https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy) (same arguments) |
| wrangler publish command                       | Use wrangler deploy                                                                                                 |
| wrangler generate command                      | Use npm create cloudflare@latest                                                                                    |
| wrangler pages publish command                 | Use wrangler pages deploy                                                                                           |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/#page","headline":"Migrate from Wrangler v3 to v4 · Cloudflare Workers docs","description":"Upgrade Wrangler from v3 to v4, including breaking changes, updated Node.js requirements, and new defaults.","url":"https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/migration/","name":"Migrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/migration/update-v3-to-v4/","name":"Migrate from Wrangler v3 to v4"}}]}
```
