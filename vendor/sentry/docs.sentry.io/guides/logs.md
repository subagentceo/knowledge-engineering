---
title: "What to Log"
description: "Practical guidance on what to log, how to search logs, and when to set alerts."
url: https://docs.sentry.io/guides/logs/
---

# What to Log

You've set up [Sentry Logs](https://docs.sentry.io/product/explore/logs.md). Now what?

This guide covers the high-value logging patterns that help you debug faster and catch problems before users report them.

## [Anatomy of a Log](https://docs.sentry.io/guides/logs.md#anatomy-of-a-log)

Every structured log follows the same format:

```javascript
Sentry.logger.<level>(message, { attributes });
```

Logs in Sentry are automatically trace-connected. Each log shows a trace ID that links to the full [trace view](https://docs.sentry.io/concepts/key-terms/tracing.md#traces-to-trace-view).

```ruby
Sentry.logger.<level>(message)
```

**Levels:** `trace`, `debug`, `info`, `warn` (or `warning` in Python), `error`, `fatal`

**Attributes:** Key-value pairs you can search and filter on. Consistency matters, so use whatever naming convention fits your codebase.

```javascript
Sentry.logger.info("Order completed", {
  orderId: "order_123",
  userId: user.id,
  amount: 149.99,
  paymentMethod: "stripe",
});
```

Logs in Sentry are automatically trace-connected. Each log shows a trace ID that links to the full [trace view](https://docs.sentry.io/concepts/key-terms/tracing/trace-view.md).

## [Where to Add Logs](https://docs.sentry.io/guides/logs.md#where-to-add-logs)

Start with these five areas and you'll catch most issues before users do.

### [1. Authentication Events](https://docs.sentry.io/guides/logs.md#1-authentication-events)

Login flows are invisible until something breaks. Log successes and failures to spot patterns like brute force attempts, OAuth misconfigurations, or MFA issues.

```javascript
// After successful authentication
Sentry.logger.info("User logged in", {
  userId: user.id,
  authMethod: "oauth",
  provider: "google",
});

// After authentication fails
Sentry.logger.warn("Login failed", {
  email: maskedEmail,
  reason: "invalid_password",
  attemptCount: 3,
});
```

**Query in [Explore > Logs](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/):** `userId:123 "logged in"` or `severity:warn authMethod:*`

**Alert idea:** Alert when `severity:warn "Login failed"` spikes in a 5-minute window—this can indicate brute force attempts or auth provider issues.

### [2. Payment and Checkout](https://docs.sentry.io/guides/logs.md#2-payment-and-checkout)

Money paths need visibility even when they succeed. When payments fail, you need context fast.

```javascript
// After payment gateway returns an error
Sentry.logger.error("Payment failed", {
  orderId: "order_123",
  amount: 99.99,
  gateway: "stripe",
  errorCode: "card_declined",
  cartItems: 3,
});
```

**Query in [Explore > Logs](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/):** `orderId:order_123` or `severity:error gateway:stripe`

**Alert idea:** Alert when `severity:error gateway:*` spikes—this can indicate payment provider outages.

### [3. External APIs and Async Operations](https://docs.sentry.io/guides/logs.md#3-external-apis-and-async-operations)

Traces capture what your code does. Logs capture context about external triggers and async boundaries. These are things like webhooks, scheduled tasks, and third-party API responses that traces can't automatically instrument.

```javascript
// Third-party API call
const start = Date.now();
const response = await shippingApi.getRates(items);

Sentry.logger.info("Shipping rates fetched", {
  service: "shipping-provider",
  endpoint: "/rates",
  durationMs: Date.now() - start,
  rateCount: response.rates.length,
});

// Webhook received
Sentry.logger.info("Webhook received", {
  source: "stripe",
  eventType: "payment_intent.succeeded",
  paymentId: event.data.object.id,
});
```

**Query in [Explore > Logs](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/):** `service:shipping-provider durationMs:>2000` or `source:stripe`

**Alert idea:** Alert when `service:* durationMs:>3000` to catch third-party slowdowns before they cascade.

### [4. Background Jobs](https://docs.sentry.io/guides/logs.md#4-background-jobs)

Jobs run outside the request context. Without logs, failed jobs are invisible until someone notices missing data.

```javascript
// Inside background job handler
Sentry.logger.info("Job started", {
  jobType: "email-digest",
  jobId: "job_456",
  queue: "notifications",
});

Sentry.logger.error("Job failed", {
  jobType: "email-digest",
  jobId: "job_456",
  retryCount: 3,
  lastError: "SMTP timeout",
});
```

**Query in [Explore > Logs](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/):** `jobType:email-digest severity:error`

**Alert idea:** Alert when `severity:error jobType:*` spikes—this can indicate queue processing issues or downstream failures.

### [5. Feature Flags and Config Changes](https://docs.sentry.io/guides/logs.md#5-feature-flags-and-config-changes)

When something breaks after a deploy, the first question is "what changed?" Logging flag evaluations and config reloads gives you that answer instantly.

```javascript
// When feature flag is checked or config changes
Sentry.logger.info("Feature flag evaluated", {
  flag: "new-checkout-flow",
  enabled: true,
  userId: user.id,
});

Sentry.logger.warn("Config reloaded", {
  reason: "env-change",
  changedKeys: ["API_TIMEOUT", "MAX_CONNECTIONS"],
});
```

**Query in [Explore > Logs](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/):** `flag:new-checkout-flow` or `"Config reloaded"`

## [Creating Alerts From Logs](https://docs.sentry.io/guides/logs.md#creating-alerts-from-logs)

1. Go to **Explore > Logs**

2. Enter your search query (e.g., `severity:error gateway:*`)

3. Click **Save As** - **Alert**

4. Choose a threshold type:

   * **Static:** Alert when count exceeds a value
   * **Percent Change:** Alert when count changes relative to a previous period
   * **Anomaly:** Let Sentry detect unusual patterns

5. Configure notification channels and save

Learn about [creating alerts](https://docs.sentry.io/product/monitors-and-alerts/alerts.md) and [notifications](https://docs.sentry.io/product/notifications.md).

## [Logging Strategy](https://docs.sentry.io/guides/logs.md#logging-strategy)

### [Development Logging](https://docs.sentry.io/guides/logs.md#development-logging)

In development, set sample rates to 100% to catch everything. This helps you understand what logs are being generated and tune your instrumentation before it hits production.

**Development configuration:**

```javascript
Sentry.init({
  dsn: "...",
  environment: "development",
  tracesSampleRate: 1.0, // 100% of traces
  // Capture all logs in development
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["log", "info", "warn", "error", "debug"],
    }),
  ],
});
```

Use verbose logging levels like `debug` (development diagnostics) and `trace` (fine-grained execution details) freely in development. You can filter these out in production using [beforeSendLog](https://docs.sentry.io/platform-redirect.md?next=%2Fconfiguration%2Foptions%2F%23beforeSendLog) to only capture `info` and above.

### [Production Logging](https://docs.sentry.io/guides/logs.md#production-logging)

Local debugging often means many small logs tracing execution flow. In production, this creates noise that's hard to query.

Instead, log fewer messages with higher cardinality. Store events during execution and emit them as a single structured log.

**Don't do this:**

```javascript
Sentry.logger.info("Checkout started", { userId: "882" });
Sentry.logger.info("Discount applied", { code: "WINTER20" });
Sentry.logger.error("Payment failed", { reason: "Insufficient Funds" });
```

These logs are trace-connected, but searching for the error won't return the userId or discount code from the same transaction.

**Do this instead:**

```javascript
Sentry.logger.error("Checkout failed", {
  userId: "882",
  orderId: "order_pc_991",
  cartTotal: 142.5,
  discountCode: "WINTER20",
  paymentMethod: "stripe",
  errorReason: "Insufficient Funds",
  itemCount: 4,
});
```

One log tells the whole story. Search for the error and get full context.

### [Log Drains for Platform Logs](https://docs.sentry.io/guides/logs.md#log-drains-for-platform-logs)

If you can't install the Sentry SDK or need platform-level logs (CDN, database, load balancer), use [Log Drains](https://docs.sentry.io/product/drains.md).

**Platform drains:** [Vercel](https://docs.sentry.io/product/drains/vercel.md), [Cloudflare Workers](https://docs.sentry.io/product/drains/cloudflare.md), [Heroku](https://docs.sentry.io/product/drains/heroku.md), [Supabase](https://docs.sentry.io/product/drains/supabase.md)

**Forwarders:** [OpenTelemetry Collector](https://docs.sentry.io/concepts/otlp/forwarding/pipelines/collector.md), [Vector](https://docs.sentry.io/concepts/otlp/forwarding/pipelines/vector.md), [Fluent Bit](https://docs.sentry.io/concepts/otlp/forwarding/pipelines/fluentbit.md), [AWS CloudWatch](https://docs.sentry.io/concepts/otlp/forwarding/sources/aws-cloudwatch.md), [Kafka](https://docs.sentry.io/concepts/otlp/forwarding/sources/kafka.md)

## [Quick Reference](https://docs.sentry.io/guides/logs.md#quick-reference)

| Category        | Level          | Example Attributes                  |
| --------------- | -------------- | ----------------------------------- |
| Auth events     | `info`/`warn`  | userId, authMethod, reason          |
| Payments        | `info`/`error` | orderId, amount, gateway, errorCode |
| External APIs   | `info`         | service, endpoint, durationMs       |
| Background jobs | `info`/`error` | jobType, jobId, retryCount          |
| Feature flags   | `info`         | flag, enabled, changedKeys          |

## [Next Steps](https://docs.sentry.io/guides/logs.md#next-steps)

Explore the [Logs product walkthrough guides](https://docs.sentry.io/product/explore/logs.md) to learn more about the Sentry interface and discover additional tips.
