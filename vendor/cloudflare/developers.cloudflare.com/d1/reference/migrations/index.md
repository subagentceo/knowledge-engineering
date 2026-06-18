---
title: Migrations
description: Version your D1 database schema using SQL migration files that you create, list, and apply with Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrations

Database migrations are a way of versioning your database. Each migration is stored as an `.sql` file in your `migrations` folder. The `migrations` folder is created in your project directory when you create your first migration. This enables you to store and track changes throughout database development.

## Features

Currently, the migrations system aims to be simple yet effective. With the current implementation, you can:

* [Create](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-migrations-create) an empty migration file.
* [List](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-migrations-list) unapplied migrations.
* [Apply](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-migrations-apply) remaining migrations.

Every migration file in the `migrations` folder has a specified version number in the filename. Files are listed in sequential order. Every migration file is an SQL file where you can specify queries to be run.

Binding name vs Database name

When running a migration script, you can use either the binding name or the database name.

However, the binding name can change, whereas the database name cannot. Therefore, to avoid accidentally running migrations on the wrong binding, you may wish to use the database name for D1 migrations.

## Wrangler customizations

By default, migrations are created in the `migrations/` folder in your Worker project directory. Creating migrations will keep a record of applied migrations in the `d1_migrations` table found in your database.

This location and table name can be customized in your Wrangler file, inside the D1 binding.

* [  wrangler.jsonc ](#tab-panel-7911)
* [  wrangler.toml ](#tab-panel-7912)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "<BINDING_NAME>", // i.e. if you set this to "DB", it will be available in your Worker at `env.DB`

      "database_name": "<DATABASE_NAME>",

      "database_id": "<UUID>",

      "preview_database_id": "<UUID>",

      "migrations_table": "<d1_migrations>", // Customize this value to change your applied migrations table name

      "migrations_dir": "<FOLDER_NAME>", // Specify your custom migration directory

      "migrations_pattern": "<GLOB>" // Optional: discover migrations using a glob pattern (see below)

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "<BINDING_NAME>"

database_name = "<DATABASE_NAME>"

database_id = "<UUID>"

preview_database_id = "<UUID>"

migrations_table = "<d1_migrations>"

migrations_dir = "<FOLDER_NAME>"

migrations_pattern = "<GLOB>"


```

## Nested migration layouts

By default, `wrangler d1 migrations apply` looks for top-level `.sql` files inside `migrations_dir`. If you use an ORM such as [Drizzle ↗](https://orm.drizzle.team/) that writes each migration as its own subdirectory (for example, `migrations/0001_init/migration.sql`), set `migrations_pattern` to the glob that matches your layout:

* [  wrangler.jsonc ](#tab-panel-7913)
* [  wrangler.toml ](#tab-panel-7914)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "DB",

      "database_name": "my-database",

      "database_id": "<UUID>",

      "migrations_dir": "migrations",

      "migrations_pattern": "migrations/*/migration.sql"

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "my-database"

database_id = "<UUID>"

migrations_dir = "migrations"

migrations_pattern = "migrations/*/migration.sql"


```

Rules for `migrations_pattern`:

* When set, `migrations_dir` must also be set.
* The pattern must start with whatever `migrations_dir` is set to.
* Each migration's name is recorded in the migrations table as the path relative to `migrations_dir` (for example, `0001_init/migration.sql`). This keeps the table portable across machines.

The pattern is a standard glob — `*` matches one path segment, `**` matches any number of segments. `migrations/**/*.sql` will pick up arbitrarily deep `.sql` files.

`wrangler d1 migrations create` only writes top-level files inside `migrations_dir`, so if your `migrations_pattern` only matches nested files (as with the Drizzle layout), generate new migrations using your ORM's command (for example, `drizzle-kit generate`) instead.

## Foreign key constraints

When applying a migration, you may need to temporarily disable [foreign key constraints](https://developers.cloudflare.com/d1/sql-api/foreign-keys/). To do so, call `PRAGMA defer_foreign_keys = true` before making changes that would violate foreign keys.

Refer to the [foreign key documentation](https://developers.cloudflare.com/d1/sql-api/foreign-keys/) to learn more about how to work with foreign keys and D1.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/reference/migrations/#page","headline":"Migrations · Cloudflare D1 docs","description":"Version your D1 database schema using SQL migration files that you create, list, and apply with Wrangler.","url":"https://developers.cloudflare.com/d1/reference/migrations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/reference/migrations/","name":"Migrations"}}]}
```
