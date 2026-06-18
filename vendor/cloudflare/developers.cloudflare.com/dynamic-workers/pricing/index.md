---
title: Pricing
description: Dynamic Workers pricing is based on requests, CPU time, and the number of unique Dynamic Workers created per day.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Dynamic Workers pricing is based on three dimensions: Dynamic Workers created daily, requests, and CPU time.

Dynamic Workers are currently only available on the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/).

| Included                          | Additional usage                       |                                     |
| --------------------------------- | -------------------------------------- | ----------------------------------- |
| **Dynamic Workers created daily** | 1,000 unique Dynamic Workers per month | +$0.002 per Dynamic Worker per day  |
| **Requests** ¹                    | 10 million per month                   | +$0.30 per million requests         |
| **CPU time** ¹                    | 30 million CPU milliseconds per month  | +$0.02 per million CPU milliseconds |

¹ Uses [Workers Standard rates](https://developers.cloudflare.com/workers/platform/pricing/#workers) and will appear as part of your existing Workers bill, not as separate Dynamic Workers charges.

Billing

Starting May 26, 2026, Dynamic Workers created daily are billed as part of Dynamic Workers pricing.

Dynamic Workers requests and CPU time are also billed as part of your Workers plan. They count toward your Workers requests and CPU usage.

## Dynamic Workers created daily

You are billed for each unique Dynamic Worker created in a day. A Dynamic Worker is uniquely identified by its **Worker ID** and **code** — if either changes, it counts as a new Dynamic Worker. The count resets daily.

| Scenario                                   | Counted as                        |
| ------------------------------------------ | --------------------------------- |
| Same code, same ID, invoked multiple times | 1 Dynamic Worker                  |
| Same code, different IDs                   | 1 Dynamic Worker per ID           |
| Same ID, different code versions           | 1 Dynamic Worker per code version |
| No ID provided or .load(code) used         | 1 Dynamic Worker per invocation   |

Note

If your application sends multiple requests to the same Worker, use `.get()` with a stable ID to avoid being billed for multiple creations.

## View Dynamic Workers usage

To view the number of billable Dynamic Workers invoked during your billing period, go to **Workers & Pages** \> **Overview** in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

Dynamic Workers usage data only goes back to June 1, 2026.

You can also query this count through the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) by using `workersInvocationsByOwnerAndScriptGroups` and selecting `distinctDynamicWorkerCount`:

```

query getDynamicWorkersCount(

  $accountTag: string!

  $filter: AccountWorkersInvocationsByOwnerAndScriptGroupsFilter_InputObject

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      workersInvocationsByOwnerAndScriptGroups(limit: 10000, filter: $filter) {

        uniq {

          distinctDynamicWorkerCount

        }

      }

    }

  }

}


```

Use variables to set the account and billing-period date range:

```

{

  "accountTag": "<ACCOUNT_ID>",

  "filter": {

    "date_geq": "2026-06-01",

    "date_leq": "2026-06-30"

  }

}


```

The `distinctDynamicWorkerCount` field returns the unique Dynamic Workers count for the selected period.

## Requests

Dynamic Workers reuse [Workers Standard request pricing](https://developers.cloudflare.com/workers/platform/pricing/).

A request is counted each time a Dynamic Worker is invoked:

* Each `fetch()` call into a Dynamic Worker
* Each RPC method call on a Dynamic Worker stub (billed the same way as [Durable Objects](https://developers.cloudflare.com/durable-objects/platform/pricing/))

If an RPC method returns a stub (an object that extends `RpcTarget`), those returned stubs share the same RPC session as the original call. Subsequent calls on the returned stub are not billed as separate requests.

## CPU time

CPU time is billed at the same rate as [Workers Standard](https://developers.cloudflare.com/workers/platform/pricing/).

Unlike standard Workers (where only execution time is billed), Dynamic Workers bill for two components of CPU time:

* **Startup time**: The compute required to initialize the isolate and parse your code.
* **Execution time**: The compute time your code spends actively processing logic, excluding time spent waiting on I/O.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/pricing/#page","headline":"Pricing · Cloudflare Dynamic Workers docs","description":"Dynamic Workers pricing is based on requests, CPU time, and the number of unique Dynamic Workers created per day.","url":"https://developers.cloudflare.com/dynamic-workers/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/pricing/","name":"Pricing"}}]}
```
