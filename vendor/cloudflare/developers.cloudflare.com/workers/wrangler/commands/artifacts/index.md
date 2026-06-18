---
title: Artifacts
description: Manage Artifacts namespaces, repositories, and repo-scoped tokens using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Artifacts

Manage [Artifacts](https://developers.cloudflare.com/artifacts/) namespaces, repositories, and repo-scoped tokens using Wrangler. Private beta

## `artifacts namespaces list`

List Artifacts namespaces

* [  npm ](#tab-panel-12237)
* [  pnpm ](#tab-panel-12238)
* [  yarn ](#tab-panel-12239)

Terminal window

```

npx wrangler artifacts namespaces list


```

Terminal window

```

pnpm wrangler artifacts namespaces list


```

Terminal window

```

yarn wrangler artifacts namespaces list


```

* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts namespaces get`

Get an Artifacts namespace

* [  npm ](#tab-panel-12240)
* [  pnpm ](#tab-panel-12241)
* [  yarn ](#tab-panel-12242)

Terminal window

```

npx wrangler artifacts namespaces get [NAME]


```

Terminal window

```

pnpm wrangler artifacts namespaces get [NAME]


```

Terminal window

```

yarn wrangler artifacts namespaces get [NAME]


```

* `[NAME]` ` string ` required  
The Artifacts namespace name
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos create`

Create an Artifacts repository

* [  npm ](#tab-panel-12243)
* [  pnpm ](#tab-panel-12244)
* [  yarn ](#tab-panel-12245)

Terminal window

```

npx wrangler artifacts repos create [NAME]


```

Terminal window

```

pnpm wrangler artifacts repos create [NAME]


```

Terminal window

```

yarn wrangler artifacts repos create [NAME]


```

* `[NAME]` ` string ` required  
The Artifacts repository name
* `--namespace` ` string ` required  
The Artifacts namespace name
* `--description` ` string `  
An optional description for the repository
* `--default-branch` ` string `  
The default branch for the repository
* `--read-only` ` boolean `  
Create the repository as read-only
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos list`

List Artifacts repositories in a namespace

* [  npm ](#tab-panel-12246)
* [  pnpm ](#tab-panel-12247)
* [  yarn ](#tab-panel-12248)

Terminal window

```

npx wrangler artifacts repos list


```

Terminal window

```

pnpm wrangler artifacts repos list


```

Terminal window

```

yarn wrangler artifacts repos list


```

* `--namespace` ` string ` required  
The Artifacts namespace name
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos get`

Get an Artifacts repository

* [  npm ](#tab-panel-12249)
* [  pnpm ](#tab-panel-12250)
* [  yarn ](#tab-panel-12251)

Terminal window

```

npx wrangler artifacts repos get [NAME]


```

Terminal window

```

pnpm wrangler artifacts repos get [NAME]


```

Terminal window

```

yarn wrangler artifacts repos get [NAME]


```

* `[NAME]` ` string ` required  
The Artifacts repository name
* `--namespace` ` string ` required  
The Artifacts namespace name
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos delete`

Delete an Artifacts repository

* [  npm ](#tab-panel-12252)
* [  pnpm ](#tab-panel-12253)
* [  yarn ](#tab-panel-12254)

Terminal window

```

npx wrangler artifacts repos delete [NAME]


```

Terminal window

```

pnpm wrangler artifacts repos delete [NAME]


```

Terminal window

```

yarn wrangler artifacts repos delete [NAME]


```

* `[NAME]` ` string ` required  
The Artifacts repository name
* `--namespace` ` string ` required  
The Artifacts namespace name
* `--force` ` boolean ` alias: --y default: false  
Skip confirmation
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos issue-token`

Issue a repo-scoped Artifacts token

* [  npm ](#tab-panel-12255)
* [  pnpm ](#tab-panel-12256)
* [  yarn ](#tab-panel-12257)

Terminal window

```

npx wrangler artifacts repos issue-token [REPO]


```

Terminal window

```

pnpm wrangler artifacts repos issue-token [REPO]


```

Terminal window

```

yarn wrangler artifacts repos issue-token [REPO]


```

* `[REPO]` ` string ` required  
The Artifacts repository name
* `--namespace` ` string ` required  
The Artifacts namespace name
* `--scope` ` string `  
The token scope
* `--ttl` ` number `  
The token TTL in seconds
* `--json` ` boolean ` default: false  
Return output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/artifacts/#page","headline":"Artifacts · Cloudflare Workers docs","description":"Manage Artifacts namespaces, repositories, and repo-scoped tokens using Wrangler.","url":"https://developers.cloudflare.com/workers/wrangler/commands/artifacts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/artifacts/","name":"Artifacts"}}]}
```
