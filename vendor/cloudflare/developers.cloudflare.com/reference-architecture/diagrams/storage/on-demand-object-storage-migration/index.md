---
title: On-demand Object Storage Data Migration
description: Use Cloudflare migration tools to migrate data between cloud object storage providers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# On-demand Object Storage Data Migration

**Last reviewed:**  almost 2 years ago 

## Introduction

Migrating data between cloud object storage providers can be challenging and expensive. You need to ensure no objects are missed, especially when new data is coming in during your migration. Additionally, there may be a significant one-time data transfer fee to consider.

In order to address these challenges, Cloudflare has created two migration tools: [Sippy](https://developers.cloudflare.com/r2/data-migration/sippy/) and [Super Slurper](https://developers.cloudflare.com/r2/data-migration/super-slurper/). Sippy is an on-demand data migration service, and it is the primary focus of this reference architecture diagram. On the other hand, Super Slurper is designed for large-scale, one-time migrations to Cloudflare's global object storage service, [R2](https://developers.cloudflare.com/r2/). Moving all your data at once may not work for your scenario, so Sippy can help with that.

Sippy enables you to transfer data from other cloud providers to Cloudflare R2 as the data is requested. This workflow is ideal for situations where you want to avoid large upfront data transfer bills and selectively migrate data as it's accessed.

Migration-specific egress fees incurred when using other vendors cloud storage are reduced by leveraging requests within the flow of your application where you would already be paying egress fees to copy objects to R2 simultaneously.

Use Sippy to migrate your commonly accessed data objects and immediately start saving on egress fees. Then, use Super Sluper to migrate any remaining data.

Here's how Sippy works: it will first attempt to retrieve an object from R2 storage. If the object is not in R2, it will retrieve the object from your source cloud object storage. At the same time, it will add the object to R2 for future access, ensuring a seamless and efficient data migration process.

## On-demand Object Storage Data Migration with Sippy

![Figure 1: R2 On-demand Object Storage Data Migration with Sippy](https://developers.cloudflare.com/_astro/sippy-migration-diagram.CTGKS9AD_Z206LEl.svg "Figure 1: On-demand Object Storage Data Migration with Sippy")

Figure 1: On-demand Object Storage Data Migration with Sippy

1. The client requests an object from R2 using[ Workers ↗](https://developers.cloudflare.com/r2/api/workers/),[ S3 API ↗](https://developers.cloudflare.com/r2/api/s3/), or[ public bucket ↗](https://developers.cloudflare.com/r2/buckets/public-buckets/).
2. If the object is found in your R2 bucket it is served to the client.
3. If the object is not found in R2, the object will simultaneously be returned from your source storage bucket and copied to R2\. Note: Some large objects may take multiple requests to copy to R2 because they are copied over as multipart uploads. From the client’s perspective they will still get the file they are requesting.

After objects are copied, subsequent requests will be served from R2 and you’ll begin saving on egress fees immediately.

## Related Resources

* [Sippy Documentation](https://developers.cloudflare.com/r2/data-migration/sippy/)
* [Super Slurper Documentation](https://developers.cloudflare.com/r2/data-migration/super-slurper/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/on-demand-object-storage-migration/#page","headline":"On-demand Object Storage Data Migration · Cloudflare Reference Architecture docs","description":"Use Cloudflare migration tools to migrate data between cloud object storage providers.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/on-demand-object-storage-migration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/storage/","name":"Storage"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/storage/on-demand-object-storage-migration/","name":"On-demand Object Storage Data Migration"}}]}
```
