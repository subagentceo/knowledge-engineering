---
title: Egress-free object storage in multi-cloud setups
description: Learn how to use R2 to get egress-free object storage in multi-cloud setups.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Egress-free object storage in multi-cloud setups

**Last reviewed:**  about 2 years ago 

## Introduction

Object storage is a modern data storage approach that stores data as objects rather than in a hierarchical structure like traditional file systems, making object storage highly scalable and flexible for managing vast amounts of data across diverse applications and environments.

Oftentimes organizations leverage multiple cloud providers to distribute their workloads across different platforms, mitigating risks associated with vendor lock-in, enhancing resilience, and optimizing performance and cost. However, managing data across multiple clouds introduces challenges related to data mobility and interoperability, particularly when it comes to transferring data between cloud providers or on-premises environments.

Egress fees are charges incurred when data is transferred out of a cloud provider's network, either to another cloud provider, on-premises infrastructure, or external services. These fees can vary depending on factors such as the volume of data transferred, the destination of the data, and the network bandwidth utilized.

[R2](https://developers.cloudflare.com/r2/) offers an enticing value proposition by not charging the costly egress bandwidth fees associated with typical cloud storage services. This can be very advantageous in the context of multi-cloud environments, especially when you want to run compute-intensive workloads such as AI model training, query engines, and other data science tools.

## R2 multi-cloud setup

![Figure 1: R2 multi-cloud setup](https://developers.cloudflare.com/_astro/r2-multi-cloud.jB-KW29c_Z1XXhic.svg "Figure 1: R2-multi-cloud setup")

Figure 1: R2-multi-cloud setup

1. **Worker and R2 interaction**: Use R2's [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) to interact with R2 from a Worker. Alternatively, for improved portability, use R2's [S3 API](https://developers.cloudflare.com/r2/api/s3/) from a Worker. No R2 egress fees apply.
2. **External service and R2 interaction**: Use R2's [S3 API](https://developers.cloudflare.com/r2/api/s3/) to interact with R2 from external services. No R2 egress fees apply.

## Related resources

* [R2: Get started](https://developers.cloudflare.com/r2/get-started)
* [R2: S3 API](https://developers.cloudflare.com/r2/api/s3/)
* [R2: Workers API](https://developers.cloudflare.com/r2/api/workers/)
* [R2: Configure aws4fetch for R2](https://developers.cloudflare.com/r2/examples/aws/aws4fetch/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/egress-free-storage-multi-cloud/#page","headline":"Egress-free object storage in multi-cloud setups · Cloudflare Reference Architecture docs","description":"Learn how to use R2 to get egress-free object storage in multi-cloud setups.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/storage/egress-free-storage-multi-cloud/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/storage/","name":"Storage"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/storage/egress-free-storage-multi-cloud/","name":"Egress-free object storage in multi-cloud setups"}}]}
```
