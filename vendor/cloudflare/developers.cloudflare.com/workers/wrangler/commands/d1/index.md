---
title: D1
description: Wrangler commands for interacting with Cloudflare D1.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# D1

Interact with [D1 databases](https://developers.cloudflare.com/d1/) service using Wrangler.

## `d1 create`

Creates a new D1 database, and provides the binding and UUID that you will put in your config file

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-12293)
* [  pnpm ](#tab-panel-12294)
* [  yarn ](#tab-panel-12295)

Terminal window

```

npx wrangler d1 create [NAME]


```

Terminal window

```

pnpm wrangler d1 create [NAME]


```

Terminal window

```

yarn wrangler d1 create [NAME]


```

* `[NAME]` ` string ` required  
The name of the new D1 database
* `--location` ` string `  
A hint for the primary location of the new DB. Options: weur: Western Europe eeur: Eastern Europe apac: Asia Pacific oc: Oceania wnam: Western North America enam: Eastern North America
* `--jurisdiction` ` string `  
The location to restrict the D1 database to run and store data within to comply with local regulations. Note that if jurisdictions are set, the location hint is ignored. Options: eu: The European Union fedramp: FedRAMP-compliant data centers
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

## `d1 info`

Get information about a D1 database, including the current database size and state

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-12296)
* [  pnpm ](#tab-panel-12297)
* [  yarn ](#tab-panel-12298)

Terminal window

```

npx wrangler d1 info [NAME]


```

Terminal window

```

pnpm wrangler d1 info [NAME]


```

Terminal window

```

yarn wrangler d1 info [NAME]


```

* `[NAME]` ` string ` required  
The name of the DB
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

## `d1 list`

List all D1 databases in your account

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-12299)
* [  pnpm ](#tab-panel-12300)
* [  yarn ](#tab-panel-12301)

Terminal window

```

npx wrangler d1 list


```

Terminal window

```

pnpm wrangler d1 list


```

Terminal window

```

yarn wrangler d1 list


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

## `d1 delete`

Delete a D1 database

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-12302)
* [  pnpm ](#tab-panel-12303)
* [  yarn ](#tab-panel-12304)

Terminal window

```

npx wrangler d1 delete [NAME]


```

Terminal window

```

pnpm wrangler d1 delete [NAME]


```

Terminal window

```

yarn wrangler d1 delete [NAME]


```

* `[NAME]` ` string ` required  
The name or binding of the DB
* `--skip-confirmation` ` boolean ` alias: --y default: false  
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

## `d1 execute`

Execute a command or SQL file

You must provide either --command or --file for this command to run successfully.

* [  npm ](#tab-panel-12305)
* [  pnpm ](#tab-panel-12306)
* [  yarn ](#tab-panel-12307)

Terminal window

```

npx wrangler d1 execute [DATABASE]


```

Terminal window

```

pnpm wrangler d1 execute [DATABASE]


```

Terminal window

```

yarn wrangler d1 execute [DATABASE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `--command` ` string `  
The SQL query you wish to execute, or multiple queries separated by ';'
* `--file` ` string `  
A .sql file to ingest
* `--yes` ` boolean ` alias: --y  
Answer "yes" to any prompts
* `--local` ` boolean `  
Execute commands/files against a local DB for use with wrangler dev
* `--remote` ` boolean `  
Execute commands/files against a remote D1 database for use with remote bindings or your deployed Worker
* `--persist-to` ` string `  
Specify directory to use for local persistence (for use with --local)
* `--json` ` boolean ` default: false  
Return output as JSON
* `--preview` ` boolean ` default: false  
Execute commands/files against a preview D1 database

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

## `d1 export`

Export the contents or schema of your database as a .sql file

* [  npm ](#tab-panel-12308)
* [  pnpm ](#tab-panel-12309)
* [  yarn ](#tab-panel-12310)

Terminal window

```

npx wrangler d1 export [NAME]


```

Terminal window

```

pnpm wrangler d1 export [NAME]


```

Terminal window

```

yarn wrangler d1 export [NAME]


```

* `[NAME]` ` string ` required  
The name of the D1 database to export
* `--local` ` boolean `  
Export from your local DB you use with wrangler dev
* `--remote` ` boolean `  
Export from a remote D1 database
* `--skip-confirmation` ` boolean ` alias: --y default: false  
Skip confirmation
* `--output` ` string ` required  
Path to the SQL file for your export
* `--table` ` string `  
Specify which tables to include in export
* `--no-schema` ` boolean `  
Only output table contents, not the DB schema
* `--no-data` ` boolean `  
Only output table schema, not the contents of the DBs themselves

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

## `d1 time-travel info`

Retrieve information about a database at a specific point-in-time using Time Travel

This command acts on remote D1 Databases.

For more information about Time Travel, see <https://developers.cloudflare.com/d1/reference/time-travel/>

* [  npm ](#tab-panel-12311)
* [  pnpm ](#tab-panel-12312)
* [  yarn ](#tab-panel-12313)

Terminal window

```

npx wrangler d1 time-travel info [DATABASE]


```

Terminal window

```

pnpm wrangler d1 time-travel info [DATABASE]


```

Terminal window

```

yarn wrangler d1 time-travel info [DATABASE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `--timestamp` ` string `  
Accepts a Unix (seconds from epoch) or RFC3339 timestamp (e.g. 2023-07-13T08:46:42.228Z) to retrieve a bookmark for
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

## `d1 time-travel restore`

Restore a database back to a specific point-in-time

This command acts on remote D1 Databases.

For more information about Time Travel, see <https://developers.cloudflare.com/d1/reference/time-travel/>

* [  npm ](#tab-panel-12314)
* [  pnpm ](#tab-panel-12315)
* [  yarn ](#tab-panel-12316)

Terminal window

```

npx wrangler d1 time-travel restore [DATABASE]


```

Terminal window

```

pnpm wrangler d1 time-travel restore [DATABASE]


```

Terminal window

```

yarn wrangler d1 time-travel restore [DATABASE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `--bookmark` ` string `  
Bookmark to use for time travel
* `--timestamp` ` string `  
Accepts a Unix (seconds from epoch) or RFC3339 timestamp (e.g. 2023-07-13T08:46:42.228Z) to retrieve a bookmark for (within the last 30 days)
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

## `d1 migrations create`

Create a new migration

This will generate a new versioned file inside the 'migrations' folder. Name your migration file as a description of your change. This will make it easier for you to find your migration in the 'migrations' folder. An example filename looks like:

```
0000_create_user_table.sql

```

The filename will include a version number and the migration name you specify.

* [  npm ](#tab-panel-12317)
* [  pnpm ](#tab-panel-12318)
* [  yarn ](#tab-panel-12319)

Terminal window

```

npx wrangler d1 migrations create [DATABASE] [MESSAGE]


```

Terminal window

```

pnpm wrangler d1 migrations create [DATABASE] [MESSAGE]


```

Terminal window

```

yarn wrangler d1 migrations create [DATABASE] [MESSAGE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `[MESSAGE]` ` string ` required  
The Migration message

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

## `d1 migrations list`

View a list of unapplied migration files

* [  npm ](#tab-panel-12320)
* [  pnpm ](#tab-panel-12321)
* [  yarn ](#tab-panel-12322)

Terminal window

```

npx wrangler d1 migrations list [DATABASE]


```

Terminal window

```

pnpm wrangler d1 migrations list [DATABASE]


```

Terminal window

```

yarn wrangler d1 migrations list [DATABASE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `--local` ` boolean `  
Check migrations against a local DB for use with wrangler dev
* `--remote` ` boolean `  
Check migrations against a remote DB for use with wrangler dev --remote
* `--preview` ` boolean ` default: false  
Check migrations against a preview D1 DB
* `--persist-to` ` string `  
Specify directory to use for local persistence (you must use --local with this flag)

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

## `d1 migrations apply`

Apply any unapplied D1 migrations

This command will prompt you to confirm the migrations you are about to apply. Confirm that you would like to proceed. After applying, a backup will be captured.

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-interactive command line, the confirmation step will be skipped, but the backup will still be captured.

If applying a migration results in an error, this migration will be rolled back, and the previous successful migration will remain applied.

* [  npm ](#tab-panel-12323)
* [  pnpm ](#tab-panel-12324)
* [  yarn ](#tab-panel-12325)

Terminal window

```

npx wrangler d1 migrations apply [DATABASE]


```

Terminal window

```

pnpm wrangler d1 migrations apply [DATABASE]


```

Terminal window

```

yarn wrangler d1 migrations apply [DATABASE]


```

* `[DATABASE]` ` string ` required  
The name or binding of the DB
* `--local` ` boolean `  
Execute commands/files against a local DB for use with wrangler dev
* `--remote` ` boolean `  
Execute commands/files against a remote DB for use with wrangler dev --remote
* `--preview` ` boolean ` default: false  
Execute commands/files against a preview D1 DB
* `--persist-to` ` string `  
Specify directory to use for local persistence (you must use --local with this flag)

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

## `d1 insights`

  
Experimental 

Get information about the queries run on a D1 database

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-12326)
* [  pnpm ](#tab-panel-12327)
* [  yarn ](#tab-panel-12328)

Terminal window

```

npx wrangler d1 insights [NAME]


```

Terminal window

```

pnpm wrangler d1 insights [NAME]


```

Terminal window

```

yarn wrangler d1 insights [NAME]


```

* `[NAME]` ` string ` required  
The name of the DB
* `--time-period` ` string ` default: 1d  
Fetch data from now to the provided time period
* `--sort-type` ` string ` default: sum  
Choose the operation you want to sort insights by
* `--sort-by` ` string ` default: time  
Choose the field you want to sort insights by
* `--sort-direction` ` string ` default: DESC  
Choose a sort direction
* `--limit` ` number ` default: 5  
fetch insights about the first X queries
* `--json` ` boolean ` default: false  
return output as JSON

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/d1/#page","headline":"D1 · Cloudflare Workers docs","description":"Wrangler commands for interacting with Cloudflare D1.","url":"https://developers.cloudflare.com/workers/wrangler/commands/d1/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/d1/","name":"D1"}}]}
```
