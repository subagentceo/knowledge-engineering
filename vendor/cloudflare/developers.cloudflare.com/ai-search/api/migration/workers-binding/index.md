---
title: Workers binding migration
description: Upgrade from the legacy env.AI.autorag() binding to the new AI Search Workers bindings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers binding migration

The [env.AI.autorag() binding](https://developers.cloudflare.com/ai-search/api/migration/workers-binding-legacy/) is the legacy API for AI Search. It will continue to work, but all new features and improvements are only available through the new AI Search bindings.

## What changed

Here is a summary of the key differences between the legacy and new bindings:

| Legacy              | New                    |                                                |
| ------------------- | ---------------------- | ---------------------------------------------- |
| **Wrangler config** | ai binding             | ai\_search or ai\_search\_namespaces binding   |
| **Access pattern**  | env.AI.autorag("name") | env.MY\_INSTANCE or env.AI\_SEARCH.get("name") |
| **Search format**   | query string           | messages array or query string                 |
| **Response format** | data array             | chunks array                                   |

## AI Search bindings

AI Search provides two new bindings:

**Instance binding (`ai_search`)** binds directly to a single instance. This is the simplest migration path from `env.AI.autorag()`.

JSONC

```

// wrangler.jsonc

{

  "ai_search": [

    {

      "binding": "MY_SEARCH",

      "instance_name": "my-instance",

    },

  ],

}


```

**Namespace binding (`ai_search_namespaces`)** gives you access to all instances within a namespace. Use this if you need dynamic instance management, cross-instance search, or the Items API.

JSONC

```

// wrangler.jsonc

{

  "ai_search_namespaces": [

    {

      "binding": "AI_SEARCH",

      "namespace": "default",

    },

  ],

}


```

For more details on the difference, refer to [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/).

## Requirements

The new bindings require the following minimum package versions for TypeScript types and local development support.

| Package                   | Minimum version |
| ------------------------- | --------------- |
| @cloudflare/workers-types | 4.20260304.0    |
| wrangler                  | 4.68.1          |

## Step 1: Update Wrangler configuration

Existing instances are in the default namespace. For a simple upgrade path, use the instance binding. For the namespace binding, refer to [AI Search bindings](#ai-search-bindings).

**Before:**

* [  wrangler.jsonc ](#tab-panel-6604)
* [  wrangler.toml ](#tab-panel-6605)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

[ai]

binding = "AI"


```

**After:**

* [  wrangler.jsonc ](#tab-panel-6606)
* [  wrangler.toml ](#tab-panel-6607)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "compatibility_date": "2026-03-27",

  "ai_search": [

    {

      "binding": "MY_INSTANCE",

      "instance_name": "my-instance"

    }

  ]

}


```

TOML

```

compatibility_date = "2026-03-27"


[[ai_search]]

binding = "MY_INSTANCE"

instance_name = "my-instance"


```

## Step 2: Update the type definition

Update the `Env` interface to use the new binding type.

**Before:**

TypeScript

```

export interface Env {

  AI: Ai;

}


```

**After:**

TypeScript

```

export interface Env {

  MY_INSTANCE: AiSearchInstance;

}


```

## Step 3: Update search calls

Replace `env.AI.autorag()` calls with the new binding.

**Before:**

TypeScript

```

const result = await env.AI.autorag("my-instance").search({

  query: "What is Cloudflare?",

});


```

**After:**

TypeScript

```

const result = await env.MY_INSTANCE.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

});


```

## Step 4: Update response handling

The response shape changed from a `data` array to a `chunks` array.

### Field mapping

| Old field                          | New field                 |
| ---------------------------------- | ------------------------- |
| data\[\]                           | chunks\[\]                |
| data\[\].file\_id                  | chunks\[\].id             |
| data\[\].filename                  | chunks\[\].item.key       |
| data\[\].score                     | chunks\[\].score          |
| data\[\].content\[\].text          | chunks\[\].text           |
| data\[\].attributes.modified\_date | chunks\[\].item.timestamp |

## Streaming behavior changes

In the legacy binding, streaming with `env.AI.autorag().aiSearch({ stream: true })` only returned the streamed response without the retrieved chunks.

The new binding sends the retrieved chunks first as a `chunks` event, followed by the streamed response. This allows you to display source chunks immediately while streaming the generated response.

## Filter format changes

The new binding uses Vectorize-style metadata filtering. Filters are now passed inside `ai_search_options.retrieval.filters`.

| Old format | New format        |
| ---------- | ----------------- |
| eq         | $eq (or implicit) |
| ne         | $ne               |
| gt         | $gt               |
| gte        | $gte              |
| lt         | $lt               |
| lte        | $lte              |
| $in (new)  |                   |
| $nin (new) |                   |

### Examples

#### Simple filter

Filter by a single metadata field using implicit equality:

**Before:**

TypeScript

```

const result = await env.AI.autorag("my-instance").search({

  query: "What is Cloudflare?",

  filters: {

    type: "eq",

    key: "folder",

    value: "customer-a/",

  },

});


```

**After:**

TypeScript

```

const result = await env.MY_INSTANCE.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    retrieval: {

      filters: { folder: "customer-a/" },

    },

  },

});


```

#### Compound filter (AND)

Combine multiple conditions where all must match:

**Before:**

TypeScript

```

const result = await env.AI.autorag("my-instance").search({

  query: "What is Cloudflare?",

  filters: {

    type: "and",

    filters: [

      { type: "eq", key: "folder", value: "customer-a/" },

      { type: "gte", key: "timestamp", value: "1735689600000" },

    ],

  },

});


```

**After:**

TypeScript

```

const result = await env.MY_INSTANCE.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    retrieval: {

      filters: {

        folder: "customer-a/",

        timestamp: { $gte: 1735689600 },

      },

    },

  },

});


```

## Backwards compatibility

The `env.AI.autorag()` binding will continue to work indefinitely. You do not need to migrate immediately.

For the legacy API reference, refer to [Workers binding (legacy)](https://developers.cloudflare.com/ai-search/api/migration/workers-binding-legacy/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/migration/workers-binding/#page","headline":"Workers binding migration · Cloudflare AI Search docs","description":"Upgrade from the legacy env.AI.autorag() binding to the new AI Search Workers bindings.","url":"https://developers.cloudflare.com/ai-search/api/migration/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/migration/","name":"API Migration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/migration/workers-binding/","name":"Workers binding migration"}}]}
```
