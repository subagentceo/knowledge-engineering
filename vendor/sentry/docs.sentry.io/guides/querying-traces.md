---
title: "Querying Traces"
description: "Find performance issues using data Sentry captures automatically and set up alerts."
url: https://docs.sentry.io/guides/querying-traces/
---

# Querying Traces

You've enabled [Sentry Tracing](https://docs.sentry.io/product/explore/trace-explorer.md). Now what?

Sentry's auto-instrumentation captures a lot without custom code. This guide shows you how to query that data to find performance issues.

## [What's Auto-Instrumented](https://docs.sentry.io/guides/querying-traces.md#whats-auto-instrumented)

With `browserTracingIntegration()` enabled, Sentry automatically captures:

* Page loads and navigation
* Fetch/XHR requests
* Long animation frames (main thread blocking)
* Resource loading (JS, CSS, images)

## [Where to Look](https://docs.sentry.io/guides/querying-traces.md#where-to-look)

Start with these five queries and you'll catch most performance issues before users complain.

### [1. Slow Page Loads: Pages taking too long to become interactive hurt first impressions](https://docs.sentry.io/guides/querying-traces.md#1-slow-page-loads-pages-taking-too-long-to-become-interactive-hurt-first-impressions)

**Query in [Explore > Traces](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/):** `span.op:pageload` & **Visualize:** `p90(span.duration)` grouped by `transaction` to compare routes.

* **What to look for:** Routes with p90 over 3 seconds. Explore sample traces to see the breakdown. Usually it's slow API calls, heavy JavaScript, or large images.

* **Alert idea:** `p75(transaction.duration) > 3s` for pageload transactions.

### [2. Slow API Calls: Fetch/XHR requests are often the bottleneck in modern web apps](https://docs.sentry.io/guides/querying-traces.md#2-slow-api-calls-fetchxhr-requests-are-often-the-bottleneck-in-modern-web-apps)

**Query in [Explore > Traces](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/):** `span.op:http.client` & **Visualize:** `avg(span.duration)` grouped by `span.description` (the URL).

* **What to look for:** Endpoints with avg duration over 1 second or p95 over 2 seconds. Check if it's the backend or network latency by looking at sample traces.

* **Alert idea:** `p95(span.duration) > 2s` where `span.op:http.client`.

### [3. JavaScript Blocking the UI: Long animation frames mean JavaScript execution is freezing the interface](https://docs.sentry.io/guides/querying-traces.md#3-javascript-blocking-the-ui-long-animation-frames-mean-javascript-execution-is-freezing-the-interface)

**Query in [Explore > Traces](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/):** `span.op:ui.long-animation-frame` & **Visualize:** Sort by `span.duration` to find the worst offenders.

* **What to look for:** Frames over 200ms. This is what causes jank and unresponsiveness. Look at the stack trace in sample traces to find the expensive operation.

* **Alert idea:** `p75(span.duration) > 200ms` for long animation frames.

### [4. Slow SPA Navigation: After the initial load, how fast do users move between pages?](https://docs.sentry.io/guides/querying-traces.md#4-slow-spa-navigation-after-the-initial-load-how-fast-do-users-move-between-pages)

**Query in [Explore > Traces](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/):** `span.op:navigation` & **Visualize:** `p90(span.duration)` grouped by `transaction` to compare route performance.

* **What to look for:** Navigation over 1 second feels sluggish. Click into traces to see if it's data fetching, component rendering, or something else.

* **Alert idea:** `p75(span.duration) > 2s` for navigation.

### [5. Heavy Resources: Large JS bundles, stylesheets, or images slowing down your site](https://docs.sentry.io/guides/querying-traces.md#5-heavy-resources-large-js-bundles-stylesheets-or-images-slowing-down-your-site)

**Query in [Explore > Traces](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/):** `span.op:resource.script` (JavaScript), `span.op:resource.css` (stylesheets), or `span.op:resource.img` (images) & **Visualize:** `avg(span.duration)` to find the heaviest assets.

* **What to look for:** Resources taking over 1 second. Check the span description to see which files. Often it's third-party scripts or unoptimized images.

* **Alert idea:** `p75(span.duration) > 3s` for resource.script.

## [Creating Alerts From Traces](https://docs.sentry.io/guides/querying-traces.md#creating-alerts-from-traces)

1. Go to **Explore > Traces**

2. Build your query (e.g., `span.op:http.client`)

3. Click **Save As** - **Alert**

4. Choose a threshold type:

   * **Static:** Alert when a value exceeds a threshold
   * **Percent Change:** Alert when a value changes relative to a previous period
   * **Anomaly:** Let Sentry detect unusual patterns

5. Configure notification channels and save

**Tip:** Averages can hide outliers, use p75/p90/p95 instead.

Learn about [creating alerts](https://docs.sentry.io/product/monitors-and-alerts/alerts.md) and [notifications](https://docs.sentry.io/product/notifications.md).

## [Quick Reference](https://docs.sentry.io/guides/querying-traces.md#quick-reference)

| Category            | Query                             | Visualize                           |
| ------------------- | --------------------------------- | ----------------------------------- |
| Slow page loads     | `span.op:pageload`                | `p90(span.duration)` by transaction |
| Slow fetch requests | `span.op:http.client`             | `avg(span.duration)` by URL         |
| JS blocking UI      | `span.op:ui.long-animation-frame` | `max(span.duration)`                |
| Slow SPA navigation | `span.op:navigation`              | `p90(span.duration)` by transaction |
| Heavy resources     | `span.op:resource.*`              | `avg(span.duration)` by description |

## [Next Steps](https://docs.sentry.io/guides/querying-traces.md#next-steps)

Explore the [Trace Explorer product walkthrough guides](https://docs.sentry.io/product/explore/trace-explorer.md) to learn more about the Sentry interface and discover additional tips.
