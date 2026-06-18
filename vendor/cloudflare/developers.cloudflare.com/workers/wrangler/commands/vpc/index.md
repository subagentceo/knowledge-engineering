---
title: VPC
description: Wrangler commands for managing Workers VPC services.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# VPC

Manage [Workers VPC](https://developers.cloudflare.com/workers-vpc/) services using Wrangler. VPC services allow your Workers to connect to private services on your network through Cloudflare Tunnels.

## `vpc service create`

Create a new VPC service

* [  npm ](#tab-panel-12726)
* [  pnpm ](#tab-panel-12727)
* [  yarn ](#tab-panel-12728)

Terminal window

```

npx wrangler vpc service create [NAME]


```

Terminal window

```

pnpm wrangler vpc service create [NAME]


```

Terminal window

```

yarn wrangler vpc service create [NAME]


```

* `[NAME]` ` string ` required  
The name of the VPC service
* `--type` ` string ` required  
The type of the VPC service
* `--tcp-port` ` number `  
TCP port number
* `--app-protocol` ` string `  
Application protocol for the TCP service
* `--http-port` ` number `  
HTTP port (default: 80)
* `--https-port` ` number `  
HTTPS port number (default: 443)
* `--ipv4` ` string `  
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` ` string `  
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` ` string `  
Hostname for the host
* `--resolver-ips` ` string `  
Comma-separated list of resolver IPs
* `--tunnel-id` ` string ` required  
UUID of the Cloudflare tunnel
* `--cert-verification-mode` ` string `  
TLS certificate verification mode for the connection to the origin

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

## `vpc service delete`

Delete a VPC service

* [  npm ](#tab-panel-12729)
* [  pnpm ](#tab-panel-12730)
* [  yarn ](#tab-panel-12731)

Terminal window

```

npx wrangler vpc service delete [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service delete [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service delete [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the service to delete

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

## `vpc service get`

Get a VPC service

* [  npm ](#tab-panel-12732)
* [  pnpm ](#tab-panel-12733)
* [  yarn ](#tab-panel-12734)

Terminal window

```

npx wrangler vpc service get [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service get [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service get [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the VPC service

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

## `vpc service list`

List VPC services

* [  npm ](#tab-panel-12735)
* [  pnpm ](#tab-panel-12736)
* [  yarn ](#tab-panel-12737)

Terminal window

```

npx wrangler vpc service list


```

Terminal window

```

pnpm wrangler vpc service list


```

Terminal window

```

yarn wrangler vpc service list


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

## `vpc service update`

Update a VPC service

* [  npm ](#tab-panel-12738)
* [  pnpm ](#tab-panel-12739)
* [  yarn ](#tab-panel-12740)

Terminal window

```

npx wrangler vpc service update [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service update [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service update [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the VPC service to update
* `--name` ` string ` required  
The name of the VPC service
* `--type` ` string ` required  
The type of the VPC service
* `--tcp-port` ` number `  
TCP port number
* `--app-protocol` ` string `  
Application protocol for the TCP service
* `--http-port` ` number `  
HTTP port (default: 80)
* `--https-port` ` number `  
HTTPS port number (default: 443)
* `--ipv4` ` string `  
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` ` string `  
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` ` string `  
Hostname for the host
* `--resolver-ips` ` string `  
Comma-separated list of resolver IPs
* `--tunnel-id` ` string ` required  
UUID of the Cloudflare tunnel
* `--cert-verification-mode` ` string `  
TLS certificate verification mode for the connection to the origin

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/vpc/#page","headline":"VPC · Cloudflare Workers docs","description":"Wrangler commands for managing Workers VPC services.","url":"https://developers.cloudflare.com/workers/wrangler/commands/vpc/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/vpc/","name":"VPC"}}]}
```
