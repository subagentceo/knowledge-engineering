---
title: Serverless global APIs
description: An example architecture of a serverless API on Cloudflare and aims to illustrate how different compute and data products could interact with each other.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Serverless global APIs

**Last reviewed:**  about 2 years ago 

## Introduction

Serverless APIs represent a modern approach to building and deploying scalable and reliable application programming interfaces (APIs) without the need to manage traditional server infrastructure. These APIs are designed to handle incoming requests from users or other systems, execute the necessary logic or operations, and return a response, all without the need for developers to provision or manage underlying servers.

At the heart of serverless APIs is the concept of serverless computing, where developers focus solely on writing code to implement business logic, without concerning themselves with server provisioning, scaling, or maintenance. This allows for greater agility and faster time-to-market for API-based applications.

Developers define the API endpoints and the corresponding logic or functionality using functions or microservices, which are then deployed to the serverless platform. The platform handles the execution of these functions in response to incoming requests.

Additionally, serverless APIs often integrate seamlessly with other cloud services, such as authentication and authorization services, databases, and event-driven architectures, enabling developers to build complex, scalable, and resilient applications with minimal operational overhead.

Most cloud serverless implementations have a single region where your code is executed. This means any request, from anywhere in the world, must traverse the Internet to get to this single location. All responses to the API request must also be sent back over the same Internet route to the user.

![Figure 1: Traditional single-region architecture](https://developers.cloudflare.com/_astro/single-region.DcjMitxL_Z1D2c5c.webp "Figure 1:  Traditional single-region architecture")

Figure 1: Traditional single-region architecture

Cloudflare follows a different, global-first approach. Globally-deployed architectures enable lower latency and high availability for users accessing the API from different parts of the world. In order to realize performance gains, not only the compute needs to be distributed, but ideally the data as well. Different solutions such as a caching as well as global replication can enable this.

![Figure 2: Region Earth](https://developers.cloudflare.com/_astro/region-earth.DPRpgTD0_Z1dzB4T.webp "Figure 2:  Region Earth")

Figure 2: Region Earth

Overall, serverless globally-deployed APIs offer a cost-effective, scalable, and agile approach to building modern applications and services, allowing organizations to focus on delivering value to their users without being encumbered by the complexities of managing infrastructure.

## Serverless global APIs

![Figure 3: Serverless global APIs](https://developers.cloudflare.com/_astro/serverless-global-apis.BnHHhP-u_2d88FE.svg "Figure 3: Serverless global APIs")

Figure 3: Serverless global APIs

This is an example architecture of a serverless API on Cloudflare and aims to illustrate how different compute and data products could interact with each other.

1. **Client request**: Send request to API endpoint.
2. **API Shield/Router**: Process incoming request using [Workers](https://developers.cloudflare.com/workers/), check for validity, and perform authentication logic, if needed. Then, forward the (potentially transformed and/or enriched) API call to individual [Workers](https://developers.cloudflare.com/workers) using [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/). This allows for a separation of concerns.
3. **Read-heavy data**: Read from [KV](https://developers.cloudflare.com/kv/) to serve read-heavy, non-dynamic data. This could include configuration data or product information. Perform writes as needed keeping [limits](https://developers.cloudflare.com/kv/platform/limits/) in mind.
4. **Relational data**: Query [D1](https://developers.cloudflare.com/d1/) to handle relational-data. This could include user data, product data or other data.
5. **External data**: Query external databases using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/). Leverage caching to improve performance where applicable. This can be especially helpful when a data migration is out of scope of the implementation.

## Related resources

* [Workers: Get started](https://developers.cloudflare.com/workers/get-started/guide/)
* [Queues: Get started](https://developers.cloudflare.com/queues/get-started/)
* [R2: Get started](https://developers.cloudflare.com/r2/get-started/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-global-apis/#page","headline":"Serverless global APIs · Cloudflare Reference Architecture docs","description":"An example architecture of a serverless API on Cloudflare and aims to illustrate how different compute and data products could interact with each other.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-global-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/serverless/","name":"Serverless"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/serverless/serverless-global-apis/","name":"Serverless global APIs"}}]}
```
