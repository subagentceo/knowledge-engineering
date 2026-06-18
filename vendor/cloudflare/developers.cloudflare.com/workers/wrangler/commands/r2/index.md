---
title: R2
description: Wrangler commands for managing Workers R2 buckets and objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2

Manage your [R2](https://developers.cloudflare.com/r2/) configurations using Wrangler.

## `r2 bucket`

Interact with buckets in an R2 store.

Note

The `r2 bucket` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [the R2 API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

### `r2 bucket create`

Create a new R2 bucket

* [  npm ](#tab-panel-12537)
* [  pnpm ](#tab-panel-12538)
* [  yarn ](#tab-panel-12539)

Terminal window

```

npx wrangler r2 bucket create [NAME]


```

Terminal window

```

pnpm wrangler r2 bucket create [NAME]


```

Terminal window

```

yarn wrangler r2 bucket create [NAME]


```

* `[NAME]` ` string ` required  
The name of the new bucket
* `--location` ` string `  
The optional location hint that determines geographic placement of the R2 bucket
* `--storage-class` ` string ` alias: --s  
The default storage class for objects uploaded to this bucket
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the new bucket will be created
* `--use-remote` ` boolean `  
Use a remote binding when adding the newly created resource to your config
* `--update-config` ` boolean `  
Automatically update your config file with the newly added resource
* `--binding` ` string `  
The binding name of this resource in your Worker

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

### `r2 bucket info`

Get information about an R2 bucket

* [  npm ](#tab-panel-12540)
* [  pnpm ](#tab-panel-12541)
* [  yarn ](#tab-panel-12542)

Terminal window

```

npx wrangler r2 bucket info [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket info [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket info [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the bucket to retrieve info for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
* `--json` ` boolean ` default: false  
Return the bucket information as JSON

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

### `r2 bucket delete`

Delete an R2 bucket

* [  npm ](#tab-panel-12543)
* [  pnpm ](#tab-panel-12544)
* [  yarn ](#tab-panel-12545)

Terminal window

```

npx wrangler r2 bucket delete [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket delete [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket delete [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the bucket to delete
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket list`

List R2 buckets

* [  npm ](#tab-panel-12546)
* [  pnpm ](#tab-panel-12547)
* [  yarn ](#tab-panel-12548)

Terminal window

```

npx wrangler r2 bucket list


```

Terminal window

```

pnpm wrangler r2 bucket list


```

Terminal window

```

yarn wrangler r2 bucket list


```

* `--jurisdiction` ` string ` alias: --J  
The jurisdiction to list

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

### `r2 bucket catalog enable`

Enable the data catalog on an R2 bucket

* [  npm ](#tab-panel-12549)
* [  pnpm ](#tab-panel-12550)
* [  yarn ](#tab-panel-12551)

Terminal window

```

npx wrangler r2 bucket catalog enable [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket catalog enable [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket catalog enable [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the bucket to enable

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

### `r2 bucket catalog disable`

Disable the data catalog for an R2 bucket

* [  npm ](#tab-panel-12552)
* [  pnpm ](#tab-panel-12553)
* [  yarn ](#tab-panel-12554)

Terminal window

```

npx wrangler r2 bucket catalog disable [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket catalog disable [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket catalog disable [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the bucket to disable the data catalog for

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

### `r2 bucket catalog get`

Get the status of the data catalog for an R2 bucket

* [  npm ](#tab-panel-12555)
* [  pnpm ](#tab-panel-12556)
* [  yarn ](#tab-panel-12557)

Terminal window

```

npx wrangler r2 bucket catalog get [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket catalog get [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket catalog get [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket whose data catalog status to retrieve

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

### `r2 bucket catalog compaction enable`

Enable automatic file compaction for your R2 data catalog or a specific table

* [  npm ](#tab-panel-12558)
* [  pnpm ](#tab-panel-12559)
* [  yarn ](#tab-panel-12560)

Terminal window

```

npx wrangler r2 bucket catalog compaction enable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

pnpm wrangler r2 bucket catalog compaction enable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

yarn wrangler r2 bucket catalog compaction enable [BUCKET] [NAMESPACE] [TABLE]


```

* `[BUCKET]` ` string ` required  
The name of the bucket which contains the catalog
* `[NAMESPACE]` ` string `  
The namespace containing the table (optional, for table-level compaction)
* `[TABLE]` ` string `  
The name of the table (optional, for table-level compaction)
* `--target-size` ` number ` default: 128  
The target size for compacted files in MB (allowed values: 64, 128, 256, 512)
* `--token` ` string `  
A cloudflare api token with access to R2 and R2 Data Catalog (required for catalog-level compaction settings only)

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

Examples:

Terminal window

```

# Enable catalog-level compaction (requires token)

npx wrangler r2 bucket catalog compaction enable my-bucket --token <TOKEN>


# Enable table-level compaction

npx wrangler r2 bucket catalog compaction enable my-bucket my-namespace my-table --target-size 256


```

### `r2 bucket catalog compaction disable`

Disable automatic file compaction for your R2 data catalog or a specific table

* [  npm ](#tab-panel-12561)
* [  pnpm ](#tab-panel-12562)
* [  yarn ](#tab-panel-12563)

Terminal window

```

npx wrangler r2 bucket catalog compaction disable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

pnpm wrangler r2 bucket catalog compaction disable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

yarn wrangler r2 bucket catalog compaction disable [BUCKET] [NAMESPACE] [TABLE]


```

* `[BUCKET]` ` string ` required  
The name of the bucket which contains the catalog
* `[NAMESPACE]` ` string `  
The namespace containing the table (optional, for table-level compaction)
* `[TABLE]` ` string `  
The name of the table (optional, for table-level compaction)

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

Examples:

Terminal window

```

# Disable catalog-level compaction

npx wrangler r2 bucket catalog compaction disable my-bucket


# Disable table-level compaction

npx wrangler r2 bucket catalog compaction disable my-bucket my-namespace my-table


```

### `r2 bucket catalog snapshot-expiration enable`

Enable automatic snapshot expiration for your R2 data catalog or a specific table

* [  npm ](#tab-panel-12564)
* [  pnpm ](#tab-panel-12565)
* [  yarn ](#tab-panel-12566)

Terminal window

```

npx wrangler r2 bucket catalog snapshot-expiration enable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

pnpm wrangler r2 bucket catalog snapshot-expiration enable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

yarn wrangler r2 bucket catalog snapshot-expiration enable [BUCKET] [NAMESPACE] [TABLE]


```

* `[BUCKET]` ` string ` required  
The name of the bucket which contains the catalog
* `[NAMESPACE]` ` string `  
The namespace containing the table (optional, for table-level snapshot expiration)
* `[TABLE]` ` string `  
The name of the table (optional, for table-level snapshot expiration)
* `--older-than-days` ` number `  
Delete snapshots older than this many days, defaults to 30
* `--retain-last` ` number `  
The minimum number of snapshots to retain, defaults to 5
* `--token` ` string `  
A cloudflare api token with access to R2 and R2 Data Catalog (required for catalog-level snapshot expiration settings only)

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

### `r2 bucket catalog snapshot-expiration disable`

Disable automatic snapshot expiration for your R2 data catalog or a specific table

* [  npm ](#tab-panel-12567)
* [  pnpm ](#tab-panel-12568)
* [  yarn ](#tab-panel-12569)

Terminal window

```

npx wrangler r2 bucket catalog snapshot-expiration disable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

pnpm wrangler r2 bucket catalog snapshot-expiration disable [BUCKET] [NAMESPACE] [TABLE]


```

Terminal window

```

yarn wrangler r2 bucket catalog snapshot-expiration disable [BUCKET] [NAMESPACE] [TABLE]


```

* `[BUCKET]` ` string ` required  
The name of the bucket which contains the catalog
* `[NAMESPACE]` ` string `  
The namespace containing the table (optional, for table-level snapshot expiration)
* `[TABLE]` ` string `  
The name of the table (optional, for table-level snapshot expiration)
* `--force` ` boolean ` default: false  
Skip confirmation prompt

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

### `r2 bucket cors set`

Set the CORS configuration for an R2 bucket from a JSON file

* [  npm ](#tab-panel-12570)
* [  pnpm ](#tab-panel-12571)
* [  yarn ](#tab-panel-12572)

Terminal window

```

npx wrangler r2 bucket cors set [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket cors set [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket cors set [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to set the CORS configuration for
* `--file` ` string ` required  
Path to the JSON file containing the CORS configuration
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket cors delete`

Clear the CORS configuration for an R2 bucket

* [  npm ](#tab-panel-12573)
* [  pnpm ](#tab-panel-12574)
* [  yarn ](#tab-panel-12575)

Terminal window

```

npx wrangler r2 bucket cors delete [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket cors delete [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket cors delete [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to delete the CORS configuration for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket cors list`

List the CORS rules for an R2 bucket

* [  npm ](#tab-panel-12576)
* [  pnpm ](#tab-panel-12577)
* [  yarn ](#tab-panel-12578)

Terminal window

```

npx wrangler r2 bucket cors list [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket cors list [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket cors list [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to list the CORS rules for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket dev-url enable`

Enable public access via the r2.dev URL for an R2 bucket

* [  npm ](#tab-panel-12579)
* [  pnpm ](#tab-panel-12580)
* [  yarn ](#tab-panel-12581)

Terminal window

```

npx wrangler r2 bucket dev-url enable [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket dev-url enable [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket dev-url enable [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to enable public access via its r2.dev URL
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket dev-url disable`

Disable public access via the r2.dev URL for an R2 bucket

* [  npm ](#tab-panel-12582)
* [  pnpm ](#tab-panel-12583)
* [  yarn ](#tab-panel-12584)

Terminal window

```

npx wrangler r2 bucket dev-url disable [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket dev-url disable [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket dev-url disable [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to disable public access via its r2.dev URL
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket dev-url get`

Get the r2.dev URL and status for an R2 bucket

* [  npm ](#tab-panel-12585)
* [  pnpm ](#tab-panel-12586)
* [  yarn ](#tab-panel-12587)

Terminal window

```

npx wrangler r2 bucket dev-url get [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket dev-url get [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket dev-url get [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket whose r2.dev URL status to retrieve
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket domain add`

Connect a custom domain to an R2 bucket

* [  npm ](#tab-panel-12588)
* [  pnpm ](#tab-panel-12589)
* [  yarn ](#tab-panel-12590)

Terminal window

```

npx wrangler r2 bucket domain add [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket domain add [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket domain add [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to connect a custom domain to
* `--domain` ` string ` required  
The custom domain to connect to the R2 bucket
* `--zone-id` ` string ` required  
The zone ID associated with the custom domain
* `--min-tls` ` string `  
Set the minimum TLS version for the custom domain (defaults to 1.0 if not set)
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket domain remove`

Remove a custom domain from an R2 bucket

* [  npm ](#tab-panel-12591)
* [  pnpm ](#tab-panel-12592)
* [  yarn ](#tab-panel-12593)

Terminal window

```

npx wrangler r2 bucket domain remove [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket domain remove [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket domain remove [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to remove the custom domain from
* `--domain` ` string ` required  
The custom domain to remove from the R2 bucket
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket domain update`

Update settings for a custom domain connected to an R2 bucket

* [  npm ](#tab-panel-12594)
* [  pnpm ](#tab-panel-12595)
* [  yarn ](#tab-panel-12596)

Terminal window

```

npx wrangler r2 bucket domain update [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket domain update [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket domain update [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket associated with the custom domain to update
* `--domain` ` string ` required  
The custom domain whose settings will be updated
* `--min-tls` ` string `  
Update the minimum TLS version for the custom domain
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket domain get`

Get custom domain connected to an R2 bucket

* [  npm ](#tab-panel-12597)
* [  pnpm ](#tab-panel-12598)
* [  yarn ](#tab-panel-12599)

Terminal window

```

npx wrangler r2 bucket domain get [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket domain get [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket domain get [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket whose custom domain to retrieve
* `--domain` ` string ` required  
The custom domain to get information for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket domain list`

List custom domains for an R2 bucket

* [  npm ](#tab-panel-12600)
* [  pnpm ](#tab-panel-12601)
* [  yarn ](#tab-panel-12602)

Terminal window

```

npx wrangler r2 bucket domain list [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket domain list [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket domain list [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket whose connected custom domains will be listed
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket lifecycle add`

Add a lifecycle rule to an R2 bucket

* [  npm ](#tab-panel-12603)
* [  pnpm ](#tab-panel-12604)
* [  yarn ](#tab-panel-12605)

Terminal window

```

npx wrangler r2 bucket lifecycle add [BUCKET] [NAME] [PREFIX]


```

Terminal window

```

pnpm wrangler r2 bucket lifecycle add [BUCKET] [NAME] [PREFIX]


```

Terminal window

```

yarn wrangler r2 bucket lifecycle add [BUCKET] [NAME] [PREFIX]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to add a lifecycle rule to
* `[NAME]` ` string ` alias: --id  
A unique name for the lifecycle rule, used to identify and manage it.
* `[PREFIX]` ` string `  
Prefix condition for the lifecycle rule (leave empty for all prefixes)
* `--expire-days` ` number `  
Number of days after which objects expire
* `--expire-date` ` string `  
Date after which objects expire (YYYY-MM-DD)
* `--ia-transition-days` ` number `  
Number of days after which objects transition to Infrequent Access storage
* `--ia-transition-date` ` string `  
Date after which objects transition to Infrequent Access storage (YYYY-MM-DD)
* `--abort-multipart-days` ` number `  
Number of days after which incomplete multipart uploads are aborted
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
* `--force` ` boolean ` alias: --y default: false  
Skip confirmation and data catalog validation prompt

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

### `r2 bucket lifecycle remove`

Remove a lifecycle rule from an R2 bucket

* [  npm ](#tab-panel-12606)
* [  pnpm ](#tab-panel-12607)
* [  yarn ](#tab-panel-12608)

Terminal window

```

npx wrangler r2 bucket lifecycle remove [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lifecycle remove [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lifecycle remove [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to remove a lifecycle rule from
* `--name` ` string ` alias: --id required  
The unique name of the lifecycle rule to remove
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket lifecycle list`

List lifecycle rules for an R2 bucket

* [  npm ](#tab-panel-12609)
* [  pnpm ](#tab-panel-12610)
* [  yarn ](#tab-panel-12611)

Terminal window

```

npx wrangler r2 bucket lifecycle list [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lifecycle list [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lifecycle list [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to list lifecycle rules for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket lifecycle set`

Set the lifecycle configuration for an R2 bucket from a JSON file

* [  npm ](#tab-panel-12612)
* [  pnpm ](#tab-panel-12613)
* [  yarn ](#tab-panel-12614)

Terminal window

```

npx wrangler r2 bucket lifecycle set [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lifecycle set [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lifecycle set [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to set lifecycle configuration for
* `--file` ` string ` required  
Path to the JSON file containing lifecycle configuration
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
* `--force` ` boolean ` alias: --y default: false  
Skip confirmation and data catalog validation prompt

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

### `r2 bucket lock add`

Add a lock rule to an R2 bucket

* [  npm ](#tab-panel-12615)
* [  pnpm ](#tab-panel-12616)
* [  yarn ](#tab-panel-12617)

Terminal window

```

npx wrangler r2 bucket lock add [BUCKET] [NAME] [PREFIX]


```

Terminal window

```

pnpm wrangler r2 bucket lock add [BUCKET] [NAME] [PREFIX]


```

Terminal window

```

yarn wrangler r2 bucket lock add [BUCKET] [NAME] [PREFIX]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to add a bucket lock rule to
* `[NAME]` ` string ` alias: --id  
A unique name for the bucket lock rule, used to identify and manage it.
* `[PREFIX]` ` string `  
Prefix condition for the bucket lock rule (set to "" for all prefixes)
* `--retention-days` ` number `  
Number of days which objects will be retained for
* `--retention-date` ` string `  
Date after which objects will be retained until (YYYY-MM-DD)
* `--retention-indefinite` ` boolean `  
Retain objects indefinitely
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket lock remove`

Remove a bucket lock rule from an R2 bucket

* [  npm ](#tab-panel-12618)
* [  pnpm ](#tab-panel-12619)
* [  yarn ](#tab-panel-12620)

Terminal window

```

npx wrangler r2 bucket lock remove [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lock remove [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lock remove [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to remove a bucket lock rule from
* `--name` ` string ` alias: --id required  
The unique name of the bucket lock rule to remove
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket lock list`

List lock rules for an R2 bucket

* [  npm ](#tab-panel-12621)
* [  pnpm ](#tab-panel-12622)
* [  yarn ](#tab-panel-12623)

Terminal window

```

npx wrangler r2 bucket lock list [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lock list [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lock list [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to list lock rules for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket lock set`

Set the lock configuration for an R2 bucket from a JSON file

* [  npm ](#tab-panel-12624)
* [  pnpm ](#tab-panel-12625)
* [  yarn ](#tab-panel-12626)

Terminal window

```

npx wrangler r2 bucket lock set [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket lock set [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket lock set [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to set lock configuration for
* `--file` ` string ` required  
Path to the JSON file containing lock configuration
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
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

### `r2 bucket notification create`

Create an event notification rule for an R2 bucket

* [  npm ](#tab-panel-12627)
* [  pnpm ](#tab-panel-12628)
* [  yarn ](#tab-panel-12629)

Terminal window

```

npx wrangler r2 bucket notification create [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket notification create [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket notification create [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to create an event notification rule for
* `--event-types` ` "object-create" | "object-delete" ` alias: --event-type required  
The type of event(s) that will emit event notifications
* `--prefix` ` string `  
The prefix that an object must match to emit event notifications (note: regular expressions not supported)
* `--suffix` ` string `  
The suffix that an object must match to emit event notifications (note: regular expressions not supported)
* `--queue` ` string ` required  
The name of the queue that will receive event notification messages
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
* `--description` ` string `  
A description that can be used to identify the event notification rule after creation

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

### `r2 bucket notification delete`

Delete an event notification rule from an R2 bucket

* [  npm ](#tab-panel-12630)
* [  pnpm ](#tab-panel-12631)
* [  yarn ](#tab-panel-12632)

Terminal window

```

npx wrangler r2 bucket notification delete [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket notification delete [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket notification delete [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to delete an event notification rule for
* `--queue` ` string ` required  
The name of the queue that corresponds to the event notification rule. If no rule is provided, all event notification rules associated with the bucket and queue will be deleted
* `--rule` ` string `  
The ID of the event notification rule to delete
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket notification list`

List event notification rules for an R2 bucket

* [  npm ](#tab-panel-12633)
* [  pnpm ](#tab-panel-12634)
* [  yarn ](#tab-panel-12635)

Terminal window

```

npx wrangler r2 bucket notification list [BUCKET]


```

Terminal window

```

pnpm wrangler r2 bucket notification list [BUCKET]


```

Terminal window

```

yarn wrangler r2 bucket notification list [BUCKET]


```

* `[BUCKET]` ` string ` required  
The name of the R2 bucket to get event notification rules for
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket sippy enable`

Enable Sippy on an R2 bucket

* [  npm ](#tab-panel-12636)
* [  pnpm ](#tab-panel-12637)
* [  yarn ](#tab-panel-12638)

Terminal window

```

npx wrangler r2 bucket sippy enable [NAME]


```

Terminal window

```

pnpm wrangler r2 bucket sippy enable [NAME]


```

Terminal window

```

yarn wrangler r2 bucket sippy enable [NAME]


```

* `[NAME]` ` string ` required  
The name of the bucket
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists
* `--provider` ` "AWS" | "GCS" `
* `--bucket` ` string `  
The name of the upstream bucket
* `--region` ` string `  
(AWS provider only) The region of the upstream bucket
* `--access-key-id` ` string `  
(AWS provider only) The secret access key id for the upstream bucket
* `--secret-access-key` ` string `  
(AWS provider only) The secret access key for the upstream bucket
* `--service-account-key-file` ` string `  
(GCS provider only) The path to your Google Cloud service account key JSON file
* `--client-email` ` string `  
(GCS provider only) The client email for your Google Cloud service account key
* `--private-key` ` string `  
(GCS provider only) The private key for your Google Cloud service account key
* `--r2-access-key-id` ` string `  
The secret access key id for this R2 bucket
* `--r2-secret-access-key` ` string `  
The secret access key for this R2 bucket

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

### `r2 bucket sippy disable`

Disable Sippy on an R2 bucket

* [  npm ](#tab-panel-12639)
* [  pnpm ](#tab-panel-12640)
* [  yarn ](#tab-panel-12641)

Terminal window

```

npx wrangler r2 bucket sippy disable [NAME]


```

Terminal window

```

pnpm wrangler r2 bucket sippy disable [NAME]


```

Terminal window

```

yarn wrangler r2 bucket sippy disable [NAME]


```

* `[NAME]` ` string ` required  
The name of the bucket
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

### `r2 bucket sippy get`

Check the status of Sippy on an R2 bucket

* [  npm ](#tab-panel-12642)
* [  pnpm ](#tab-panel-12643)
* [  yarn ](#tab-panel-12644)

Terminal window

```

npx wrangler r2 bucket sippy get [NAME]


```

Terminal window

```

pnpm wrangler r2 bucket sippy get [NAME]


```

Terminal window

```

yarn wrangler r2 bucket sippy get [NAME]


```

* `[NAME]` ` string ` required  
The name of the bucket
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the bucket exists

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

## `r2 object`

Interact with R2 objects.

Note

The `r2 object` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [the R2 API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

### `r2 object get`

Fetch an object from an R2 bucket

* [  npm ](#tab-panel-12645)
* [  pnpm ](#tab-panel-12646)
* [  yarn ](#tab-panel-12647)

Terminal window

```

npx wrangler r2 object get [OBJECTPATH]


```

Terminal window

```

pnpm wrangler r2 object get [OBJECTPATH]


```

Terminal window

```

yarn wrangler r2 object get [OBJECTPATH]


```

* `[OBJECTPATH]` ` string ` required  
The source object path in the form of {bucket}/{key}
* `--file` ` string ` alias: --f  
The destination file to create
* `--pipe` ` boolean ` alias: --p  
Enables the file to be piped to a destination, rather than specified with the --file option
* `--local` ` boolean `  
Interact with local storage
* `--remote` ` boolean `  
Interact with remote storage
* `--persist-to` ` string `  
Directory for local persistence
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the object exists

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

### `r2 object put`

Create an object in an R2 bucket

* [  npm ](#tab-panel-12648)
* [  pnpm ](#tab-panel-12649)
* [  yarn ](#tab-panel-12650)

Terminal window

```

npx wrangler r2 object put [OBJECTPATH]


```

Terminal window

```

pnpm wrangler r2 object put [OBJECTPATH]


```

Terminal window

```

yarn wrangler r2 object put [OBJECTPATH]


```

* `[OBJECTPATH]` ` string ` required  
The destination object path in the form of {bucket}/{key}
* `--content-type` ` string ` alias: --ct  
A standard MIME type describing the format of the object data
* `--content-disposition` ` string ` alias: --cd  
Specifies presentational information for the object
* `--content-encoding` ` string ` alias: --ce  
Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field
* `--content-language` ` string ` alias: --cl  
The language the content is in
* `--cache-control` ` string ` alias: --cc  
Specifies caching behavior along the request/reply chain
* `--expires` ` string `  
The date and time at which the object is no longer cacheable
* `--local` ` boolean `  
Interact with local storage
* `--remote` ` boolean `  
Interact with remote storage
* `--persist-to` ` string `  
Directory for local persistence
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the object will be created
* `--storage-class` ` string ` alias: --s  
The storage class of the object to be created
* `--force` ` boolean ` alias: --y default: false  
Skip data catalog validation prompt
* `--file` ` string ` alias: --f  
The path of the file to upload
* `--pipe` ` boolean ` alias: --p  
Enables the file to be piped in, rather than specified with the --file option

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

### `r2 object delete`

Delete an object in an R2 bucket

* [  npm ](#tab-panel-12651)
* [  pnpm ](#tab-panel-12652)
* [  yarn ](#tab-panel-12653)

Terminal window

```

npx wrangler r2 object delete [OBJECTPATH]


```

Terminal window

```

pnpm wrangler r2 object delete [OBJECTPATH]


```

Terminal window

```

yarn wrangler r2 object delete [OBJECTPATH]


```

* `[OBJECTPATH]` ` string ` required  
The destination object path in the form of {bucket}/{key}
* `--local` ` boolean `  
Interact with local storage
* `--remote` ` boolean `  
Interact with remote storage
* `--persist-to` ` string `  
Directory for local persistence
* `--jurisdiction` ` string ` alias: --J  
The jurisdiction where the object exists
* `--force` ` boolean ` alias: --y default: false  
Skip data catalog validation prompt

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

## R2 SQL

Note

R2 SQL is currently in open beta. Report R2 SQL bugs in [GitHub ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose). R2 SQL expects there to be a [WRANGLER\_R2\_SQL\_AUTH\_TOKEN](https://developers.cloudflare.com/r2-sql/query-data/#authentication) environment variable to be set.

### `r2 sql query`

Execute SQL query against R2 Data Catalog

* [  npm ](#tab-panel-12654)
* [  pnpm ](#tab-panel-12655)
* [  yarn ](#tab-panel-12656)

Terminal window

```

npx wrangler r2 sql query [WAREHOUSE] [QUERY]


```

Terminal window

```

pnpm wrangler r2 sql query [WAREHOUSE] [QUERY]


```

Terminal window

```

yarn wrangler r2 sql query [WAREHOUSE] [QUERY]


```

* `[WAREHOUSE]` ` string ` required  
R2 Data Catalog warehouse name
* `[QUERY]` ` string ` required  
The SQL query to execute

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/r2/#page","headline":"R2 · Cloudflare Workers docs","description":"Wrangler commands for managing Workers R2 buckets and objects.","url":"https://developers.cloudflare.com/workers/wrangler/commands/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/r2/","name":"R2"}}]}
```
