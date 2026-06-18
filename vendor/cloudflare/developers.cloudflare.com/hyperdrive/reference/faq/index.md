---
title: FAQ
description: Frequently asked questions about Hyperdrive connectivity, caching, and supported databases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

Below you will find answers to our most commonly asked questions regarding Hyperdrive.

## Connectivity

### Does Hyperdrive use specific IP addresses to connect to my database?

Hyperdrive connects to your database using [Cloudflare's IP address ranges ↗](https://www.cloudflare.com/ips/). These are shared by all Hyperdrive configurations and other Cloudflare products.

You can use this to configure restrictions in your database firewall to restrict the IP addresses that can access your database.

### Does Hyperdrive support connecting to D1 databases?

Hyperdrive does not support [D1](https://developers.cloudflare.com/d1) because D1 provides fast connectivity from Workers by design.

Hyperdrive is designed to speed up connectivity to traditional, regional SQL databases such as PostgreSQL. These databases are typically accessed using database drivers that communicate over TCP/IP. Unlike D1, creating a secure database connection to a traditional SQL database involves multiple round trips between the client (your Worker) and your database server. See [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/) for more detail on why round trips are needed and how Hyperdrive solves this.

D1 does not require round trips to create database connections. D1 is designed to be performant for access from Workers by default, without needing Hyperdrive.

### Should I use Placement with Hyperdrive?

Yes, if your Worker makes multiple queries per request. [Placement](https://developers.cloudflare.com/workers/configuration/placement/) runs your Worker near your database, reducing per-query latency from 20-30ms to 1-3ms. Hyperdrive handles connection pooling and setup. Placement reduces the network distance for query execution.

Use `placement.region` if your database runs in AWS, GCP, or Azure. Use `placement.host` for databases hosted elsewhere.

## Pricing

### Does Hyperdrive charge for data transfer / egress?

No.

### Is Hyperdrive available on the [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) plan?

Yes. Refer to [pricing](https://developers.cloudflare.com/hyperdrive/platform/pricing/).

### Does Hyperdrive charge for additional compute?

Hyperdrive itself does not charge for compute (CPU) or processing (wall clock) time. Workers querying Hyperdrive and computing results: for example, serializing results into JSON and/or issuing queries, are billed per [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/#workers).

## Limits

### Are there any limits to Hyperdrive?

Refer to the published [limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/reference/faq/#page","headline":"FAQ · Cloudflare Hyperdrive docs","description":"Frequently asked questions about Hyperdrive connectivity, caching, and supported databases.","url":"https://developers.cloudflare.com/hyperdrive/reference/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/reference/faq/","name":"FAQ"}}]}
```
