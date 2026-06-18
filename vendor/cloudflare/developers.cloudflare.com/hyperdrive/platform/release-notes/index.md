---
title: Release notes
description: Recent changes and updates to Hyperdrive.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/hyperdrive/platform/release-notes/index.xml)

## 2025-12-04

**Connect to remote databases during local development with wrangler dev**

The `localConnectionString` configuration field and `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` environment variable now support connecting to remote databases over TLS during local development with `wrangler dev`. 

When using a remote database connection string, your Worker code runs locally on your machine while connecting directly to the remote database. Hyperdrive caching does not take effect. 

Refer to [Local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/) for instructions on how to configure remote database connections for local development.

## 2025-07-03

**Hyperdrive now supports configurable connection counts**

Hyperdrive configurations can now be set to use a specific number of connections to your origin database. There is a minimum of 5 connections for all configurations and a maximum according to your [Workers plan](https://developers.cloudflare.com/hyperdrive/platform/limits/).

This limit is a soft maximum. Hyperdrive may make more than this amount of connections in the event of unexpected networking issues in order to ensure high availability and resiliency.

## 2025-05-05

**Hyperdrive improves regional caching for prepared statements for faster cache hits**

Hyperdrive now better caches prepared statements closer to your Workers. This results in up to 5x faster cache hits by reducing the roundtrips needed between your Worker and Hyperdrive's connection pool.

## 2025-03-07

**Hyperdrive connects to your database using Cloudflare's IP address ranges**

Hyperdrive now uses [Cloudflare's IP address ranges](https://www.cloudflare.com/ips/) for egress.

This enables you to configure the firewall policies on your database to allow access to this limited IP address range.

Learn more about [configuring your database networking for Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/).

## 2025-03-07

**Hyperdrive improves connection pool placement, decreasing query latency by up to 90%**

Hyperdrive now pools all database connections in one or more regions as close to your database as possible. This means that your uncached queries and new database connections have up to 90% less latency as measured from Hyperdrive connection pools.

With improved placement for Hyperdrive connection pools, Workers' Smart Placement is more effective by ensuring that your Worker and Hyperdrive database connection pool are placed as close to your database as possible.

See [the announcement](https://developers.cloudflare.com/changelog/2025-03-04-hyperdrive-pooling-near-database-and-ip-range-egress/) for more details.

## 2025-01-28

**Hyperdrive automatically configures your Cloudflare Tunnel to connect to your private database.**

When creating a Hyperdrive configuration for a private database, you only need to provide your database credentials and set up a Cloudflare Tunnel within the private network where your database is accessible.

Hyperdrive will automatically create the Cloudflare Access, Service Token and Policies needed to secure and restrict your Cloudflare Tunnel to the Hyperdrive configuration.

Refer to [documentation on how to configure Hyperdrive to connect to a private database](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/).

## 2024-12-11

**Hyperdrive now caches queries in all Cloudflare locations decreasing cache hit latency by up to 90%**

Hyperdrive query caching now happens in all locations where Hyperdrive can be accessed. When making a query in a location that has cached the query result, your latency may be decreased by up to 90%.

Refer to [documentation on how Hyperdrive caches query results](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/#3-query-caching).

## 2024-11-19

**Hyperdrive now supports clear-text password authentication**

When connecting to a database that requires secure clear-text password authentication over TLS, Hyperdrive will now support this authentication method.

Refer to the documentation to see [all PostgreSQL authentication modes supported by Hyperdrive](https://developers.cloudflare.com/hyperdrive/reference/supported-databases-and-features#supported-postgresql-authentication-modes).

## 2024-10-30

**New Hyperdrive configurations to private databases using Tunnels are validated before creation**

When creating a new Hyperdrive configuration to a private database using Tunnels, Hyperdrive will verify that it can connect to the database to ensure that your Tunnel and Access application have been properly configured. This makes it easier to debug connectivity issues.

Refer to [documentation on connecting to private databases](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/) for more information.

## 2024-09-20

**The \`node-postgres\` (pg) driver is now supported for Pages applications using Hyperdrive.**

The popular `pg` ([node-postgres](https://github.com/brianc/node-postgres) driver no longer requires the legacy `node_compat` mode, and can now be used in both Workers and Pages for connecting to Hyperdrive. This uses the new (improved) Node.js compatibility in Workers and Pages.

You can set [compatibility\_flags = \["nodejs\_compat\_v2"\]](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) in your `wrangler.toml` or via the Pages dashboard to benefit from this change. Visit the [Hyperdrive documentation on supported drivers](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/#supported-drivers) to learn more about the driver versions supported by Hyperdrive.

## 2024-08-19

**Improved caching for Postgres.js**

Hyperdrive now better caches [Postgres.js](https://github.com/porsager/postgres) queries to reduce queries to the origin database.

## 2024-08-13

**Hyperdrive audit logs now available in the Cloudflare Dashboard**

Actions that affect Hyperdrive configs in an account will now appear in the audit logs for that account.

## 2024-05-24

**Increased configuration limits**

You can now create up to 25 Hyperdrive configurations per account, up from the previous maximum of 10.

Refer to [Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) to review the limits that apply to Hyperdrive.

## 2024-05-22

**Driver performance improvements**

Compatibility improvements to how Hyperdrive interoperates with the popular [Postgres.js](https://github.com/porsager/postgres) driver have been released. These improvements allow queries made via Postgres.js to be correctly cached (when enabled) in Hyperdrive.

Developers who had previously set `prepare: false` can remove this configuration when establishing a new Postgres.js client instance.

Read the [documentation on supported drivers](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/#supported-drivers) to learn more about database driver interoperability with Hyperdrive.

## 2024-04-01

**Hyperdrive is now Generally Available**

Hyperdrive is now Generally Available and ready for production applications.

Read the [announcement blog](https://blog.cloudflare.com/making-full-stack-easier-d1-ga-hyperdrive-queues) to learn more about the Hyperdrive and the roadmap, including upcoming support for MySQL databases.

## 2024-03-19

**Improved local development configuration**

Hyperdrive now supports a `WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` environmental variable for configuring local development to use a test/non-production database, in addition to the `localConnectionString` configuration in `wrangler.toml`.

Refer to [Local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/) for instructions on how to configure Hyperdrive locally.

## 2023-09-28

**Hyperdrive now available**

Hyperdrive is now available in public beta to any developer with a Workers Paid plan.

To start using Hyperdrive, visit the [get started](https://developers.cloudflare.com/hyperdrive/get-started/) guide or read the [announcement blog](https://blog.cloudflare.com/hyperdrive-making-regional-databases-feel-distributed/) to learn more.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/hyperdrive/platform/release-notes/#page","headline":"Release notes · Cloudflare Hyperdrive docs","description":"Recent changes and updates to Hyperdrive.","url":"https://developers.cloudflare.com/hyperdrive/platform/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/platform/release-notes/","name":"Release notes"}}]}
```
