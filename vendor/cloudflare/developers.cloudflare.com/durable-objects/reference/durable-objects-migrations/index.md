---
title: Durable Objects migrations
description: Configure Wrangler migrations to create, rename, delete, or transfer Durable Object classes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Objects migrations

A migration is a mapping process from a class name to a runtime state. This process communicates the changes to the Workers runtime and provides the runtime with instructions on how to deal with those changes.

To apply a migration, you need to:

1. Edit your Wrangler configuration file, as explained below.
2. Re-deploy your Worker using `npx wrangler deploy`.

You must initiate a migration process when you:

* Create a new Durable Object class.
* Rename a Durable Object class.
* Delete a Durable Object class.
* Transfer an existing Durable Objects class.

Note

Updating the code for an existing Durable Object class does not require a migration. To update the code for an existing Durable Object class, run [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy). This is true even for changes to how the code interacts with persistent storage. Because of [global uniqueness](https://developers.cloudflare.com/durable-objects/platform/known-issues/#global-uniqueness), you do not have to be concerned about old and new code interacting with the same storage simultaneously. However, it is your responsibility to ensure that the new code is backwards compatible with existing stored data.

## Create migration

The most common migration performed is a new class migration, which informs the runtime that a new Durable Object class is being uploaded. This is also the migration you need when creating your first Durable Object class.

To apply a Create migration:

1. Add the following lines to your Wrangler configuration file:  
   * [  wrangler.jsonc ](#tab-panel-8387)  
   * [  wrangler.toml ](#tab-panel-8388)  
JSONC  
```  
{  
  "migrations": [  
    {  
      "tag": "<v1>", // Migration identifier. This should be unique for each migration entry  
      "new_sqlite_classes": [ // Array of new classes  
        "<NewDurableObjectClass>"  
      ]  
    }  
  ]  
}  
```  
TOML  
```  
[[migrations]]  
tag = "<v1>"  
new_sqlite_classes = [ "<NewDurableObjectClass>" ]  
```  
The Create migration contains:  
   * A `tag` to identify the migration.  
   * The array `new_sqlite_classes`, which contains the new Durable Object class.
2. Ensure you reference the correct name of the Durable Object class in your Worker code.
3. Deploy the Worker.

Create migration example

To create a new Durable Object binding `DURABLE_OBJECT_A`, your Wrangler configuration file should look like the following:

* [  wrangler.jsonc ](#tab-panel-8393)
* [  wrangler.toml ](#tab-panel-8394)

JSONC

```

{

  // Creating a new Durable Object class

  "durable_objects": {

    "bindings": [

      {

        "name": "DURABLE_OBJECT_A",

        "class_name": "DurableObjectAClass"

      }

    ]

  },

  // Add the lines below for a Create migration.

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "DurableObjectAClass"

      ]

    }

  ]

}


```

TOML

```

[[durable_objects.bindings]]

name = "DURABLE_OBJECT_A"

class_name = "DurableObjectAClass"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "DurableObjectAClass" ]


```

### Create Durable Object class with key-value storage

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#synchronous-kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offer Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Use `new_classes` on the migration in your Worker's Wrangler file to create a Durable Object class with the key-value storage backend:

* [  wrangler.jsonc ](#tab-panel-8389)
* [  wrangler.toml ](#tab-panel-8390)

JSONC

```

{

  "migrations": [

    {

      "tag": "v1", // Should be unique for each entry

      "new_classes": [

        // Array of new classes

        "MyDurableObject",

      ],

    },

  ],

}


```

TOML

```

[[migrations]]

tag = "v1"

new_classes = [ "MyDurableObject" ]


```

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-migration) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

## Delete migration

Running a Delete migration will delete all Durable Objects associated with the deleted class, including all of their stored data.

* Do not run a Delete migration on a class without first ensuring that you are not relying on the Durable Objects within that Worker anymore, that is, first remove the binding from the Worker.
* Copy any important data to some other location before deleting.
* You do not have to run a Delete migration on a class that was renamed or transferred.

To apply a Delete migration:

1. Remove the binding for the class you wish to delete from the Wrangler configuration file.
2. Remove references for the class you wish to delete from your Worker code.
3. Add the following lines to your Wrangler configuration file.  
   * [  wrangler.jsonc ](#tab-panel-8391)  
   * [  wrangler.toml ](#tab-panel-8392)  
JSONC  
```  
{  
  "migrations": [  
    {  
      "tag": "<v2>", // Migration identifier. This should be unique for each migration entry  
      "deleted_classes": [ // Array of deleted class names  
        "<ClassToDelete>"  
      ]  
    }  
  ]  
}  
```  
TOML  
```  
[[migrations]]  
tag = "<v2>"  
deleted_classes = [ "<ClassToDelete>" ]  
```  
The Delete migration contains:  
   * A `tag` to identify the migration.  
   * The array `deleted_classes`, which contains the deleted Durable Object classes.
4. Deploy the Worker.

Delete migration example

To delete a Durable Object binding `DEPRECATED_OBJECT`, your Wrangler configuration file should look like the following:

* [  wrangler.jsonc ](#tab-panel-8395)
* [  wrangler.toml ](#tab-panel-8396)

JSONC

```

{

  // Remove the binding for the DeprecatedObjectClass DO

  // {"durable_objects": {"bindings": [

  //   {

  //     "name": "DEPRECATED_OBJECT",

  //     "class_name": "DeprecatedObjectClass"

  //   }

  // ]}}

  "migrations": [

    {

      "tag": "v3", // Should be unique for each entry

      "deleted_classes": [ // Array of deleted classes

        "DeprecatedObjectClass"

      ]

    }

  ]

}


```

TOML

```

[[migrations]]

tag = "v3"

deleted_classes = [ "DeprecatedObjectClass" ]


```

## Rename migration

Rename migrations are used to transfer stored Durable Objects between two Durable Object classes in the same Worker code file.

To apply a Rename migration:

1. Update the previous class name to the new class name by editing your Wrangler configuration file in the following way:  
   * [  wrangler.jsonc ](#tab-panel-8397)  
   * [  wrangler.toml ](#tab-panel-8398)  
JSONC  
```  
{  
  "durable_objects": {  
    "bindings": [  
      {  
        "name": "<MY_DURABLE_OBJECT>",  
        "class_name": "<UpdatedDurableObject>" // Update the class name to the new class name  
      }  
    ]  
  },  
  "migrations": [  
    {  
      "tag": "<v3>", // Migration identifier. This should be unique for each migration entry  
      "renamed_classes": [ // Array of rename directives  
        {  
          "from": "<OldDurableObject>",  
          "to": "<UpdatedDurableObject>"  
        }  
      ]  
    }  
  ]  
}  
```  
TOML  
```  
[[durable_objects.bindings]]  
name = "<MY_DURABLE_OBJECT>"  
class_name = "<UpdatedDurableObject>"  
[[migrations]]  
tag = "<v3>"  
  [[migrations.renamed_classes]]  
  from = "<OldDurableObject>"  
  to = "<UpdatedDurableObject>"  
```  
The Rename migration contains:  
   * A `tag` to identify the migration.  
   * The `renamed_classes` array, which contains objects with `from` and `to` properties.  
         * `from` property is the old Durable Object class name.  
         * `to` property is the renamed Durable Object class name.
2. Reference the new Durable Object class name in your Worker code.
3. Deploy the Worker.

Rename migration example

To rename a Durable Object class, from `OldName` to `UpdatedName`, your Wrangler configuration file should look like the following:

* [  wrangler.jsonc ](#tab-panel-8399)
* [  wrangler.toml ](#tab-panel-8400)

JSONC

```

{

  // Before deleting the `DeprecatedClass` remove the binding for the `DeprecatedClass`.

  // Update the binding for the `DurableObjectExample` to the new class name `UpdatedName`.

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_DURABLE_OBJECT",

        "class_name": "UpdatedName"

      }

    ]

  },

  // Renaming classes

  "migrations": [

    {

      "tag": "v3",

      "renamed_classes": [ // Array of rename directives

        {

          "from": "OldName",

          "to": "UpdatedName"

        }

      ]

    }

  ]

}


```

TOML

```

[[durable_objects.bindings]]

name = "MY_DURABLE_OBJECT"

class_name = "UpdatedName"


[[migrations]]

tag = "v3"


  [[migrations.renamed_classes]]

  from = "OldName"

  to = "UpdatedName"


```

## Transfer migration

Transfer migrations are used to transfer stored Durable Objects between two Durable Object classes in different Worker code files.

If you want to transfer stored Durable Objects between two Durable Object classes in the same Worker code file, use [Rename migrations](#rename-migration) instead.

Note

Do not run a [Create migration](#create-migration) for the destination class before running a Transfer migration. The Transfer migration will create the destination class for you.

To apply a Transfer migration:

1. Edit your Wrangler configuration file in the following way:  
   * [  wrangler.jsonc ](#tab-panel-8401)  
   * [  wrangler.toml ](#tab-panel-8402)  
JSONC  
```  
{  
  "durable_objects": {  
    "bindings": [  
      {  
        "name": "<MY_DURABLE_OBJECT>",  
        "class_name": "<DestinationDurableObjectClass>"  
      }  
    ]  
  },  
  "migrations": [  
    {  
      "tag": "<v4>", // Migration identifier. This should be unique for each migration entry  
      "transferred_classes": [  
        {  
          "from": "<SourceDurableObjectClass>",  
          "from_script": "<SourceWorkerScript>",  
          "to": "<DestinationDurableObjectClass>"  
        }  
      ]  
    }  
  ]  
}  
```  
TOML  
```  
[[durable_objects.bindings]]  
name = "<MY_DURABLE_OBJECT>"  
class_name = "<DestinationDurableObjectClass>"  
[[migrations]]  
tag = "<v4>"  
  [[migrations.transferred_classes]]  
  from = "<SourceDurableObjectClass>"  
  from_script = "<SourceWorkerScript>"  
  to = "<DestinationDurableObjectClass>"  
```  
The Transfer migration contains:  
   * A `tag` to identify the migration.  
   * The `transferred_class` array, which contains objects with `from`, `from_script`, and `to` properties.  
         * `from` property is the name of the source Durable Object class.  
         * `from_script` property is the name of the source Worker script.  
         * `to` property is the name of the destination Durable Object class.
2. Ensure you reference the name of the new, destination Durable Object class in your Worker code.
3. Deploy the Worker.

Transfer migration example

You can transfer stored Durable Objects from `DurableObjectExample` to `TransferredClass` from a Worker script named `OldWorkerScript`. The configuration of the Wrangler configuration file for your new Worker code (destination Worker code) would look like this:

* [  wrangler.jsonc ](#tab-panel-8403)
* [  wrangler.toml ](#tab-panel-8404)

JSONC

```

{

  // destination worker

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_DURABLE_OBJECT",

        "class_name": "TransferredClass"

      }

    ]

  },

  // Transferring class

  "migrations": [

    {

      "tag": "v4",

      "transferred_classes": [

        {

          "from": "DurableObjectExample",

          "from_script": "OldWorkerScript",

          "to": "TransferredClass"

        }

      ]

    }

  ]

}


```

TOML

```

[[durable_objects.bindings]]

name = "MY_DURABLE_OBJECT"

class_name = "TransferredClass"


[[migrations]]

tag = "v4"


  [[migrations.transferred_classes]]

  from = "DurableObjectExample"

  from_script = "OldWorkerScript"

  to = "TransferredClass"


```

## Migration Wrangler configuration

* Migrations are performed through the `[[migrations]]` configurations key in your `wrangler.toml` file or `migration` key in your `wrangler.jsonc` file.
* Migrations require a migration tag, which is defined by the `tag` property in each migration entry.
* Migration tags are treated like unique names and are used to determine which migrations have already been applied. Once a given Worker code has a migration tag set on it, all future Worker code deployments must include a migration tag.
* The migration list is an ordered array of tables, specified as a key in your Wrangler configuration file.
* You can define the migration for each environment, as well as at the top level.  
   * Top-level migration is specified at the top-level `migrations` key in the Wrangler configuration file.  
   * Environment-level migration is specified by a `migrations` key inside the `env` key of the Wrangler configuration file (`[env.<environment_name>.migrations]`).  
         * Example Wrangler file:  
   wrangler.jsonc  
   ```  
   {  
   // top-level default migrations  
   "migrations": [{ ... }],  
   "env": {  
   "staging": {  
     // migration override for staging  
     "migrations": [{...}]  
     }  
    }  
   }  
   ```  
   * If a migration is only specified at the top-level, but not at the environment-level, the environment will inherit the top-level migration.  
   * Migrations at at the environment-level override migrations at the top level.
* All migrations are applied at deployment. Each migration can only be applied once per [environment](https://developers.cloudflare.com/durable-objects/reference/environments/).
* Each migration in the list can have multiple directives, and multiple migrations can be specified as your project grows in complexity.

Important

* The destination class (the class that stored Durable Objects are being transferred to) for a Rename or Transfer migration must be exported by the deployed Worker.
* You should not create the destination Durable Object class before running a Rename or Transfer migration. The migration will create the destination class for you.
* After a Rename or Transfer migration, requests to the destination Durable Object class will have access to the source Durable Object's stored data.
* After a migration, any existing bindings to the original Durable Object class (for example, from other Workers) will automatically forward to the updated destination class. However, any Workers bound to the updated Durable Object class must update their Durable Object binding configuration in the `wrangler` configuration file for their next deployment.

Note

Note that `.toml` files do not allow line breaks in inline tables (the `{key = "value"}` syntax), but line breaks in the surrounding inline array are acceptable.

You cannot enable a SQLite storage backend on an existing, deployed Durable Object class, so setting `new_sqlite_classes` on later migrations will fail with an error. Automatic migration of deployed classes from their key-value storage backend to SQLite storage backend will be available in the future.

Important

Durable Object migrations are atomic operations and cannot be gradually deployed. To provide early feedback to developers, new Worker versions with new migrations cannot be uploaded. Refer to [Gradual deployments for Durable Objects](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/#gradual-deployments-for-durable-objects) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#page","headline":"Durable Objects migrations · Cloudflare Durable Objects docs","description":"Configure Wrangler migrations to create, rename, delete, or transfer Durable Object classes.","url":"https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/reference/durable-objects-migrations/","name":"Durable Objects migrations"}}]}
```
