---
title: Pricing
description: Vectorize pricing based on queried and stored vector dimensions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Vectorize is now Generally Available

To report bugs or give feedback, go to the [#vectorize Discord channel ↗](https://discord.cloudflare.com). If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose).

Vectorize bills are based on:

* **Queried Vector Dimensions**: The total number of vector dimensions queried. If you have 10,000 vectors with 384-dimensions in an index, and make 100 queries against that index, your total queried vector dimensions would sum to 3.878 million (`(10000 + 100) * 384`).
* **Stored Vector Dimensions**: The total number of vector dimensions stored. If you have 1,000 vectors with 1536-dimensions in an index, your stored vector dimensions would sum to 1.536 million (`1000 * 1536`).

You are not billed for CPU, memory, "active index hours", or the number of indexes you create. If you are not issuing queries against your indexes, you are not billed for queried vector dimensions.

## Billing metrics

| [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) | [Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/#workers) |                                                                                 |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Total queried vector dimensions**                                                 | 30 million queried vector dimensions / month                                        | First 50 million queried vector dimensions / month included + $0.01 per million |
| **Total stored vector dimensions**                                                  | 5 million stored vector dimensions                                                  | First 10 million stored vector dimensions + $0.05 per 100 million               |

### Calculating vector dimensions

To calculate your potential usage, calculate the queried vector dimensions and the stored vector dimensions, and multiply by the unit price. The formula is defined as `((queried vectors + stored vectors) * dimensions * ($0.01 / 1,000,000)) + (stored vectors * dimensions * ($0.05 / 100,000,000))`

* For example, inserting 10,000 vectors of 768 dimensions each, and querying those 1,000 times per day (30,000 times per month) would be calculated as `((30,000 + 10,000) * 768) = 30,720,000` queried dimensions and `(10,000 * 768) = 7,680,000` stored dimensions (within the included monthly allocation)
* Separately, and excluding the included monthly allocation, this would be calculated as `(30,000 + 10,000) * 768 * ($0.01 / 1,000,000) + (10,000 * 768 * ($0.05 / 100,000,000))` and sum to $0.31 per month.

### Usage examples

The following table defines a number of example use-cases and the estimated monthly cost for querying a Vectorize index. These estimates do not include the Vectorize usage that is part of the Workers Free and Paid plans.

| Workload   | Dimensions per vector | Stored dimensions | Queries per month | Calculation                                                                 | Estimated total     |
| ---------- | --------------------- | ----------------- | ----------------- | --------------------------------------------------------------------------- | ------------------- |
| Experiment | 384                   | 5,000 vectors     | 10,000            | ((10000+5000)\*384\*(0.01/1000000)) + (5000\*384\*(0.05/100000000))         | $0.06 / mo included |
| Scaling    | 768                   | 25,000 vectors    | 50,000            | ((50000+25000)\*768\*(0.01/1000000)) + (25000\*768\*(0.05/100000000))       | $0.59 / mo most     |
| Production | 768                   | 50,000 vectors    | 200,000           | ((200000+50000)\*768\*(0.01/1000000)) + (50000\*768\*(0.05/100000000))      | $1.94 / mo          |
| Large      | 768                   | 250,000 vectors   | 500,000           | ((500000+250000)\*768\*(0.01/1000000)) + (250000\*768\*(0.05/100000000))    | $5.86 / mo          |
| XL         | 1536                  | 500,000 vectors   | 1,000,000         | ((1000000+500000)\*1536\*(0.01/1000000)) + (500000\*1536\*(0.05/100000000)) | $23.42 / mo         |

included All of this usage would fall into the Vectorize usage included in the Workers Free or Paid plan.

most Most of this usage would fall into the Vectorize usage included within the Workers Paid plan.

## Frequently Asked Questions

Frequently asked questions related to Vectorize pricing:

* Will Vectorize always have a free tier?

Yes, the [Workers free tier](https://developers.cloudflare.com/workers/platform/pricing/#workers) will always include the ability to prototype and experiment with Vectorize for free.

* What happens if I exceed the monthly included reads, writes and/or storage on the paid tier?

You will be billed for the additional reads, writes and storage according to [Vectorize's pricing](#billing-metrics).

* Does Vectorize charge for data transfer / egress?

No.

* Do queries I issue from the HTTP API or the Wrangler command-line count as billable usage?

Yes: any queries you issue against your index, including from the Workers API, HTTP API and CLI all count as usage.

* Does an empty index, with no vectors, contribute to storage?

No. Empty indexes do not count as stored vector dimensions.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/platform/pricing/#page","headline":"Pricing · Cloudflare Vectorize docs","description":"Vectorize pricing based on queried and stored vector dimensions.","url":"https://developers.cloudflare.com/vectorize/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/platform/pricing/","name":"Pricing"}}]}
```
