---
title: "What to Track"
description: "Practical guidance on what metrics to track, how to explore them, and when to set alerts."
url: https://docs.sentry.io/guides/metrics/
---

# What to Track

You've set up [Sentry Metrics](https://docs.sentry.io/product/explore/metrics.md). Now what?

This guide covers the high-value metric patterns that give you visibility into application health and how to drill into traces when something looks off.

## [Anatomy of a Metric](https://docs.sentry.io/guides/metrics.md#anatomy-of-a-metric)

Sentry supports three metric types:

| Type             | Method                          | Use For                                     |
| ---------------- | ------------------------------- | ------------------------------------------- |
| **Counter**      | `Sentry.metrics.count()`        | Events that happen (orders, clicks, errors) |
| **Gauge**        | `Sentry.metrics.gauge()`        | Current state (queue depth, connections)    |
| **Distribution** | `Sentry.metrics.distribution()` | Values that vary (latency, sizes, amounts)  |

Every metric is trace-connected. When a metric spikes, click into samples to see the exact [trace](https://docs.sentry.io/concepts/key-terms/tracing/trace-view.md) that produced it.

```javascript
Sentry.metrics.count("checkout.failed", 1, {
  attributes: {
    user_tier: "premium",
    failure_reason: "payment_declined",
  },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

## [Where to Track Metrics](https://docs.sentry.io/guides/metrics.md#where-to-track-metrics)

Start with these five metrics and you'll spot issues before they become problems.

### [1. Business Events](https://docs.sentry.io/guides/metrics.md#1-business-events)

Track discrete events that matter to the business. These become your KPIs.

```javascript
Sentry.metrics.count("checkout.completed", 1, {
  attributes: { user_tier: "premium", payment_method: "card" },
});

Sentry.metrics.count("checkout.failed", 1, {
  attributes: { user_tier: "premium", failure_reason: "payment_declined" },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

**Explore in Sentry:**

1. Go to [**Explore > Metrics**](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics/)
2. Select `checkout.failed`, set **Aggregate** to `sum`
3. **Group by** `failure_reason`
4. Click **Samples** to see individual events and their traces

### [2. Application Health](https://docs.sentry.io/guides/metrics.md#2-application-health)

Track success and failure of critical operations.

```javascript
Sentry.metrics.count("email.sent", 1, {
  attributes: { email_type: "welcome", provider: "sendgrid" },
});

Sentry.metrics.count("email.failed", 1, {
  attributes: { email_type: "welcome", error: "rate_limited" },
});

Sentry.metrics.count("job.processed", 1, {
  attributes: { job_type: "invoice-generation", queue: "billing" },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

**Query in [Explore > Metrics](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics/):** Add both `email.sent` and `email.failed`, group by `email_type`, compare the ratio.

### [3. Resource Utilization](https://docs.sentry.io/guides/metrics.md#3-resource-utilization)

Track the current state of pools, queues, and connections. Call these periodically (e.g., every 30 seconds).

```javascript
Sentry.metrics.gauge("queue.depth", await queue.size(), {
  attributes: { queue_name: "notifications" },
});

Sentry.metrics.gauge("pool.connections_active", pool.activeConnections, {
  attributes: { pool_name: "postgres-primary" },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

**Query in [Explore > Metrics](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics/):** View `max(queue.depth)` over time to spot backlogs.

### [4. Latency and Performance](https://docs.sentry.io/guides/metrics.md#4-latency-and-performance)

Track values that vary and need percentile analysis. **Tip:** averages can hide outliers, use p90/p95/p99 instead.

```javascript
Sentry.metrics.distribution("api.latency", responseTimeMs, {
  unit: "millisecond",
  attributes: { endpoint: "/api/orders", method: "POST" },
});

Sentry.metrics.distribution("db.query_time", queryDurationMs, {
  unit: "millisecond",
  attributes: { table: "orders", operation: "select" },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

**Query in [Explore > Metrics](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics/):** View `p95(api.latency)` grouped by `endpoint` to find slow routes.

### [5. Business Values](https://docs.sentry.io/guides/metrics.md#5-business-values)

Track amounts, sizes, and quantities for analysis.

```javascript
Sentry.metrics.distribution("order.amount", order.totalUsd, {
  unit: "usd",
  attributes: { user_tier: "premium", region: "us-west" },
});

Sentry.metrics.distribution("upload.size", fileSizeBytes, {
  unit: "byte",
  attributes: { file_type: "image", source: "profile-update" },
});
```

*Other available variations of the above snippet: Python, PHP, .NET, Ruby, Flutter, Swift, Kotlin*

**Query in [Explore > Metrics](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics/):** View `avg(order.amount)` grouped by `region` to compare regional performance.

## [Alerts and Dashboard Widgets](https://docs.sentry.io/guides/metrics.md#alerts-and-dashboard-widgets)

Alerts and dashboard widgets for Metrics are coming soon.

You'll soon be able to:

* Create alert rules based on metric queries
* Add metric visualizations to dashboards
* Set up notifications when metrics cross thresholds
* Save common queries for quick access

## [Quick Reference](https://docs.sentry.io/guides/metrics.md#quick-reference)

| Category             | Type         | Method           | Example Attributes                           |
| -------------------- | ------------ | ---------------- | -------------------------------------------- |
| Business events      | Counter      | `count()`        | user\_tier, payment\_method, failure\_reason |
| Application health   | Counter      | `count()`        | email\_type, provider, job\_type, queue      |
| Resource utilization | Gauge        | `gauge()`        | queue\_name, pool\_name                      |
| Latency/performance  | Distribution | `distribution()` | endpoint, method, table, operation           |
| Business values      | Distribution | `distribution()` | user\_tier, region, file\_type               |

## [When to Use Metrics vs Traces vs Logs](https://docs.sentry.io/guides/metrics.md#when-to-use-metrics-vs-traces-vs-logs)

| Signal      | Best For                              | Example Question                         |
| ----------- | ------------------------------------- | ---------------------------------------- |
| **Metrics** | Aggregated counts, rates, percentiles | "How many checkouts failed this hour?"   |
| **Traces**  | Request flow, latency breakdown       | "Why was this specific request slow?"    |
| **Logs**    | Detailed context, debugging           | "What happened right before this error?" |

All three are trace-connected. Start wherever makes sense and navigate to the others.

Explore the [Application Metrics product walkthrough](https://docs.sentry.io/product/explore/metrics.md) to learn more about the Sentry interface and discover additional tips.
