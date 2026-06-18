---
title: List vectors
description: Enumerate vector identifiers in a Vectorize index using paginated list operations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# List vectors

The list-vectors operation allows you to enumerate all vector identifiers in a Vectorize index using paginated requests. This guide covers best practices for efficiently using this operation.

Python SDK availability

The `client.vectorize.indexes.list_vectors()` method is not yet available in the current release of the [Cloudflare Python SDK ↗](https://pypi.org/project/cloudflare/). While the method appears in the [API reference](https://developers.cloudflare.com/api/python/resources/vectorize/subresources/indexes/methods/list%5Fvectors/), it has not been included in a published SDK version as of v4.3.1\. In the meantime, you can use the [REST API](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/list%5Fvectors/) or the Wrangler CLI to list vectors.

## When to use list-vectors

Use list-vectors for:

* **Bulk operations**: To process all vectors in an index
* **Auditing**: To verify the contents of your index or generate reports
* **Data migration**: To move vectors between indexes or systems
* **Cleanup operations**: To identify and remove outdated vectors

## Pagination behavior

The list-vectors operation uses cursor-based pagination with important consistency guarantees:

### Snapshot consistency

Vector identifiers returned belong to the index snapshot captured at the time of the first list-vectors request. This ensures consistent pagination even when the index is being modified during iteration:

* **New vectors**: Vectors inserted after the initial request will not appear in subsequent paginated results
* **Deleted vectors**: Vectors deleted after the initial request will continue to appear in the remaining responses until pagination is complete

### Starting a new iteration

To see recently added or removed vectors, you must start a new list-vectors request sequence (without a cursor). This captures a fresh snapshot of the index.

### Response structure

Each response includes:

* `count`: Number of vectors returned in this response
* `totalCount`: Total number of vectors in the index
* `isTruncated`: Whether there are more vectors available
* `nextCursor`: Cursor for the next page (null if no more results)
* `cursorExpirationTimestamp`: Timestamp of when the cursor expires
* `vectors`: Array of vector identifiers

### Cursor expiration

Cursors have an expiration timestamp. If a cursor expires, you'll need to start a new list-vectors request sequence to continue pagination.

## Performance considerations

Take care to have sufficient gap between consecutive requests to avoid hitting rate-limits.

## Example workflow

Here's a typical pattern for processing all vectors in an index:

Terminal window

```

# Start iteration

wrangler vectorize list-vectors my-index --count=1000


# Continue with cursor from response

wrangler vectorize list-vectors my-index --count=1000 --cursor="<cursor-from-response>"


# Repeat until no more results


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/best-practices/list-vectors/#page","headline":"List vectors · Cloudflare Vectorize docs","description":"Enumerate vector identifiers in a Vectorize index using paginated list operations.","url":"https://developers.cloudflare.com/vectorize/best-practices/list-vectors/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/best-practices/list-vectors/","name":"List vectors"}}]}
```
