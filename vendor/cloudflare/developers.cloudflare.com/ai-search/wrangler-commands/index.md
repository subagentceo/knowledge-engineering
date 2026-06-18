---
title: Wrangler commands
description: Manage AI Search instances from the command line using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

## `ai-search list`

List all AI Search instances

* [  npm ](#tab-panel-6633)
* [  pnpm ](#tab-panel-6634)
* [  yarn ](#tab-panel-6635)

Terminal window

```

npx wrangler ai-search list


```

Terminal window

```

pnpm wrangler ai-search list


```

Terminal window

```

yarn wrangler ai-search list


```

* `--namespace` ` string ` alias: --n default: default  
The namespace to list instances from.
* `--json` ` boolean ` default: false  
Return output as clean JSON
* `--page` ` number ` default: 1  
Page number of the results, can configure page size using "per-page"
* `--per-page` ` number `  
Number of instances to show per page

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

## `ai-search create`

Create a new AI Search instance

* [  npm ](#tab-panel-6636)
* [  pnpm ](#tab-panel-6637)
* [  yarn ](#tab-panel-6638)

Terminal window

```

npx wrangler ai-search create [NAME]


```

Terminal window

```

pnpm wrangler ai-search create [NAME]


```

Terminal window

```

yarn wrangler ai-search create [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to create (must be unique within its namespace).
* `--namespace` ` string ` alias: --n  
The namespace to create the instance in.
* `--source` ` string `  
Data source identifier (R2 bucket name or web URL).
* `--type` ` string `  
The source type for the instance.
* `--embedding-model` ` string `  
Embedding model to use.
* `--generation-model` ` string `  
LLM model for chat completions.
* `--chunk-size` ` number `  
Chunk size for document splitting (min: 64).
* `--chunk-overlap` ` number `  
Overlap between document chunks.
* `--max-num-results` ` number `  
Maximum search results per query.
* `--reranking` ` boolean `  
Enable reranking of search results.
* `--reranking-model` ` string `  
Model to use for reranking.
* `--hybrid-search` ` boolean `  
Enable hybrid (keyword + vector) search.
* `--cache` ` boolean `  
Enable response caching.
* `--score-threshold` ` number `  
Minimum relevance score threshold (0-1).
* `--prefix` ` string `  
R2 key prefix to scope indexing.
* `--include-items` ` array `  
Glob patterns for items to include.
* `--exclude-items` ` array `  
Glob patterns for items to exclude.
* `--custom-metadata` ` array `  
Custom metadata fields, formatted as 'field\_name:data\_type'. data\_type must be one of: text, number, boolean, datetime. Repeat the flag for multiple fields (e.g. --custom-metadata title:text --custom-metadata views:number).
* `--custom-metadata-schema` ` string `  
Path to a JSON file describing custom metadata fields. The file must contain an array of { "field\_name", "data\_type" } objects. Mutually exclusive with --custom-metadata.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search get`

Get details of an AI Search instance

* [  npm ](#tab-panel-6639)
* [  pnpm ](#tab-panel-6640)
* [  yarn ](#tab-panel-6641)

Terminal window

```

npx wrangler ai-search get [NAME]


```

Terminal window

```

pnpm wrangler ai-search get [NAME]


```

Terminal window

```

yarn wrangler ai-search get [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--namespace` ` string ` alias: --n default: default  
The namespace the instance belongs to.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search update`

Update an AI Search instance configuration

* [  npm ](#tab-panel-6642)
* [  pnpm ](#tab-panel-6643)
* [  yarn ](#tab-panel-6644)

Terminal window

```

npx wrangler ai-search update [NAME]


```

Terminal window

```

pnpm wrangler ai-search update [NAME]


```

Terminal window

```

yarn wrangler ai-search update [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to update.
* `--namespace` ` string ` alias: --n default: default  
The namespace the instance belongs to.
* `--embedding-model` ` string `  
Update the embedding model.
* `--generation-model` ` string `  
Update the LLM model for chat completions.
* `--chunk-size` ` number `  
Update the chunk size.
* `--chunk-overlap` ` number `  
Update the chunk overlap.
* `--max-num-results` ` number `  
Update max search results per query.
* `--reranking` ` boolean `  
Enable or disable reranking.
* `--reranking-model` ` string `  
Update the reranking model.
* `--hybrid-search` ` boolean `  
Enable or disable hybrid search.
* `--cache` ` boolean `  
Enable or disable caching.
* `--score-threshold` ` number `  
Update the minimum relevance score threshold (0-1).
* `--paused` ` boolean `  
Pause or resume the instance.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search delete`

Delete an AI Search instance

* [  npm ](#tab-panel-6645)
* [  pnpm ](#tab-panel-6646)
* [  yarn ](#tab-panel-6647)

Terminal window

```

npx wrangler ai-search delete [NAME]


```

Terminal window

```

pnpm wrangler ai-search delete [NAME]


```

Terminal window

```

yarn wrangler ai-search delete [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to delete.
* `--namespace` ` string ` alias: --n default: default  
The namespace the instance belongs to.
* `--force` ` boolean ` alias: --y default: false  
Skip confirmation

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

## `ai-search stats`

Get usage statistics for an AI Search instance

* [  npm ](#tab-panel-6648)
* [  pnpm ](#tab-panel-6649)
* [  yarn ](#tab-panel-6650)

Terminal window

```

npx wrangler ai-search stats [NAME]


```

Terminal window

```

pnpm wrangler ai-search stats [NAME]


```

Terminal window

```

yarn wrangler ai-search stats [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--namespace` ` string ` alias: --n default: default  
The namespace the instance belongs to.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search search`

Execute a semantic search query against an AI Search instance

* [  npm ](#tab-panel-6651)
* [  pnpm ](#tab-panel-6652)
* [  yarn ](#tab-panel-6653)

Terminal window

```

npx wrangler ai-search search [NAME]


```

Terminal window

```

pnpm wrangler ai-search search [NAME]


```

Terminal window

```

yarn wrangler ai-search search [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--namespace` ` string ` alias: --n default: default  
The namespace the instance belongs to.
* `--query` ` string ` required  
The search query text.
* `--max-num-results` ` number `  
Override maximum number of results.
* `--score-threshold` ` number `  
Override minimum relevance score (0-1).
* `--reranking` ` boolean `  
Override reranking setting.
* `--filter` ` array `  
Metadata filter as key=value (repeatable, e.g. --filter type=docs --filter lang=en).
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search namespace list`

List all AI Search namespaces

* [  npm ](#tab-panel-6654)
* [  pnpm ](#tab-panel-6655)
* [  yarn ](#tab-panel-6656)

Terminal window

```

npx wrangler ai-search namespace list


```

Terminal window

```

pnpm wrangler ai-search namespace list


```

Terminal window

```

yarn wrangler ai-search namespace list


```

* `--json` ` boolean ` default: false  
Return output as clean JSON
* `--page` ` number ` default: 1  
Page number of the results, can configure page size using "per-page"
* `--per-page` ` number `  
Number of namespaces to show per page
* `--search` ` string `  
Filter namespaces whose name or description contains this string (case-insensitive).

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

## `ai-search namespace create`

Create a new AI Search namespace

* [  npm ](#tab-panel-6657)
* [  pnpm ](#tab-panel-6658)
* [  yarn ](#tab-panel-6659)

Terminal window

```

npx wrangler ai-search namespace create [NAME]


```

Terminal window

```

pnpm wrangler ai-search namespace create [NAME]


```

Terminal window

```

yarn wrangler ai-search namespace create [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search namespace to create.
* `--description` ` string `  
Optional description for the namespace (max 256 chars).
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search namespace get`

Get details of an AI Search namespace

* [  npm ](#tab-panel-6660)
* [  pnpm ](#tab-panel-6661)
* [  yarn ](#tab-panel-6662)

Terminal window

```

npx wrangler ai-search namespace get [NAME]


```

Terminal window

```

pnpm wrangler ai-search namespace get [NAME]


```

Terminal window

```

yarn wrangler ai-search namespace get [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search namespace.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search namespace update`

Update an AI Search namespace

* [  npm ](#tab-panel-6663)
* [  pnpm ](#tab-panel-6664)
* [  yarn ](#tab-panel-6665)

Terminal window

```

npx wrangler ai-search namespace update [NAME]


```

Terminal window

```

pnpm wrangler ai-search namespace update [NAME]


```

Terminal window

```

yarn wrangler ai-search namespace update [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search namespace to update.
* `--description` ` string `  
Updated description for the namespace (max 256 chars).
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search namespace delete`

Delete an AI Search namespace

* [  npm ](#tab-panel-6666)
* [  pnpm ](#tab-panel-6667)
* [  yarn ](#tab-panel-6668)

Terminal window

```

npx wrangler ai-search namespace delete [NAME]


```

Terminal window

```

pnpm wrangler ai-search namespace delete [NAME]


```

Terminal window

```

yarn wrangler ai-search namespace delete [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search namespace to delete.
* `--force` ` boolean ` alias: --y default: false  
Skip confirmation

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare AI Search docs","description":"Manage AI Search instances from the command line using Wrangler.","url":"https://developers.cloudflare.com/ai-search/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/wrangler-commands/","name":"Wrangler commands"}}]}
```
