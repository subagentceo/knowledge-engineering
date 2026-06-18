---
title: Metadata filter (legacy)
description: Reference for the legacy AutoRAG metadata filter format used with the previous REST API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metadata filter (legacy)

This page documents the filter format used by the legacy AutoRAG REST API. For the new AI Search REST API filter syntax, refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/).

## Comparison filter

Compare a metadata attribute (for example, `folder` or `timestamp`) with a target value:

JavaScript

```

filters: {

  type: "eq",

  key: "folder",

  value: "customer-a/"

}


```

### Operators

| Operator | Description              |
| -------- | ------------------------ |
| eq       | Equals                   |
| ne       | Not equals               |
| gt       | Greater than             |
| gte      | Greater than or equal to |
| lt       | Less than                |
| lte      | Less than or equal to    |

## Compound filter

Combine multiple comparison filters with a logical operator:

JavaScript

```

filters: {

  type: "and",

  filters: [

    { type: "eq", key: "folder", value: "customer-a/" },

    { type: "gte", key: "timestamp", value: "1735689600000" }

  ]

}


```

The available compound operators are `and` and `or`.

### Limitations

* No nested combinations of `and` and `or`. You can only use one compound operator at a time.
* When using `or`, only the `eq` operator is allowed and all conditions must filter on the same key.

## "Starts with" filter for folders

To filter for all files within a folder and its subfolders, use a compound filter with range operators.

For example, consider this file structure:

* customer-a \- profile.md - contracts - property - contract-1.pdf

Using `{ type: "eq", key: "folder", value: "customer-a/" }` only matches files directly in that folder (like `profile.md`), not files in subfolders.

To match all files starting with `customer-a/`, use a compound filter:

JavaScript

```

filters: {

  type: "and",

  filters: [

    { type: "gt", key: "folder", value: "customer-a//" },

    { type: "lte", key: "folder", value: "customer-a/z" }

  ]

}


```

This filter matches all paths starting with `customer-a/` by using:

* `gt` with `customer-a//` to include paths greater than the `/` ASCII character
* `lte` with `customer-a/z` to include paths up to and including the lowercase `z` ASCII character

## Related

* [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) \- New AI Search REST API filter format
* [Migrate from AutoRAG Search API](https://developers.cloudflare.com/ai-search/api/migration/rest-api/) \- Migration guide with before/after examples

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/#page","headline":"Metadata filter (legacy) · Cloudflare AI Search docs","description":"Reference for the legacy AutoRAG metadata filter format used with the previous REST API.","url":"https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/migration/","name":"API Migration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/migration/autorag-filter-format/","name":"Metadata filter (legacy)"}}]}
```
