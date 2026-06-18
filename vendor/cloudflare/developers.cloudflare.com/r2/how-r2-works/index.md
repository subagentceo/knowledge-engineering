---
title: How R2 works
description: Find out how R2 works.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How R2 works

Cloudflare R2 is an S3-compatible object storage service with no egress fees, built on Cloudflare's global network. It is [strongly consistent](https://developers.cloudflare.com/r2/reference/consistency/) and designed for high [data durability](https://developers.cloudflare.com/r2/reference/durability/).

R2 is ideal for storing and serving unstructured data that needs to be accessed frequently over the internet, without incurring egress fees. It's a good fit for workloads like serving web assets, training AI models, and managing user-generated content.

## Architecture

R2's architecture is composed of multiple components:

* **R2 Gateway:** The entry point for all API requests that handles authentication and routing logic. This service is deployed across Cloudflare's global network via [Cloudflare Workers](https://developers.cloudflare.com/workers/).
* **Metadata Service:** A distributed layer built on [Durable Objects](https://developers.cloudflare.com/durable-objects/) used to store and manage object metadata (e.g. object key, checksum) to ensure strong consistency of the object across the storage system. It includes a built-in cache layer to speed up access to metadata.
* **Tiered Read Cache:** A caching layer that sits in front of the Distributed Storage Infrastructure that speeds up object reads by using [Cloudflare Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) to serve data closer to the client.
* **Distributed Storage Infrastructure:** The underlying infrastructure that persistently stores encrypted object data.
![R2 Architecture](https://developers.cloudflare.com/_astro/r2-architecture.Dy9p3k5k_Z11a4Y9.webp) 

R2 supports multiple client interfaces including [Cloudflare Workers Binding](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/), [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/), and a [REST API](https://developers.cloudflare.com/api/resources/r2/) that powers the Cloudflare Dashboard and Wrangler CLI. All requests are routed through the R2 Gateway, which coordinates with the Metadata Service and Distributed Storage Infrastructure to retrieve the object data.

## Write data to R2

When a write request (e.g. uploading an object) is made to R2, the following sequence occurs:

1. **Request handling:** The request is received by the R2 Gateway at the edge, close to the user, where it is authenticated.
2. **Encryption and routing:** The Gateway reaches out to the Metadata Service to retrieve the [encryption key](https://developers.cloudflare.com/r2/reference/data-security/) and determines which storage cluster to write the encrypted data to within the [location](https://developers.cloudflare.com/r2/reference/data-location/) set for the bucket.
3. **Writing to storage:** The encrypted data is written and stored in the distributed storage infrastructure, and replicated within the region (e.g. ENAM) for [durability](https://developers.cloudflare.com/r2/reference/durability/).
4. **Metadata commit:** Finally, the Metadata Service commits the object's metadata, making it visible in subsequent reads. Only after this commit is an `HTTP 200` success response sent to the client, preventing unacknowledged writes.
![Write data to R2](https://developers.cloudflare.com/_astro/write-data-to-r2.xjc-CtiT_2nmkKJ.webp) 

## Read data from R2

When a read request (e.g. fetching an object) is made to R2, the following sequence occurs:

1. **Request handling:** The request is received by the R2 Gateway at the edge, close to the user, where it is authenticated.
2. **Metadata lookup:** The Gateway asks the Metadata Service for the object metadata.
3. **Reading the object:** The Gateway attempts to retrieve the [encrypted](https://developers.cloudflare.com/r2/reference/data-security/) object from the tiered read cache. If it's not available, it retrieves the object from one of the distributed storage data centers within the region that holds the object data.
4. **Serving to client:** The object is decrypted and served to the user.
![Read data to R2](https://developers.cloudflare.com/_astro/read-data-to-r2.BZGeLX6u_ZMf46t.webp) 

## Performance

The performance of your operations can be influenced by factors such as the bucket's geographical location, request origin, and access patterns.

To optimize upload performance for cross-region requests, enable [Local Uploads](https://developers.cloudflare.com/r2/buckets/local-uploads/) on your bucket.

To optimize read performance, enable [Cloudflare Cache](https://developers.cloudflare.com/cache/) when using a [custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains). When caching is enabled, read requests can bypass the R2 Gateway and be served directly from Cloudflare's edge cache, reducing latency. Note that cached data may not reflect the latest version immediately.

![Read data to R2 with Cloudflare Cache](https://developers.cloudflare.com/_astro/read-data-to-r2-with-cloudflare-cache.KDavWPCJ_ZTtQXk.webp) 

## Learn more

[ Consistency ](https://developers.cloudflare.com/r2/reference/consistency/) Learn about R2's consistency model. 

[ Durability ](https://developers.cloudflare.com/r2/reference/durability/) Learn more about R2's durability guarantee. 

[  Data location ](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) Learn how R2 determines where data is stored, and details on jurisdiction restrictions. 

[ Data security ](https://developers.cloudflare.com/r2/reference/data-security/) Learn about R2's data security properties. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/how-r2-works/#page","headline":"How R2 works · Cloudflare R2 docs","description":"Find out how R2 works.","url":"https://developers.cloudflare.com/r2/how-r2-works/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/how-r2-works/","name":"How R2 works"}}]}
```
