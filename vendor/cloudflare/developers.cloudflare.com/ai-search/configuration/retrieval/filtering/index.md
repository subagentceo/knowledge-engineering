---
title: Filtering
description: Filter AI Search results by metadata attributes at query time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Filtering

Metadata filtering narrows down search results based on metadata, so only relevant content is retrieved. The filter is applied before retrieval, so you only query the documents that matter.

Filtering uses the metadata attributes extracted during indexing. To define custom attributes or use the built-in metadata attributes, refer to [Metadata attributes](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/).

Note

If you are using the legacy AutoRAG API, refer to [Metadata filter format (legacy)](https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/) for the filter syntax.

Here is an example of metadata filtering using the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/):

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    retrieval: {

      filters: {

        folder: "docs/getting-started/",

        timestamp: { $gte: 1735689600 },

      },

    },

  },

});


```

## Filter syntax

Filters are JSON objects where keys are metadata attribute names and values specify the filter condition.

### Supported operators

| Operator | Description                       |
| -------- | --------------------------------- |
| $eq      | Equals                            |
| $ne      | Not equals                        |
| $in      | In (matches any value in array)   |
| $nin     | Not in (excludes values in array) |
| $lt      | Less than                         |
| $lte     | Less than or equal to             |
| $gt      | Greater than                      |
| $gte     | Greater than or equal to          |

### Implicit `$eq`

When you provide a direct value without an operator, it is treated as an equality check:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": "docs/getting-started/" }

    }

  }

}


```

This is equivalent to:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": { "$eq": "docs/getting-started/" } }

    }

  }

}


```

### Range queries

Combine upper and lower bound operators to filter by ranges:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "timestamp": { "$gte": 1735689600, "$lt": 1735900000 } }

    }

  }

}


```

### Multiple conditions (implicit AND)

When you specify multiple keys, all conditions must match:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": {

        "folder": "docs/getting-started/",

        "timestamp": { "$gte": 1735689600 }

      }

    }

  }

}


```

### `$in` operator

Match any value in an array:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": { "$in": ["docs/guides/", "docs/tutorials/"] } }

    }

  }

}


```

## "Starts with" filter for folders

Use range queries to filter for all files within a folder and its subfolders.

For example, consider this file structure:

* Directorydocs  
   * guide.pdf  
   * Directorytutorials  
         * Directorygetting-started  
                  * intro.pdf

Using `{ "folder": "docs/" }` only matches files directly in that folder (like `guide.pdf`), not files in subfolders.

To match all files starting with `docs/`, use a range query:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": { "$gte": "docs/", "$lt": "docs0" } }

    }

  }

}


```

This works because:

* `$gte` includes all paths starting with `docs/`
* `$lt` with `docs0` excludes paths that do not start with `docs/` (since `0` comes after `/` in ASCII)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/#page","headline":"Filtering · Cloudflare AI Search docs","description":"Filter AI Search results by metadata attributes at query time.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/retrieval/","name":"Retrieval"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/retrieval/filtering/","name":"Filtering"}}]}
```
