---
title: Wrangler commands
description: Wrangler CLI commands for creating and managing Hyperdrive configurations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

The following [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/) apply to Hyperdrive.

## `hyperdrive create`

Create a Hyperdrive config

* [  npm ](#tab-panel-8823)
* [  pnpm ](#tab-panel-8824)
* [  yarn ](#tab-panel-8825)

Terminal window

```

npx wrangler hyperdrive create [NAME]


```

Terminal window

```

pnpm wrangler hyperdrive create [NAME]


```

Terminal window

```

yarn wrangler hyperdrive create [NAME]


```

* `[NAME]` ` string ` required  
The name of the Hyperdrive config
* `--connection-string` ` string `  
The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database
* `--service-id` ` string `  
The Workers VPC Service ID of the origin database
* `--origin-host` ` string ` alias: --host  
The host of the origin database
* `--origin-port` ` number ` alias: --port  
The port number of the origin database
* `--origin-scheme` ` string ` alias: --scheme default: postgresql  
The scheme used to connect to the origin database
* `--database` ` string `  
The name of the database within the origin database
* `--origin-user` ` string ` alias: --user  
The username used to connect to the origin database
* `--origin-password` ` string ` alias: --password  
The password used to connect to the origin database
* `--access-client-id` ` string `  
The Client ID of the Access token to use when connecting to the origin database
* `--access-client-secret` ` string `  
The Client Secret of the Access token to use when connecting to the origin database
* `--caching-disabled` ` boolean `  
Disables the caching of SQL responses
* `--max-age` ` number `  
Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled
* `--swr` ` number `  
Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled
* `--ca-certificate-id` ` string ` alias: --ca-certificate-uuid  
Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate.
* `--mtls-certificate-id` ` string ` alias: --mtls-certificate-uuid  
Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates.
* `--sslmode` ` string `  
Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY\_CA, VERIFY\_IDENTITY'.
* `--origin-connection-limit` ` number `  
The (soft) maximum number of connections that Hyperdrive may establish to the origin database
* `--binding` ` string `  
The binding name of this resource in your Worker
* `--update-config` ` boolean `  
Automatically update your config file with the newly added resource

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

## `hyperdrive delete`

Delete a Hyperdrive config

* [  npm ](#tab-panel-8826)
* [  pnpm ](#tab-panel-8827)
* [  yarn ](#tab-panel-8828)

Terminal window

```

npx wrangler hyperdrive delete [ID]


```

Terminal window

```

pnpm wrangler hyperdrive delete [ID]


```

Terminal window

```

yarn wrangler hyperdrive delete [ID]


```

* `[ID]` ` string ` required  
The ID of the Hyperdrive config

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

## `hyperdrive get`

Get a Hyperdrive config

* [  npm ](#tab-panel-8829)
* [  pnpm ](#tab-panel-8830)
* [  yarn ](#tab-panel-8831)

Terminal window

```

npx wrangler hyperdrive get [ID]


```

Terminal window

```

pnpm wrangler hyperdrive get [ID]


```

Terminal window

```

yarn wrangler hyperdrive get [ID]


```

* `[ID]` ` string ` required  
The ID of the Hyperdrive config

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

## `hyperdrive list`

List Hyperdrive configs

* [  npm ](#tab-panel-8832)
* [  pnpm ](#tab-panel-8833)
* [  yarn ](#tab-panel-8834)

Terminal window

```

npx wrangler hyperdrive list


```

Terminal window

```

pnpm wrangler hyperdrive list


```

Terminal window

```

yarn wrangler hyperdrive list


```

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

## `hyperdrive update`

Update a Hyperdrive config

* [  npm ](#tab-panel-8835)
* [  pnpm ](#tab-panel-8836)
* [  yarn ](#tab-panel-8837)

Terminal window

```

npx wrangler hyperdrive update [ID]


```

Terminal window

```

pnpm wrangler hyperdrive update [ID]


```

Terminal window

```

yarn wrangler hyperdrive update [ID]


```

* `[ID]` ` string ` required  
The ID of the Hyperdrive config
* `--name` ` string `  
Give your config a new name
* `--connection-string` ` string `  
The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database
* `--service-id` ` string `  
The Workers VPC Service ID of the origin database
* `--origin-host` ` string ` alias: --host  
The host of the origin database
* `--origin-port` ` number ` alias: --port  
The port number of the origin database
* `--origin-scheme` ` string ` alias: --scheme  
The scheme used to connect to the origin database
* `--database` ` string `  
The name of the database within the origin database
* `--origin-user` ` string ` alias: --user  
The username used to connect to the origin database
* `--origin-password` ` string ` alias: --password  
The password used to connect to the origin database
* `--access-client-id` ` string `  
The Client ID of the Access token to use when connecting to the origin database
* `--access-client-secret` ` string `  
The Client Secret of the Access token to use when connecting to the origin database
* `--caching-disabled` ` boolean `  
Disables the caching of SQL responses
* `--max-age` ` number `  
Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled
* `--swr` ` number `  
Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled
* `--ca-certificate-id` ` string ` alias: --ca-certificate-uuid  
Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate.
* `--mtls-certificate-id` ` string ` alias: --mtls-certificate-uuid  
Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates.
* `--sslmode` ` string `  
Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY\_CA, VERIFY\_IDENTITY'.
* `--origin-connection-limit` ` number `  
The (soft) maximum number of connections that Hyperdrive may establish to the origin database

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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Hyperdrive docs","description":"Wrangler CLI commands for creating and managing Hyperdrive configurations.","url":"https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
