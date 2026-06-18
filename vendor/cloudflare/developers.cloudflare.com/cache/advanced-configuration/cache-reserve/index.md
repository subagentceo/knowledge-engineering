---
title: Cache Reserve
description: Persist cached content in R2 storage to eliminate cache evictions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache Reserve

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

Cache Reserve is a large, persistent data store [implemented on top of R2](https://developers.cloudflare.com/r2/). By pushing a single button in the dashboard, your website's cacheable content will be written to Cache Reserve.

In the same way that Tiered Cache builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate upper-tier cache, that will reserve storage space for your assets for as long as you want. This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

![Content served from origin and getting cached in Cache Reserve, and Edge Cache Data Centers \(T1=upper-tier, T2=lower-tier\) on its way back to the client](https://developers.cloudflare.com/_astro/content-being-served.6zIZl3YT_1WqRl0.webp) 

Content in Cache Reserve is considered fresh based on the [Edge Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl) setting, or your origin's `Cache-Control` headers if Edge Cache TTL is not set. After the freshness period expires, Cloudflare revalidates the asset with your origin the next time it is requested. This is the same behavior as in Cloudflare's regular CDN.

The retention period controls how long an asset stays in Cache Reserve before it is removed. Cache Reserve starts with a retention period of 30 days. If an asset is not requested within the retention period, it is removed from Cache Reserve. Requesting the asset resets the retention period.

Assets must [meet certain criteria](#cache-reserve-asset-eligibility) to use Cache Reserve.

Cache Reserve is a usage-based product and [pricing](#pricing) is detailed below. While Cache Reserve does require a paid plan, users can continue to use Cloudflare’s CDN (without Cache Reserve) for free.

## Enable Cache Reserve

A paid Cache Reserve plan is required.

* [ Dashboard ](#tab-panel-6959)
* [ API ](#tab-panel-6960)

1. In the Cloudflare dashboard, go to the **Cache Reserve** page.  
[ Go to **Cache Reserve** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-reserve)
2. Select **Enable storage sync**.

Refer to the [Change Cache Reserve setting API](https://developers.cloudflare.com/api/resources/cache/subresources/cache%5Freserve/methods/edit/) for more information.

Note

You can pause Cache Reserve at any time. Pausing Cache Reserve means that Cloudflare’s network will no longer use Cache Reserve to serve data, but resources will remain in storage until they are purged or expired.

If you are an Enterprise customer and are interested in Cache Reserve, contact your account team to get help with your configuration.

## Cache Reserve asset eligibility

Not all assets are eligible for Cache Reserve. To be admitted into Cache Reserve, assets must:

* Be cacheable, according to Cloudflare's standard [cacheability factors](https://developers.cloudflare.com/cache/).
* Have a freshness time-to-live (TTL) of at least 10 hours (set by any means such as Cache-Control / [CDN-Cache-Control](https://developers.cloudflare.com/cache/concepts/cache-control/) origin response headers, [Edge Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl), [Cache TTL By Status](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code/), or [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)),
* Have a Content-Length response header.
* When using [Image transformations](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/), original files are eligible for Cache Reserve, but resized file variants are not eligible because transformations happen after Cache Reserve in the response flow.

## Limits

* Cache Reserve file limits are the same as [R2 limits](https://developers.cloudflare.com/r2/platform/limits/). Note that [CDN cache limits](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#customization-options-and-limits) still apply. Assets larger than standard limits will not be stored in the standard CDN cache, so these assets will incur Cache Reserve operations costs far more frequently.
* Origin Range requests are not supported at this time from Cache Reserve.
* [Vary for images](https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/) is currently not compatible with Cache Reserve.
* Requests to [R2 public buckets linked to a zone's domain](https://developers.cloudflare.com/r2/buckets/public-buckets/) will not use Cache Reserve. Enabling Cache Reserve for the connected zone will use Cache Reserve only for requests not destined for the R2 bucket.
* Cache Reserve makes requests for uncompressed content directly from the origin. Unlike the standard Cloudflare CDN, Cache Reserve does not include the `Accept-Encoding: gzip` header when sending requests to the origin.
* Cache Reserve is bypassed when using the Cloudflare [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) setup.

## Usage

Like the standard CDN, Cache Reserve also uses the `cf-cache-status` header to indicate [cache response statuses](https://developers.cloudflare.com/cache/concepts/cache-responses/) like `MISS`, `HIT`, and `REVALIDATED`. Cache Reserve cache misses and hits are factored into the dashboard's cache hit ratio.

Individual sampled requests that filled or were served by Cache Reserve are viewable via the [CacheReserveUsed](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) Logpush field.

Cache Reserve monthly operations and storage usage are viewable in the dashboard.

## Pricing

Cache Reserve charges based on the total volume of data stored, along with two classes of operations on that data:

* [Class A operations](https://developers.cloudflare.com/r2/pricing/#class-a-operations) which are more expensive and tend to mutate state.
* [Class B operations](https://developers.cloudflare.com/r2/pricing/#class-b-operations) which tend to read existing state.

In most cases, a Cache Reserve miss will result in both one class A and one class B operation, and a Cache Reserve hit will result in one class B operation. Assets larger than 1 GB will incur more operations proportional to their size.

### Cache Reserve pricing

| Rates                       | |  Storage               | $0.015 / GB-month |
| --------------------------- | ------------------------ | ----------------- |
| Class A Operations (writes) | $4.50 / million requests |                   |
| Class B Operations (reads)  | $0.36 / million requests |                   |

Note

The billable quantity is rounded up to the nearest million.

### Storage usage

Storage is billed using gigabyte-month (GB-month) as the billing metric. A GB-month is calculated by recording total bytes stored for the duration of the month.

For example:

* Storing 1 GB for 30 days will be charged as 1 GB-month.
* Storing 2 GB for 15 days will be charged as 1 GB-month.

### Operations

Operations are performed by Cache Reserve on behalf of the user to write data from the origin to Cache Reserve and to pass that data downstream to other parts of Cloudflare’s network. These operations are managed internally by Cloudflare.

#### Class A operations (writes)

Class A operations are performed based on cache misses from Cloudflare’s CDN. When a request cannot be served from cache, it will be fetched from the origin and written to cache reserve as well as our edge caches on the way back to the visitor.

#### Class B operations (reads)

Class B operations are performed when data needs to be fetched from Cache Reserve to respond to a miss in the edge cache.

#### Purge

Asset purges are free operations.

Cache Reserve will be instantly purged along with edge cache when you send a purge by URL request. Refer to [cache configurations](https://developers.cloudflare.com/cache/how-to/purge-cache/) for details.

Other purge methods, such as purge by tag, host, prefix, or purge everything will force an attempt to [revalidate](https://developers.cloudflare.com/cache/concepts/cache-responses/#revalidated) on the subsequent request for the Cache Reserve asset. Note that assets purged this way will still incur storage costs until their retention TTL expires.

Note

Note this differs from the standard CDN's purge by tag, host, or prefix features which force a cache miss, requiring the origin to deliver the asset in full.

## Cache Reserve billing examples

#### Example 1

Assuming 1,000 assets (each 1 GB) are written to Cache Reserve at the start of the month and each asset is read 1,000 times, the estimated cost for the month would be:

| Usage              | Billable Quantity                         | Price           |        |
| ------------------ | ----------------------------------------- | --------------- | ------ |
| Class B Operations | (1,000 assets) \* (1,000 reads per asset) | 1,000,000       | $0.36  |
| Class A Operations | (1,000 assets) \* (1 write per asset)     | 1,000           | $4.50  |
| Storage            | (1,000 assets) \* (1GB per asset)         | 1,000 GB-months | $15.00 |
| **TOTAL**          | **$19.86**                                |                 |        |

Note

The billable quantity is rounded up to the nearest million.

#### Example 2

Assuming 1,000,000 assets (each 1 MB) are in Cache Reserve, and:

* each asset expires and is rewritten into Cache Reserve 1 time per day
* each asset is read 2 times per day

the estimated cost for the month would be:

| Usage              | Billable Quantity                                    | Price           |         |
| ------------------ | ---------------------------------------------------- | --------------- | ------- |
| Class B Operations | (1,000,000 assets) \* (2 reads per day) \* (30 days) | 60,000,000      | $21.60  |
| Class A Operations | (1,000,000 assets) \* (1 write per day) \* (30 days) | 30,000,000      | $135.00 |
| Storage            | (1,000,000 assets) \* (1MB per asset)                | 1,000 GB-months | $15.00  |
| **TOTAL**          | **$171.60**                                          |                 |         |

Note

The billable quantity is rounded up to the nearest million.

## Tips and best practices

Cache Reserve is designed for use with [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) enabled for maximum origin shielding. Using Cache Reserve without Tiered Cache may result in higher storage operation costs. The Cloudflare dashboard will warn you if you try to enable Cache Reserve without Tiered Cache.

## Cache Reserve Analytics

Cache Reserve Analytics provides insights regarding your Cache Reserve usage. It allows you to check what content is stored in Cache Reserve, how often it is being accessed, how long it has been there and how much egress from your origin it is saving you.

In the **Overview** section, under **Cache Reserve**, you have access to the following metrics:

* **Egress savings (bandwidth)** \- is an estimation based on response bytes served from Cache Reserve that did not need to be served from your origin server. These are represented as cache hits.
* **Requests served by Cache Reserve** \- is the number of requests served by Cache Reserve (total).
* **Data storage summary** \- is based on a representative sample of requests. Refer to [Sampling](https://developers.cloudflare.com/analytics/graphql-api/sampling/) for more details about how Cloudflare samples data.  
   * **Current data stored** \- is the data stored (currently) over time.  
   * **Aggregate storage usage** \- is the total of storage used for the selected timestamp.
* **Operations** \- Class A (writes) and Class B (reads) operations over time.

## Cache Reserve clear button

You can remove all data stored in Cache Reserve through the dashboard or via API. To clear your cache reserve:

* Cache Reserve must have already been enabled for the zone.
* Cache Reserve needs to be off.

Be aware that the deletion may take up to 24 hours to complete.

* [ Dashboard ](#tab-panel-6961)
* [ API ](#tab-panel-6962)

1. In the Cloudflare dashboard, go to the **Cache Reserve** page.  
[ Go to **Cache Reserve** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-reserve)
2. In **Delete Cache Reserve Data**, select **Delete Storage**.

To delete Cache Reserve data via API use the following example requests. For more information, refer to the [API documentation](https://developers.cloudflare.com/api/resources/cache/subresources/cache%5Freserve/methods/clear/).

**Request 1: Get Cache Reserve status**

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Settings Read`
* `Zone Read`
* `Zone Write`

Get Cache Reserve setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "result": {

    "editable": true,

    "id": "cache_reserve",

    "value": "off"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

If Cache Reserve is turned off, you can proceed to the Cache Reserve Clear operation.

**Request 2: Start Cache Reserve Clear**

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Start Cache Reserve Clear

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve_clear" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Response

```

{

  "result": {

    "id": "cache_reserve_clear",

    "start_ts": "2024-06-02T10:00:00.12345Z",

    "state": "In-progress"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/#page","headline":"Cache Reserve · Cloudflare Cache (CDN) docs","description":"Persist cached content in R2 storage to eliminate cache evictions.","url":"https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/advanced-configuration/","name":"Advanced configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/advanced-configuration/cache-reserve/","name":"Cache Reserve"}}]}
```
