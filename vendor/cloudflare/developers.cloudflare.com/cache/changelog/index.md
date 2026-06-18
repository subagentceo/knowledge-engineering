---
title: Changelog
description: Track the latest updates and changes to Cloudflare Cache features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/cache.xml) 

## 2026-05-26

  
**BYPASS status now returned for uncacheable responses**   

Cloudflare now returns a `BYPASS` [cache status](https://developers.cloudflare.com/cache/concepts/cache-responses/) whenever a response is not cacheable, instead of the previous mix of `BYPASS` and `MISS` that depended on why Cloudflare chose not to cache the response.

There are multiple reasons Cloudflare may refuse to cache a response — for example, the response exceeds the [maximum cacheable file size](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#cacheable-size-limits) for your plan, the origin sends `Cache-Control: no-cache`, `private`, or `max-age=0`, the response includes a `Set-Cookie` header, or the request includes an `Authorization` header.

Previously, only some of these conditions returned `BYPASS`. Others — such as responses exceeding the maximum cacheable file size — returned `MISS` on every request, regardless of whether [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/#origin-cache-control-behavior) was on or off. Because the response could never be cached, every subsequent request also returned `MISS`, which looked indistinguishable from a broken cache and made it hard to tell whether Cloudflare was trying and failing to cache the asset or had deliberately chosen not to cache it.

`BYPASS` now consistently signals that Cloudflare refused to cache the response, regardless of the reason. `MISS` is reserved for cacheable responses that simply were not in the local cache at request time.

#### What to expect in your analytics

After this change rolls out, you should see:

* **MISS rate decreases**: Uncacheable responses no longer count as cache misses.
* **BYPASS rate increases**: These same responses are now reported as bypasses.
* **Cache hit ratio increases**: Hit ratio calculations no longer include uncacheable traffic that could never have been cached, giving you a more accurate view of cache effectiveness.

Your total request volume and origin traffic are unchanged — only the cache status label is different.

#### Browser cache TTL behavior is preserved

The cache status label is the only thing changing — browser cache TTL handling for any given response is identical to what it was before:

* Responses that historically returned `MISS` because Cloudflare refused to cache them (for example, responses over the maximum cacheable file size) now return `BYPASS`, but continue to have browser cache TTL applied — exactly as they did when they were labeled `MISS`.
* Responses that historically returned `BYPASS` and skipped browser cache TTL continue to skip browser cache TTL.

In both cases, the decision to apply browser cache TTL depends on the underlying reason Cloudflare did not cache the response, not on the new `BYPASS` label.

## 2026-05-04

  
**Pingora now powers Cloudflare's cache**   

Cloudflare's cache now runs on a new proxy built on [Pingora ↗](https://github.com/cloudflare/pingora), the Rust-based framework that already serves a significant portion of Cloudflare's network traffic. The new proxy is faster, more memory-safe, and designed to evolve our cache architecture. It delivers immediate performance improvements and enables new caching capabilities.

#### What this brings

* **Lower latency**: The new proxy reduces per-request overhead through improved connection reuse.
* **Reduced cache MISSes**: Enhanced cache retention improves origin offload.
* **Better RFC compliance**: Caching behavior more closely follows HTTP caching standards.
* **Foundation for future features**: The new architecture enables upcoming improvements to cache functionality and efficiency.

#### New features

* **Asynchronous `stale-while-revalidate`**: Every request returns stale content immediately while revalidation happens in the background, instead of the first request after expiry blocking on the origin. Refer to the [asynchronous stale-while-revalidate changelog](https://developers.cloudflare.com/changelog/post/2026-02-26-async-stale-while-revalidate/) for details.
* **Unbuffered bypass by default**: Responses that bypass cache are streamed directly to the client without buffering, reducing time-to-first-byte for uncacheable content.

#### Behavioral changes

The new architecture introduces the following behavioral changes to improve RFC compliance and correctness:

* **`Vary: *` results in cache bypass**: According to [RFC 9110 Section 12.5.5 ↗](https://httpwg.org/specs/rfc9110.html#field.vary), a `Vary` header value of `*` indicates the response varies on factors beyond request headers and must not be served from cache. Cloudflare now bypasses cache for these responses instead of storing them.
* **`Set-Cookie` stripped on MISS and EXPIRED**: For cacheable assets, `Set-Cookie` is now stripped on MISS and EXPIRED responses, not only on HITs.
* **Floating-point TTL values**: Floating-point time-to-live values (for example, `max-age=1.5`) are rounded down to the nearest integer instead of being rejected as invalid.

#### What's next

A deeper look at the new cache proxy is coming soon to the [Cloudflare blog ↗](https://blog.cloudflare.com/). For background on the underlying framework, read:

* [Open sourcing Pingora: our Rust framework for building programmable network services ↗](https://blog.cloudflare.com/pingora-open-source/)
* [How we built Pingora, the proxy that connects Cloudflare to the Internet ↗](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/)

## 2026-04-27

  
**Cache Response Rules now support zone versioning**   

Cache Response Rules now work with [Version Management](https://developers.cloudflare.com/version-management/). You can version response-phase cache settings and promote them through environments, just like Cache Rules and other supported configurations.

#### What changed

Previously, Cache Response Rules were excluded from zone versioning. Any response-phase rule you created applied globally across all environments with no way to test changes in staging first. Cache Rules already supported versioning, but the response phase, where you modify `Cache-Control` directives, manage cache tags, and strip headers, did not.

Cache Response Rules are now fully integrated with Version Management. You can create or modify response-phase rules within a version, and those changes stay scoped to that version until promoted.

#### Benefits

* **Safe rollout of cache behavior changes**: Test response-phase rules in a staging environment before promoting to production. Catch unintended caching side effects early.
* **Parity with Cache Rules**: Cache Response Rules now follow the same versioning workflow as Cache Rules, so you can manage all cache configuration through a single promotion pipeline.
* **Independent environment control**: Run different response-phase cache settings per environment. For example, strip `Set-Cookie` headers in staging to validate cacheability without affecting production traffic.

#### Get started

Configure Cache Response Rules in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules) under **Caching** \> **Cache Rules**, or via the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/). For more details, refer to the [Cache Response Rules documentation](https://developers.cloudflare.com/cache/how-to/cache-response-rules/) and the [Version Management documentation](https://developers.cloudflare.com/version-management/).

## 2026-04-17

  
**Smart Tiered Cache optimizes public cloud origins**   

You can now achieve higher cache HIT rates and reduce origin load for origins hosted on public cloud providers with [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#smart-tiered-cache). By setting a cloud region hint for your origin, Cloudflare selects the optimal upper-tier data center for that cloud region, funneling all cache MISSes through a single location close to your origin.

Previously, Smart Tiered Cache could not reliably select an optimal upper tier for origins behind anycast or regional unicast networks commonly used by cloud providers. Origins on AWS, GCP, Azure, and Oracle Cloud would fall back to a multi-upper-tier topology, resulting in lower cache HIT rates and more requests reaching your origin.

#### How it works

Set a cloud region hint (for example, `aws/us-east-1` or `gcp/europe-west1`) for your origin IP or hostname. Smart Tiered Cache uses this hint along with real-time latency data to select a primary upper tier close to your cloud region, plus a fallback in a different location for resilience.

* **Supported providers**: AWS, GCP, Azure, and Oracle Cloud.
* **All plans**: Available on Free, Pro, Business, and Enterprise plans at no additional cost.
* **Dashboard and API**: Configure from **Caching** \> **Tiered Cache** \> **Origin Configuration**, or use the API and Terraform.

#### Get started

To get started, enable [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) and set a cloud region hint for your origin in the [Tiered Cache settings](https://developers.cloudflare.com/cache/how-to/tiered-cache/#public-cloud-origins).

## 2026-03-24

  
**Cache Response Rules**   

You can now control how Cloudflare handles origin responses without changing your origin. Cache Response Rules let you modify `Cache-Control` directives, manage cache tags, and strip headers like `Set-Cookie` from origin responses _before_ they reach Cloudflare's cache. Whether traffic is cached or passed through dynamically, these rules give you control over origin response behavior that was previously out of reach.

#### What changed

Cache Rules previously only operated on request attributes. Cache Response Rules introduce a new response phase that evaluates origin responses and lets you act on them before caching. You can now:

* **Modify `Cache-Control` directives**: Set or remove individual directives like `no-store`, `no-cache`, `max-age`, `s-maxage`, `stale-while-revalidate`, `immutable`, and more. For example, remove a `no-cache` directive your origin sends so Cloudflare can cache the asset, or set an `s-maxage` to control how long Cloudflare stores it.
* **Set a different browser `Cache-Control`**: Send a different `Cache-Control` header downstream to browsers and other clients than what Cloudflare uses internally, giving you independent control over edge and browser caching strategies.
* **Manage cache tags**: Add, set, or remove cache tags on responses, including converting tags from another CDN's header format into Cloudflare's `Cache-Tag` header. This is especially useful if you are migrating from a CDN that uses a different tag header or delimiter.
* **Strip headers that block caching**: Remove `Set-Cookie`, `ETag`, or `Last-Modified` headers from origin responses before caching, so responses that would otherwise be treated as uncacheable can be stored and served from cache.

#### Benefits

* **No origin changes required**: Fix caching behavior entirely from Cloudflare, even when your origin configuration is locked down or managed by a different team.
* **Simpler CDN migration**: Match caching behavior from other CDN providers without rewriting your origin. Translate cache tag formats and override directives that do not align with Cloudflare's defaults.
* **Native support, fewer workarounds**: Functionality that previously required workarounds is now built into Cache Rules with full Tiered Cache compatibility.
* **Fine-grained control**: Use expressions to match on request and response attributes, then apply precise cache settings per rule. Rules are stackable and composable with existing Cache Rules.

#### Get started

Configure Cache Response Rules in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules) under **Caching** \> **Cache Rules**, or via the [Rulesets API ↗](https://developers.cloudflare.com/ruleset-engine/rulesets-api/). For more details, refer to the [Cache Rules documentation ↗](https://developers.cloudflare.com/cache/how-to/cache-response-rules/).

## 2026-02-26

  
**Asynchronous stale-while-revalidate**   

Cloudflare's [stale-while-revalidate](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation) support is now fully asynchronous. Previously, the first request for a stale (expired) asset in cache had to wait for an origin response, after which that visitor received a REVALIDATED or EXPIRED status. Now, the first request after the asset expires triggers revalidation in the background and immediately receives stale content with an UPDATING status. All following requests also receive stale content with an `UPDATING` status until the origin responds, after which subsequent requests receive fresh content with a `HIT` status.

`stale-while-revalidate` is a `Cache-Control` directive set by your origin server that allows Cloudflare to serve an expired cached asset while a fresh copy is fetched from the origin.

Asynchronous revalidation brings:

* **Lower latency**: No visitor is waiting for the origin when the asset is already in cache. Every request is served from cache during revalidation.
* **Consistent experience**: All visitors receive the same cached response during revalidation.
* **Reduced error exposure**: The first request is no longer vulnerable to origin timeouts or errors. All visitors receive a cached response while revalidation happens in the background.

#### Availability

This change is live for all Free, Pro, and Business zones. Approximately 75% of Enterprise zones have been migrated, with the remaining zones rolling out throughout the quarter.

#### Get started

To use this feature, make sure your origin includes the `stale-while-revalidate` directive in the `Cache-Control` header. Refer to the [Cache-Control documentation](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation) for details.

## 2025-11-25

  
**Audit Logs for Cache Purge Events**   

You can now review detailed audit logs for cache purge events, giving you visibility into what purge requests were sent, what they contained, and by whom. Audit your purge requests via the Dashboard or API for all purge methods:

* Purge everything
* List of prefixes
* List of tags
* List of hosts
* List of files

#### Example

The detailed audit payload is visible within the Cloudflare Dashboard (under **Manage Account** \> **Audit Logs**) and via the API. Below is an example of the Audit Logs v2 payload structure:

```

{

  "action": {

    "result": "success",

    "type": "create"

  },

  "actor": {

    "id": "1234567890abcdef",

    "email": "user@example.com",

    "type": "user"

  },

  "resource": {

    "product": "purge_cache",

    "request": {

      "files": [

        "https://example.com/images/logo.png",

        "https://example.com/css/styles.css"

      ]

    }

  },

  "zone": {

    "id": "023e105f4ecef8ad9ca31a8372d0c353",

    "name": "example.com"

  }

}


```

#### Get started

To get started, refer to the [Audit Logs documentation](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/).

## 2025-11-07

  
**Inspect Cache Keys with Cloudflare Trace**   

You can now see the exact cache key generated for any request directly in Cloudflare Trace. This visibility helps you troubleshoot cache hits and misses, and verify that your Custom Cache Keys — configured via Cache Rules or Page Rules — are working as intended.

Previously, diagnosing caching behavior required inferring the key from configuration settings. Now, you can confirm that your custom logic for headers, query strings, and device types is correctly applied.

Access Trace via the [dashboard](https://developers.cloudflare.com/rules/trace-request/how-to/#use-trace-in-the-dashboard) or [API](https://developers.cloudflare.com/api/resources/request%5Ftracer/methods/trace/), either manually for ad-hoc debugging or automated as part of your quality-of-service monitoring.

#### Example scenario

If you have a Cache Rule that segments content based on a specific cookie (for example, `user_region`), run a Trace with that cookie present to confirm the `user_region` value appears in the resulting cache key.

The Trace response includes the cache key in the `cache` object:

```

{

  "step_name": "request",

  "type": "cache",

  "matched": true,

  "public_name": "Cache Parameters",

  "cache": {

    "key": {

      "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",

      "scheme": "https",

      "host": "example.com",

      "uri": "/images/hero.jpg"

    },

    "key_string": "023e105f4ecef8ad9ca31a8372d0c353::::https://example.com/images/hero.jpg:::::"

  }

}


```

#### Get started

To learn more, refer to the [Trace documentation](https://developers.cloudflare.com/rules/trace-request/) and our guide on [Custom Cache Keys](https://developers.cloudflare.com/cache/how-to/cache-keys/).

## 2025-08-29

  
**Smart Tiered Cache Fallback to Generic**   

[Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#smart-tiered-cache) now falls back to [Generic Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#generic-global-tiered-cache) when the origin location cannot be determined, improving cache precision for your content.

Previously, when Smart Tiered Cache was unable to select the optimal upper tier (such as when origins are masked by Anycast IPs), latency could be negatively impacted. This fallback now uses Generic Tiered Cache instead, providing better performance and cache efficiency.

#### How it works

When Smart Tiered Cache falls back to Generic Tiered Cache:

1. **Multiple upper-tiers**: Uses all of Cloudflare's global data centers as a network of upper-tiers instead of a single optimal location.
2. **Distributed cache requests**: Lower-tier data centers can query any available upper-tier for cached content.
3. **Improved global coverage**: Provides better cache hit ratios across geographically distributed visitors.
4. **Automatic fallback**: Seamlessly transitions when origin location cannot be determined, such as with Anycast-masked origins.

#### Benefits

* **Preserves high performance during fallback**: Smart Tiered Cache now maintains strong cache efficiency even when optimal upper tier selection is not possible.
* **Minimizes latency impact**: Automatically uses Generic Tiered Cache topology to keep performance high when origin location cannot be determined.
* **Seamless experience**: No configuration changes or intervention required when fallback occurs.
* **Improved resilience**: Smart Tiered Cache remains effective across diverse origin infrastructure, including Anycast-masked origins.

#### Get started

This improvement is automatically applied to all zones using [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/). No action is required on your part.

## 2025-04-04

  
**Workers Fetch API can override Cache Rules**   

You can now programmatically override Cache Rules using the `cf` object in the `fetch()` command. This feature gives you fine-grained control over caching behavior on a per-request basis, allowing Workers to customize cache settings dynamically based on request properties, user context, or business logic.

#### How it works

Using the `cf` object in `fetch()`, you can override specific Cache Rules settings by:

1. **Setting custom cache options**: Pass cache properties in the `cf` object as the second argument to `fetch()` to override default Cache Rules.
2. **Dynamic cache control**: Apply different caching strategies based on request headers, cookies, or other runtime conditions.
3. **Per-request customization**: Bypass or modify Cache Rules for individual requests while maintaining default behavior for others.
4. **Programmatic cache management**: Implement complex caching logic that adapts to your application's needs.

#### What can be configured

Workers can override the following Cache Rules settings through the `cf` object:

* **`cacheEverything`**: Treat all content as static and cache all file types beyond the default cached content.
* **`cacheTtl`**: Set custom time-to-live values in seconds for cached content at the edge, regardless of origin headers.
* **`cacheTtlByStatus`**: Set different TTLs based on the response status code (for example, `{ "200-299": 86400, 404: 1, "500-599": 0 }`).
* **`cacheKey`**: Customize cache keys to control which requests are treated as the same for caching purposes (Enterprise only).
* **`cacheTags`**: Append additional cache tags for targeted cache purging operations.

#### Benefits

* **Enhanced flexibility**: Customize cache behavior without modifying zone-level Cache Rules.
* **Dynamic optimization**: Adjust caching strategies in real-time based on request context.
* **Simplified configuration**: Reduce the number of Cache Rules needed by handling edge cases programmatically.
* **Improved performance**: Fine-tune cache behavior for specific use cases to maximize hit rates.

#### Get started

To get started, refer to the [Workers Fetch API documentation](https://developers.cloudflare.com/workers/runtime-apis/fetch/) and the [cf object properties documentation](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties).

## 2025-04-03

  
**All cache purge methods now available for all plans**   

You can now access all Cloudflare cache purge methods — no matter which plan you’re on. Whether you need to update a single asset or instantly invalidate large portions of your site’s content, you now have the same powerful tools previously reserved for Enterprise customers.

**Anyone on Cloudflare can now:**

1. [Purge Everything](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/): Clears all cached content associated with a website.
2. [Purge by Prefix](https://developers.cloudflare.com/cache/how-to/purge-cache/purge%5Fby%5Fprefix/): Targets URLs sharing a common prefix.
3. [Purge by Hostname](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/): Invalidates content by specific hostnames.
4. [Purge by URL (single-file purge)](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/): Precisely targets individual URLs.
5. [Purge by Tag](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/): Uses Cache-Tag response headers to invalidate grouped assets, offering flexibility for complex cache management scenarios.

Want to learn how each purge method works, when to use them, or what limits apply to your plan? Dive into our [purge cache documentation](https://developers.cloudflare.com/cache/how-to/purge-cache/) and [API reference ↗](https://developers.cloudflare.com/api/resources/cache/methods/purge/) for all the details.

## 2025-02-12

  
**Configurable multiplexing HTTP/2 to Origin**   

You can now configure HTTP/2 multiplexing settings for origin connections on Enterprise plans. This feature allows you to optimize how Cloudflare manages concurrent requests over HTTP/2 connections to your origin servers, improving cache efficiency and reducing connection overhead.

#### How it works

HTTP/2 multiplexing allows multiple requests to be sent over a single TCP connection. With this configuration option, you can:

1. **Control concurrent streams**: Adjust the maximum number of concurrent streams per connection.
2. **Optimize connection reuse**: Fine-tune connection pooling behavior for your origin infrastructure.
3. **Reduce connection overhead**: Minimize the number of TCP connections required between Cloudflare and your origin.
4. **Improve cache performance**: Better connection management can enhance cache fetch efficiency.

#### Benefits

* **Customizable performance**: Tailor multiplexing settings to your origin's capabilities.
* **Reduced latency**: Fewer connection handshakes improve response times.
* **Lower origin load**: More efficient connection usage reduces server resource consumption.
* **Enhanced scalability**: Better connection management supports higher traffic volumes.

#### Get started

Enterprise customers can configure HTTP/2 multiplexing settings in the [Cloudflare Dashboard ↗](https://dash.cloudflare.com/) or through our [API](https://developers.cloudflare.com/api/).

Important consideration

This setting needs to be tuned carefully for your origin infrastructure. Setting the concurrent stream limit too high can negatively impact performance by saturating the shared TCP connection and overwhelming server processing capacity, leading to increased latency for individual requests.

## 2025-02-04

  
**Fight CSAM More Easily Than Ever**   

You can now implement our **child safety tooling**, the **[CSAM Scanning Tool](https://developers.cloudflare.com/cache/reference/csam-scanning/)**, more easily. Instead of requiring external reporting credentials, you only need a verified email address for notifications to onboard. This change makes the tool more accessible to a wider range of customers.

**How It Works**

When enabled, the tool automatically [hashes images for enabled websites as they enter the Cloudflare cache ↗](https://blog.cloudflare.com/the-csam-scanning-tool/). These hashes are then checked against a database of **known abusive images**.

* **Potential match detected?**  
   * The **content URL is blocked**, and  
   * **Cloudflare will notify you** about the found matches via the provided email address.

**Updated Service-Specific Terms**

We have also made updates to our **[Service-Specific Terms ↗](https://www.cloudflare.com/service-specific-terms-application-services/#csam-scanning-tool-terms)** to reflect these changes.

## 2025-01-08

  
**Smart Tiered Cache optimizes Load Balancing Pools**   

You can now achieve higher cache hit rates and reduce origin load when using [Load Balancing](https://developers.cloudflare.com/load-balancing/) with [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/). Cloudflare automatically selects a single, optimal tiered data center for all origins in your Load Balancing Pool.

#### How it works

When you use [Load Balancing](https://developers.cloudflare.com/load-balancing/) with [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/), Cloudflare analyzes performance metrics across your pool's origins and automatically selects the optimal Upper Tier data center for the entire pool. This means:

* **Consistent cache location**: All origins in the pool share the same Upper Tier cache.
* **Higher HIT rates**: Requests for the same content hit the cache more frequently.
* **Reduced origin requests**: Fewer requests reach your origin servers.
* **Improved performance**: Faster response times for cache HITs.

#### Example workflow

```

Load Balancing Pool: api-pool

├── Origin 1: api-1.example.com

├── Origin 2: api-2.example.com

└── Origin 3: api-3.example.com

    ↓

Selected Upper Tier: [Optimal data center based on pool performance]


```

#### Get started

To get started, enable [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) on your zone and configure your [Load Balancing Pool](https://developers.cloudflare.com/load-balancing/).

## 2024-11-20

  
**Smart Tiered Cache automatically optimizes R2 caching**   

You can now reduce latency and lower R2 egress costs automatically when using [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) with [R2](https://developers.cloudflare.com/r2/). Cloudflare intelligently selects a tiered data center close to your R2 bucket location, creating an efficient caching topology without additional configuration.

#### How it works

When you enable [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) for zones using [R2](https://developers.cloudflare.com/r2/) as an origin, Cloudflare automatically:

1. **Identifies your R2 bucket location**: Determines the geographical region where your R2 bucket is stored.
2. **Selects an optimal Upper Tier**: Chooses a data center close to your bucket as the common Upper Tier cache.
3. **Routes requests efficiently**: All cache misses in edge locations route through this Upper Tier before reaching R2.

#### Benefits

* **Automatic optimization**: No manual configuration required.
* **Lower egress costs**: Fewer requests to R2 reduce egress charges.
* **Improved hit ratio**: Common Upper Tier increases cache efficiency.
* **Reduced latency**: Upper Tier proximity to R2 minimizes fetch times.

#### Get started

To get started, enable [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) on your zone using R2 as an origin.

## 2024-11-07

  
**Stage and test cache configurations safely**   

You can now stage and test cache configurations before deploying them to production. Versioned environments let you safely validate cache rules, purge operations, and configuration changes without affecting live traffic.

#### How it works

With versioned environments, you can:

1. **Create staging versions** of your cache configuration.
2. **Test cache rules** in a non-production environment.
3. **Purge staged content** independently from production.
4. **Validate changes** before promoting to production.

This capability integrates with Cloudflare's broader [versioning system](https://developers.cloudflare.com/version-management/), allowing you to manage cache configurations alongside other zone settings.

#### Benefits

* **Risk-free testing**: Validate configuration changes without impacting production.
* **Independent purging**: Clear staging cache without affecting live content.
* **Deployment confidence**: Catch issues before they reach end users.
* **Team collaboration**: Multiple team members can work on different versions.

#### Get started

To get started, refer to the [version management documentation](https://developers.cloudflare.com/version-management/).

Important limitation

Cache Reserve is only supported for your production environment. Staged environments can use standard cache functionality, but Cache Reserve persistence is limited to production deployments.

## 2024-11-07

  
**Shard cache using custom cache key values**   

Enterprise customers can now optimize cache hit ratios for content that varies by device, language, or referrer by **sharding cache** using up to ten values from previously restricted headers with [custom cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/).

#### How it works

When configuring [custom cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/), you can now include values from these headers to create distinct cache entries:

* **`accept*` headers** (for example, `accept`, `accept-encoding`, `accept-language`): Serve different cached versions based on content negotiation.
* **`referer` header**: Cache content differently based on the referring page or site.
* **`user-agent` header**: Maintain separate caches for different browsers, devices, or bots.

#### When to use cache sharding

* Content varies significantly by device type (mobile vs desktop).
* Different language or encoding preferences require distinct responses.
* Referrer-specific content optimization is needed.

#### Example configuration

```

{

  "cache_key": {

    "custom_key": {

      "header": {

        "include": ["accept-language", "user-agent"],

        "check_presence": ["referer"]

      }

    }

  }

}


```

This configuration creates separate cache entries based on the `accept-language` and `user-agent` headers, while also considering whether the `referer` header is present.

#### Get started

To get started, refer to the [custom cache keys documentation](https://developers.cloudflare.com/cache/how-to/cache-keys/).

Note

While cache sharding can improve hit ratios for specific use cases, overly sharding your cache can reduce overall cache efficiency and negatively impact performance. Carefully evaluate whether sharding benefits your specific traffic patterns.

## 2024-09-05

  
**One-click Cache Rules templates now available**   

You can now create optimized cache rules instantly with **one-click templates**, eliminating the complexity of manual rule configuration.

#### How it works

1. Navigate to **Rules** \> **Templates** in your Cloudflare dashboard.
2. Select a template for your use case.
3. Click to apply the template with sensible defaults.
4. Customize as needed for your specific requirements.

#### Available cache templates

* **Cache everything**: Adjust the cache level for all requests.
* **Bypass cache for everything**: Bypass cache for all requests.
* **Cache default file extensions**: Replicate Page Rules caching behavior by making only default extensions eligible for cache.
* **Bypass cache on cookie**: Bypass cache for requests containing specific cookies.
* **Set edge cache time**: Cache responses with status code between 200 and 599 on the Cloudflare edge.
* **Set browser cache time**: Adjust how long a browser should cache a resource.

#### Get started

To get started, go to [**Rules > Templates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules) in the dashboard. For more information, refer to the [Cache Rules documentation](https://developers.cloudflare.com/cache/how-to/cache-rules/).

## 2024-07-19

  
**Regionalized Generic Tiered Cache for higher hit ratios**   

You can now achieve higher cache hit ratios with [Generic Global Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#generic-global-tiered-cache). Regional content hashing routes content consistently to the same upper-tier data centers, eliminating redundant caching and reducing origin load.

#### How it works

Regional content hashing groups data centers by region and uses consistent hashing to route content to designated upper-tier caches:

* Same content always routes to the same upper-tier data center within a region.
* Eliminates redundant copies across multiple upper-tier caches.
* Increases the likelihood of cache HITs for the same content.

#### Example

A popular image requested from multiple edge locations in a region:

* **Before**: Cached at 3-4 different upper-tier data centers
* **After**: Cached at 1 designated upper-tier data center
* **Result**: 3-4x fewer cache MISSes, reducing origin load and improving performance

#### Get started

To get started, enable [Generic Global Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#generic-global-tiered-cache) on your zone.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cache/changelog/#page","headline":"Changelog · Cloudflare Cache (CDN) docs","description":"Track the latest updates and changes to Cloudflare Cache features.","url":"https://developers.cloudflare.com/cache/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/changelog/","name":"Changelog"}}]}
```
