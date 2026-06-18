---
title: Durability
description: R2 is designed for 99.999999999% annual durability using replication and erasure coding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durability

R2 is designed to provide 99.999999999% (eleven 9s) of annual durability. This means that if you store 10,000,000 objects on R2, you can expect to lose an object once every 10,000 years on average.

## How R2 achieves eleven-nines durability

R2's durability is built on multiple layers of redundancy and data protection:

* **Replication**: When you upload an object, R2 stores multiple "copies" of that object through either full replication and/or erasure coding. This ensures that the full or partial failure of any individual disk does not result in data loss. Erasure coding distributes parts of the object across multiple disks, ensuring that even if some disks fail, the object can still be reconstructed from a subset of the available parts, preventing hardware failure or physical impacts to data centers (such as fire or floods) from causing data loss.
* **Hardware redundancy**: Storage clusters are comprised of hardware distributed across several data centers within a geographic region. This physical distribution ensures that localized failures—such as power outages, network disruptions, or hardware malfunctions at a single facility—do not result in data loss.
* **Synchronous writes**: R2 returns an `HTTP 200 (OK)` for a write via API or otherwise indicates success only when data has been persisted to disk. We do not rely on asynchronous replication to support underlying durability guarantees. This is critical to R2’s consistency guarantees and mitigates the chance of a client receiving a successful API response without the underlying metadata and storage infrastructure having persisted the change.

### Considerations

* Durability is not a guarantee of data availability. It is a measure of the likelihood of data loss.
* R2 provides an availability [SLA of 99.9% ↗](https://www.cloudflare.com/r2-service-level-agreement/)
* Durability does not prevent intentional or accidental deletion of data. Use [bucket locks](https://developers.cloudflare.com/r2/buckets/bucket-locks/) and/or bucket-scoped [API tokens](https://developers.cloudflare.com/r2/api/tokens/) to limit access to data.
* Durability is also distinct from [consistency](https://developers.cloudflare.com/r2/reference/consistency/), which describes how reads and writes are reflected in the system's state (e.g. eventual consistency vs. strong consistency).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/reference/durability/#page","headline":"Durability · Cloudflare R2 docs","description":"R2 is designed for 99.999999999% annual durability using replication and erasure coding.","url":"https://developers.cloudflare.com/r2/reference/durability/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/reference/durability/","name":"Durability"}}]}
```
