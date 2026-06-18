---
title: Secrets Store
description: Wrangler commands for managing account secrets within a Secrets Store.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secrets Store

Interact with [Secret Store](https://developers.cloudflare.com/secrets-store/) using Wrangler.

## `secrets-store secret`

Use the following commands to manage your account secrets.

`--remote` option

In order to interact with Secrets Store in production, you should append `--remote` to your command. Without it, your command will default to [local development mode](https://developers.cloudflare.com/workers/development-testing/).

### `secrets-store secret create`

Create a secret within a store

* [  npm ](#tab-panel-12657)
* [  pnpm ](#tab-panel-12658)
* [  yarn ](#tab-panel-12659)

Terminal window

```

npx wrangler secrets-store secret create [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret create [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret create [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which the secret resides
* `--name` ` string ` required  
Name of the secret
* `--value` ` string `  
Value of the secret (Note: Only for testing. Not secure as this will leave secret value in plain-text in terminal history, exclude this flag and use automatic prompt instead)
* `--scopes` ` string ` required  
Scopes for the secret (comma-separated list of scopes eg:"workers")
* `--comment` ` string `  
Comment for the secret
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

The following is an example of using the `create` command to create an account-level secret.

Terminal window

```

npx wrangler secrets-store secret create 8f7a1cdced6342c18d223ece462fd88d --name ServiceA_key-1 --scopes workers --remote


```

```

✓ Enter a secret value: › ***


🔐 Creating secret... (Name: ServiceA_key-1, Value: REDACTED, Scopes: workers, Comment: undefined)

✓ Select an account: › My account

✅ Created secret! (ID: 13bc7498c6374a4e9d13be091c3c65f1)


```

### `secrets-store secret update`

Update a secret within a store

* [  npm ](#tab-panel-12660)
* [  pnpm ](#tab-panel-12661)
* [  yarn ](#tab-panel-12662)

Terminal window

```

npx wrangler secrets-store secret update [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret update [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret update [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which the secret resides
* `--secret-id` ` string ` required  
ID of the secret to update
* `--value` ` string `  
Updated value of the secret (Note: Only for testing. Not secure as this will leave secret value in plain-text in terminal history, exclude this flag and use automatic prompt instead)
* `--scopes` ` string `  
Updated scopes for the secret (comma-separated list of scopes eg:"workers")
* `--comment` ` string `  
Updated comment for the secret
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

### `secrets-store secret duplicate`

Duplicate a secret within a store

* [  npm ](#tab-panel-12663)
* [  pnpm ](#tab-panel-12664)
* [  yarn ](#tab-panel-12665)

Terminal window

```

npx wrangler secrets-store secret duplicate [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret duplicate [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret duplicate [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which the secret resides
* `--secret-id` ` string ` required  
ID of the secret to duplicate the secret value of
* `--name` ` string ` required  
Name of the new secret
* `--scopes` ` string ` required  
Scopes for the new secret
* `--comment` ` string `  
Comment for the new secret
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

### `secrets-store secret get`

Get a secret within a store

* [  npm ](#tab-panel-12666)
* [  pnpm ](#tab-panel-12667)
* [  yarn ](#tab-panel-12668)

Terminal window

```

npx wrangler secrets-store secret get [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret get [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret get [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which the secret resides
* `--secret-id` ` string ` required  
ID of the secret to retrieve
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

The following is an example with the expected output:

Terminal window

```

npx wrangler secrets-store secret get 8f7a1cdced6342c18d223ece462fd88d --secret-id 13bc7498c6374a4e9d13be091c3c65f1 --remote


```

```

🔐 Getting secret... (ID: 13bc7498c6374a4e9d13be091c3c65f1)

✓ Select an account: › My account

| Name                        | ID                                  | StoreID                             | Comment | Scopes  | Status  | Created                | Modified               |

|-----------------------------|-------------------------------------|-------------------------------------|---------|---------|---------|------------------------|------------------------|

| ServiceA_key-1          | 13bc7498c6374a4e9d13be091c3c65f1    | 8f7a1cdced6342c18d223ece462fd88d    |         | workers | active  | 4/9/2025, 10:06:01 PM  | 4/15/2025, 09:13:05 AM |


```

### `secrets-store secret delete`

Delete a secret within a store

* [  npm ](#tab-panel-12669)
* [  pnpm ](#tab-panel-12670)
* [  yarn ](#tab-panel-12671)

Terminal window

```

npx wrangler secrets-store secret delete [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret delete [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret delete [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which the secret resides
* `--secret-id` ` string ` required  
ID of the secret to delete
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

### `secrets-store secret list`

List secrets within a store

* [  npm ](#tab-panel-12672)
* [  pnpm ](#tab-panel-12673)
* [  yarn ](#tab-panel-12674)

Terminal window

```

npx wrangler secrets-store secret list [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store secret list [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store secret list [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store in which to list secrets
* `--page` ` number ` default: 1  
Page number of secrets listing results, can configure page size using "per-page"
* `--per-page` ` number ` default: 10  
Number of secrets to show per page
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store
* `--persist-to` ` string `  
Directory for local persistence

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

## `secrets-store store`

Use the following commands to manage your store.

Store limitation

[Secrets Store](https://developers.cloudflare.com/secrets-store/) is in open beta. Currently, you can only have one store per Cloudflare account.

### `secrets-store store create`

Create a store within an account

* [  npm ](#tab-panel-12675)
* [  pnpm ](#tab-panel-12676)
* [  yarn ](#tab-panel-12677)

Terminal window

```

npx wrangler secrets-store store create [NAME]


```

Terminal window

```

pnpm wrangler secrets-store store create [NAME]


```

Terminal window

```

yarn wrangler secrets-store store create [NAME]


```

* `[NAME]` ` string ` required  
Name of the store
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store

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

The following is an example of using the `create` command to create a store.

Terminal window

```

npx wrangler secrets-store store create default --remote


```

```

🔐 Creating store... (Name: default)

✅ Created store! (Name: default, ID: 2e2a82d317134506b58defbe16982d54)


```

### `secrets-store store delete`

Delete a store within an account

* [  npm ](#tab-panel-12678)
* [  pnpm ](#tab-panel-12679)
* [  yarn ](#tab-panel-12680)

Terminal window

```

npx wrangler secrets-store store delete [STORE-ID]


```

Terminal window

```

pnpm wrangler secrets-store store delete [STORE-ID]


```

Terminal window

```

yarn wrangler secrets-store store delete [STORE-ID]


```

* `[STORE-ID]` ` string ` required  
ID of the store
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store

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

The following is an example of using the `delete` command to delete a store.

Terminal window

```

npx wrangler secrets-store store delete d2dafaeac9434de2b6d08b292ce08211 --remote


```

```

🔐 Deleting store... (Name: d2dafaeac9434de2b6d08b292ce08211)

✅ Deleted store! (ID: d2dafaeac9434de2b6d08b292ce08211)


```

### `secrets-store store list`

List stores within an account

* [  npm ](#tab-panel-12681)
* [  pnpm ](#tab-panel-12682)
* [  yarn ](#tab-panel-12683)

Terminal window

```

npx wrangler secrets-store store list


```

Terminal window

```

pnpm wrangler secrets-store store list


```

Terminal window

```

yarn wrangler secrets-store store list


```

* `--page` ` number ` default: 1  
Page number of stores listing results, can configure page size using "per-page"
* `--per-page` ` number ` default: 10  
Number of stores to show per page
* `--remote` ` boolean ` default: false  
Execute command against remote Secrets Store

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

The following is an example of using the `list` command to list stores.

Terminal window

```

npx wrangler secrets-store store list --remote


```

```

🔐 Listing stores...

┌─────────┬──────────────────────────────────┬──────────────────────────────────┬──────────────────────┬──────────────────────┐

│ Name    │ ID                               │ AccountID                        │ Created              │ Modified             │

├─────────┼──────────────────────────────────┼──────────────────────────────────┼──────────────────────┼──────────────────────┤

│ default │ 8876bad33f164462bf0743fe8adf98f4 │ REDACTED │ 4/9/2025, 1:11:48 PM  │ 4/9/2025, 1:11:48 PM │

└─────────┴──────────────────────────────────┴──────────────────────────────────┴──────────────────────┴──────────────────────┘


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#page","headline":"Secrets Store · Cloudflare Workers docs","description":"Wrangler commands for managing account secrets within a Secrets Store.","url":"https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/secrets-store/","name":"Secrets Store"}}]}
```
